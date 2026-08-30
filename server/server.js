import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import hotel from './routes/hotel.js';
import restaurant from './routes/restaurant.js';
import transport from './routes/transport.js';
import feedback from './routes/feedback.js';
import adminActivity from './routes/admin_activity.js';
import eventPlan from './routes/eventPlanner.js';
import profile from './routes/profile.js';
import chatbot from './routes/chatbot.js';
import tripReminders from './routes/tripReminders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Paths preserved from the original app wherever the resource itself
// didn't change (see README.md for the full old-path -> new-path map).
app.use('/hotel', hotel);
app.use('/restaurant', restaurant);
app.use('/transport', transport);
app.use('/msg', feedback);
app.use('/admin_activity', adminActivity);
app.use('/eventplan', eventPlan);
app.use('/profile', profile);          // new — replaces /login/session, /login/update
app.use('/chatbot', chatbot);          // new — RAG chatbot
app.use('/trip-reminders', tripReminders); // replaces /sendQueryEmail

// Removed: /login, /signup, /adminLogin, /session, /logout, /admin
// (Auth now runs entirely through Supabase Auth on the frontend —
// see client/src/services/supabaseClient.js and AuthContext.jsx.)

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
