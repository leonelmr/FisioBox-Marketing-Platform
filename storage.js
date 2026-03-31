// ============================================================
// FISIOBOX AI MARKETING SUITE — localStorage Management
// ============================================================

const Storage = {

  // ── DUAL-WRITE HELPER ──────────────────────────────────────
  // Writes to localStorage and, when DB (Supabase) is available,
  // fires a background sync so data is persisted in the cloud.
  _persist(key, value) {
    localStorage.setItem(key, value);
    // DB is defined in supabase.js which loads after storage.js,
    // but _persist is only called at runtime so DB will exist.
    if (typeof DB !== 'undefined') DB.sync(key, value);
  },

  // ── API KEY ────────────────────────────────────────────────
  getApiKey: () => localStorage.getItem('fisiobox_api_key') || '',
  setApiKey: (key) => Storage._persist('fisiobox_api_key', key),

  // ── BRAND SETTINGS ─────────────────────────────────────────
  getBrandSettings: () => {
    const defaults = {
      tone_formal: 50,        // 0=casual, 100=formal
      tone_clinical: 30,      // 0=accesible, 100=clínico
      tone_educational: 70,   // 0=promocional, 100=educativo
      pillars: { educativo: 40, promocional: 30, prueba_social: 20, cultura: 5, comunidad: 5 },
      forbidden_phrases: [
        'garantizamos', 'curaremos', 'cura definitiva', 'elimina el dolor para siempre',
        'resultados garantizados', 'tratamiento milagroso', '100% efectivo'
      ],
      preferred_vocabulary: [
        'retorno al deporte', 'readaptación', 'evidencia científica',
        'empoderamiento del paciente', 'calidad de vida', 'movimiento funcional',
        'basado en evidencia', 'proceso de recuperación', 'trabajo en equipo'
      ],
      hashtag_library: {
        marca: ['#fisiobox', '#fisioboxcr', '#fisioterapiaescazu'],
        especialidad: ['#fisioterapiadeportiva', '#retornaldeporte', '#rehabilitaciondeportiva', '#biomecánica'],
        local: ['#escazu', '#costarica', '#costaricadeportes', '#sanjose'],
        deporte: ['#crossfitcostarica', '#futbolcostarica', '#runningcr', '#ciclismocr', '#teniscr'],
        condicion: ['#lesionesdeportivas', '#prevencionlesiones', '#fisioterapia', '#salud']
      },
      medical_disclaimer: 'Consulta con tu fisioterapeuta antes de iniciar cualquier programa de ejercicio. El contenido de este post es educativo y no reemplaza la evaluación clínica individualizada.',
      results_disclaimer: 'Los resultados pueden variar según cada persona y condición.',
      brand_voice_description: '',
      brand_primary: '', brand_secondary: '', brand_accent: '',
      brand_neutral: '', brand_bg: '', visual_style: ''
    };
    const saved = localStorage.getItem('fisiobox_brand_settings');
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  },
  setBrandSettings: (settings) => Storage._persist('fisiobox_brand_settings', JSON.stringify(settings)),

  // ── CONTENT DRAFTS ─────────────────────────────────────────
  getDrafts: () => {
    const saved = localStorage.getItem('fisiobox_drafts');
    return saved ? JSON.parse(saved) : [];
  },
  saveDraft: (draft) => {
    const drafts = Storage.getDrafts();
    const idx = drafts.findIndex(d => d.id === draft.id);
    if (idx >= 0) drafts[idx] = draft;
    else drafts.unshift({ ...draft, id: draft.id || Date.now().toString(), createdAt: new Date().toISOString() });
    Storage._persist('fisiobox_drafts', JSON.stringify(drafts));
    return drafts[idx >= 0 ? idx : 0];
  },
  deleteDraft: (id) => {
    const drafts = Storage.getDrafts().filter(d => d.id !== id);
    Storage._persist('fisiobox_drafts', JSON.stringify(drafts));
  },

  // ── CALENDAR ───────────────────────────────────────────────
  getCalendarItems: () => {
    const saved = localStorage.getItem('fisiobox_calendar');
    return saved ? JSON.parse(saved) : [];
  },
  saveCalendarItem: (item) => {
    const items = Storage.getCalendarItems();
    const idx = items.findIndex(i => i.id === item.id);
    if (idx >= 0) items[idx] = item;
    else items.push({ ...item, id: item.id || Date.now().toString() });
    Storage._persist('fisiobox_calendar', JSON.stringify(items));
  },
  deleteCalendarItem: (id) => {
    const items = Storage.getCalendarItems().filter(i => i.id !== id);
    Storage._persist('fisiobox_calendar', JSON.stringify(items));
  },
  updateCalendarItem: (id, updates) => {
    const items = Storage.getCalendarItems();
    const idx = items.findIndex(i => i.id === id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], ...updates };
      Storage._persist('fisiobox_calendar', JSON.stringify(items));
    }
  },

  // ── ANALYTICS DATA ─────────────────────────────────────────
  getAnalyticsData: () => {
    const saved = localStorage.getItem('fisiobox_analytics');
    return saved ? JSON.parse(saved) : [];
  },
  saveAnalyticsEntry: (entry) => {
    const data = Storage.getAnalyticsData();
    data.unshift({ ...entry, id: Date.now().toString(), savedAt: new Date().toISOString() });
    Storage._persist('fisiobox_analytics', JSON.stringify(data.slice(0, 52))); // keep 52 weeks
  },

  // ── CAMPAIGNS ──────────────────────────────────────────────
  getCampaigns: () => {
    const saved = localStorage.getItem('fisiobox_campaigns');
    return saved ? JSON.parse(saved) : [];
  },
  saveCampaign: (campaign) => {
    const campaigns = Storage.getCampaigns();
    const idx = campaigns.findIndex(c => c.id === campaign.id);
    if (idx >= 0) campaigns[idx] = campaign;
    else campaigns.unshift({ ...campaign, id: campaign.id || Date.now().toString(), createdAt: new Date().toISOString() });
    Storage._persist('fisiobox_campaigns', JSON.stringify(campaigns));
  },

  // ── STATS (dashboard counters) ─────────────────────────────
  getStats: () => {
    const saved = localStorage.getItem('fisiobox_stats');
    const defaults = { generated_this_week: 0, total_generated: 0, week_start: null };
    if (!saved) return defaults;
    const stats = JSON.parse(saved);
    // Reset weekly counter if new week
    const weekStart = getWeekStart();
    if (stats.week_start !== weekStart) {
      stats.generated_this_week = 0;
      stats.week_start = weekStart;
      Storage._persist('fisiobox_stats', JSON.stringify(stats));
    }
    return stats;
  },
  incrementGenerated: () => {
    const stats = Storage.getStats();
    stats.generated_this_week = (stats.generated_this_week || 0) + 1;
    stats.total_generated = (stats.total_generated || 0) + 1;
    stats.week_start = getWeekStart();
    Storage._persist('fisiobox_stats', JSON.stringify(stats));
  },

  // ── WHATSAPP SEQUENCES ─────────────────────────────────────
  getWhatsAppSequences: () => {
    const saved = localStorage.getItem('fisiobox_whatsapp');
    return saved ? JSON.parse(saved) : [];
  },
  saveWhatsAppSequence: (seq) => {
    const seqs = Storage.getWhatsAppSequences();
    seqs.unshift({ ...seq, id: seq.id || Date.now().toString(), createdAt: new Date().toISOString() });
    Storage._persist('fisiobox_whatsapp', JSON.stringify(seqs.slice(0, 50)));
  },

  // ── CHAT HISTORY ───────────────────────────────────────────
  getChatHistory: () => {
    return JSON.parse(localStorage.getItem('fisiobox_chat') || '[]');
  },
  saveChatHistory: (messages) => {
    Storage._persist('fisiobox_chat', JSON.stringify(messages.slice(-20)));
  },
  clearChatHistory: () => {
    localStorage.removeItem('fisiobox_chat');
  },

  // ── BRAND ASSETS ───────────────────────────────────────────
  getAssets: () => JSON.parse(localStorage.getItem('fisiobox_brand_assets') || '[]'),
  saveAsset: (asset) => {
    const assets = Storage.getAssets();
    const idx = assets.findIndex(a => a.id === asset.id);
    if (idx > -1) assets[idx] = asset;
    else assets.push({ ...asset, id: asset.id || Date.now().toString(), createdAt: new Date().toISOString() });
    Storage._persist('fisiobox_brand_assets', JSON.stringify(assets));
  },
  deleteAsset: (id) => {
    const assets = Storage.getAssets().filter(a => a.id !== id);
    Storage._persist('fisiobox_brand_assets', JSON.stringify(assets));
  },

  // ── SOCIAL PROFILES ────────────────────────────────────────
  getSocialProfiles: () => JSON.parse(localStorage.getItem('fisiobox_social_profiles') || '{}'),
  setSocialProfiles: (profiles) => Storage._persist('fisiobox_social_profiles', JSON.stringify(profiles)),

  // ── LEARNINGS / MEMORY ─────────────────────────────────────
  getLearnings: () => JSON.parse(localStorage.getItem('fisiobox_learnings') || '[]'),
  addLearning: (learning) => {
    const all = Storage.getLearnings();
    all.push({ ...learning, id: Date.now().toString(), timestamp: new Date().toISOString() });
    Storage._persist('fisiobox_learnings', JSON.stringify(all.slice(-50)));
  },
  deleteLearning: (id) => {
    const all = Storage.getLearnings().filter(l => l.id !== id);
    Storage._persist('fisiobox_learnings', JSON.stringify(all));
  },
  clearLearnings: () => localStorage.removeItem('fisiobox_learnings'),

  // ── CLEAR ALL ──────────────────────────────────────────────
  clearAll: () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('fisiobox_'));
    keys.forEach(k => localStorage.removeItem(k));
  }
};

function getWeekStart() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d.toISOString().split('T')[0];
}
