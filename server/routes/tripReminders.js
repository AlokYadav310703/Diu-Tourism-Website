import express from 'express';
import nodemailer from 'nodemailer';
import { supabase } from '../config/supabaseClient.js';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

function buildDayList(day, activities) {
  if (!activities.length) return '';
  const items = activities.map(a => `<li>${a}</li>`).join('');
  return `<h3>${day.toUpperCase()}</h3><ul>${items}</ul>`;
}

// GET /trip-reminders — sends a personalized itinerary email to every user
// whose trip is tomorrow and who hasn't been emailed yet. Intended to be
// hit by a daily scheduled job (e.g. a cron-triggered request), not by the
// frontend. Replaces the original routes/send_email.js, which had the
// Gmail app password hardcoded directly in source — that credential should
// be rotated in your Google Account, then set as EMAIL_APP_PASSWORD here.
router.get('/', async (req, res) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, user_name')
    .eq('date_of_trip', tomorrowStr)
    .eq('trip_reminder_sent', false);

  if (error) return res.status(500).json({ error: error.message });
  if (!profiles.length) return res.json({ message: 'No upcoming trips found.' });

  const results = [];

  for (const profile of profiles) {
    const { data: authUser } = await supabase.auth.admin.getUserById(profile.id);
    const email = authUser?.user?.email;
    if (!email) continue;

    const { data: items } = await supabase
      .from('event_plan_items')
      .select('activity, status')
      .eq('user_id', profile.id);

    const dayPlan = { day1: [], day2: [], day3: [] };
    (items || []).forEach(item => {
      if (dayPlan[item.status]) dayPlan[item.status].push(item.activity);
    });

    const html = `
      <h2>Hello ${profile.user_name || ''},</h2>
      <p>Here's your personalized plan for your Diu trip tomorrow:</p>
      ${buildDayList('day1', dayPlan.day1)}
      ${buildDayList('day2', dayPlan.day2)}
      ${buildDayList('day3', dayPlan.day3)}
      <p>Enjoy your trip!<br><strong>Diu Tourism</strong></p>
    `;

    try {
      await transporter.sendMail({
        from: { name: 'Diu Tourism', address: process.env.EMAIL_USER },
        to: email,
        subject: 'Your Diu Trip Plan',
        html
      });

      await supabase.from('profiles').update({ trip_reminder_sent: true }).eq('id', profile.id);
      results.push({ email, sent: true });
    } catch (mailError) {
      console.error(`Failed to email ${email}:`, mailError.message);
      results.push({ email, sent: false, error: mailError.message });
    }
  }

  res.json({ message: 'Emails processed.', results });
});

export default router;
