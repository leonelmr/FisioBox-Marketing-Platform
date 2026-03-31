// ─── Supabase Client + Auth + Sync ──────────────────────────────────────────
// Replace the placeholder values below with your real Supabase project URL and
// anon (public) key, found in: Supabase Dashboard → Settings → API
// ────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL = window.__SUPABASE_URL || 'https://stqzapqbxohyoaadhjrg.supabase.co';
const SUPABASE_ANON = window.__SUPABASE_ANON || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cXphcHFieG9oeW9hYWRoanJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODQ3NzAsImV4cCI6MjA5MDU2MDc3MH0.NzAPtD3VPx8lHYKvInDVInGpa4oDq1wk4mB9qybYjWc';

// Supabase JS v2 is loaded via CDN in index.html before this file.
const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── Public API ──────────────────────────────────────────────────────────────
const DB = {

  // ── Auth ────────────────────────────────────────────────────────────────

  /** Returns the current session or null */
  async getSession() {
    const { data } = await _sb.auth.getSession();
    return data?.session ?? null;
  },

  /** Returns the current user or null */
  async getUser() {
    const { data } = await _sb.auth.getUser();
    return data?.user ?? null;
  },

  /**
   * Sign in with email + password (or send magic-link if password omitted).
   * Returns { user, error }
   */
  async signIn(email, password) {
    if (password) {
      const { data, error } = await _sb.auth.signInWithPassword({ email, password });
      return { user: data?.user ?? null, error };
    } else {
      const { error } = await _sb.auth.signInWithOtp({ email });
      return { user: null, error };
    }
  },

  /** Sign up with email + password. Returns { user, error } */
  async signUp(email, password) {
    const { data, error } = await _sb.auth.signUp({ email, password });
    return { user: data?.user ?? null, error };
  },

  /** Sign out */
  async signOut() {
    await _sb.auth.signOut();
  },

  /**
   * Subscribe to auth state changes.
   * callback(event, session) — event is 'SIGNED_IN' | 'SIGNED_OUT' | etc.
   */
  onAuthChange(callback) {
    return _sb.auth.onAuthStateChange(callback);
  },

  // ── Data sync ───────────────────────────────────────────────────────────

  /**
   * Fire-and-forget background write.
   * Upserts { user_id, key, value, updated_at } in app_data table.
   */
  sync(key, rawValue) {
    DB.getUser().then(user => {
      if (!user) return;
      let value;
      try { value = JSON.parse(rawValue); } catch { value = rawValue; }
      _sb.from('app_data')
        .upsert({ user_id: user.id, key, value, updated_at: new Date().toISOString() },
          { onConflict: 'user_id,key' })
        .then(({ error }) => {
          if (error) console.warn('[DB.sync] error for key', key, error.message);
        });
    });
  },

  /**
   * Load all rows for the current user from app_data and populate localStorage.
   * Called once after login so the app can read data as normal.
   */
  async loadAll() {
    const user = await DB.getUser();
    if (!user) return;
    const { data, error } = await _sb
      .from('app_data')
      .select('key, value')
      .eq('user_id', user.id);
    if (error) { console.warn('[DB.loadAll] error:', error.message); return; }
    (data || []).forEach(({ key, value }) => {
      try {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      } catch { /* quota */ }
    });
  },

  /**
   * Wipe all app keys from localStorage (called on sign-out so the next user
   * starts clean on a shared device).
   */
  clearLocal() {
    const appKeys = Object.keys(localStorage).filter(k => k.startsWith('fisiobox_'));
    appKeys.forEach(k => localStorage.removeItem(k));
  },
};
