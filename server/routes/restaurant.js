import express from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = express.Router();

// GET /restaurant — matches the original GET /restaurant path used by Restaurants.js
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('restaurants').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
