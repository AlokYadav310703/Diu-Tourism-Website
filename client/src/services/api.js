import axios from 'axios';
import { supabase } from './supabaseClient';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: API_URL });

// Attach the current Supabase session's access token to every request.
// This is what replaced the old `credentials: "include"` session cookie —
// Express verifies this token in middleware/auth.js.
api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
