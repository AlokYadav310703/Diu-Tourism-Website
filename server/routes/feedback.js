import express from 'express';
import { supabase } from '../config/supabaseClient.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /msg/:placename/feedback — public, matches the original path used
// by every Places page's <Feedback placename="..." /> component.
router.get('/:placename/feedback', async (req, res) => {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('place', req.params.placename)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /msg/:placename/feedback — post or update your own feedback for a
// place. Identity comes from the logged-in Supabase user, not a free-text
// field, and posting again just updates your existing comment (one
// feedback entry per person per place, same as the original design).
router.post('/:placename/feedback', requireAuth, async (req, res) => {
  const { user_comment } = req.body;
  if (!user_comment || !user_comment.trim()) {
    return res.status(400).json({ error: 'user_comment is required.' });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_name')
    .eq('id', req.user.id)
    .single();

  const { data, error } = await supabase
    .from('feedback')
    .upsert(
      {
        place: req.params.placename,
        email: req.user.email,
        user_name: profile?.user_name || req.user.email,
        user_comment: user_comment.trim()
      },
      { onConflict: 'place,email' }
    )
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// GET /msg/feedback/:feedbackId/replies
router.get('/feedback/:feedbackId/replies', async (req, res) => {
  const { data, error } = await supabase
    .from('replies')
    .select('*')
    .eq('feedback_id', req.params.feedbackId)
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /msg/feedback/:feedbackId/reply
router.post('/feedback/:feedbackId/reply', requireAuth, async (req, res) => {
  const { replier_comment } = req.body;
  if (!replier_comment || !replier_comment.trim()) {
    return res.status(400).json({ error: 'replier_comment is required.' });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_name')
    .eq('id', req.user.id)
    .single();

  const { data, error } = await supabase
    .from('replies')
    .insert({
      feedback_id: req.params.feedbackId,
      replier_email: req.user.email,
      replier_name: profile?.user_name || req.user.email,
      replier_comment: replier_comment.trim()
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// POST /msg/feedback/:feedbackId/vote — body: { type: "like" | "dislike" }
// Toggle-off if voting the same way again, switch counts if changing vote.
// (Backend-only in the original app too — no vote buttons were wired into
// Feedback.js yet, but the table/logic existed. This ports that forward
// cleanly so a like/dislike button can be added to the UI later.)
router.post('/feedback/:feedbackId/vote', requireAuth, async (req, res) => {
  const feedbackId = req.params.feedbackId;
  const { type } = req.body;
  if (type !== 'like' && type !== 'dislike') {
    return res.status(400).json({ error: 'type must be "like" or "dislike".' });
  }

  const { data: existingVote } = await supabase
    .from('votes')
    .select('*')
    .eq('feedback_id', feedbackId)
    .eq('user_id', req.user.id)
    .maybeSingle();

  const countColumn = type === 'like' ? 'likes' : 'dislikes';
  const oppositeColumn = type === 'like' ? 'dislikes' : 'likes';

  if (!existingVote) {
    // First vote from this user on this feedback item.
    await supabase.from('votes').insert({ feedback_id: feedbackId, user_id: req.user.id, vote_type: type });
    await supabase.rpc('increment_feedback_count', { row_id: feedbackId, column_name: countColumn });
  } else if (existingVote.vote_type === type) {
    // Same vote again -> toggle off.
    await supabase.from('votes').delete().eq('id', existingVote.id);
    await supabase.rpc('decrement_feedback_count', { row_id: feedbackId, column_name: countColumn });
  } else {
    // Switching from like -> dislike or vice versa.
    await supabase.from('votes').update({ vote_type: type }).eq('id', existingVote.id);
    await supabase.rpc('decrement_feedback_count', { row_id: feedbackId, column_name: oppositeColumn });
    await supabase.rpc('increment_feedback_count', { row_id: feedbackId, column_name: countColumn });
  }

  const { data: updated, error } = await supabase
    .from('feedback')
    .select('id, likes, dislikes')
    .eq('id', feedbackId)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(updated);
});

export default router;
