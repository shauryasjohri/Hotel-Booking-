import { clerkMiddleware, getAuth } from '@clerk/express';
import { config } from '../config/index.js';
import { supabase } from '../config/supabase.js';

/**
 * Protects routes - verifies Clerk JWT, rejects unauthenticated requests.
 * Syncs user to Supabase on first login.
 * Attaches req.auth (Clerk) and req.user (DB user) to request.
 */
export const protectRoute = [
  clerkMiddleware({
    secretKey: config.clerk.secretKey,
    publishableKey: config.clerk.publishableKey,
  }),
  async (req, res, next) => {
    try {
      const auth = getAuth(req);
      if (!auth?.isAuthenticated) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const clerkId = auth.userId;
      if (!clerkId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      // Sync user to Supabase
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', clerkId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('User fetch error:', fetchError);
        return res.status(500).json({ success: false, message: 'Database error' });
      }

      if (!existingUser) {
        const sessionClaims = auth.sessionClaims || {};
        const name = sessionClaims.name ?? sessionClaims.given_name ?? 'User';
        const email = sessionClaims.email ?? '';

        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            clerk_id: clerkId,
            name: name || 'User',
            email: email || '',
            role: 'guest',
          })
          .select()
          .single();

        if (insertError) {
          console.error('User insert error:', insertError);
          return res.status(500).json({ success: false, message: 'Failed to sync user' });
        }

        req.user = newUser;
      } else {
        req.user = existingUser;
      }

      next();
    } catch (err) {
      console.error('Auth middleware error:', err);
      res.status(500).json({ success: false, message: 'Authentication failed' });
    }
  },
];
