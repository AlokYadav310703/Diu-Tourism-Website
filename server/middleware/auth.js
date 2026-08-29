import { supabase } from '../config/supabaseClient.js';

/**
 * Verifies the "Authorization: Bearer <token>" header against Supabase Auth
 * and attaches the authenticated user to req.user. This replaces the old
 * cookie/session-based login — the frontend now gets a JWT directly from
 * Supabase Auth (see client/src/services/supabaseClient.js) and sends it
 * on every request via client/src/services/api.js.
 */
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Not logged in.' });
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }

  req.user = data.user; // { id, email, user_metadata, ... }
  next();
}

/**
 * Chain AFTER requireAuth. Checks profiles.is_admin for req.user.id.
 * Replaces the old hardcoded `user.email === "alok@gmail.com"` checks
 * scattered across the frontend.
 */
export async function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Not logged in.' });
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', req.user.id)
    .single();

  if (error || !data?.is_admin) {
    return res.status(403).json({ error: 'Admin access required.' });
  }

  next();
}
