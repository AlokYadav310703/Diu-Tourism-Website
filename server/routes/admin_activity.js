import express from 'express';
import { supabase } from '../config/supabaseClient.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// ------------------------------------------------------------
// Hotels
// ------------------------------------------------------------
router.post('/addHotel', requireAuth, requireAdmin, async (req, res) => {
  const { name, address, phone, website } = req.body;
  const { data, error } = await supabase
    .from('hotels')
    .insert({ name, address, phone, website: website || null })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.post('/removeHotel', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });
  const { error } = await supabase.from('hotels').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------------------------------------------------------
// Restaurants
// ------------------------------------------------------------
router.post('/addRestaurant', requireAuth, requireAdmin, async (req, res) => {
  const { name, address, phone, type, open_time, close_time } = req.body;
  const { data, error } = await supabase
    .from('restaurants')
    .insert({ name, address, phone, type, open_time, close_time })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.post('/removeRestaurant', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });
  const { error } = await supabase.from('restaurants').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------------------------------------------------------
// Local buses
// ------------------------------------------------------------
router.post('/addLocalBus', requireAuth, requireAdmin, async (req, res) => {
  const { from_location, to_location, bus_time, cost } = req.body;
  const { data, error } = await supabase
    .from('local_buses')
    .insert({ from_location, to_location, bus_time, cost })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.post('/removeLocalBus', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });
  const { error } = await supabase.from('local_buses').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------------------------------------------------------
// State buses
// ------------------------------------------------------------
router.post('/addStateBus', requireAuth, requireAdmin, async (req, res) => {
  const { from_location, to_location, start_time, end_time, travels, cost, link } = req.body;
  const { data, error } = await supabase
    .from('state_buses')
    .insert({ from_location, to_location, start_time, end_time, travels, cost, link: link || null })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.post('/removeStateBus', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });
  const { error } = await supabase.from('state_buses').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------------------------------------------------------
// Flights (new — admin-managed, matches the state bus pattern.
// See the chat explanation for why this isn't auto-fetched.)
// ------------------------------------------------------------
router.post('/addFlight', requireAuth, requireAdmin, async (req, res) => {
  const { from_location, to_location, flight_time, flight_name } = req.body;
  const { data, error } = await supabase
    .from('flights')
    .insert({ from_location, to_location, flight_time, flight_name })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.post('/removeFlight', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });
  const { error } = await supabase.from('flights').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------------------------------------------------------
// Rickshaw
// ------------------------------------------------------------
router.post('/addRickshaw', requireAuth, requireAdmin, async (req, res) => {
  const { driver_name, phone } = req.body;
  const { data, error } = await supabase
    .from('rickshaw')
    .insert({ driver_name, phone })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.post('/removeRickshaw', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });
  const { error } = await supabase.from('rickshaw').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------------------------------------------------------
// Public toilets — GET is public (DispNearUtility.js calls this exact
// path: /admin_activity/publicToilets), add/remove are admin-only.
// ------------------------------------------------------------
router.get('/publicToilets', async (req, res) => {
  const { data, error } = await supabase.from('public_toilets').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/addPublicToilets', requireAuth, requireAdmin, async (req, res) => {
  const { name, latitude, longitude } = req.body;
  const { data, error } = await supabase
    .from('public_toilets')
    .insert({ name, latitude, longitude })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.post('/removePublicToilets', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });
  const { error } = await supabase.from('public_toilets').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------------------------------------------------------
// Contact Us — public submission + admin moderation.
// NOTE: the original app defined this as POST /contactUs (capital U)
// but ContactUs.js on the frontend calls /admin_activity/contactus
// (lowercase) — a case mismatch that made the contact form silently
// 404 on submit. Matching the frontend's actual call here fixes it.
// ------------------------------------------------------------
router.post('/contactus', async (req, res) => {
  const { user_name, email, subject, message } = req.body;
  if (!user_name || !email || !message) {
    return res.status(400).json({ error: 'user_name, email and message are required.' });
  }

  const { error } = await supabase
    .from('contactus')
    .insert({ user_name, email, subject, message });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Message sent successfully' });
});

router.get('/fetchContactUs', requireAuth, requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('contactus')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/removeAllContactUs', requireAuth, requireAdmin, async (req, res) => {
  const { error } = await supabase.from('contactus').delete().neq('id', 0);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

router.post('/removeOneContactUs', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });
  const { error } = await supabase.from('contactus').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------------------------------------------------------
// Feedback / reply moderation
// (Posting feedback/replies and liking/disliking lives in
// routes/feedback.js — these are the moderation-only actions.)
// ------------------------------------------------------------
router.post('/removeFeedback', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });
  const { error } = await supabase.from('feedback').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// A user removing their OWN feedback — same path the frontend already
// calls, but authorization here is "owner or admin", not admin-only.
router.post('/removeUserFeedback', requireAuth, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });

  const { data: existing, error: fetchError } = await supabase
    .from('feedback')
    .select('email')
    .eq('id', id)
    .single();

  if (fetchError || !existing) return res.status(404).json({ error: 'Feedback not found.' });

  if (existing.email !== req.user.email) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', req.user.id)
      .single();
    if (!profile?.is_admin) {
      return res.status(403).json({ error: 'You can only remove your own feedback.' });
    }
  }

  const { error } = await supabase.from('feedback').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

router.post('/removeReply', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required.' });
  const { error } = await supabase.from('replies').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;
