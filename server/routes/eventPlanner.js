import express from 'express';
import { supabase } from '../config/supabaseClient.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /eventplan — the current user's itinerary items.
// Replaces reading from a dynamically-created "event_plan_<username>"
// table; every user's 12 default activities are now seeded automatically
// at signup (see the handle_new_user trigger in db/schema.sql).
router.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('event_plan_items')
    .select('*')
    .eq('user_id', req.user.id)
    .order('id', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /eventplan/save — bulk-update statuses, e.g.
// { tasks: [{ activity: "Nagoa", status: "day1" }, ...] }
router.post('/save', requireAuth, async (req, res) => {
  const { tasks } = req.body;
  if (!Array.isArray(tasks)) {
    return res.status(400).json({ error: 'tasks must be an array.' });
  }

  for (const task of tasks) {
    const { error } = await supabase
      .from('event_plan_items')
      .update({ status: task.status })
      .eq('user_id', req.user.id)
      .eq('activity', task.activity);

    if (error) return res.status(500).json({ error: error.message });
  }

  res.json({ success: true });
});

export default router;
