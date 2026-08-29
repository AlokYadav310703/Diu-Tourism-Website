import express from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = express.Router();

// GET /hotel — matches the original GET /hotel path used by Hotels.js
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('hotels').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
