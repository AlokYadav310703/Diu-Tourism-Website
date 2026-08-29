import express from 'express';
import { supabase } from '../config/supabaseClient.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /profile — current user's profile (user_name, date_of_trip, is_admin).
// Replaces the old GET /login/session and GET /session checks.
router.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('user_name, date_of_trip, is_admin')
    .eq('id', req.user.id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ email: req.user.email, ...data });
});

// PATCH /profile — update date_of_trip (or user_name).
// Replaces the old POST /login/update.
router.patch('/', requireAuth, async (req, res) => {
  const { date_of_trip, user_name } = req.body;
  const updates = {};
  if (date_of_trip !== undefined) updates.date_of_trip = date_of_trip;
  if (user_name !== undefined) updates.user_name = user_name;

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', req.user.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
