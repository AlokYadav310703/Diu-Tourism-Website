import express from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = express.Router();

// Paths preserved exactly from the original routes/transport.js so no
// frontend fetch calls needed to change (StateBuses.js, LocalBuses.js,
// Rickshaw.js, Flights.js all call these same paths).

router.get('/rickshaw', async (req, res) => {
  const { data, error } = await supabase.from('rickshaw').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/statebus', async (req, res) => {
  const { data, error } = await supabase.from('state_buses').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/localbus', async (req, res) => {
  const { data, error } = await supabase
    .from('local_buses')
    .select('*')
    .order('bus_time', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/flight', async (req, res) => {
  const { data, error } = await supabase.from('flights').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
