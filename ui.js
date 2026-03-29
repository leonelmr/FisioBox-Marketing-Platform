// ============================================================
// FISIOBOX AI MARKETING SUITE — UI Layer
// ============================================================

const UI = {

  // ── NAVIGATION CONFIG ──────────────────────────────────────
  navItems: [
    { id: 'dashboard',    label: 'Dashboard'              },
    { id: 'generator',   label: 'Generador de Contenido' },
    { id: 'calendar',    label: 'Calendario'             },
    { id: 'library',     label: 'Biblioteca'             },
    { id: 'analytics',   label: 'Analítica'              },
    { id: 'intelligence',label: 'Inteligencia'           },
    { id: 'whatsapp',    label: 'WhatsApp'               },
    { id: 'campaigns',   label: 'Campañas'               },
    { id: 'settings',    label: 'Configuración'          },
  ],

  // ── PLATFORM CONFIG ────────────────────────────────────────
  platforms: [
    { id: 'Instagram', label: 'Instagram', faIcon: 'fa-brands fa-instagram', color: 'platform-ig',   desc: 'Posts, Reels, Stories' },
    { id: 'TikTok',    label: 'TikTok',    faIcon: 'fa-brands fa-tiktok',    color: 'platform-tt',   desc: 'Videos cortos virales' },
    { id: 'Facebook',  label: 'Facebook',  faIcon: 'fa-brands fa-facebook',  color: 'platform-fb',   desc: 'Posts, Videos, Eventos' },
    { id: 'Blog',      label: 'Blog/Web',  faIcon: 'fa-solid fa-globe',      color: 'platform-blog', desc: 'Artículos SEO, Google Business' },
    { id: 'WhatsApp',  label: 'WhatsApp',  faIcon: 'fa-brands fa-whatsapp',  color: 'platform-wa',   desc: 'Mensajes y secuencias' },
    { id: 'Ads',       label: 'Ads',       faIcon: 'fa-solid fa-bullhorn',   color: 'platform-ads',  desc: 'Meta Ads, Google Ads' },
  ],

  formats: {
    Instagram: [
      { id: 'carrusel',     label: 'Carrusel Educativo',   desc: '8-10 slides con valor' },
      { id: 'reel_guion',   label: 'Guión de Reel',        desc: 'Video corto 15-60s' },
      { id: 'post_caption', label: 'Caption de Post',      desc: 'Texto + hashtags' },
      { id: 'story_serie',  label: 'Serie de Stories',     desc: '5-7 stories secuenciales' },
    ],
    TikTok: [
      { id: 'guion_tiktok', label: 'Guión TikTok',         desc: 'Hook + desarrollo + CTA' },
      { id: 'tendencia',    label: 'Adaptación tendencia',  desc: 'Trend aplicado a fisio' },
      { id: 'educativo_tt', label: 'Video educativo',       desc: '60s de valor científico' },
    ],
    Facebook: [
      { id: 'post_fb',      label: 'Post Facebook',        desc: 'Post con engagement' },
      { id: 'evento_fb',    label: 'Evento',               desc: 'Evento clínica o taller' },
      { id: 'articulo_fb',  label: 'Artículo nativo',      desc: 'Artículo largo en FB' },
      { id: 'video_fb',     label: 'Guión video FB',       desc: 'Video informativo' },
    ],
    Blog: [
      { id: 'articulo_blog', label: 'Artículo de Blog',    desc: 'SEO optimizado 1500+ palabras' },
      { id: 'google_biz',    label: 'Post Google Business', desc: 'Visibilidad local Escazú' },
      { id: 'qa_google',     label: 'Q&A Google',          desc: 'Pregunta y respuesta SEO' },
    ],
    WhatsApp: [
      { id: 'secuencia_post_cita',   label: 'Secuencia post-cita',   desc: '5 mensajes seguimiento' },
      { id: 'secuencia_rtp',         label: 'Secuencia RTP',         desc: 'Retorno al deporte' },
      { id: 'secuencia_prevencion',  label: 'Prevención de lesiones', desc: 'Educación preventiva' },
      { id: 'secuencia_reactivacion',label: 'Reactivación paciente',  desc: 'Recuperar pacientes inactivos' },
    ],
    Ads: [
      { id: 'meta_ads_trafico',  label: 'Meta Ads - Tráfico',    desc: 'Llevar a web/perfil' },
      { id: 'meta_ads_leads',    label: 'Meta Ads - Leads',      desc: 'Captación de citas' },
      { id: 'google_ads_search', label: 'Google Ads Search',     desc: 'Búsqueda local Escazú' },
      { id: 'meta_retargeting',  label: 'Meta Retargeting',      desc: 'Reconversión visitas web' },
    ],
  },

  // ── SHELL ──────────────────────────────────────────────────
  shell() {
    const v = App.currentView;
    const viewContent = this.renderView(v);
    const sidebarOpen = App.sidebarOpen ? 'open' : '';

    const isDark = document.documentElement?.getAttribute('data-theme') !== 'light';
    return `
<div class="flex min-h-screen">
  <!-- Sidebar -->
  <aside id="sidebar" class="sidebar-glass w-64 flex-shrink-0 flex flex-col ${sidebarOpen}"
    style="min-height:100vh;position:fixed;top:0;left:0;height:100%;z-index:50;">
    <div class="px-5 py-4" style="border-bottom:1px solid var(--glass-border);">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style="background:linear-gradient(135deg,var(--accent),var(--accent-orange));">
          <i class="fa-solid fa-bone" style="color:#fff;font-size:13px;"></i>
        </div>
        <div>
          <div class="sidebar-logo font-bold" style="font-size:15px;">FisioBox</div>
          <div style="color:var(--text-tertiary);font-size:10px;letter-spacing:0.04em;text-transform:uppercase;">AI Marketing Suite</div>
        </div>
      </div>
    </div>
    <nav class="flex-1 py-2 overflow-y-auto">
      ${this.navItems.map(item => `
        <button onclick="navigate('${item.id}')"
          class="nav-item w-full px-4 py-2.5 text-left ${v === item.id ? 'active' : ''}"
          style="font-size:13px;color:${v === item.id ? 'var(--text-primary)' : 'var(--text-secondary)'};font-weight:${v === item.id ? '500' : '400'};letter-spacing:-0.01em;">
          ${item.label}
        </button>
      `).join('')}
    </nav>
    <div class="px-4 py-3" style="border-top:1px solid var(--glass-border);">
      <div style="font-size:10px;text-align:center;color:var(--text-tertiary);letter-spacing:0.04em;text-transform:uppercase;">FisioBox © 2025 · Escazú, CR</div>
    </div>
  </aside>

  <!-- Main content -->
  <div id="main-content" class="flex-1 flex flex-col min-h-screen" style="margin-left:256px;">
    <!-- Top bar -->
    <header class="header-glass flex items-center justify-between px-6 py-3 sticky top-0 z-30">
      <div class="flex items-center gap-4">
        <button id="sidebar-toggle" class="btn-ghost p-2 md:hidden">
          <i class="fa-solid fa-bars" style="font-size:13px;"></i>
        </button>
        <h1 style="font-size:16px;font-weight:600;color:var(--text-primary);letter-spacing:-0.02em;">
          ${this.navItems.find(n => n.id === v)?.label || ''}
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="toggleTheme()" id="theme-toggle" class="btn-ghost px-3 py-2"
          title="Cambiar tema" style="font-size:12px;">
          <i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
        </button>
        <button onclick="navigate('generator')" class="btn-orange px-4 py-2 font-semibold">
          Generar
        </button>
      </div>
    </header>

    <!-- Page content -->
    <main class="flex-1 p-6 fade-in" style="position:relative;z-index:1;">
      ${viewContent}
    </main>
  </div>
</div>
    `;
  },

  // ── BIND SHELL ─────────────────────────────────────────────
  bindShell() {
    const toggle = document.getElementById('sidebar-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        App.sidebarOpen = !App.sidebarOpen;
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.toggle('open', App.sidebarOpen);
      });
    }
    this.bindView(App.currentView);
  },

  // ── RENDER VIEW DISPATCHER ─────────────────────────────────
  renderView(view) {
    switch (view) {
      case 'dashboard':    return this.renderDashboard();
      case 'generator':    return this.renderGenerator();
      case 'calendar':     return this.renderCalendar();
      case 'library':      return this.renderLibrary();
      case 'analytics':    return this.renderAnalytics();
      case 'intelligence': return this.renderIntelligence();
      case 'whatsapp':     return this.renderWhatsApp();
      case 'campaigns':    return this.renderCampaigns();
      case 'settings':     return this.renderSettings();
      default:             return this.renderDashboard();
    }
  },

  // ── BIND VIEW DISPATCHER ───────────────────────────────────
  bindView(view) {
    switch (view) {
      case 'dashboard':    this.bindDashboard();    break;
      case 'generator':    this.bindGenerator();    break;
      case 'calendar':     this.bindCalendar();     break;
      case 'library':      this.bindLibrary();      break;
      case 'analytics':    this.bindAnalytics();    break;
      case 'intelligence': this.bindIntelligence(); break;
      case 'whatsapp':     this.bindWhatsApp();     break;
      case 'campaigns':    this.bindCampaigns();    break;
      case 'settings':     this.bindSettings();     break;
    }
  },


  // ══════════════════════════════════════════════════════════
  // DASHBOARD VIEW
  // ══════════════════════════════════════════════════════════
  renderDashboard() {
    const stats = Storage.getStats();
    const drafts = Storage.getDrafts();
    const calItems = Storage.getCalendarItems();
    const today = new Date();
    const weekEnd = new Date(today); weekEnd.setDate(today.getDate() + 7);
    const upcoming = calItems.filter(i => {
      const d = new Date(i.date);
      return d >= today && d <= weekEnd;
    }).slice(0, 5);

    const recentDrafts = drafts.slice(0, 5);
    const pendingReview = drafts.filter(d => d.status === 'review').length;
    const approved = drafts.filter(d => d.status === 'approved').length;

    const statCards = [
      { label: 'Esta semana',     value: stats.generated_this_week || 0, sub: 'piezas generadas' },
      { label: 'Total generado',  value: stats.total_generated || 0,     sub: 'desde el inicio' },
      { label: 'Borradores',      value: drafts.length,                  sub: 'en biblioteca' },
      { label: 'En revisión',     value: pendingReview,                  sub: 'pendiente de revisión' },
      { label: 'Aprobados',       value: approved,                       sub: 'listos para publicar' },
      { label: 'En calendario',   value: calItems.length,                sub: 'piezas programadas' },
    ];

    return `
<div class="space-y-6">
  <!-- Welcome banner -->
  <div class="card p-6" style="background:linear-gradient(135deg,rgba(10,132,255,0.10),var(--glass-bg));">
    <div class="flex items-start justify-between flex-wrap gap-4">
      <div>
        <h2 class="text-2xl font-bold mb-1">Bienvenido a FisioBox AI</h2>
        <p style="color:var(--text-secondary);">Suite de marketing inteligente para fisioterapia deportiva · Escazú, Costa Rica</p>
        <p class="text-sm mt-1" style="color:var(--text-tertiary);">${today.toLocaleDateString('es-CR', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
      </div>
      <button onclick="navigate('generator')" class="btn-orange px-6 py-3 font-semibold text-base">Crear contenido</button>
    </div>
  </div>

  <!-- Stats grid -->
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    ${statCards.map(s => `
      <div class="card p-4 text-center">
        <div class="text-3xl font-bold mb-1" style="color:var(--accent);">${s.value}</div>
        <div class="text-xs font-semibold mb-1" style="color:var(--text-primary);">${s.label}</div>
        <div class="text-xs" style="color:var(--text-tertiary);">${s.sub}</div>
      </div>
    `).join('')}
  </div>

  <!-- Quick actions -->
  <div class="card p-5">
    <h3 class="font-semibold mb-4">Acciones rápidas</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button onclick="App.generatorData={};App.generatorStep=1;navigate('generator')" class="btn-primary px-4 py-3 text-sm font-medium">Generar post</button>
      <button onclick="navigate('intelligence')" class="btn-ghost px-4 py-3 text-sm font-medium">Análisis de tendencias</button>
      <button onclick="navigate('whatsapp')" class="btn-ghost px-4 py-3 text-sm font-medium">Nueva secuencia WA</button>
      <button onclick="navigate('campaigns')" class="btn-ghost px-4 py-3 text-sm font-medium">Crear campaña</button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Recent drafts -->
    <div class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Borradores recientes</h3>
        <button onclick="navigate('library')" class="text-xs btn-ghost px-3 py-1">Ver todos</button>
      </div>
      ${recentDrafts.length === 0 ? `
        <div class="text-center py-8" style="color:var(--text-tertiary);">
          <i class="fa-regular fa-file-lines fa-2x mb-3" style="display:block;"></i>
          <p class="text-sm">No hay borradores aún.</p>
          <button onclick="navigate('generator')" class="btn-primary px-4 py-2 text-sm mt-3">Crear primero</button>
        </div>
      ` : recentDrafts.map(d => `
        <div class="flex items-center gap-3 py-3 border-b" style="border-color:var(--glass-border);">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              ${platformBadge(d.platform || 'Blog')}
              <span class="pill status-${d.status || 'draft'} text-xs">${this.statusLabel(d.status)}</span>
            </div>
            <p class="text-sm font-medium truncate">${d.title || d.topic || 'Sin título'}</p>
            <p class="text-xs" style="color:var(--text-tertiary);">${this.timeAgo(d.createdAt)}</p>
          </div>
          <button onclick="UI.openDraftModal('${d.id}')" class="btn-ghost px-3 py-1 text-xs flex-shrink-0">Ver</button>
        </div>
      `).join('')}
    </div>

    <!-- Upcoming calendar -->
    <div class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Próximos 7 días</h3>
        <button onclick="navigate('calendar')" class="text-xs btn-ghost px-3 py-1">Ver calendario</button>
      </div>
      ${upcoming.length === 0 ? `
        <div class="text-center py-8" style="color:var(--text-tertiary);">
          <i class="fa-regular fa-calendar fa-2x mb-3" style="display:block;"></i>
          <p class="text-sm">No hay publicaciones programadas esta semana.</p>
          <button onclick="navigate('calendar')" class="btn-primary px-4 py-2 text-sm mt-3">Planificar</button>
        </div>
      ` : upcoming.map(item => `
        <div class="flex items-center gap-3 py-3 border-b" style="border-color:var(--glass-border);">
          <div class="text-center flex-shrink-0 w-10">
            <div class="text-xs font-bold" style="color:var(--accent);">${new Date(item.date + 'T12:00:00').toLocaleDateString('es-CR', {day:'numeric'})}</div>
            <div class="text-xs" style="color:var(--text-tertiary);">${new Date(item.date + 'T12:00:00').toLocaleDateString('es-CR', {month:'short'})}</div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">${item.title || item.topic || 'Sin título'}</p>
            <div class="flex items-center gap-2 mt-1">
              ${platformBadge(item.platform || 'Instagram')}
              <span class="text-xs" style="color:var(--text-tertiary);">${item.format || ''}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Pillar distribution -->
  <div class="card p-5">
    <h3 class="font-semibold mb-4">Distribución de pilares de contenido</h3>
    ${this.renderPillarBars()}
  </div>
</div>
    `;
  },

  renderPillarBars() {
    const bs = Storage.getBrandSettings();
    const pillars = bs.pillars;
    const items = [
      { key: 'educativo',     label: 'Educativo',      color: 'var(--accent)', target: 40 },
      { key: 'promocional',   label: 'Promocional',    color: 'var(--accent)', target: 30 },
      { key: 'prueba_social', label: 'Prueba Social',  color: 'var(--accent)', target: 20 },
      { key: 'cultura',       label: 'Cultura',        color: 'var(--accent)', target: 5 },
      { key: 'comunidad',     label: 'Comunidad',      color: 'var(--accent)', target: 5 },
    ];
    return `<div class="space-y-3">
      ${items.map(item => {
        const val = pillars[item.key] || 0;
        return `
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm">${item.label}</span>
              <div class="flex items-center gap-3">
                <span class="text-xs" style="color:var(--text-tertiary);">Meta: ${item.target}%</span>
                <span class="text-sm font-semibold" style="color:${item.color};">${val}%</span>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${val}%;background:${item.color};"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>`;
  },

  bindDashboard() {},

  // ── UTILITY HELPERS ────────────────────────────────────────
  statusLabel(status) {
    const labels = { draft: 'Borrador', review: 'En revisión', approved: 'Aprobado', published: 'Publicado' };
    return labels[status] || 'Borrador';
  },

  timeAgo(isoString) {
    if (!isoString) return '';
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 2) return 'ahora mismo';
    if (mins < 60) return `hace ${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `hace ${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `hace ${days}d`;
    const months = Math.floor(days / 30);
    return `hace ${months} mes${months > 1 ? 'es' : ''}`;
  },

  escAttr(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },


  // ══════════════════════════════════════════════════════════
  // GENERATOR VIEW (multi-step)
  // ══════════════════════════════════════════════════════════
  renderGenerator() {
    const step = App.generatorStep || 1;
    const steps = ['Plataforma', 'Formato', 'Detalles', 'Resultado'];
    const progressPct = ((step - 1) / (steps.length - 1)) * 100;

    return `
<div class="max-w-4xl mx-auto space-y-6">
  <!-- Step indicator -->
  <div class="card p-5">
    <div class="flex items-center justify-between mb-3">
      ${steps.map((s, i) => `
        <div class="flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style="background:${i + 1 <= step ? 'linear-gradient(135deg,var(--accent),var(--accent-orange))' : 'var(--glass-border)'};color:${i + 1 <= step ? 'white' : 'var(--text-tertiary)'};">
              ${i + 1 < step ? '✓' : i + 1}
            </div>
            <span class="text-sm hidden md:block" style="color:${i + 1 === step ? 'var(--text-primary)' : i + 1 < step ? 'var(--accent)' : 'var(--text-tertiary)'};">${s}</span>
          </div>
          ${i < steps.length - 1 ? `<div class="flex-1 mx-3 h-px" style="background:${i + 1 < step ? '#0ea5e9' : '#1e3a52'};"></div>` : ''}
        </div>
      `).join('')}
    </div>
    <div class="progress-bar mt-2">
      <div class="progress-fill" style="width:${progressPct}%;background:linear-gradient(90deg,var(--accent),var(--accent-orange));"></div>
    </div>
  </div>

  <!-- Step content -->
  <div id="generator-step-content">
    ${this.renderGeneratorStep(step)}
  </div>
</div>
    `;
  },

  renderGeneratorStep(step) {
    switch (step) {
      case 1: return this.renderGenStep1();
      case 2: return this.renderGenStep2();
      case 3: return this.renderGenStep3();
      case 4: return this.renderGenStep4();
      default: return this.renderGenStep1();
    }
  },

  renderGenStep1() {
    const selected = App.generatorData.platform;
    return `
<div class="card p-6">
  <h2 class="text-xl font-bold mb-2">Elige la plataforma</h2>
  <p class="text-sm mb-6" style="color:var(--text-secondary);">Selecciona dónde se publicará este contenido</p>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4" id="platform-grid">
    ${this.platforms.map(p => `
      <button data-platform="${p.id}"
        class="platform-card card p-5 text-left transition-all hover:scale-105 ${selected === p.id ? 'card-selected' : ''}"
        style="${selected === p.id ? 'border-color:var(--accent-orange);box-shadow:0 0 0 2px var(--accent-orange-glow);' : ''}">
        <div class="mb-3"><i class="${p.faIcon}" style="font-size:1.5rem;color:var(--accent);"></i></div>
        <div class="font-semibold mb-1">${p.label}</div>
        <div class="text-xs" style="color:var(--text-secondary);">${p.desc}</div>
      </button>
    `).join('')}
  </div>
  <div class="flex justify-end mt-6">
    <button id="step1-next" class="btn-primary px-8 py-3 font-semibold" ${!selected ? 'disabled' : ''}>
      Siguiente →
    </button>
  </div>
</div>
    `;
  },

  renderGenStep2() {
    const platform = App.generatorData.platform;
    const formats = this.formats[platform] || [];
    const selected = App.generatorData.format;
    return `
<div class="card p-6">
  <div class="flex items-center gap-3 mb-2">
    <h2 class="text-xl font-bold">Elige el formato</h2>
  </div>
  <p class="text-sm mb-6" style="color:var(--text-secondary);">Selecciona el tipo de contenido para ${platform}</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="format-grid">
    ${formats.map(f => `
      <button data-format="${f.id}"
        class="format-card card p-5 text-left transition-all hover:scale-105 ${selected === f.id ? 'card-selected' : ''}"
        style="${selected === f.id ? 'border-color:var(--accent-orange);box-shadow:0 0 0 2px var(--accent-orange-glow);' : ''}">
        <div class="font-semibold mb-1">${f.label}</div>
        <div class="text-xs" style="color:var(--text-secondary);">${f.desc}</div>
      </button>
    `).join('')}
  </div>
  <div class="flex justify-between mt-6">
    <button id="step2-back" class="btn-ghost px-6 py-3">← Atrás</button>
    <button id="step2-next" class="btn-primary px-8 py-3 font-semibold" ${!selected ? 'disabled' : ''}>
      Siguiente →
    </button>
  </div>
</div>
    `;
  },

  renderGenStep3() {
    const { platform, format } = App.generatorData;
    const extraFields = this.getExtraFields(platform, format);
    return `
<div class="card p-6">
  <div class="flex items-center gap-3 mb-2">
    <button id="step3-back" class="btn-ghost px-3 py-2 text-sm">← Atrás</button>
    <h2 class="text-xl font-bold">Detalles del contenido</h2>
  </div>
  <p class="text-sm mb-6" style="color:var(--text-secondary);">Proporciona la información para generar el contenido</p>
  <div class="space-y-5">
    <div>
      <label class="label">Tema principal *</label>
      <input id="gen-topic" class="input" type="text"
        placeholder="Ej: Prevención de lesiones de rodilla en runners"
        value="${App.generatorData.topic || ''}" />
    </div>
    <div>
      <label class="label">Brief adicional (opcional)</label>
      <textarea id="gen-brief" class="textarea" rows="3"
        placeholder="Contexto adicional, tono especial, datos concretos, casos de éxito...">${App.generatorData.brief || ''}</textarea>
    </div>
    ${extraFields}
    <div>
      <label class="label">Categoría / Pilar</label>
      <select id="gen-category" class="select">
        <option value="educativo" ${App.generatorData.category === 'educativo' ? 'selected' : ''}>Educativo</option>
        <option value="promocional" ${App.generatorData.category === 'promocional' ? 'selected' : ''}>Promocional</option>
        <option value="prueba_social" ${App.generatorData.category === 'prueba_social' ? 'selected' : ''}>Prueba Social</option>
        <option value="cultura" ${App.generatorData.category === 'cultura' ? 'selected' : ''}>Cultura de Clínica</option>
        <option value="comunidad" ${App.generatorData.category === 'comunidad' ? 'selected' : ''}>Comunidad</option>
      </select>
    </div>
  </div>
  <div class="flex justify-between mt-6">
    <button id="step3-back" class="btn-ghost px-6 py-3">← Atrás</button>
    <button id="step3-generate" class="btn-orange px-8 py-3 font-semibold text-base">
      Generar contenido
    </button>
  </div>
</div>
    `;
  },

  getExtraFields(platform, format) {
    let html = '';
    if (platform === 'Ads') {
      html += `
        <div>
          <label class="label">Objetivo del anuncio</label>
          <select id="gen-goal" class="select">
            <option value="Captación de nuevos pacientes">Captación de nuevos pacientes</option>
            <option value="Retención y reactivación">Retención y reactivación</option>
            <option value="Visibilidad de marca">Visibilidad de marca</option>
            <option value="Promoción servicio específico">Promoción servicio específico</option>
          </select>
        </div>
        <div>
          <label class="label">Audiencia objetivo</label>
          <input id="gen-audience" class="input" type="text"
            placeholder="Ej: Deportistas 25-45 años, Escazú y alrededores"
            value="${App.generatorData.audience || ''}" />
        </div>`;
    }
    if (platform === 'WhatsApp') {
      html += `
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Lesión / Condición</label>
            <input id="gen-injury" class="input" type="text"
              placeholder="Ej: Ligamento cruzado anterior"
              value="${App.generatorData.injury || ''}" />
          </div>
          <div>
            <label class="label">Deporte</label>
            <input id="gen-sport" class="input" type="text"
              placeholder="Ej: Fútbol, Running, CrossFit"
              value="${App.generatorData.sport || ''}" />
          </div>
        </div>`;
    }
    if (format && (format.includes('rtp') || platform === 'Instagram' && format === 'carrusel')) {
      html += `
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Deporte (si aplica)</label>
            <input id="gen-sport" class="input" type="text"
              placeholder="Ej: Fútbol, Crossfit, Tennis"
              value="${App.generatorData.sport || ''}" />
          </div>
          <div>
            <label class="label">Lesión específica (si aplica)</label>
            <input id="gen-injury" class="input" type="text"
              placeholder="Ej: Esguince tobillo grado II"
              value="${App.generatorData.injury || ''}" />
          </div>
        </div>`;
    }
    if (platform === 'Blog') {
      html += `
        <div>
          <label class="label">Keywords objetivo (separadas por coma)</label>
          <input id="gen-keywords" class="input" type="text"
            placeholder="Ej: fisioterapia escazu, rehabilitacion deportiva costa rica"
            value="${App.generatorData.keywords || ''}" />
        </div>`;
    }
    return html;
  },

  renderGenStep4() {
    const { platform, format, topic } = App.generatorData;
    const formatLabel = this.formats[platform]?.find(f => f.id === format)?.label || format;
    return `
<div class="card p-6">
  <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
    <div>
      <h2 class="text-xl font-bold">Contenido generado</h2>
      <div class="flex items-center gap-2 mt-1">
        ${platformBadge(platform)}
        <span class="pill status-draft text-xs">${formatLabel}</span>
        <span class="text-xs" style="color:var(--text-secondary);">${topic || ''}</span>
      </div>
    </div>
    <button id="step4-back" class="btn-ghost px-4 py-2 text-sm">← Nueva generación</button>
  </div>

  <!-- Output area -->
  <div id="content-output" class="content-output mb-4" style="min-height:200px;">
    <div class="flex items-center gap-3" style="color:var(--text-tertiary);">
      <span class="loading-dots">Generando contenido</span>
    </div>
  </div>

  <!-- Review scores (hidden initially) -->
  <div id="review-scores" class="hidden mb-4">
    <h3 class="font-semibold mb-3">Revisión de calidad</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4" id="scores-grid"></div>
  </div>

  <!-- Action buttons (hidden initially) -->
  <div id="action-buttons" class="hidden flex flex-wrap gap-3">
    <button id="btn-copy" class="btn-primary px-5 py-2 text-sm font-medium"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
    <button id="btn-download" class="btn-ghost px-5 py-2 text-sm font-medium"><i class="fa-solid fa-download mr-1"></i>Descargar</button>
    <button id="btn-save-draft" class="btn-ghost px-5 py-2 text-sm font-medium"><i class="fa-regular fa-floppy-disk mr-1"></i>Guardar borrador</button>
    <button id="btn-run-review" class="btn-orange px-5 py-2 text-sm font-medium"><i class="fa-solid fa-magnifying-glass mr-1"></i>Revisión de calidad</button>
    <button id="btn-add-calendar" class="btn-ghost px-5 py-2 text-sm font-medium"><i class="fa-regular fa-calendar-plus mr-1"></i>Agregar al calendario</button>
  </div>
</div>
    `;
  },


  bindGenerator() {
    const step = App.generatorStep || 1;
    if (step === 1) this.bindGenStep1();
    else if (step === 2) this.bindGenStep2();
    else if (step === 3) this.bindGenStep3();
    else if (step === 4) this.bindGenStep4();
  },

  bindGenStep1() {
    document.querySelectorAll('.platform-card').forEach(btn => {
      btn.addEventListener('click', () => {
        App.generatorData.platform = btn.dataset.platform;
        App.generatorData.format = null;
        document.querySelectorAll('.platform-card').forEach(b => {
          b.style.borderColor = '';
          b.classList.remove('card-selected');
        });
        btn.style.borderColor = '#f97316';
        btn.classList.add('card-selected');
        document.getElementById('step1-next').disabled = false;
      });
    });
    const nextBtn = document.getElementById('step1-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (App.generatorData.platform) {
          App.generatorStep = 2;
          document.getElementById('generator-step-content').innerHTML = this.renderGenStep2();
          this.bindGenStep2();
          this.updateStepProgress(2);
        }
      });
    }
  },

  bindGenStep2() {
    document.querySelectorAll('.format-card').forEach(btn => {
      btn.addEventListener('click', () => {
        App.generatorData.format = btn.dataset.format;
        document.querySelectorAll('.format-card').forEach(b => {
          b.style.borderColor = '';
          b.classList.remove('card-selected');
        });
        btn.style.borderColor = '#f97316';
        btn.classList.add('card-selected');
        document.getElementById('step2-next').disabled = false;
      });
    });
    document.querySelectorAll('#step2-back').forEach(btn => {
      btn.addEventListener('click', () => {
        App.generatorStep = 1;
        document.getElementById('generator-step-content').innerHTML = this.renderGenStep1();
        this.bindGenStep1();
        this.updateStepProgress(1);
      });
    });
    const nextBtn = document.getElementById('step2-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (App.generatorData.format) {
          App.generatorStep = 3;
          document.getElementById('generator-step-content').innerHTML = this.renderGenStep3();
          this.bindGenStep3();
          this.updateStepProgress(3);
        }
      });
    }
  },

  bindGenStep3() {
    document.querySelectorAll('#step3-back').forEach(btn => {
      btn.addEventListener('click', () => {
        App.generatorStep = 2;
        document.getElementById('generator-step-content').innerHTML = this.renderGenStep2();
        this.bindGenStep2();
        this.updateStepProgress(2);
      });
    });
    const genBtn = document.getElementById('step3-generate');
    if (genBtn) {
      genBtn.addEventListener('click', async () => {
        const topic = document.getElementById('gen-topic')?.value?.trim();
        if (!topic) { showToast('Por favor ingresa un tema', 'warning'); return; }
        App.generatorData.topic = topic;
        App.generatorData.brief = document.getElementById('gen-brief')?.value?.trim() || '';
        App.generatorData.category = document.getElementById('gen-category')?.value || 'educativo';
        App.generatorData.keywords = document.getElementById('gen-keywords')?.value?.trim() || '';
        App.generatorData.audience = document.getElementById('gen-audience')?.value?.trim() || '';
        App.generatorData.injury = document.getElementById('gen-injury')?.value?.trim() || '';
        App.generatorData.sport = document.getElementById('gen-sport')?.value?.trim() || '';
        App.generatorData.goal = document.getElementById('gen-goal')?.value || '';
        App.generatorStep = 4;
        document.getElementById('generator-step-content').innerHTML = this.renderGenStep4();
        this.updateStepProgress(4);
        this.bindGenStep4();
        await this.runGeneration();
      });
    }
  },

  bindGenStep4() {
    const backBtn = document.getElementById('step4-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        App.generatorStep = 1;
        App.generatorData = {};
        document.getElementById('generator-step-content').innerHTML = this.renderGenStep1();
        this.bindGenStep1();
        this.updateStepProgress(1);
      });
    }
  },

  updateStepProgress(step) {
    // Update the progress bar fill
    const pct = ((step - 1) / 3) * 100;
    const fill = document.querySelector('.max-w-4xl .progress-fill');
    if (fill) fill.style.width = pct + '%';
    // Update step circles (w-8 h-8 rounded-full inside the step indicator card)
    const circles = document.querySelectorAll('.max-w-4xl .card:first-child [class*="w-8"]');
    circles.forEach((circle, i) => {
      const stepNum = i + 1;
      if (stepNum < step) {
        circle.style.background = 'linear-gradient(135deg,var(--accent),var(--accent-orange))';
        circle.style.color = 'white';
        circle.textContent = '✓';
      } else if (stepNum === step) {
        circle.style.background = 'linear-gradient(135deg,var(--accent),var(--accent-orange))';
        circle.style.color = 'white';
        circle.textContent = String(stepNum);
      } else {
        circle.style.background = '#1e3a52';
        circle.style.color = '#475569';
        circle.textContent = String(stepNum);
      }
    });
  },

  async runGeneration() {
    const { platform, format, topic, brief, category, keywords, audience, injury, sport, goal } = App.generatorData;
    const outputEl = document.getElementById('content-output');
    if (!outputEl) return;

    try {
      let generatedText = '';
      const onChunk = (chunk, full) => {
        generatedText = full;
        outputEl.textContent = full;
        outputEl.scrollTop = outputEl.scrollHeight;
      };

      let result;
      if (platform === 'Ads') {
        result = await Agents.ads({ goal: goal || 'Captación de nuevos pacientes', platform: format, audience, brief: `${topic}. ${brief}` }, onChunk);
      } else if (platform === 'WhatsApp') {
        result = await Agents.patientNurture({ sequenceType: format, injury, sport, patientContext: `${topic}. ${brief}` }, onChunk);
      } else if (platform === 'Blog') {
        const type = format === 'articulo_blog' ? 'blog' : format === 'google_biz' ? 'google_business' : 'qa';
        result = await Agents.blogContent({ topic, type, keywords }, onChunk);
      } else {
        result = await Agents.socialMedia({ platform, format, topic, category, brief }, onChunk);
      }

      generatedText = typeof result === 'string' ? result : result?.raw || '';
      outputEl.textContent = generatedText;
      App.generatorData.generatedContent = generatedText;

      Storage.incrementGenerated();

      const actionBtns = document.getElementById('action-buttons');
      if (actionBtns) {
        actionBtns.classList.remove('hidden');
        actionBtns.classList.add('flex');
        this.bindGenActionButtons(generatedText, platform, topic);
      }
    } catch (err) {
      outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
      showToast(err.message, 'error');
    }
  },

  bindGenActionButtons(content, platform, topic) {
    const copyBtn = document.getElementById('btn-copy');
    if (copyBtn) copyBtn.addEventListener('click', () => copyToClipboard(content, 'Contenido'));

    const dlBtn = document.getElementById('btn-download');
    if (dlBtn) dlBtn.addEventListener('click', () => downloadTxt(content, `fisiobox-${platform}-${Date.now()}`));

    const saveBtn = document.getElementById('btn-save-draft');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const draft = {
          id: Date.now().toString(),
          platform,
          format: App.generatorData.format,
          topic,
          title: topic,
          content,
          status: 'draft',
          createdAt: new Date().toISOString(),
        };
        Storage.saveDraft(draft);
        showToast('Borrador guardado en la biblioteca', 'success');
        saveBtn.innerHTML = '<i class="fa-solid fa-check mr-1"></i>Guardado';
        saveBtn.disabled = true;
      });
    }

    const reviewBtn = document.getElementById('btn-run-review');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', async () => {
        reviewBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Revisando...';
        reviewBtn.disabled = true;
        try {
          const results = await Agents.runReviewPipeline(content, platform);
          this.renderReviewScores(results);
          reviewBtn.innerHTML = '<i class="fa-solid fa-check mr-1"></i>Revisión completa';
        } catch (err) {
          showToast('Error en revisión: ' + err.message, 'error');
          reviewBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass mr-1"></i>Revisión de calidad';
          reviewBtn.disabled = false;
        }
      });
    }

    const calBtn = document.getElementById('btn-add-calendar');
    if (calBtn) {
      calBtn.addEventListener('click', () => {
        this.openAddToCalendarModal(content, platform, topic);
      });
    }
  },

  renderReviewScores(results) {
    const scoresContainer = document.getElementById('review-scores');
    const grid = document.getElementById('scores-grid');
    if (!scoresContainer || !grid) return;

    const brandParsed = results.brand?.parsed;
    const medicalParsed = results.medical?.parsed;
    const engagementParsed = results.engagement?.parsed;

    const brandScore = brandParsed?.overall_score ?? brandParsed?.score ?? null;
    const medicalScore = medicalParsed?.safety_score ?? medicalParsed?.score ?? null;
    const engScore = engagementParsed?.predicted_score ?? engagementParsed?.score ?? null;

    grid.innerHTML = `
      <div class="card p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-sm">Voz de Marca</span>
          ${scoreBadge(brandScore)}
        </div>
        <p class="text-xs" style="color:var(--text-secondary);">${brandParsed?.summary || brandParsed?.justification || 'Análisis completado'}</p>
        ${brandParsed?.improvements?.length ? `<ul class="mt-2 space-y-1">${brandParsed.improvements.slice(0,2).map(i => `<li class="text-xs" style="color:var(--warning);">• ${i}</li>`).join('')}</ul>` : ''}
      </div>
      <div class="card p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-sm">Seguridad Médica</span>
          ${scoreBadge(medicalScore)}
        </div>
        <p class="text-xs" style="color:var(--text-secondary);">${medicalParsed?.summary || medicalParsed?.verdict || 'Revisión completada'}</p>
        ${medicalParsed?.flags?.length ? `<ul class="mt-2 space-y-1">${medicalParsed.flags.slice(0,2).map(f => `<li class="text-xs" style="color:var(--error);">${f}</li>`).join('')}</ul>` : ''}
      </div>
      <div class="card p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-sm">Engagement Predicho</span>
          ${scoreBadge(engScore)}
        </div>
        <p class="text-xs" style="color:var(--text-secondary);">${engagementParsed?.summary || engagementParsed?.rationale || 'Predicción completada'}</p>
        ${engagementParsed?.suggestions?.length ? `<ul class="mt-2 space-y-1">${engagementParsed.suggestions.slice(0,2).map(s => `<li class="text-xs" style="color:var(--accent);">${s}</li>`).join('')}</ul>` : ''}
      </div>
    `;

    scoresContainer.classList.remove('hidden');
  },

  openAddToCalendarModal(content, platform, topic) {
    const today = new Date().toISOString().split('T')[0];
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'add-cal-modal';
    modal.innerHTML = `
      <div class="modal p-6 max-w-md w-full">
        <h3 class="font-bold text-lg mb-4">Agregar al calendario</h3>
        <div class="space-y-4">
          <div>
            <label class="label">Título</label>
            <input id="cal-title" class="input" value="${topic || ''}" />
          </div>
          <div>
            <label class="label">Fecha de publicación</label>
            <input id="cal-date" class="input" type="date" value="${today}" />
          </div>
          <div>
            <label class="label">Estado</label>
            <select id="cal-status" class="select">
              <option value="draft">Borrador</option>
              <option value="review">En revisión</option>
              <option value="approved">Aprobado</option>
            </select>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button id="cal-cancel" class="btn-ghost flex-1 py-2">Cancelar</button>
          <button id="cal-save" class="btn-primary flex-1 py-2">Guardar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('cal-cancel').addEventListener('click', () => modal.remove());
    document.getElementById('cal-save').addEventListener('click', () => {
      const item = {
        id: Date.now().toString(),
        title: document.getElementById('cal-title').value,
        date: document.getElementById('cal-date').value,
        platform,
        format: App.generatorData.format,
        content,
        status: document.getElementById('cal-status').value,
      };
      Storage.saveCalendarItem(item);
      modal.remove();
      showToast('Agregado al calendario', 'success');
    });
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  },


  // ══════════════════════════════════════════════════════════
  // CALENDAR VIEW
  // ══════════════════════════════════════════════════════════
  renderCalendar() {
    const month = App.calendarMonth || new Date();
    const year = month.getFullYear();
    const monthIdx = month.getMonth();
    const monthName = month.toLocaleDateString('es-CR', { month: 'long', year: 'numeric' });
    const items = Storage.getCalendarItems();

    const firstDay = new Date(year, monthIdx, 1);
    const lastDay = new Date(year, monthIdx + 1, 0);
    const startDow = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days = [];
    for (let i = 0; i < startDow; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) days.push(d);

    const getItemsForDay = (d) => {
      if (!d) return [];
      const dateStr = `${year}-${String(monthIdx + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      return items.filter(i => i.date === dateStr);
    };

    const platformColors = {
      Instagram: 'linear-gradient(135deg,#f09433,#dc2743)',
      TikTok: '#ff0050',
      Facebook: '#1877f2',
      Blog: '#0ea5e9',
      WhatsApp: '#25d366',
      Ads: '#fbbc04',
    };

    const todayStr = new Date().toISOString().split('T')[0];

    return `
<div class="space-y-4">
  <!-- Controls -->
  <div class="flex items-center justify-between flex-wrap gap-3">
    <div class="flex items-center gap-3">
      <button id="cal-prev" class="btn-ghost px-4 py-2">← Anterior</button>
      <h2 class="text-lg font-bold capitalize">${monthName}</h2>
      <button id="cal-next" class="btn-ghost px-4 py-2">Siguiente →</button>
    </div>
    <div class="flex gap-3">
      <button id="cal-generate-plan" class="btn-ghost px-4 py-2 text-sm"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Generar plan IA</button>
      <button id="cal-add-item" class="btn-primary px-4 py-2 text-sm">+ Agregar</button>
    </div>
  </div>

  <!-- Day headers -->
  <div class="card overflow-hidden">
    <div class="grid grid-cols-7 border-b" style="border-color:var(--glass-border);">
      ${['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d => `
        <div class="p-2 text-center text-xs font-semibold" style="color:var(--text-secondary);">${d}</div>
      `).join('')}
    </div>
    <div class="grid grid-cols-7">
      ${days.map((d, idx) => {
        if (!d) return `<div class="cal-day opacity-30" style="min-height:80px;"></div>`;
        const dateStr = `${year}-${String(monthIdx + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const dayItems = getItemsForDay(d);
        const isToday = dateStr === todayStr;
        return `
          <div class="cal-day p-1" data-date="${dateStr}" style="min-height:80px;${isToday ? 'background:rgba(10,132,255,0.10);' : ''}">
            <div class="text-xs mb-1 font-${isToday ? 'bold' : 'normal'}" style="color:${isToday ? 'var(--accent)' : 'var(--text-secondary)'};">${d}</div>
            ${dayItems.map(item => `
              <div class="cal-item text-white truncate" data-item-id="${item.id}"
                style="background:${platformColors[item.platform] || '#334155'};font-size:0.65rem;padding:2px 5px;">
                ${item.title || item.topic || '...'}
              </div>
            `).join('')}
          </div>
        `;
      }).join('')}
    </div>
  </div>

  <!-- Legend -->
  <div class="flex flex-wrap gap-3 text-xs" style="color:var(--text-secondary);">
    ${Object.entries(platformColors).map(([p, c]) => `
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 rounded-sm" style="background:${c};"></div>
        <span>${p}</span>
      </div>
    `).join('')}
  </div>

  <!-- AI Plan output (shown after generation) -->
  <div id="cal-plan-output-section" class="hidden">
    <div class="card p-5">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold">Plan generado por IA</h3>
        <div class="flex gap-2">
          <button id="cal-copy-plan" class="btn-ghost px-3 py-1 text-xs"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
          <button id="cal-close-plan" class="btn-ghost px-3 py-1 text-xs"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
      <div id="cal-plan-output" class="content-output" style="max-height:400px;"></div>
    </div>
  </div>

  <!-- Items list below calendar -->
  <div id="cal-day-items"></div>
</div>
    `;
  },

  bindCalendar() {
    document.getElementById('cal-prev')?.addEventListener('click', () => {
      const m = App.calendarMonth || new Date();
      App.calendarMonth = new Date(m.getFullYear(), m.getMonth() - 1, 1);
      render();
    });
    document.getElementById('cal-next')?.addEventListener('click', () => {
      const m = App.calendarMonth || new Date();
      App.calendarMonth = new Date(m.getFullYear(), m.getMonth() + 1, 1);
      render();
    });

    document.querySelectorAll('.cal-day').forEach(day => {
      day.addEventListener('click', (e) => {
        const itemEl = e.target.closest('[data-item-id]');
        if (itemEl) {
          this.openCalendarItemModal(itemEl.dataset.itemId);
        }
      });
    });

    document.getElementById('cal-add-item')?.addEventListener('click', () => {
      this.openAddToCalendarModal('', 'Instagram', '');
    });

    document.getElementById('cal-generate-plan')?.addEventListener('click', async () => {
      const btn = document.getElementById('cal-generate-plan');
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Generando...';
      btn.disabled = true;
      const section = document.getElementById('cal-plan-output-section');
      const outputEl = document.getElementById('cal-plan-output');
      section.classList.remove('hidden');
      outputEl.innerHTML = '<span class="loading-dots">Generando plan de contenido</span>';
      let planText = '';
      try {
        await Agents.generateCalendarPlan({ weeks: 4, primaryPlatform: 'Instagram' }, (chunk, full) => {
          planText = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });
        showToast('Plan generado. ¡Revisa el panel de abajo!', 'success');
        btn.innerHTML = '<i class="fa-solid fa-check mr-1"></i>Plan generado';
        document.getElementById('cal-copy-plan')?.addEventListener('click', () => copyToClipboard(planText, 'Plan de contenido'));
        document.getElementById('cal-close-plan')?.addEventListener('click', () => section.classList.add('hidden'));
      } catch (err) {
        outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
        showToast('Error: ' + err.message, 'error');
        btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Generar plan IA';
        btn.disabled = false;
      }
    });
  },

  openCalendarItemModal(itemId) {
    const item = Storage.getCalendarItems().find(i => i.id === itemId);
    if (!item) return;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-lg">${item.title || item.topic || 'Elemento de calendario'}</h3>
          <button id="modal-close" class="btn-ghost px-3 py-1 text-sm"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="flex items-center gap-2 mb-4">
          ${platformBadge(item.platform || 'Instagram')}
          <span class="pill status-${item.status || 'draft'}">${this.statusLabel(item.status)}</span>
          <span class="text-sm" style="color:var(--text-secondary);">${item.date || ''}</span>
        </div>
        ${item.content ? `
          <div class="content-output mb-4" style="max-height:300px;">${item.content}</div>
        ` : `<p class="text-sm mb-4" style="color:var(--text-secondary);">Sin contenido adjunto.</p>`}
        <div class="flex gap-3 flex-wrap">
          <select id="item-status-select" class="select flex-1">
            <option value="draft" ${item.status === 'draft' ? 'selected' : ''}>Borrador</option>
            <option value="review" ${item.status === 'review' ? 'selected' : ''}>En revisión</option>
            <option value="approved" ${item.status === 'approved' ? 'selected' : ''}>Aprobado</option>
            <option value="published" ${item.status === 'published' ? 'selected' : ''}>Publicado</option>
          </select>
          <button id="item-update-status" class="btn-primary px-4 py-2 text-sm">Actualizar estado</button>
          <button id="item-delete" class="btn-ghost px-4 py-2 text-sm" style="color:var(--error);"><i class="fa-regular fa-trash-can mr-1"></i>Eliminar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('modal-close').addEventListener('click', () => modal.remove());
    document.getElementById('item-update-status').addEventListener('click', () => {
      const status = document.getElementById('item-status-select').value;
      Storage.updateCalendarItem(itemId, { status });
      modal.remove();
      showToast('Estado actualizado', 'success');
      render();
    });
    document.getElementById('item-delete').addEventListener('click', () => {
      Storage.deleteCalendarItem(itemId);
      modal.remove();
      showToast('Elemento eliminado', 'info');
      render();
    });
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  },


  // ══════════════════════════════════════════════════════════
  // LIBRARY VIEW
  // ══════════════════════════════════════════════════════════
  renderLibrary() {
    const drafts = Storage.getDrafts();
    const filter = App._libraryFilter || 'all';
    const search = App._librarySearch || '';

    const filtered = drafts.filter(d => {
      const matchStatus = filter === 'all' || d.status === filter;
      const matchSearch = !search || (d.title || d.topic || '').toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });

    const statusCounts = { all: drafts.length, draft: 0, review: 0, approved: 0, published: 0 };
    drafts.forEach(d => { if (statusCounts[d.status] !== undefined) statusCounts[d.status]++; });

    return `
<div class="space-y-5">
  <!-- Search and filters -->
  <div class="flex flex-wrap gap-3 items-center">
    <input id="lib-search" class="input flex-1" style="max-width:320px;" type="text"
      placeholder="Buscar en biblioteca..." value="${search}" />
    <div class="flex gap-2 flex-wrap">
      ${[
        { key: 'all', label: `Todos (${statusCounts.all})` },
        { key: 'draft', label: `Borrador (${statusCounts.draft})` },
        { key: 'review', label: `Revisión (${statusCounts.review})` },
        { key: 'approved', label: `Aprobados (${statusCounts.approved})` },
        { key: 'published', label: `Publicados (${statusCounts.published})` },
      ].map(f => `
        <button data-filter="${f.key}"
          class="filter-btn px-4 py-2 text-sm rounded-lg border transition-all ${filter === f.key ? 'btn-primary' : 'btn-ghost'}">
          ${f.label}
        </button>
      `).join('')}
    </div>
  </div>

  <!-- Content grid -->
  ${filtered.length === 0 ? `
    <div class="card p-12 text-center">
      <i class="fa-solid fa-book-open fa-3x mb-3" style="display:block;color:var(--text-tertiary);"></i>
      <h3 class="font-semibold mb-2">No hay contenido aquí</h3>
      <p class="text-sm mb-4" style="color:var(--text-secondary);">${search ? 'No se encontraron resultados para tu búsqueda.' : 'Genera tu primer contenido para empezar.'}</p>
      ${!search ? `<button onclick="navigate('generator')" class="btn-primary px-6 py-2 text-sm">Generar contenido</button>` : ''}
    </div>
  ` : `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${filtered.map(d => `
        <div class="card p-5 hover:border-blue-500 transition-all cursor-pointer draft-card" data-draft-id="${d.id}" style="border-color:var(--glass-border);">
          <div class="flex items-center gap-2 mb-3">
            ${platformBadge(d.platform || 'Blog')}
            <span class="pill status-${d.status || 'draft'} text-xs">${this.statusLabel(d.status)}</span>
          </div>
          <h3 class="font-semibold text-sm mb-2 line-clamp-2" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
            ${d.title || d.topic || 'Sin título'}
          </h3>
          <p class="text-xs mb-3" style="color:var(--text-secondary);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
            ${(d.content || '').substring(0, 120)}...
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xs" style="color:var(--text-tertiary);">${this.timeAgo(d.createdAt)}</span>
            <div class="flex gap-2">
              <button class="btn-ghost px-2 py-1 text-xs copy-draft" data-content="${this.escAttr(d.content)}"><i class="fa-regular fa-copy"></i></button>
              <button class="btn-ghost px-2 py-1 text-xs delete-draft" data-id="${d.id}" style="color:var(--error);"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `}
</div>
    `;
  },

  bindLibrary() {
    const searchEl = document.getElementById('lib-search');
    if (searchEl) {
      searchEl.addEventListener('input', (e) => {
        App._librarySearch = e.target.value;
        const main = document.querySelector('main');
        if (main) { main.innerHTML = this.renderLibrary(); this.bindLibrary(); }
      });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        App._libraryFilter = btn.dataset.filter;
        const main = document.querySelector('main');
        if (main) { main.innerHTML = this.renderLibrary(); this.bindLibrary(); }
      });
    });

    document.querySelectorAll('.draft-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.copy-draft') || e.target.closest('.delete-draft')) return;
        this.openDraftModal(card.dataset.draftId);
      });
    });

    document.querySelectorAll('.copy-draft').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyToClipboard(btn.dataset.content || '', 'Contenido');
      });
    });

    document.querySelectorAll('.delete-draft').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('¿Eliminar este borrador?')) {
          Storage.deleteDraft(btn.dataset.id);
          showToast('Borrador eliminado', 'info');
          const main = document.querySelector('main');
          if (main) { main.innerHTML = this.renderLibrary(); this.bindLibrary(); }
        }
      });
    });
  },

  openDraftModal(draftId) {
    const draft = Storage.getDrafts().find(d => d.id === draftId);
    if (!draft) return;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              ${platformBadge(draft.platform || 'Blog')}
              <span class="pill status-${draft.status || 'draft'}">${this.statusLabel(draft.status)}</span>
            </div>
            <h3 class="font-bold text-lg">${draft.title || draft.topic || 'Sin título'}</h3>
          </div>
          <button class="modal-close btn-ghost px-3 py-1 text-sm"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="content-output mb-4" style="max-height:400px;">${draft.content || 'Sin contenido'}</div>
        <div class="flex gap-3 flex-wrap">
          <select id="draft-status-select" class="select" style="max-width:200px;">
            <option value="draft" ${draft.status === 'draft' ? 'selected' : ''}>Borrador</option>
            <option value="review" ${draft.status === 'review' ? 'selected' : ''}>En revisión</option>
            <option value="approved" ${draft.status === 'approved' ? 'selected' : ''}>Aprobado</option>
            <option value="published" ${draft.status === 'published' ? 'selected' : ''}>Publicado</option>
          </select>
          <button id="update-draft-status" class="btn-primary px-4 py-2 text-sm">Actualizar</button>
          <button onclick="copyToClipboard(${JSON.stringify(draft.content || '')}, 'Contenido')" class="btn-ghost px-4 py-2 text-sm"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
          <button onclick="downloadTxt(${JSON.stringify(draft.content || '')}, 'fisiobox-draft')" class="btn-ghost px-4 py-2 text-sm"><i class="fa-solid fa-download mr-1"></i>Descargar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    document.getElementById('update-draft-status').addEventListener('click', () => {
      const status = document.getElementById('draft-status-select').value;
      Storage.saveDraft({ ...draft, status });
      modal.remove();
      showToast('Estado actualizado', 'success');
      const main = document.querySelector('main');
      if (main) { main.innerHTML = this.renderLibrary(); this.bindLibrary(); }
    });
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  },


  // ══════════════════════════════════════════════════════════
  // ANALYTICS VIEW
  // ══════════════════════════════════════════════════════════
  renderAnalytics() {
    const analyticsData = Storage.getAnalyticsData();
    return `
<div class="space-y-6">
  <!-- Input form -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-2">Análisis de rendimiento con IA</h3>
    <p class="text-sm mb-4" style="color:var(--text-secondary);">Pega tus métricas de Instagram, Facebook o cualquier plataforma y recibe recomendaciones accionables.</p>
    <div class="space-y-4">
      <div>
        <label class="label">Métricas de rendimiento</label>
        <textarea id="analytics-input" class="textarea" rows="8"
          placeholder="Ejemplo:
Post tipo: Carrusel educativo sobre rodilla
Alcance: 1,240
Impresiones: 2,150
Likes: 89
Comentarios: 12
Guardados: 47
Compartidos: 8
Clics enlace: 23
Fecha: 15 marzo 2025

Puedes pegar datos de múltiples posts..."></textarea>
      </div>
      <button id="run-analytics" class="btn-primary px-6 py-3 font-semibold">Analizar con IA</button>
    </div>
  </div>

  <!-- Output -->
  <div id="analytics-output-section" class="hidden">
    <div class="card p-6">
      <h3 class="font-bold text-lg mb-4">Análisis y recomendaciones</h3>
      <div id="analytics-output" class="content-output" style="min-height:300px;"></div>
      <div class="flex gap-3 mt-4">
        <button id="copy-analytics" class="btn-ghost px-5 py-2 text-sm"><i class="fa-regular fa-copy mr-1"></i>Copiar análisis</button>
        <button id="save-analytics" class="btn-ghost px-5 py-2 text-sm"><i class="fa-regular fa-floppy-disk mr-1"></i>Guardar reporte</button>
      </div>
    </div>
  </div>

  <!-- Historical reports -->
  ${analyticsData.length > 0 ? `
    <div class="card p-6">
      <h3 class="font-semibold mb-4">Reportes anteriores</h3>
      <div class="space-y-3">
        ${analyticsData.slice(0, 5).map(entry => `
          <div class="flex items-center justify-between p-3 rounded-lg" style="background:var(--bg-base);border:1px solid var(--glass-border);">
            <div>
              <p class="text-sm font-medium">${entry.summary || 'Reporte de análisis'}</p>
              <p class="text-xs" style="color:var(--text-tertiary);">${this.timeAgo(entry.savedAt)}</p>
            </div>
            <button class="btn-ghost px-3 py-1 text-xs view-analytics-entry" data-id="${entry.id}">Ver</button>
          </div>
        `).join('')}
      </div>
    </div>
  ` : ''}
</div>
    `;
  },

  bindAnalytics() {
    document.getElementById('run-analytics')?.addEventListener('click', async () => {
      const metricsText = document.getElementById('analytics-input')?.value?.trim();
      if (!metricsText) { showToast('Por favor ingresa las métricas', 'warning'); return; }
      const btn = document.getElementById('run-analytics');
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Analizando...';
      btn.disabled = true;

      const section = document.getElementById('analytics-output-section');
      const outputEl = document.getElementById('analytics-output');
      section.classList.remove('hidden');
      outputEl.innerHTML = '<span class="loading-dots">Analizando métricas</span>';

      let fullText = '';
      try {
        await Agents.analytics(metricsText, (chunk, full) => {
          fullText = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });

        document.getElementById('copy-analytics')?.addEventListener('click', () => copyToClipboard(fullText, 'Análisis'));
        document.getElementById('save-analytics')?.addEventListener('click', () => {
          Storage.saveAnalyticsEntry({ summary: 'Reporte ' + new Date().toLocaleDateString('es-CR'), content: fullText });
          showToast('Reporte guardado', 'success');
        });
      } catch (err) {
        outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
        showToast(err.message, 'error');
      } finally {
        btn.textContent = 'Analizar con IA';
        btn.disabled = false;
      }
    });
  },


  // ══════════════════════════════════════════════════════════
  // INTELLIGENCE VIEW
  // ══════════════════════════════════════════════════════════
  renderIntelligence() {
    return `
<div class="space-y-6">
  <!-- Header -->
  <div class="card p-6" style="background:linear-gradient(135deg,rgba(10,132,255,0.10),var(--glass-bg));">
    <h2 class="text-xl font-bold mb-2">Centro de Inteligencia</h2>
    <p style="color:var(--text-secondary);">Análisis competitivo, tendencias de contenido y oportunidades de mercado para FisioBox.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

    <!-- Listener Agent -->
    <div class="card p-5">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:rgba(10,132,255,0.15);"><i class="fa-solid fa-microphone" style="color:var(--accent);"></i></div>
        <div>
          <h3 class="font-semibold">Agente Escucha</h3>
          <p class="text-xs" style="color:var(--text-secondary);">Oportunidades de contenido semanales</p>
        </div>
      </div>
      <div>
        <label class="label">Contexto adicional (opcional)</label>
        <input id="listener-context" class="input mb-3" type="text"
          placeholder="Ej: temporada lluviosa, inicio clases, torneo..." />
        <button id="run-listener" class="btn-primary w-full py-2 text-sm font-medium">
          Generar reporte semanal
        </button>
      </div>
      <div id="listener-output" class="mt-3 content-output hidden" style="max-height:300px;"></div>
    </div>

    <!-- Competitor Intel -->
    <div class="card p-5">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:rgba(255,69,58,0.15);"><i class="fa-solid fa-chart-line" style="color:var(--error);"></i></div>
        <div>
          <h3 class="font-semibold">Inteligencia Competitiva</h3>
          <p class="text-xs" style="color:var(--text-secondary);">Análisis del mercado de fisioterapia en CR</p>
        </div>
      </div>
      <div>
        <label class="label">Información adicional (opcional)</label>
        <input id="competitor-context" class="input mb-3" type="text"
          placeholder="Ej: nueva clínica abierta en Escazú, tendencia en redes..." />
        <button id="run-competitor" class="btn-primary w-full py-2 text-sm font-medium">
          Analizar competencia
        </button>
      </div>
      <div id="competitor-output" class="mt-3 content-output hidden" style="max-height:300px;"></div>
    </div>

    <!-- SEO Agent -->
    <div class="card p-5">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:rgba(48,209,88,0.15);"><i class="fa-solid fa-magnifying-glass" style="color:var(--success);"></i></div>
        <div>
          <h3 class="font-semibold">Agente SEO</h3>
          <p class="text-xs" style="color:var(--text-secondary);">Brief SEO + Google Business para Escazú</p>
        </div>
      </div>
      <div class="space-y-3">
        <div>
          <label class="label">Tema del artículo</label>
          <input id="seo-topic" class="input" type="text"
            placeholder="Ej: fisioterapia deportiva rodilla escazú" />
        </div>
        <div>
          <label class="label">Tipo</label>
          <select id="seo-type" class="select">
            <option value="blog_brief">Brief para artículo de blog</option>
            <option value="google_business">Post Google Business</option>
          </select>
        </div>
        <button id="run-seo" class="btn-primary w-full py-2 text-sm font-medium">
          Generar estrategia SEO
        </button>
      </div>
      <div id="seo-output" class="mt-3 content-output hidden" style="max-height:300px;"></div>
    </div>

    <!-- RTP Specialist -->
    <div class="card p-5">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:rgba(255,107,53,0.15);"><i class="fa-solid fa-person-running" style="color:var(--accent-orange);"></i></div>
        <div>
          <h3 class="font-semibold">Especialista RTP</h3>
          <p class="text-xs" style="color:var(--text-secondary);">Retorno al Deporte — contenido especializado</p>
        </div>
      </div>
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Deporte</label>
            <input id="rtp-sport" class="input" type="text" placeholder="Fútbol, Running..." />
          </div>
          <div>
            <label class="label">Lesión</label>
            <input id="rtp-injury" class="input" type="text" placeholder="LCA, Tobillo..." />
          </div>
        </div>
        <div>
          <label class="label">Fase RTP</label>
          <select id="rtp-phase" class="select">
            <option value="">General (todas las fases)</option>
            <option value="Fase aguda / primeras 48-72h">Fase aguda</option>
            <option value="Rehabilitación funcional">Rehabilitación funcional</option>
            <option value="Retorno al entrenamiento">Retorno al entrenamiento</option>
            <option value="Retorno a la competencia">Retorno a la competencia</option>
          </select>
        </div>
        <div>
          <label class="label">Formato</label>
          <select id="rtp-format" class="select">
            <option value="carrusel educativo">Carrusel educativo</option>
            <option value="post informativo">Post informativo</option>
            <option value="guión reel">Guión de Reel</option>
            <option value="artículo blog">Artículo de blog</option>
          </select>
        </div>
        <button id="run-rtp" class="btn-orange w-full py-2 text-sm font-semibold">
          Generar contenido RTP
        </button>
      </div>
      <div id="rtp-output" class="mt-3 content-output hidden" style="max-height:300px;"></div>
    </div>

  </div>
</div>
    `;
  },

  bindIntelligence() {
    const bindAgent = (btnId, outputId, agentFn) => {
      document.getElementById(btnId)?.addEventListener('click', async () => {
        const btn = document.getElementById(btnId);
        const outputEl = document.getElementById(outputId);
        const originalHTML = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Procesando...';
        outputEl.classList.remove('hidden');
        outputEl.innerHTML = '<span class="loading-dots">Procesando</span>';
        try {
          await agentFn((chunk, full) => {
            outputEl.textContent = full;
            outputEl.scrollTop = outputEl.scrollHeight;
          });
        } catch (err) {
          outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
          showToast(err.message, 'error');
        } finally {
          btn.disabled = false;
          btn.innerHTML = originalHTML;
        }
      });
    };

    bindAgent('run-listener', 'listener-output', (cb) =>
      Agents.listener(document.getElementById('listener-context')?.value || '', cb));

    bindAgent('run-competitor', 'competitor-output', (cb) =>
      Agents.competitorIntel(document.getElementById('competitor-context')?.value || '', cb));

    bindAgent('run-seo', 'seo-output', (cb) =>
      Agents.seo(document.getElementById('seo-topic')?.value || 'fisioterapia deportiva escazú',
        document.getElementById('seo-type')?.value || 'blog_brief', cb));

    bindAgent('run-rtp', 'rtp-output', (cb) =>
      Agents.rtpSpecialist({
        sport: document.getElementById('rtp-sport')?.value || '',
        injury: document.getElementById('rtp-injury')?.value || '',
        phase: document.getElementById('rtp-phase')?.value || '',
        format: document.getElementById('rtp-format')?.value || 'carrusel educativo',
      }, cb));
  },


  // ══════════════════════════════════════════════════════════
  // WHATSAPP VIEW
  // ══════════════════════════════════════════════════════════
  renderWhatsApp() {
    const sequences = Storage.getWhatsAppSequences();
    return `
<div class="space-y-6">
  <!-- Header -->
  <div class="card p-6" style="background:linear-gradient(135deg,rgba(48,209,88,0.12),var(--glass-bg));">
    <h2 class="text-xl font-bold mb-2">Secuencias de WhatsApp</h2>
    <p style="color:var(--text-secondary);">Genera mensajes de seguimiento para pacientes, listas para enviar por WhatsApp.</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Generator -->
    <div class="card p-6">
      <h3 class="font-semibold mb-4">Nueva secuencia</h3>
      <div class="space-y-4">
        <div>
          <label class="label">Tipo de secuencia *</label>
          <select id="wa-type" class="select">
            <option value="post_cita">Post-cita (seguimiento después de sesión)</option>
            <option value="rtp_deportista">RTP para deportista</option>
            <option value="prevencion_lesiones">Prevención de lesiones</option>
            <option value="reactivacion_paciente">Reactivación de paciente inactivo</option>
            <option value="bienvenida_nuevo_paciente">Bienvenida nuevo paciente</option>
            <option value="recordatorio_ejercicios">Recordatorio de ejercicios en casa</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Lesión / condición</label>
            <input id="wa-injury" class="input" type="text" placeholder="Ej: Esguince tobillo" />
          </div>
          <div>
            <label class="label">Deporte</label>
            <input id="wa-sport" class="input" type="text" placeholder="Ej: Fútbol, Running" />
          </div>
        </div>
        <div>
          <label class="label">Contexto del paciente (opcional)</label>
          <textarea id="wa-context" class="textarea" rows="3"
            placeholder="Ej: Atleta de 28 años, primera semana post-cirugía LCA, muy motivado para volver al deporte..."></textarea>
        </div>
        <button id="run-whatsapp" class="btn-primary w-full py-3 font-semibold">
          Generar secuencia
        </button>
      </div>
      <div id="wa-output" class="mt-4 content-output hidden" style="max-height:400px;"></div>
      <div id="wa-actions" class="hidden mt-3 flex gap-3 flex-wrap">
        <button id="wa-copy" class="btn-primary px-4 py-2 text-sm"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
        <button id="wa-save" class="btn-ghost px-4 py-2 text-sm"><i class="fa-regular fa-floppy-disk mr-1"></i>Guardar</button>
        <button id="wa-download" class="btn-ghost px-4 py-2 text-sm"><i class="fa-solid fa-download mr-1"></i>Descargar</button>
      </div>
    </div>

    <!-- Saved sequences -->
    <div class="card p-6">
      <h3 class="font-semibold mb-4 flex items-center justify-between">
        <span>Secuencias guardadas</span>
        <span class="text-xs px-2 py-1 rounded" style="background:var(--glass-border);color:var(--text-secondary);">${sequences.length}</span>
      </h3>
      ${sequences.length === 0 ? `
        <div class="text-center py-8" style="color:var(--text-tertiary);">
          <i class="fa-brands fa-whatsapp fa-2x mb-3" style="display:block;color:var(--text-tertiary);"></i>
          <p class="text-sm">No hay secuencias guardadas.</p>
        </div>
      ` : `
        <div class="space-y-3 overflow-y-auto" style="max-height:450px;">
          ${sequences.map(seq => `
            <div class="p-4 rounded-lg" style="background:var(--bg-base);border:1px solid var(--glass-border);">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <p class="text-sm font-medium">${seq.sequenceType || 'Secuencia'}</p>
                  ${seq.injury ? `<span class="text-xs pill status-draft mt-1">${seq.injury}</span>` : ''}
                  ${seq.sport ? `<span class="text-xs pill status-draft mt-1 ml-1">${seq.sport}</span>` : ''}
                </div>
                <span class="text-xs" style="color:var(--text-tertiary);">${this.timeAgo(seq.createdAt)}</span>
              </div>
              <p class="text-xs mb-3" style="color:var(--text-secondary);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                ${(seq.content || '').substring(0, 100)}...
              </p>
              <div class="flex gap-2">
                <button class="btn-ghost px-3 py-1 text-xs wa-view" data-id="${seq.id}">Ver</button>
                <button class="btn-ghost px-3 py-1 text-xs" onclick="copyToClipboard(${JSON.stringify(seq.content || '')}, 'Secuencia')"><i class="fa-regular fa-copy"></i></button>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  </div>
</div>
    `;
  },

  bindWhatsApp() {
    let generatedWA = '';
    document.getElementById('run-whatsapp')?.addEventListener('click', async () => {
      const btn = document.getElementById('run-whatsapp');
      const outputEl = document.getElementById('wa-output');
      const actionsEl = document.getElementById('wa-actions');
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Generando...';
      btn.disabled = true;
      outputEl.classList.remove('hidden');
      outputEl.innerHTML = '<span class="loading-dots">Generando secuencia</span>';
      actionsEl.classList.add('hidden');

      try {
        await Agents.patientNurture({
          sequenceType: document.getElementById('wa-type')?.value || 'post_cita',
          injury: document.getElementById('wa-injury')?.value || '',
          sport: document.getElementById('wa-sport')?.value || '',
          patientContext: document.getElementById('wa-context')?.value || '',
        }, (chunk, full) => {
          generatedWA = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });

        actionsEl.classList.remove('hidden');
        actionsEl.classList.add('flex');

        document.getElementById('wa-copy').onclick = () => copyToClipboard(generatedWA, 'Secuencia WhatsApp');
        document.getElementById('wa-download').onclick = () => downloadTxt(generatedWA, 'fisiobox-whatsapp-secuencia');
        document.getElementById('wa-save').onclick = () => {
          Storage.saveWhatsAppSequence({
            sequenceType: document.getElementById('wa-type')?.value,
            injury: document.getElementById('wa-injury')?.value,
            sport: document.getElementById('wa-sport')?.value,
            content: generatedWA,
          });
          showToast('Secuencia guardada', 'success');
          const main = document.querySelector('main');
          if (main) { main.innerHTML = this.renderWhatsApp(); this.bindWhatsApp(); }
        };
      } catch (err) {
        outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
        showToast(err.message, 'error');
      } finally {
        btn.textContent = 'Generar secuencia';
        btn.disabled = false;
      }
    });

    document.querySelectorAll('.wa-view').forEach(btn => {
      btn.addEventListener('click', () => {
        const seq = Storage.getWhatsAppSequences().find(s => s.id === btn.dataset.id);
        if (!seq) return;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
          <div class="modal p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold">${seq.sequenceType || 'Secuencia WhatsApp'}</h3>
              <button class="modal-close btn-ghost px-3 py-1 text-sm"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="content-output mb-4" style="max-height:400px;">${seq.content || ''}</div>
            <div class="flex gap-3">
              <button onclick="copyToClipboard(${JSON.stringify(seq.content || '')}, 'Secuencia')" class="btn-primary px-4 py-2 text-sm"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
              <button onclick="downloadTxt(${JSON.stringify(seq.content || '')}, 'wa-secuencia')" class="btn-ghost px-4 py-2 text-sm"><i class="fa-solid fa-download mr-1"></i>Descargar</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
      });
    });
  },


  // ══════════════════════════════════════════════════════════
  // CAMPAIGNS VIEW
  // ══════════════════════════════════════════════════════════
  renderCampaigns() {
    const campaigns = Storage.getCampaigns();
    return `
<div class="space-y-6">
  <!-- Header -->
  <div class="card p-6" style="background:linear-gradient(135deg,rgba(255,107,53,0.12),var(--glass-bg));">
    <div class="flex items-start justify-between flex-wrap gap-4">
      <div>
        <h2 class="text-xl font-bold mb-2">Constructor de Campañas</h2>
        <p style="color:var(--text-secondary);">Crea campañas completas con concepto, plan semanal, piezas de contenido y anuncios.</p>
      </div>
      <button id="new-campaign-btn" class="btn-orange px-5 py-2 font-semibold">+ Nueva campaña</button>
    </div>
  </div>

  <!-- Builder form -->
  <div id="campaign-builder" class="card p-6 hidden">
    <h3 class="font-semibold text-lg mb-5">Configurar nueva campaña</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label class="label">Objetivo de la campaña *</label>
        <select id="camp-goal" class="select">
          <option value="Captación de nuevos pacientes">Captación de nuevos pacientes</option>
          <option value="Lanzamiento nuevo servicio">Lanzamiento nuevo servicio</option>
          <option value="Retención y reactivación">Retención y reactivación</option>
          <option value="Posicionamiento de marca">Posicionamiento de marca</option>
          <option value="Temporada alta deportiva">Temporada alta deportiva</option>
          <option value="Campaña educativa">Campaña educativa</option>
        </select>
      </div>
      <div>
        <label class="label">Duración (semanas)</label>
        <select id="camp-duration" class="select">
          <option value="2">2 semanas</option>
          <option value="4" selected>4 semanas</option>
          <option value="6">6 semanas</option>
          <option value="8">8 semanas</option>
        </select>
      </div>
      <div>
        <label class="label">Plataforma principal</label>
        <select id="camp-platform" class="select">
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="TikTok">TikTok</option>
          <option value="Multi-plataforma">Multi-plataforma</option>
        </select>
      </div>
      <div>
        <label class="label">Tipo de presupuesto</label>
        <select id="camp-budget" class="select">
          <option value="Orgánico">Orgánico (sin ads)</option>
          <option value="Bajo ($50-200/mes)">Bajo ($50-200/mes)</option>
          <option value="Medio ($200-500/mes)">Medio ($200-500/mes)</option>
          <option value="Alto ($500+/mes)">Alto ($500+/mes)</option>
        </select>
      </div>
      <div class="md:col-span-2">
        <label class="label">Brief de la campaña (opcional)</label>
        <textarea id="camp-brief" class="textarea" rows="3"
          placeholder="Descripción del objetivo, público específico, temporada, mensaje principal..."></textarea>
      </div>
    </div>
    <div class="flex gap-3 mt-5">
      <button id="cancel-campaign" class="btn-ghost px-5 py-3">Cancelar</button>
      <button id="build-campaign" class="btn-orange px-8 py-3 font-semibold">Construir campaña completa</button>
    </div>
  </div>

  <!-- Progress indicator -->
  <div id="campaign-progress" class="card p-6 hidden">
    <h3 class="font-semibold mb-4 flex items-center gap-2"><i class="fa-solid fa-spinner fa-spin"></i> Construyendo campaña...</h3>
    <div id="progress-label" class="text-sm mb-3" style="color:var(--text-secondary);"></div>
    <div class="progress-bar">
      <div id="camp-progress-fill" class="progress-fill" style="width:0%;background:linear-gradient(90deg,var(--accent-orange),var(--accent));"></div>
    </div>
  </div>

  <!-- Campaign result -->
  <div id="campaign-result" class="hidden space-y-4"></div>

  <!-- Saved campaigns -->
  ${campaigns.length > 0 ? `
    <div class="card p-6">
      <h3 class="font-semibold mb-4">Campañas guardadas</h3>
      <div class="space-y-3">
        ${campaigns.map(camp => `
          <div class="p-4 rounded-lg flex items-center justify-between flex-wrap gap-3" style="background:var(--bg-base);border:1px solid var(--glass-border);">
            <div>
              <p class="font-medium text-sm">${camp.goal || 'Campaña'}</p>
              <div class="flex items-center gap-2 mt-1">
                ${platformBadge(camp.platform || 'Instagram')}
                <span class="text-xs" style="color:var(--text-tertiary);">${camp.duration || '4'} semanas · ${camp.budgetType || 'Orgánico'}</span>
                <span class="text-xs" style="color:var(--text-tertiary);">· ${this.timeAgo(camp.createdAt)}</span>
              </div>
            </div>
            <button class="btn-ghost px-4 py-2 text-sm view-campaign" data-id="${camp.id}">Ver campaña</button>
          </div>
        `).join('')}
      </div>
    </div>
  ` : ''}
</div>
    `;
  },

  bindCampaigns() {
    document.getElementById('new-campaign-btn')?.addEventListener('click', () => {
      const builder = document.getElementById('campaign-builder');
      builder.classList.toggle('hidden');
    });
    document.getElementById('cancel-campaign')?.addEventListener('click', () => {
      document.getElementById('campaign-builder').classList.add('hidden');
    });
    document.getElementById('build-campaign')?.addEventListener('click', async () => {
      const btn = document.getElementById('build-campaign');
      const goal = document.getElementById('camp-goal')?.value;
      const duration = document.getElementById('camp-duration')?.value;
      const platform = document.getElementById('camp-platform')?.value;
      const budgetType = document.getElementById('camp-budget')?.value;
      const brief = document.getElementById('camp-brief')?.value || '';

      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Construyendo...';

      document.getElementById('campaign-builder').classList.add('hidden');
      const progress = document.getElementById('campaign-progress');
      progress.classList.remove('hidden');

      try {
        const results = await Agents.buildCampaign({ goal, duration, platform, budgetType, brief },
          (label, current, total) => {
            document.getElementById('progress-label').textContent = label;
            const pct = total > 0 ? Math.round((current / total) * 100) : 0;
            document.getElementById('camp-progress-fill').style.width = pct + '%';
          }
        );

        progress.classList.add('hidden');
        const resultDiv = document.getElementById('campaign-result');
        resultDiv.classList.remove('hidden');

        const stepLabels = ['Concepto de campaña', 'Plan semana a semana', 'Piezas de contenido', 'Copy de anuncios'];
        resultDiv.innerHTML = results.map((r, i) => `
          <div class="card p-5">
            <h3 class="font-semibold mb-3">${stepLabels[i] || `Parte ${i+1}`}</h3>
            <div class="content-output" style="max-height:400px;">${r}</div>
            <div class="flex gap-3 mt-3">
              <button onclick="copyToClipboard(${JSON.stringify(r)}, '${stepLabels[i]}')" class="btn-ghost px-4 py-2 text-sm"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
              <button onclick="downloadTxt(${JSON.stringify(r)}, 'fisiobox-campana-parte${i+1}')" class="btn-ghost px-4 py-2 text-sm"><i class="fa-solid fa-download mr-1"></i>Descargar</button>
            </div>
          </div>
        `).join('');

        Storage.saveCampaign({ goal, duration, platform, budgetType, brief, results });
        showToast('Campaña construida y guardada', 'success');
      } catch (err) {
        progress.classList.add('hidden');
        showToast('Error: ' + err.message, 'error');
      } finally {
        btn.textContent = 'Construir campaña completa';
        btn.disabled = false;
      }
    });

    document.querySelectorAll('.view-campaign').forEach(btn => {
      btn.addEventListener('click', () => {
        const camp = Storage.getCampaigns().find(c => c.id === btn.dataset.id);
        if (!camp) return;
        const resultDiv = document.getElementById('campaign-result');
        resultDiv.classList.remove('hidden');
        const stepLabels = ['Concepto de campaña', 'Plan semana a semana', 'Piezas de contenido', 'Copy de anuncios'];
        resultDiv.innerHTML = (camp.results || []).map((r, i) => `
          <div class="card p-5">
            <h3 class="font-semibold mb-3">${stepLabels[i] || 'Parte ' + (i+1)}</h3>
            <div class="content-output" style="max-height:300px;">${r}</div>
          </div>
        `).join('');
        resultDiv.scrollIntoView({ behavior: 'smooth' });
      });
    });
  },


  // ══════════════════════════════════════════════════════════
  // SETTINGS VIEW
  // ══════════════════════════════════════════════════════════
  renderSettings() {
    const bs = Storage.getBrandSettings();
    const apiKey = Storage.getApiKey();
    return `
<div class="max-w-3xl mx-auto space-y-6">

  <!-- API Key -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-2">Clave de API de Anthropic</h3>
    <p class="text-sm mb-4" style="color:var(--text-secondary);">Necesitas una clave de API de Anthropic para usar los agentes de IA. Tu clave se almacena localmente en tu navegador.</p>
    <div class="flex gap-3">
      <input id="api-key-input" class="input flex-1" type="password"
        placeholder="sk-ant-api03-..."
        value="${apiKey ? apiKey.substring(0, 8) + '••••••••••••••••••••' : ''}" />
      <button id="save-api-key" class="btn-primary px-6 py-2 font-semibold flex-shrink-0">Guardar</button>
    </div>
    ${apiKey ? `<p class="text-xs mt-2" style="color:var(--success);"><i class="fa-solid fa-circle-check mr-1"></i>Clave configurada</p>` : `<p class="text-xs mt-2" style="color:var(--warning);"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Sin clave configurada</p>`}
  </div>

  <!-- Brand tone sliders -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-2">Tono de marca</h3>
    <p class="text-sm mb-5" style="color:var(--text-secondary);">Configura cómo debe sonar FisioBox en el contenido generado.</p>
    <div class="space-y-6">

      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="label m-0">Formalidad</label>
          <div class="flex items-center gap-3 text-xs" style="color:var(--text-secondary);">
            <span>Casual</span>
            <span id="tone-formal-val" class="font-bold" style="color:var(--accent);">${bs.tone_formal}</span>
            <span>Formal</span>
          </div>
        </div>
        <input type="range" id="tone-formal" min="0" max="100" value="${bs.tone_formal}" class="w-full" />
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="label m-0">Tecnicismo</label>
          <div class="flex items-center gap-3 text-xs" style="color:var(--text-secondary);">
            <span>Accesible</span>
            <span id="tone-clinical-val" class="font-bold" style="color:var(--accent);">${bs.tone_clinical}</span>
            <span>Clínico</span>
          </div>
        </div>
        <input type="range" id="tone-clinical" min="0" max="100" value="${bs.tone_clinical}" class="w-full" />
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="label m-0">Enfoque</label>
          <div class="flex items-center gap-3 text-xs" style="color:var(--text-secondary);">
            <span>Promocional</span>
            <span id="tone-educational-val" class="font-bold" style="color:var(--accent);">${bs.tone_educational}</span>
            <span>Educativo</span>
          </div>
        </div>
        <input type="range" id="tone-educational" min="0" max="100" value="${bs.tone_educational}" class="w-full" />
      </div>
    </div>
    <button id="save-brand-tone" class="btn-primary px-6 py-2 mt-5 font-semibold">Guardar configuración de tono</button>
  </div>

  <!-- Content pillars -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-2">Distribución de pilares de contenido</h3>
    <p class="text-sm mb-5" style="color:var(--text-secondary);">Define qué porcentaje de tu contenido dedicarás a cada pilar. El total debe sumar 100%.</p>
    <div class="space-y-4">
      ${[
        { key: 'educativo',     label: 'Educativo',      desc: 'Consejos, ejercicios, anatomía' },
        { key: 'promocional',   label: 'Promocional',    desc: 'Servicios, precios, ofertas' },
        { key: 'prueba_social', label: 'Prueba Social',  desc: 'Testimonios, casos de éxito' },
        { key: 'cultura',       label: 'Cultura clínica',desc: 'Equipo, instalaciones, detrás de escenas' },
        { key: 'comunidad',     label: 'Comunidad',      desc: 'Eventos, deporte local, comunidad CR' },
      ].map(p => `
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="label m-0">${p.label}</label>
            <div class="flex items-center gap-2">
              <input id="pillar-${p.key}" type="number" min="0" max="100"
                value="${bs.pillars[p.key] || 0}"
                class="input text-center" style="width:70px;padding:6px;font-size:1rem;font-weight:bold;color:var(--accent);" />
              <span class="text-sm" style="color:var(--text-tertiary);">%</span>
            </div>
          </div>
          <p class="text-xs mb-2" style="color:var(--text-tertiary);">${p.desc}</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${bs.pillars[p.key] || 0}%;background:var(--accent);"></div>
          </div>
        </div>
      `).join('')}
    </div>
    <button id="save-pillars" class="btn-primary px-6 py-2 mt-5 font-semibold">Guardar distribución</button>
  </div>

  <!-- Vocabulary -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-2">Vocabulario de marca</h3>
    <div class="space-y-4">
      <div>
        <label class="label">Frases preferidas (una por línea)</label>
        <textarea id="preferred-vocab" class="textarea" rows="5">${(bs.preferred_vocabulary || []).join('\n')}</textarea>
      </div>
      <div>
        <label class="label">Frases prohibidas (una por línea)</label>
        <textarea id="forbidden-phrases" class="textarea" rows="4">${(bs.forbidden_phrases || []).join('\n')}</textarea>
      </div>
    </div>
    <button id="save-vocab" class="btn-primary px-6 py-2 mt-4 font-semibold">Guardar vocabulario</button>
  </div>

  <!-- Medical disclaimers -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-2">Avisos médicos</h3>
    <div class="space-y-4">
      <div>
        <label class="label">Disclaimer médico principal</label>
        <textarea id="medical-disclaimer" class="textarea" rows="3">${bs.medical_disclaimer || ''}</textarea>
      </div>
      <div>
        <label class="label">Disclaimer de resultados</label>
        <textarea id="results-disclaimer" class="textarea" rows="2">${bs.results_disclaimer || ''}</textarea>
      </div>
    </div>
    <button id="save-disclaimers" class="btn-primary px-6 py-2 mt-4 font-semibold">Guardar avisos</button>
  </div>

  <!-- Danger zone -->
  <div class="card p-6" style="border-color:var(--error);">
    <h3 class="font-bold text-lg mb-2" style="color:var(--error);">Zona de peligro</h3>
    <p class="text-sm mb-4" style="color:var(--text-secondary);">Estas acciones son irreversibles. Se eliminarán todos los datos almacenados localmente.</p>
    <button id="clear-all-data" class="btn-ghost px-6 py-2 font-semibold" style="border-color:var(--error);color:var(--error);">
      <i class="fa-regular fa-trash-can mr-1"></i>Eliminar todos los datos
    </button>
  </div>

</div>
    `;
  },

  bindSettings() {
    // API Key
    document.getElementById('save-api-key')?.addEventListener('click', () => {
      const val = document.getElementById('api-key-input').value.trim();
      if (!val || val.includes('•')) { showToast('Ingresa una clave válida', 'warning'); return; }
      Storage.setApiKey(val);
      showToast('Clave de API guardada', 'success');
      render();
    });

    // Tone sliders
    ['tone-formal', 'tone-clinical', 'tone-educational'].forEach(id => {
      const el = document.getElementById(id);
      const valEl = document.getElementById(id + '-val');
      if (el && valEl) {
        el.addEventListener('input', () => { valEl.textContent = el.value; });
      }
    });

    document.getElementById('save-brand-tone')?.addEventListener('click', () => {
      const bs = Storage.getBrandSettings();
      bs.tone_formal = parseInt(document.getElementById('tone-formal')?.value || 50);
      bs.tone_clinical = parseInt(document.getElementById('tone-clinical')?.value || 30);
      bs.tone_educational = parseInt(document.getElementById('tone-educational')?.value || 70);
      Storage.setBrandSettings(bs);
      showToast('Configuración de tono guardada', 'success');
    });

    // Pillars
    document.getElementById('save-pillars')?.addEventListener('click', () => {
      const bs = Storage.getBrandSettings();
      const keys = ['educativo', 'promocional', 'prueba_social', 'cultura', 'comunidad'];
      let total = 0;
      const vals = {};
      keys.forEach(k => {
        const v = parseInt(document.getElementById('pillar-' + k)?.value || 0);
        vals[k] = v;
        total += v;
      });
      if (total !== 100) { showToast(`El total es ${total}%. Debe sumar exactamente 100%.`, 'warning'); return; }
      bs.pillars = vals;
      Storage.setBrandSettings(bs);
      showToast('Distribución de pilares guardada', 'success');
      render();
    });

    // Vocabulary
    document.getElementById('save-vocab')?.addEventListener('click', () => {
      const bs = Storage.getBrandSettings();
      const preferred = document.getElementById('preferred-vocab')?.value.split('\n').map(s => s.trim()).filter(Boolean) || [];
      const forbidden = document.getElementById('forbidden-phrases')?.value.split('\n').map(s => s.trim()).filter(Boolean) || [];
      bs.preferred_vocabulary = preferred;
      bs.forbidden_phrases = forbidden;
      Storage.setBrandSettings(bs);
      showToast('Vocabulario guardado', 'success');
    });

    // Disclaimers
    document.getElementById('save-disclaimers')?.addEventListener('click', () => {
      const bs = Storage.getBrandSettings();
      bs.medical_disclaimer = document.getElementById('medical-disclaimer')?.value || '';
      bs.results_disclaimer = document.getElementById('results-disclaimer')?.value || '';
      Storage.setBrandSettings(bs);
      showToast('Avisos médicos guardados', 'success');
    });

    // Clear all
    document.getElementById('clear-all-data')?.addEventListener('click', () => {
      if (confirm('¿Estás seguro? Se eliminarán TODOS los datos: borradores, calendario, campañas, configuración y estadísticas. Esta acción no se puede deshacer.')) {
        Storage.clearAll();
        showToast('Todos los datos han sido eliminados', 'info');
        render();
      }
    });
  },


};
