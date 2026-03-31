// ============================================================
// FISIOBOX AI MARKETING SUITE — UI Layer
// ============================================================

const UI = {

  // ── NAVIGATION CONFIG ──────────────────────────────────────
  navItems: [
    { id: 'dashboard',    label: 'Dashboard'              },
    { id: 'marca',        label: 'Marca'                  },
    { id: 'generator',   label: 'Generador de Contenido' },
    { id: 'repurpose',   label: 'Repropositor'           },
    { id: 'paciente',    label: 'Journey del Paciente'   },
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
      case 'marca':        return this.renderMarca();
      case 'generator':    return this.renderGenerator();
      case 'repurpose':    return this.renderRepurpose();
      case 'paciente':     return this.renderPaciente();
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
      case 'marca':        this.bindMarca();        break;
      case 'generator':    this.bindGenerator();    break;
      case 'repurpose':    this.bindRepurpose();    break;
      case 'paciente':     this.bindPaciente();     break;
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
  // MARCA (BRAND HUB) VIEW
  // ══════════════════════════════════════════════════════════
  renderMarca() {
    const tab = App._marcaTab || 'identidad';
    const bs = Storage.getBrandSettings();
    const profiles = Storage.getSocialProfiles();
    const assets = Storage.getAssets();
    const learnings = Storage.getLearnings();

    const tabs = [
      { id: 'identidad', label: 'Identidad Visual', icon: 'fa-palette'      },
      { id: 'activos',   label: 'Activos',           icon: 'fa-images'       },
      { id: 'voz',       label: 'Voz de Marca',      icon: 'fa-microphone'   },
      { id: 'canales',   label: 'Canales',           icon: 'fa-share-nodes'  },
      { id: 'hashtags',  label: 'Hashtags',          icon: 'fa-hashtag'      },
      { id: 'memoria',   label: 'Memoria',           icon: 'fa-brain'        },
    ];

    const tabContent = () => {
      if (tab === 'identidad') {
        const colors = [
          { key: 'brand_primary',   label: 'Color primario',   default: '#0ea5e9' },
          { key: 'brand_secondary', label: 'Color secundario', default: '#f97316' },
          { key: 'brand_accent',    label: 'Acento',           default: '#10b981' },
          { key: 'brand_neutral',   label: 'Neutro',           default: '#64748b' },
          { key: 'brand_bg',        label: 'Fondo',            default: '#0f1c2e' },
        ];
        const logo = assets.find(a => a.type === 'logo');
        return `
<div class="space-y-6">
  <!-- Logo -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Logo de la marca</h3>
    <p class="text-sm mb-4" style="color:var(--text-secondary);">Sube el logo principal de FisioBox. Se usará como referencia visual.</p>
    <div class="flex items-center gap-5">
      <div id="logo-preview" class="flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
        style="width:100px;height:100px;background:var(--glass-border);">
        ${logo
          ? `<img src="${logo.dataUrl}" style="width:100%;height:100%;object-fit:cover;" />`
          : `<i class="fa-regular fa-image text-2xl" style="color:var(--text-tertiary);"></i>`}
      </div>
      <div class="space-y-2">
        <label id="logo-upload-btn" class="btn-primary px-5 py-2 text-sm font-medium cursor-pointer">
          <i class="fa-solid fa-arrow-up-from-bracket mr-2"></i>${logo ? 'Reemplazar logo' : 'Subir logo'}
          <input id="logo-file-input" type="file" accept="image/*" class="hidden" />
        </label>
        ${logo ? `<button id="logo-delete-btn" class="btn-ghost px-4 py-2 text-sm" style="color:var(--error);display:block;"><i class="fa-regular fa-trash-can mr-1"></i>Eliminar</button>` : ''}
        <p class="text-xs" style="color:var(--text-tertiary);">PNG, JPG o WebP · máx. 1 MB</p>
      </div>
    </div>
  </div>

  <!-- Color palette -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Paleta de colores</h3>
    <p class="text-sm mb-5" style="color:var(--text-secondary);">Define los colores de tu identidad visual. Se adjuntan como contexto al generar contenido.</p>
    <div class="space-y-4">
      ${colors.map(c => `
      <div class="flex items-center gap-4">
        <input type="color" id="color-${c.key}" value="${bs[c.key] || c.default}"
          class="flex-shrink-0 rounded cursor-pointer" style="width:44px;height:44px;border:none;padding:2px;background:var(--glass-border);" />
        <div class="flex-1">
          <div class="font-medium text-sm mb-1">${c.label}</div>
          <input type="text" id="colorhex-${c.key}" value="${bs[c.key] || c.default}"
            class="input text-xs" style="width:100px;padding:5px 8px;font-family:monospace;" maxlength="7" />
        </div>
      </div>`).join('')}
    </div>
    <button id="save-brand-colors" class="btn-primary px-6 py-2 mt-5 font-semibold">Guardar paleta</button>
  </div>

  <!-- Visual style -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Descripción del estilo visual</h3>
    <p class="text-sm mb-3" style="color:var(--text-secondary);">Describe en pocas palabras la estética de tu marca. Ejemplo: "Limpio, deportivo, científico pero accesible, fotos de movimiento".</p>
    <textarea id="visual-style-input" class="textarea" rows="3">${bs.visual_style || ''}</textarea>
    <button id="save-visual-style" class="btn-primary px-6 py-2 mt-3 font-semibold">Guardar descripción</button>
  </div>
</div>`;
      }

      if (tab === 'activos') {
        const nonLogoAssets = assets.filter(a => a.type !== 'logo');
        const typeLabels = { photo: 'Foto de equipo', reference: 'Referencia visual', other: 'Otro' };
        return `
<div class="space-y-6">
  <!-- Upload -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Subir activo</h3>
    <p class="text-sm mb-4" style="color:var(--text-secondary);">Guarda fotos del equipo, referencias visuales o cualquier imagen de tu marca. Máx. 10 activos · 1 MB por archivo.</p>
    <div class="flex items-center gap-3 flex-wrap">
      <select id="asset-type-select" class="input" style="width:auto;">
        <option value="photo">Foto de equipo</option>
        <option value="reference">Referencia visual</option>
        <option value="other">Otro</option>
      </select>
      <label id="asset-upload-btn" class="btn-primary px-5 py-2 text-sm font-medium cursor-pointer">
        <i class="fa-solid fa-arrow-up-from-bracket mr-2"></i>Elegir imagen
        <input id="asset-file-input" type="file" accept="image/*" class="hidden" />
      </label>
    </div>
    ${nonLogoAssets.length >= 10 ? `<p class="text-xs mt-2" style="color:var(--warning);"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Has alcanzado el límite de 10 activos. Elimina uno para subir otro.</p>` : ''}
  </div>

  <!-- Asset grid -->
  ${nonLogoAssets.length === 0 ? `
  <div class="card p-10 text-center" style="color:var(--text-tertiary);">
    <i class="fa-regular fa-images text-4xl mb-3 block"></i>
    <p class="text-sm">Aún no tienes activos subidos.</p>
  </div>` : `
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    ${nonLogoAssets.map(a => `
    <div class="card p-0 overflow-hidden group">
      <div class="relative" style="aspect-ratio:4/3;background:var(--glass-border);">
        <img src="${a.dataUrl}" style="width:100%;height:100%;object-fit:cover;" />
        <button onclick="UI.deleteAssetAndRefresh('${a.id}')"
          class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-7 h-7 flex items-center justify-center"
          style="background:rgba(239,68,68,0.9);" title="Eliminar">
          <i class="fa-solid fa-xmark text-white text-xs"></i>
        </button>
      </div>
      <div class="p-3">
        <div class="text-sm font-medium truncate">${a.name}</div>
        <div class="pill mt-1 text-xs" style="background:var(--glass-border);color:var(--text-secondary);">${typeLabels[a.type] || a.type}</div>
      </div>
    </div>`).join('')}
  </div>`}
</div>`;
      }

      if (tab === 'voz') {
        const pillarDefs = [
          { key: 'educativo',     label: 'Educativo',       desc: 'Consejos, ejercicios, anatomía' },
          { key: 'promocional',   label: 'Promocional',     desc: 'Servicios, precios, ofertas' },
          { key: 'prueba_social', label: 'Prueba Social',   desc: 'Testimonios, casos de éxito' },
          { key: 'cultura',       label: 'Cultura clínica', desc: 'Equipo, instalaciones, detrás de escenas' },
          { key: 'comunidad',     label: 'Comunidad',       desc: 'Eventos, deporte local, comunidad CR' },
        ];
        return `
<div class="space-y-6">

  <!-- Brand voice description -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Descripción de la voz de marca</h3>
    <p class="text-sm mb-3" style="color:var(--text-secondary);">Describe cómo habla FisioBox: personalidad, estilo narrativo, relación con el paciente. Esta descripción se inyecta en todos los agentes de IA.</p>
    <textarea id="brand-voice-desc" class="textarea" rows="4"
      placeholder="Ej: FisioBox habla como un experto accesible — usa términos técnicos pero siempre los explica. Es cercano, motivador y honesto. Nunca promete resultados milagrosos. Trata al paciente como un deportista serio, no como un enfermo."
    >${bs.brand_voice_description || ''}</textarea>
    <button id="save-voice-desc" class="btn-primary px-6 py-2 mt-3 font-semibold">Guardar descripción</button>
  </div>

  <!-- Tone sliders -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Ajuste de tono</h3>
    <p class="text-sm mb-5" style="color:var(--text-secondary);">Calibra los matices de comunicación. Los agentes interpretan estos valores al generar contenido.</p>
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
    <button id="save-brand-tone" class="btn-primary px-6 py-2 mt-5 font-semibold">Guardar tono</button>
  </div>

  <!-- Tone preview -->
  <div class="card p-6">
    <div class="flex items-center justify-between flex-wrap gap-3 mb-2">
      <div>
        <h3 class="font-bold text-lg">Preview de voz</h3>
        <p class="text-sm" style="color:var(--text-secondary);">Genera una muestra de cómo sonará FisioBox con la configuración actual.</p>
      </div>
      <button id="btn-tone-preview" class="btn-orange px-5 py-2 text-sm font-semibold">
        <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Generar muestra
      </button>
    </div>
    <div id="tone-preview-output" class="hidden mt-4 p-4 rounded-xl" style="background:var(--glass-border);">
      <div class="text-xs font-semibold mb-2" style="color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;">
        <i class="fa-brands fa-instagram mr-1"></i>Muestra · Caption Instagram
      </div>
      <div id="tone-preview-text" class="text-sm content-output" style="max-height:none;background:none;padding:0;border:none;"></div>
    </div>
  </div>

  <!-- Content pillars -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Distribución de pilares de contenido</h3>
    <p class="text-sm mb-5" style="color:var(--text-secondary);">Define qué porcentaje de tu contenido dedicarás a cada pilar. El total debe sumar 100%.</p>
    <div class="space-y-4">
      ${pillarDefs.map(p => `
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
      </div>`).join('')}
    </div>
    <button id="save-pillars" class="btn-primary px-6 py-2 mt-5 font-semibold">Guardar distribución</button>
  </div>

  <!-- Vocabulary -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Vocabulario de marca</h3>
    <p class="text-sm mb-4" style="color:var(--text-secondary);">Los agentes evitan las frases prohibidas y priorizan las preferidas en todo el contenido generado.</p>
    <div class="space-y-4">
      <div>
        <label class="label">Frases preferidas <span style="color:var(--text-tertiary);">(una por línea)</span></label>
        <textarea id="preferred-vocab" class="textarea" rows="5">${(bs.preferred_vocabulary || []).join('\n')}</textarea>
      </div>
      <div>
        <label class="label">Frases prohibidas <span style="color:var(--text-tertiary);">(una por línea)</span></label>
        <textarea id="forbidden-phrases" class="textarea" rows="4">${(bs.forbidden_phrases || []).join('\n')}</textarea>
      </div>
    </div>
    <button id="save-vocab" class="btn-primary px-6 py-2 mt-4 font-semibold">Guardar vocabulario</button>
  </div>

  <!-- Medical disclaimers -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Avisos médicos</h3>
    <p class="text-sm mb-4" style="color:var(--text-secondary);">El agente de seguridad médica verifica que el contenido incluya estos avisos cuando es necesario.</p>
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

</div>`;
      }

      if (tab === 'canales') {
        const channelFields = [
          { key: 'instagram',       label: 'Instagram',        icon: 'fa-brands fa-instagram', placeholder: '@fisioboxcr',              help: 'Handle sin el @, ej. fisioboxcr' },
          { key: 'facebook',        label: 'Facebook',         icon: 'fa-brands fa-facebook',  placeholder: 'https://facebook.com/...',  help: 'URL completa de la página' },
          { key: 'tiktok',          label: 'TikTok',           icon: 'fa-brands fa-tiktok',    placeholder: '@fisioboxescazu',           help: 'Handle de TikTok' },
          { key: 'website',         label: 'Sitio web',        icon: 'fa-solid fa-globe',      placeholder: 'https://fisiobox.cr',       help: 'URL del sitio web principal' },
          { key: 'google_business', label: 'Google Business',  icon: 'fa-brands fa-google',    placeholder: 'FisioBox Escazú',           help: 'Nombre exacto en Google Maps' },
        ];
        return `
<div class="card p-6">
  <h3 class="font-bold text-lg mb-1">Canales activos</h3>
  <p class="text-sm mb-6" style="color:var(--text-secondary);">Los agentes de IA usan esta información para contextualizar el contenido, mencionar tu handle correcto y entender en qué canales estás presente.</p>
  <div class="space-y-5">
    ${channelFields.map(f => `
    <div>
      <label class="label flex items-center gap-2">
        <i class="${f.icon}" style="color:var(--accent);width:16px;text-align:center;"></i>${f.label}
      </label>
      <input id="channel-${f.key}" class="input" value="${profiles[f.key] || ''}" placeholder="${f.placeholder}" />
      <p class="text-xs mt-1" style="color:var(--text-tertiary);">${f.help}</p>
    </div>`).join('')}
  </div>
  <button id="save-channels" class="btn-primary px-6 py-2 mt-6 font-semibold">Guardar canales</button>
</div>`;
      }

      if (tab === 'memoria') {
        const typeLabel = { approval: 'Aprobado', rejection: 'Rechazado', note: 'Nota manual' };
        const typeColor = { approval: 'var(--success)', rejection: 'var(--error)', note: 'var(--accent)' };
        return `
<div class="space-y-6">
  <!-- Add manual note -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Añadir aprendizaje manual</h3>
    <p class="text-sm mb-3" style="color:var(--text-secondary);">Escribe notas sobre preferencias, correcciones o decisiones de marca que quieras que los agentes recuerden.</p>
    <textarea id="new-learning-input" class="textarea" rows="3" placeholder="Ej: El cliente prefiere no mencionar precios directamente. Los posts de lunes generan más engagement. Usar siempre el nombre completo 'FisioBox Escazú'."></textarea>
    <button id="add-learning-btn" class="btn-primary px-5 py-2 mt-3 text-sm font-semibold">
      <i class="fa-solid fa-plus mr-1"></i>Agregar aprendizaje
    </button>
  </div>

  <!-- Learning list -->
  <div class="card p-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-bold text-lg">Historial de aprendizajes</h3>
        <p class="text-xs mt-0.5" style="color:var(--text-tertiary);">${learnings.length} total · los últimos 10 se incluyen en todos los agentes</p>
      </div>
      ${learnings.length > 0 ? `<button id="clear-learnings-btn" class="btn-ghost px-4 py-2 text-sm" style="color:var(--error);"><i class="fa-regular fa-trash-can mr-1"></i>Limpiar</button>` : ''}
    </div>
    ${learnings.length === 0 ? `
    <div class="text-center py-8" style="color:var(--text-tertiary);">
      <i class="fa-solid fa-brain text-3xl mb-3 block"></i>
      <p class="text-sm">Aún no hay aprendizajes. Se generan automáticamente cuando apruebas contenido, o puedes añadir notas manuales.</p>
    </div>` : `
    <div class="space-y-3">
      ${[...learnings].reverse().map(l => `
      <div class="flex items-start gap-3 p-3 rounded-xl" style="background:var(--glass-border);">
        <span class="pill text-xs flex-shrink-0 mt-0.5" style="background:rgba(0,0,0,0.3);color:${typeColor[l.type] || 'var(--accent)'};">${typeLabel[l.type] || l.type}</span>
        <div class="flex-1 min-w-0">
          <p class="text-sm">${l.content}</p>
          ${l.platform ? `<span class="text-xs" style="color:var(--text-tertiary);">${l.platform} · </span>` : ''}
          <span class="text-xs" style="color:var(--text-tertiary);">${l.timestamp ? l.timestamp.slice(0, 10) : ''}</span>
        </div>
        <button onclick="Storage.deleteLearning('${l.id}');App._marcaTab='memoria';render();"
          class="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity" style="color:var(--text-tertiary);" title="Eliminar">
          <i class="fa-solid fa-xmark text-xs"></i>
        </button>
      </div>`).join('')}
    </div>`}
  </div>
</div>`;
      }
      if (tab === 'hashtags') {
        const bs2 = Storage.getBrandSettings();
        const groups = bs2.hashtag_groups || {};
        const groupNames = Object.keys(groups);
        return `
<div class="space-y-6">

  <!-- AI Suggestion Generator -->
  <div class="card p-6">
    <h3 class="font-bold text-lg mb-1">Generador de hashtags con IA</h3>
    <p class="text-sm mb-4" style="color:var(--text-secondary);">Genera hashtags estratégicos para cualquier tema y guárdalos en grupos reutilizables.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
      <div>
        <label class="label">Tema</label>
        <input id="ht-topic" class="input" type="text" placeholder="Ej: lesión de rodilla, running, CrossFit..." />
      </div>
      <div>
        <label class="label">Plataforma</label>
        <select id="ht-platform" class="select">
          <option value="Instagram">Instagram</option>
          <option value="TikTok">TikTok</option>
          <option value="Facebook">Facebook</option>
        </select>
      </div>
    </div>
    <button id="btn-ht-suggest" class="btn-primary px-6 py-2.5 text-sm font-semibold">
      <i class="fa-solid fa-wand-magic-sparkles mr-2"></i>Sugerir hashtags
    </button>
    <div id="ht-suggest-output-wrap" class="hidden mt-4">
      <div class="content-output" id="ht-suggest-output" style="max-height:300px;"></div>
      <div class="flex gap-2 mt-3 flex-wrap">
        <input id="ht-new-group-name" class="input" style="max-width:200px;"
          placeholder="Nombre del grupo (Ej: Running)" />
        <button id="btn-ht-save-group" class="btn-ghost px-4 py-2 text-sm">
          <i class="fa-regular fa-floppy-disk mr-1"></i>Guardar como grupo
        </button>
      </div>
    </div>
  </div>

  <!-- Manual group manager -->
  <div class="card p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-lg">Grupos de hashtags</h3>
      <span class="text-xs" style="color:var(--text-tertiary);">${groupNames.length} grupos · ${Object.values(groups).flat().length} hashtags</span>
    </div>

    <!-- Create new group -->
    <div class="rounded-xl p-4 mb-4" style="background:var(--glass-bg);border:1px solid var(--glass-border);">
      <label class="label">Añadir grupo manualmente</label>
      <div class="flex gap-2 mb-2">
        <input id="ht-manual-group" class="input flex-1" placeholder="Nombre del grupo" />
        <button id="btn-ht-add-group" class="btn-ghost px-4 py-2 text-sm flex-shrink-0">Crear</button>
      </div>
      <textarea id="ht-manual-tags" class="textarea" rows="2"
        placeholder="#fisioterapia #rehabilitacion #deportistas (uno por línea o separados por espacios)"></textarea>
    </div>

    ${groupNames.length === 0 ? `
    <div class="text-center py-8" style="color:var(--text-tertiary);">
      <i class="fa-solid fa-hashtag text-3xl mb-3 block opacity-30"></i>
      <p class="text-sm">Aún no hay grupos. Usa el generador de IA o añade uno manualmente.</p>
    </div>` : `
    <div class="space-y-3" id="ht-groups-list">
      ${groupNames.map(gn => {
        const tags = (groups[gn] || []);
        return `
        <div class="rounded-xl overflow-hidden" style="border:1px solid var(--glass-border);">
          <div class="flex items-center justify-between px-4 py-3" style="background:var(--glass-bg);">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-sm">${gn}</span>
              <span class="pill text-xs" style="background:rgba(14,165,233,0.12);color:var(--accent);">${tags.length} hashtags</span>
            </div>
            <div class="flex gap-2">
              <button class="btn-ghost px-3 py-1 text-xs ht-copy-group" data-group="${gn}"
                onclick="copyToClipboard('${tags.join(' ')}','Grupo ${gn}')">
                <i class="fa-regular fa-copy mr-1"></i>Copiar
              </button>
              <button class="btn-ghost px-3 py-1 text-xs ht-delete-group" data-group="${gn}"
                style="color:var(--error);">
                <i class="fa-regular fa-trash-can mr-1"></i>Eliminar
              </button>
            </div>
          </div>
          <div class="px-4 py-3 flex flex-wrap gap-1.5">
            ${tags.map(t => `<span class="pill text-xs" style="background:rgba(14,165,233,0.08);color:var(--text-secondary);">${t}</span>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>`}
  </div>
</div>`;
      }
      return '';
    };

    return `
<div class="max-w-3xl mx-auto space-y-6">
  <!-- Header -->
  <div class="card p-6" style="background:linear-gradient(135deg,rgba(14,165,233,0.1),var(--glass-bg));">
    <h2 class="text-2xl font-bold mb-1">Identidad de Marca</h2>
    <p style="color:var(--text-secondary);">Configura la identidad visual, activos, canales y memoria de los agentes de IA.</p>
  </div>

  <!-- Tabs -->
  <div class="flex gap-2 flex-wrap">
    ${tabs.map(t => `
    <button id="marca-tab-${t.id}" onclick="App._marcaTab='${t.id}';render();"
      class="px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
      style="${tab === t.id
        ? 'background:var(--accent);color:white;'
        : 'background:var(--glass-bg);color:var(--text-secondary);border:1px solid var(--glass-border);'}">
      <i class="fa-solid ${t.icon} text-xs"></i>${t.label}
    </button>`).join('')}
  </div>

  <!-- Tab content -->
  ${tabContent()}
</div>`;
  },

  deleteAssetAndRefresh(id) {
    Storage.deleteAsset(id);
    render();
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
    const pkgMode = App.generatorData.packageMode;
    return `
<div class="space-y-4">
  <!-- Mode toggle -->
  <div class="card p-4 flex items-center justify-between gap-4">
    <div>
      <div class="font-semibold text-sm">Modo Paquete <span class="pill text-xs ml-1" style="background:rgba(249,115,22,0.15);color:var(--accent-orange);">Nuevo</span></div>
      <div class="text-xs mt-0.5" style="color:var(--text-secondary);">Un tema → contenido para todas las plataformas simultáneamente</div>
    </div>
    <label class="flex items-center gap-2 cursor-pointer select-none flex-shrink-0">
      <input type="checkbox" id="pkg-mode-toggle" ${pkgMode ? 'checked' : ''} />
      <span class="text-sm font-medium">${pkgMode ? 'Activado' : 'Desactivado'}</span>
    </label>
  </div>

  ${pkgMode ? `
  <!-- Package mode: skip platform selection -->
  <div class="card p-6" style="border-color:var(--accent-orange);box-shadow:0 0 0 1px rgba(249,115,22,0.2);">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style="background:rgba(249,115,22,0.15);">
        <i class="fa-solid fa-layer-group" style="color:var(--accent-orange);"></i>
      </div>
      <div>
        <h2 class="text-lg font-bold">Modo Paquete activado</h2>
        <p class="text-sm" style="color:var(--text-secondary);">Se generará contenido para 6 formatos de una sola vez.</p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
      ${['Instagram Carrusel','Instagram Reel','Facebook Post','WhatsApp Mensaje','Blog/SEO Brief','Instagram Stories'].map(f => `
        <div class="flex items-center gap-2 p-2 rounded-lg text-sm" style="background:var(--glass-bg);border:1px solid var(--glass-border);">
          <i class="fa-solid fa-circle-check text-xs flex-shrink-0" style="color:var(--success);"></i>
          <span>${f}</span>
        </div>`).join('')}
    </div>
    <div class="flex justify-end">
      <button id="step1-pkg-next" class="btn-orange px-8 py-3 font-semibold">
        Continuar al tema →
      </button>
    </div>
  </div>
  ` : `
  <!-- Normal mode: pick platform -->
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
  `}
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
    const { platform, format, packageMode } = App.generatorData;
    const extraFields = packageMode ? '' : this.getExtraFields(platform, format);
    return `
<div class="card p-6">
  <div class="flex items-center gap-3 mb-2">
    <button id="step3-back" class="btn-ghost px-3 py-2 text-sm">← Atrás</button>
    <h2 class="text-xl font-bold">${packageMode ? 'Tema del paquete' : 'Detalles del contenido'}</h2>
    ${packageMode ? `<span class="pill text-xs" style="background:rgba(249,115,22,0.15);color:var(--accent-orange);">Modo Paquete</span>` : ''}
  </div>
  <p class="text-sm mb-6" style="color:var(--text-secondary);">${packageMode ? 'Define el tema central y se generará contenido para 6 formatos' : 'Proporciona la información para generar el contenido'}</p>
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
    ${this.renderBrandContextPanel()}
  </div>
  <div class="flex justify-between mt-6">
    <button id="step3-back" class="btn-ghost px-6 py-3">← Atrás</button>
    <button id="step3-generate" class="btn-orange px-8 py-3 font-semibold text-base">
      ${App.generatorData.packageMode ? '<i class="fa-solid fa-layer-group mr-2"></i>Generar paquete' : 'Generar contenido'}
    </button>
  </div>
</div>
    `;
  },

  renderBrandContextPanel() {
    const bs = Storage.getBrandSettings();
    const assets = Storage.getAssets().filter(a => a.type !== 'logo').slice(0, 4);
    const logo = Storage.getAssets().find(a => a.type === 'logo');
    const colors = ['brand_primary', 'brand_secondary', 'brand_accent'].map(k => bs[k]).filter(Boolean);
    const hasIdentity = colors.length > 0 || logo || bs.visual_style;
    const checked = App.generatorData.includeBrandContext;

    return `
<div class="rounded-xl overflow-hidden" style="border:1px solid var(--glass-border);">
  <button type="button" id="brand-ctx-toggle"
    class="w-full flex items-center justify-between px-4 py-3 text-left"
    style="background:var(--glass-bg);">
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-palette text-xs" style="color:var(--accent);"></i>
      <span class="font-semibold text-sm">Contexto de marca</span>
      ${hasIdentity ? `<span class="pill text-xs" style="background:rgba(14,165,233,0.15);color:var(--accent);">Identidad configurada</span>` : `<span class="text-xs" style="color:var(--text-tertiary);">Sin configurar — <a onclick="navigate('marca')" class="underline cursor-pointer">ir a Marca</a></span>`}
    </div>
    <i class="fa-solid fa-chevron-down text-xs transition-transform" id="brand-ctx-chevron"
      style="${checked ? 'transform:rotate(180deg)' : ''}"></i>
  </button>
  <div id="brand-ctx-body" class="${checked ? '' : 'hidden'}" style="padding:12px 16px 16px;border-top:1px solid var(--glass-border);">
    ${colors.length > 0 ? `
    <div class="flex items-center gap-2 mb-3">
      <span class="text-xs" style="color:var(--text-secondary);">Paleta:</span>
      ${colors.map(c => `<span title="${c}" class="rounded-md inline-block" style="width:20px;height:20px;background:${c};border:1px solid rgba(255,255,255,0.1);"></span>`).join('')}
    </div>` : ''}
    ${logo ? `<div class="flex items-center gap-2 mb-3"><img src="${logo.dataUrl}" style="width:32px;height:32px;object-fit:cover;border-radius:6px;" /><span class="text-xs" style="color:var(--text-secondary);">Logo cargado</span></div>` : ''}
    ${assets.length > 0 ? `
    <div class="flex gap-2 mb-3">
      ${assets.map(a => `<img src="${a.dataUrl}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;" title="${a.name}" />`).join('')}
      <span class="text-xs self-center" style="color:var(--text-secondary);">Activos de referencia</span>
    </div>` : ''}
    ${bs.visual_style ? `<p class="text-xs mb-3" style="color:var(--text-secondary);font-style:italic;">"${bs.visual_style}"</p>` : ''}
    <label class="flex items-center gap-2 cursor-pointer select-none">
      <input type="checkbox" id="include-brand-ctx" ${checked ? 'checked' : ''} />
      <span class="text-sm">Incluir identidad visual en la generación</span>
    </label>
    ${!hasIdentity ? `<p class="text-xs mt-2" style="color:var(--text-tertiary);">Configura colores, logo o estilo visual en <a onclick="navigate('marca')" class="underline cursor-pointer">Marca → Identidad Visual</a> para usar esta función.</p>` : ''}
  </div>
</div>`;
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
    const { platform, format, topic, packageMode } = App.generatorData;
    const formatLabel = this.formats[platform]?.find(f => f.id === format)?.label || format;
    const guide = this.getVisualGuide(platform, format);

    if (packageMode) {
      return `
<div class="space-y-5">
  <div class="card p-6">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
      <div>
        <h2 class="text-xl font-bold">Paquete de contenido</h2>
        <div class="flex items-center gap-2 mt-1">
          <span class="pill text-xs" style="background:rgba(249,115,22,0.15);color:var(--accent-orange);">Modo Paquete</span>
          <span class="text-xs" style="color:var(--text-secondary);">${topic || ''}</span>
        </div>
      </div>
      <button id="step4-back" class="btn-ghost px-4 py-2 text-sm">← Nueva generación</button>
    </div>
    <div id="package-loading" class="flex items-center gap-3 py-6" style="color:var(--text-tertiary);">
      <span class="loading-dots">Generando paquete de contenido</span>
    </div>
    <div id="package-output" class="hidden space-y-3"></div>
  </div>
</div>
      `;
    }

    return `
<div class="space-y-5">
  <!-- Content card -->
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

  <!-- Visual Guide (hidden until content is ready) -->
  <div id="visual-guide" class="hidden space-y-4">

    <!-- Static guide -->
    <div class="card p-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="fa-solid fa-clapperboard" style="color:var(--accent);"></i>
        <h3 class="font-bold text-lg">Guía de producción visual</h3>
        <span class="pill text-xs" style="background:rgba(14,165,233,0.15);color:var(--accent);">${guide.type}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div class="rounded-xl p-4" style="background:var(--glass-border);">
          <div class="text-xs font-semibold mb-1" style="color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;">Formato</div>
          <div class="font-semibold">${guide.type}</div>
          <div class="text-xs mt-1" style="color:var(--text-tertiary);">${guide.ratio}</div>
        </div>
        <div class="rounded-xl p-4" style="background:var(--glass-border);">
          <div class="text-xs font-semibold mb-1" style="color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;">Duración</div>
          <div class="font-semibold">${guide.duration}</div>
          <div class="text-xs mt-1" style="color:var(--text-tertiary);">${guide.pacing}</div>
        </div>
        <div class="rounded-xl p-4" style="background:var(--glass-border);">
          <div class="text-xs font-semibold mb-1" style="color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;">Hook recomendado</div>
          <div class="text-sm">${guide.hook}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div class="text-sm font-semibold mb-2" style="color:var(--text-primary);">
            <i class="fa-solid fa-camera mr-1" style="color:var(--accent);"></i>Qué mostrar
          </div>
          <ul class="space-y-1">
            ${guide.shots.map(s => `<li class="flex items-start gap-2 text-sm" style="color:var(--text-secondary);"><i class="fa-solid fa-check text-xs mt-1 flex-shrink-0" style="color:var(--accent);"></i>${s}</li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="text-sm font-semibold mb-2" style="color:var(--text-primary);">
            <i class="fa-solid fa-lightbulb mr-1" style="color:var(--accent-orange);"></i>Tips de producción
          </div>
          <ul class="space-y-1">
            ${guide.tips.map(t => `<li class="flex items-start gap-2 text-sm" style="color:var(--text-secondary);"><i class="fa-solid fa-circle text-xs mt-1.5 flex-shrink-0" style="color:var(--accent-orange);font-size:5px;"></i>${t}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- AI visual concepts -->
    <div class="card p-6">
      <div class="flex items-center justify-between flex-wrap gap-3 mb-2">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-wand-magic-sparkles" style="color:var(--accent-orange);"></i>
          <h3 class="font-bold text-lg">4 Conceptos Visuales con IA</h3>
        </div>
        <button id="btn-gen-visuals" class="btn-orange px-5 py-2 text-sm font-medium">
          <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Generar conceptos
        </button>
      </div>
      <p class="text-sm mb-4" style="color:var(--text-secondary);">La IA analiza tu contenido y propone 4 conceptos visuales listos para producción: escena, toma, texto en pantalla y mood.</p>
      <div id="visual-concepts-output" class="hidden content-output" style="max-height:600px;"></div>

      <!-- Image generation — revealed after concepts finish -->
      <div id="image-gen-section" class="hidden" style="border-top:1px solid var(--glass-border);margin-top:16px;padding-top:16px;">
        <div class="flex items-center justify-between flex-wrap gap-3 mb-3">
          <div>
            <div class="font-semibold text-sm flex items-center gap-2">
              <i class="fa-solid fa-image" style="color:var(--accent);"></i>Imágenes de referencia visual
            </div>
            <p class="text-xs mt-0.5" style="color:var(--text-tertiary);">Genera 4 imágenes con IA basadas en los conceptos. Powered by Flux — sin costo adicional.</p>
          </div>
          <button id="btn-gen-images" class="btn-primary px-5 py-2 text-sm font-medium">
            <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Generar 4 imágenes
          </button>
        </div>
        <div id="image-grid" class="hidden grid grid-cols-2 gap-3"></div>
      </div>
    </div>

  </div>
</div>
    `;
  },

  getVisualGuide(platform, format) {
    const guides = {
      Instagram: {
        carrusel: {
          type: 'Carrusel de imágenes',
          ratio: '1:1 (1080×1080) o 4:5 (1080×1350)',
          duration: '8–10 slides',
          pacing: 'Un concepto por slide',
          hook: 'Pregunta o dato impactante en portada',
          shots: [
            'Portada: fondo limpio + texto grande + imagen de acción o anatomía',
            'Slides 2–7: foto de ejercicio o ilustración + texto descriptivo corto',
            'Slide final: CTA claro + logo FisioBox + handle @fisioboxcr',
            'Fotos reales del equipo o pacientes activos (con permiso)',
          ],
          tips: [
            'Usa plantilla de marca consistente en todos los slides',
            'Texto legible en móvil: mínimo 24pt, contraste alto',
            'Colores primario y secundario de tu paleta en cada slide',
            'Deja márgenes seguros: no texto en los bordes',
            'Portada decide si el usuario desliza — hazla irresistible',
          ],
        },
        reel_guion: {
          type: 'Reel vertical',
          ratio: '9:16 (1080×1920)',
          duration: '15–30 s (máx 90 s)',
          pacing: 'Cortes cada 2–3 s',
          hook: 'Movimiento llamativo o texto impactante en los primeros 2 s',
          shots: [
            'Plano detalle de una técnica o zona corporal específica',
            'Plano medio del fisioterapeuta demostrando el ejercicio',
            'Reacción o progreso del paciente (antes/después en movimiento)',
            'Texto animado con el dato o tip clave en pantalla',
          ],
          tips: [
            'Filma en buena luz natural o con aro de luz — nada de sombras duras',
            'Usa tripode o estabilizador para tomas limpias',
            'Agrega subtítulos: 80 % del contenido se ve sin sonido',
            'Música trending en volumen bajo para no tapar voz',
            'Hashtags en el caption, no en pantalla',
          ],
        },
        post_caption: {
          type: 'Post estático',
          ratio: '1:1 (1080×1080) o 4:5 (1080×1350)',
          duration: 'Imagen única',
          pacing: 'Lectura en < 3 s',
          hook: 'Imagen que detiene el scroll: color, contraste o emoción',
          shots: [
            'Foto de calidad del equipo o instalación con buena iluminación',
            'Imagen de ejercicio real en contexto clínico o deportivo',
            'Diseño gráfico limpio con dato o cita destacada',
            'Antes/después de movilidad o postura (con consentimiento)',
          ],
          tips: [
            'El 40 % de la imagen puede ser espacio negativo (limpio)',
            'Un solo mensaje visual — no satures la imagen de texto',
            'Cara o mirada directa genera 30 % más engagement',
            'Paleta de máximo 3 colores por imagen',
            'Calidad mínima 72 dpi, idealmente exportar a 300 dpi',
          ],
        },
        story_serie: {
          type: 'Stories secuenciales',
          ratio: '9:16 (1080×1920)',
          duration: '5–7 stories, 7–15 s c/u',
          pacing: 'Narrativa progresiva, cliffhangers entre stories',
          hook: '"Desliza →" al final de cada story para mantener atención',
          shots: [
            'Story 1: portada con pregunta o promesa ("¿Sabes por qué...?")',
            'Stories 2–5: respuesta paso a paso, un elemento por story',
            'Incluir stickers de encuesta o pregunta para interacción',
            'Story final: CTA con enlace o "Escríbenos"',
          ],
          tips: [
            'Zona táctil segura: no pongas contenido clave en bordes ni debajo del 85 %',
            'Usa la función de texto nativo de Instagram para mayor alcance',
            'Alterna texto + imagen con video corto para dinamismo',
            'Mención de la cuenta en al menos una story para guardado',
            'Publica entre 7–9 AM o 6–8 PM según audiencia de CR',
          ],
        },
      },
      TikTok: {
        default: {
          type: 'Video vertical TikTok',
          ratio: '9:16 (1080×1920)',
          duration: '30–60 s (máx 3 min)',
          pacing: 'Cortes rápidos cada 1–2 s en hook, más lento en desarrollo',
          hook: 'Primera imagen o movimiento que sorprenda — sin intro de marca',
          shots: [
            'Hook visual: acción inmediata — sin "hola soy..." al inicio',
            'Demostración clara del ejercicio o técnica en movimiento',
            'Reacción auténtica o resultado visible',
            'Llamada a acción verbal y texto al final',
          ],
          tips: [
            'Filma nativo en TikTok o con app que preserve metadatos',
            'Usa sonidos trending antes de que saturen (primeras 48 h)',
            'Subtítulos automáticos de TikTok + corrección manual',
            'Comenta en tu propio video con info adicional para engagement',
            'Publica 2–3 veces/semana para mantener alcance orgánico',
          ],
        },
      },
      Facebook: {
        default: {
          type: 'Post o Video en Facebook',
          ratio: '1:1 o 16:9 para video',
          duration: 'Video: 1–3 min para mejor alcance orgánico',
          pacing: 'Narrativo, más pausado que Instagram/TikTok',
          hook: 'Historia personal o caso de éxito en las primeras líneas del caption',
          shots: [
            'Foto grupal del equipo o clínica para generar cercanía',
            'Video testimonial de paciente recuperado (con permiso)',
            'Infografía educativa de alta calidad',
            'Demostración de técnica con narración explicativa',
          ],
          tips: [
            'Caption más largo funciona bien en Facebook — cuenta la historia',
            'Etiqueta ubicación "FisioBox Escazú" en cada post',
            'Comparte en grupos locales de deporte en Escazú/CR',
            'Usa Facebook Events para talleres y actividades',
            'Responde comentarios en las primeras 2 h para boost de alcance',
          ],
        },
      },
      Blog: {
        default: {
          type: 'Imágenes para blog / SEO',
          ratio: '16:9 (1200×630) para portada',
          duration: '3–5 imágenes por artículo',
          pacing: 'Una imagen cada 300–400 palabras',
          hook: 'Imagen de portada con texto alt SEO y nombre de archivo descriptivo',
          shots: [
            'Imagen de portada: concepto visual del tema + texto SEO optimizado',
            'Screenshots o diagramas de ejercicios numerados',
            'Foto real del equipo FisioBox en acción',
            'Infografía resumen al final del artículo',
          ],
          tips: [
            'Nombra archivos con keywords: "fisioterapia-deportiva-escazu.jpg"',
            'Alt text descriptivo en todas las imágenes (SEO + accesibilidad)',
            'Comprime a < 200 KB sin perder calidad (usa WebP)',
            'Usa schema markup para imágenes en Google',
            'Incluye imagen de Google Business para reforzar SEO local',
          ],
        },
      },
      Ads: {
        default: {
          type: 'Creatividad para Anuncio',
          ratio: '1:1 (feed) + 9:16 (stories/reels) — siempre dos versiones',
          duration: 'Video: 6–15 s para máxima retención en anuncios',
          pacing: 'Mensaje en los primeros 3 s — sin rodeos',
          hook: 'Resultado o beneficio directo en el primer frame con texto grande',
          shots: [
            'Frame 1: problema o beneficio directo + texto de propuesta de valor',
            'Demostración rápida del servicio en < 5 s',
            'Prueba social: testimonio en texto o cara real',
            'CTA final claro: "Agenda hoy", "Primera consulta gratis"',
          ],
          tips: [
            'Texto en imagen < 20 % del área (regla Meta Ads)',
            'Sin marca en los primeros 3 s — engancha antes de identificarte',
            'Usa colores de alta saturación para destacar en feed',
            'A/B test: versión emocional vs racional del mismo concepto',
            'Logo pequeño esquina inferior — no lo hagas protagonista',
          ],
        },
      },
      WhatsApp: {
        default: {
          type: 'Imagen para WhatsApp',
          ratio: '1:1 o 4:5 — no demasiado alto',
          duration: 'Imagen única o secuencia de 3 max',
          pacing: 'Mensaje visual muy directo, sin scroll',
          hook: 'Nombre del paciente personalizado si es secuencia individual',
          shots: [
            'Imagen limpia con el ejercicio o instrucción de forma visible',
            'Infografía simple: máximo 3 puntos, texto grande',
            'Foto del terapeuta tratante para generar confianza',
            'GIF o video corto de demostración de ejercicio domiciliario',
          ],
          tips: [
            'Tamaño < 5 MB para envío fluido en WhatsApp Business',
            'Fondo blanco o muy claro para mejor lectura en cualquier pantalla',
            'Incluye marca de agua sutil del logo FisioBox',
            'Para PDFs educativos: máximo 5 páginas, diseño limpio',
            'Envía a las horas de mayor apertura: 7–9 AM o 7–9 PM',
          ],
        },
      },
    };

    const platformGuides = guides[platform] || guides.Instagram;
    return platformGuides[format] || platformGuides.default || Object.values(platformGuides)[0];
  },


  bindMarca() {
    const tab = App._marcaTab || 'identidad';

    // ── Logo upload ────────────────────────────────────────────
    document.getElementById('logo-file-input')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 1048576) { showToast('El archivo supera 1 MB', 'warning'); return; }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const existing = Storage.getAssets().find(a => a.type === 'logo');
        Storage.saveAsset({ id: existing?.id || Date.now().toString(), name: file.name, type: 'logo', dataUrl: ev.target.result });
        showToast('Logo guardado', 'success');
        render();
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('logo-delete-btn')?.addEventListener('click', () => {
      const logo = Storage.getAssets().find(a => a.type === 'logo');
      if (logo) { Storage.deleteAsset(logo.id); render(); }
    });

    // ── Brand colors ──────────────────────────────────────────
    ['brand_primary', 'brand_secondary', 'brand_accent', 'brand_neutral', 'brand_bg'].forEach(key => {
      const picker = document.getElementById(`color-${key}`);
      const hexInput = document.getElementById(`colorhex-${key}`);
      picker?.addEventListener('input', () => { if (hexInput) hexInput.value = picker.value; });
      hexInput?.addEventListener('input', () => {
        if (/^#[0-9a-fA-F]{6}$/.test(hexInput.value) && picker) picker.value = hexInput.value;
      });
    });

    document.getElementById('save-brand-colors')?.addEventListener('click', () => {
      const bs = Storage.getBrandSettings();
      ['brand_primary', 'brand_secondary', 'brand_accent', 'brand_neutral', 'brand_bg'].forEach(key => {
        const val = document.getElementById(`colorhex-${key}`)?.value;
        if (val) bs[key] = val;
      });
      Storage.setBrandSettings(bs);
      showToast('Paleta guardada', 'success');
    });

    document.getElementById('save-visual-style')?.addEventListener('click', () => {
      const bs = Storage.getBrandSettings();
      bs.visual_style = document.getElementById('visual-style-input')?.value || '';
      Storage.setBrandSettings(bs);
      showToast('Descripción guardada', 'success');
    });

    // ── Asset upload ───────────────────────────────────────────
    document.getElementById('asset-file-input')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 1048576) { showToast('El archivo supera 1 MB', 'warning'); return; }
      const nonLogo = Storage.getAssets().filter(a => a.type !== 'logo');
      if (nonLogo.length >= 10) { showToast('Límite de 10 activos alcanzado', 'warning'); return; }
      const type = document.getElementById('asset-type-select')?.value || 'other';
      const reader = new FileReader();
      reader.onload = (ev) => {
        Storage.saveAsset({ name: file.name, type, dataUrl: ev.target.result });
        showToast('Activo guardado', 'success');
        render();
      };
      reader.readAsDataURL(file);
    });

    // ── Voz de Marca ──────────────────────────────────────────
    document.getElementById('save-voice-desc')?.addEventListener('click', () => {
      const bs = Storage.getBrandSettings();
      bs.brand_voice_description = document.getElementById('brand-voice-desc')?.value || '';
      Storage.setBrandSettings(bs);
      showToast('Descripción de voz guardada', 'success');
    });

    ['tone-formal', 'tone-clinical', 'tone-educational'].forEach(id => {
      const el = document.getElementById(id);
      const valEl = document.getElementById(id + '-val');
      if (el && valEl) el.addEventListener('input', () => { valEl.textContent = el.value; });
    });

    document.getElementById('save-brand-tone')?.addEventListener('click', () => {
      const bs = Storage.getBrandSettings();
      bs.tone_formal      = parseInt(document.getElementById('tone-formal')?.value || 50);
      bs.tone_clinical    = parseInt(document.getElementById('tone-clinical')?.value || 30);
      bs.tone_educational = parseInt(document.getElementById('tone-educational')?.value || 70);
      Storage.setBrandSettings(bs);
      showToast('Tono guardado', 'success');
    });

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
      showToast('Distribución guardada', 'success');
      render();
    });

    document.getElementById('save-vocab')?.addEventListener('click', () => {
      const bs = Storage.getBrandSettings();
      bs.preferred_vocabulary = document.getElementById('preferred-vocab')?.value.split('\n').map(s => s.trim()).filter(Boolean) || [];
      bs.forbidden_phrases    = document.getElementById('forbidden-phrases')?.value.split('\n').map(s => s.trim()).filter(Boolean) || [];
      Storage.setBrandSettings(bs);
      showToast('Vocabulario guardado', 'success');
    });

    document.getElementById('save-disclaimers')?.addEventListener('click', () => {
      const bs = Storage.getBrandSettings();
      bs.medical_disclaimer = document.getElementById('medical-disclaimer')?.value || '';
      bs.results_disclaimer = document.getElementById('results-disclaimer')?.value || '';
      Storage.setBrandSettings(bs);
      showToast('Avisos guardados', 'success');
    });

    // ── Tone preview ───────────────────────────────────────────
    document.getElementById('btn-tone-preview')?.addEventListener('click', async () => {
      const btn = document.getElementById('btn-tone-preview');
      const outputWrap = document.getElementById('tone-preview-output');
      const outputEl = document.getElementById('tone-preview-text');
      const origHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Generando...';
      outputWrap.classList.remove('hidden');
      outputEl.classList.add('streaming');
      outputEl.textContent = '';
      const bs = Storage.getBrandSettings();
      let result = '';
      try {
        await Agents.tonePreview(bs, (chunk, full) => {
          result = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = renderMarkdown(result);
      } catch (err) {
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
        showToast(err.message, 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = origHTML;
      }
    });

    // ── Social channels ────────────────────────────────────────
    document.getElementById('save-channels')?.addEventListener('click', () => {
      const profiles = {};
      ['instagram', 'facebook', 'tiktok', 'website', 'google_business'].forEach(k => {
        profiles[k] = document.getElementById(`channel-${k}`)?.value.trim() || '';
      });
      Storage.setSocialProfiles(profiles);
      showToast('Canales guardados', 'success');
    });

    // ── Learnings ──────────────────────────────────────────────
    document.getElementById('add-learning-btn')?.addEventListener('click', () => {
      const text = document.getElementById('new-learning-input')?.value.trim();
      if (!text) { showToast('Escribe un aprendizaje primero', 'warning'); return; }
      Storage.addLearning({ type: 'note', content: text });
      showToast('Aprendizaje guardado', 'success');
      render();
    });

    document.getElementById('clear-learnings-btn')?.addEventListener('click', () => {
      if (confirm('¿Eliminar todos los aprendizajes? Los agentes dejarán de aplicar esta memoria.')) {
        Storage.clearLearnings();
        showToast('Historial eliminado', 'info');
        render();
      }
    });

    // ── Hashtags tab ────────────────────────────────────────────
    if (tab === 'hashtags') {
      // AI suggestion
      document.getElementById('btn-ht-suggest')?.addEventListener('click', async () => {
        const topic = document.getElementById('ht-topic')?.value?.trim();
        if (!topic) { showToast('Ingresa un tema para generar hashtags', 'warning'); return; }
        const platform = document.getElementById('ht-platform')?.value || 'Instagram';
        const btn = document.getElementById('btn-ht-suggest');
        const origHTML = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Generando...';

        const wrapEl = document.getElementById('ht-suggest-output-wrap');
        const outputEl = document.getElementById('ht-suggest-output');
        wrapEl.classList.remove('hidden');
        outputEl.classList.add('streaming');
        outputEl.textContent = '';
        let fullText = '';

        const bs = Storage.getBrandSettings();
        const existing = Object.values(bs.hashtag_groups || {}).flat();
        try {
          await Agents.hashtagSuggestions({ topic, platform, existingTags: existing }, (chunk, full) => {
            fullText = full;
            outputEl.textContent = full;
            outputEl.scrollTop = outputEl.scrollHeight;
          });
          outputEl.classList.remove('streaming');
          outputEl.innerHTML = renderMarkdown(fullText);
          // Store for saving
          outputEl.dataset.result = fullText;
        } catch (err) {
          outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
          showToast(err.message, 'error');
        } finally {
          btn.disabled = false; btn.innerHTML = origHTML;
        }
      });

      // Save AI results as a group
      document.getElementById('btn-ht-save-group')?.addEventListener('click', () => {
        const groupName = document.getElementById('ht-new-group-name')?.value?.trim();
        const outputEl = document.getElementById('ht-suggest-output');
        const text = outputEl?.dataset?.result || outputEl?.textContent || '';
        if (!groupName) { showToast('Escribe un nombre para el grupo', 'warning'); return; }
        if (!text) { showToast('Genera hashtags primero', 'warning'); return; }
        // Extract hashtags from text
        const tags = [...new Set(text.match(/#[\w\u00C0-\u017F]+/g) || [])];
        if (tags.length === 0) { showToast('No se encontraron hashtags en el resultado', 'warning'); return; }
        const bs = Storage.getBrandSettings();
        if (!bs.hashtag_groups) bs.hashtag_groups = {};
        bs.hashtag_groups[groupName] = tags;
        Storage.setBrandSettings(bs);
        showToast(`Grupo "${groupName}" guardado con ${tags.length} hashtags`, 'success');
        render();
      });

      // Manual group creation
      document.getElementById('btn-ht-add-group')?.addEventListener('click', () => {
        const groupName = document.getElementById('ht-manual-group')?.value?.trim();
        const rawTags = document.getElementById('ht-manual-tags')?.value?.trim();
        if (!groupName) { showToast('Ingresa un nombre para el grupo', 'warning'); return; }
        if (!rawTags) { showToast('Ingresa al menos un hashtag', 'warning'); return; }
        const tags = rawTags.split(/[\s\n,]+/)
          .map(t => t.startsWith('#') ? t : '#' + t)
          .filter(t => t.length > 1);
        const bs = Storage.getBrandSettings();
        if (!bs.hashtag_groups) bs.hashtag_groups = {};
        bs.hashtag_groups[groupName] = [...new Set(tags)];
        Storage.setBrandSettings(bs);
        showToast(`Grupo "${groupName}" creado`, 'success');
        render();
      });

      // Delete group
      document.querySelectorAll('.ht-delete-group').forEach(btn => {
        btn.addEventListener('click', () => {
          const groupName = btn.dataset.group;
          if (!confirm(`¿Eliminar el grupo "${groupName}"?`)) return;
          const bs = Storage.getBrandSettings();
          delete bs.hashtag_groups[groupName];
          Storage.setBrandSettings(bs);
          render();
        });
      });
    }
  },

  bindGenerator() {
    const step = App.generatorStep || 1;
    if (step === 1) this.bindGenStep1();
    else if (step === 2) this.bindGenStep2();
    else if (step === 3) this.bindGenStep3();
    else if (step === 4) this.bindGenStep4();
  },

  bindGenStep1() {
    // Package mode toggle
    document.getElementById('pkg-mode-toggle')?.addEventListener('change', (e) => {
      App.generatorData.packageMode = e.target.checked;
      document.getElementById('generator-step-content').innerHTML = this.renderGenStep1();
      this.bindGenStep1();
    });

    // Package mode: skip to step 3 directly
    document.getElementById('step1-pkg-next')?.addEventListener('click', () => {
      App.generatorStep = 3;
      document.getElementById('generator-step-content').innerHTML = this.renderGenStep3();
      this.bindGenStep3();
      this.updateStepProgress(3);
    });

    // Normal mode: platform selection
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
    // Brand context panel toggle
    document.getElementById('brand-ctx-toggle')?.addEventListener('click', () => {
      const body = document.getElementById('brand-ctx-body');
      const chevron = document.getElementById('brand-ctx-chevron');
      if (body) {
        const isHidden = body.classList.toggle('hidden');
        if (chevron) chevron.style.transform = isHidden ? '' : 'rotate(180deg)';
      }
    });
    document.getElementById('include-brand-ctx')?.addEventListener('change', (e) => {
      App.generatorData.includeBrandContext = e.target.checked;
    });

    document.querySelectorAll('#step3-back').forEach(btn => {
      btn.addEventListener('click', () => {
        // Package mode skips step 2, so go back to step 1
        if (App.generatorData.packageMode) {
          App.generatorStep = 1;
          document.getElementById('generator-step-content').innerHTML = this.renderGenStep1();
          this.bindGenStep1();
          this.updateStepProgress(1);
        } else {
          App.generatorStep = 2;
          document.getElementById('generator-step-content').innerHTML = this.renderGenStep2();
          this.bindGenStep2();
          this.updateStepProgress(2);
        }
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
        App.generatorData.includeBrandContext = document.getElementById('include-brand-ctx')?.checked || false;
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
    const { platform, format, topic, category, keywords, audience, injury, sport, goal, includeBrandContext, packageMode } = App.generatorData;
    let brief = App.generatorData.brief || '';
    if (includeBrandContext) {
      const bs = Storage.getBrandSettings();
      const parts = [];
      if (bs.brand_primary)   parts.push(`Color primario: ${bs.brand_primary}`);
      if (bs.brand_secondary) parts.push(`Color secundario: ${bs.brand_secondary}`);
      if (bs.brand_accent)    parts.push(`Acento: ${bs.brand_accent}`);
      if (bs.visual_style)    parts.push(`Estilo visual: ${bs.visual_style}`);
      if (parts.length > 0) brief += `\n\nCONTEXTO VISUAL DE MARCA: ${parts.join(' · ')}`;
    }

    // ── Package mode ───────────────────────────────────────────
    if (packageMode) {
      await this.runPackageGeneration(topic, brief, category);
      return;
    }

    const outputEl = document.getElementById('content-output');
    if (!outputEl) return;

    try {
      let generatedText = '';
      outputEl.classList.add('streaming');
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
      outputEl.classList.remove('streaming');
      outputEl.innerHTML = renderMarkdown(generatedText);
      App.generatorData.generatedContent = generatedText;

      Storage.incrementGenerated();

      const actionBtns = document.getElementById('action-buttons');
      if (actionBtns) {
        actionBtns.classList.remove('hidden');
        actionBtns.classList.add('flex');
        this.bindGenActionButtons(generatedText, platform, topic);
      }

      // Reveal visual guide section
      const visualGuide = document.getElementById('visual-guide');
      if (visualGuide) visualGuide.classList.remove('hidden');
      this.bindVisualConceptsBtn(platform, format, topic, App.generatorData.brief || '');

    } catch (err) {
      outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
      showToast(err.message, 'error');
    }
  },

  async runPackageGeneration(topic, brief, category) {
    const loadingEl = document.getElementById('package-loading');
    const outputEl = document.getElementById('package-output');
    if (!outputEl) return;

    try {
      const result = await Agents.contentPackage({ topic, brief, category });
      if (loadingEl) loadingEl.classList.add('hidden');
      outputEl.classList.remove('hidden');

      const pkg = result.parsed;
      if (!pkg || !pkg.formats) {
        // Fallback: show raw text
        outputEl.innerHTML = `<div class="content-output">${renderMarkdown(result.raw)}</div>`;
        return;
      }

      outputEl.innerHTML = `
        <div class="p-3 rounded-xl mb-3" style="background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.2);">
          <p class="text-sm font-semibold">${pkg.key_message || ''}</p>
        </div>
        ${pkg.formats.map((f, i) => `
          <div class="rounded-xl overflow-hidden" style="border:1px solid var(--glass-border);">
            <button type="button" class="pkg-card-toggle w-full flex items-center justify-between px-4 py-3 text-left"
              style="background:var(--glass-bg);" data-index="${i}">
              <div class="flex items-center gap-3">
                <span class="font-semibold text-sm">${f.format}</span>
                <span class="pill text-xs" style="background:var(--glass-border);color:var(--text-secondary);">${f.platform}</span>
              </div>
              <div class="flex items-center gap-2">
                <button class="btn-ghost px-3 py-1 text-xs pkg-copy-btn" data-index="${i}"
                  onclick="event.stopPropagation();copyToClipboard(this.dataset.content,'${f.format}');"
                  data-content="${(f.content || '').replace(/"/g,'&quot;')}">
                  <i class="fa-regular fa-copy mr-1"></i>Copiar
                </button>
                <i class="fa-solid fa-chevron-down text-xs transition-transform" id="pkg-chevron-${i}"></i>
              </div>
            </button>
            <div id="pkg-body-${i}" class="hidden px-4 pb-4 pt-3" style="border-top:1px solid var(--glass-border);">
              <div class="content-output" style="max-height:350px;">${renderMarkdown(f.content || '')}</div>
              ${f.notes ? `<p class="text-xs mt-2 italic" style="color:var(--text-tertiary);">${f.notes}</p>` : ''}
              <div class="flex gap-2 mt-3">
                <button class="btn-ghost px-3 py-1 text-xs"
                  onclick="UI.savePkgFormatToDraft('${topic}','${f.format}','${f.platform}',${i})">
                  <i class="fa-regular fa-floppy-disk mr-1"></i>Guardar borrador
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      `;

      // Open first card by default
      const firstBody = document.getElementById('pkg-body-0');
      const firstChevron = document.getElementById('pkg-chevron-0');
      if (firstBody) { firstBody.classList.remove('hidden'); if (firstChevron) firstChevron.style.transform = 'rotate(180deg)'; }

      // Bind accordion toggles
      document.querySelectorAll('.pkg-card-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = btn.dataset.index;
          const body = document.getElementById(`pkg-body-${idx}`);
          const chevron = document.getElementById(`pkg-chevron-${idx}`);
          if (body) {
            const hidden = body.classList.toggle('hidden');
            if (chevron) chevron.style.transform = hidden ? '' : 'rotate(180deg)';
          }
        });
      });

      Storage.incrementGenerated();
    } catch (err) {
      if (loadingEl) loadingEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
      showToast(err.message, 'error');
    }
  },

  savePkgFormatToDraft(topic, format, platform, index) {
    const body = document.getElementById(`pkg-body-${index}`);
    const content = body?.querySelector('.content-output')?.textContent || '';
    if (!content) return;
    Storage.saveDraft({ title: `${topic} — ${format}`, platform, format, topic, content, status: 'draft', category: 'educativo' });
    showToast(`Borrador guardado: ${format}`, 'success');
  },

  bindVisualConceptsBtn(platform, format, topic, brief) {
    const btn = document.getElementById('btn-gen-visuals');
    const outputEl = document.getElementById('visual-concepts-output');
    if (!btn || !outputEl) return;
    btn.addEventListener('click', async () => {
      const origHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Generando...';
      outputEl.classList.remove('hidden');
      outputEl.classList.add('streaming');
      outputEl.textContent = '';
      let result = '';
      try {
        await Agents.visualConcepts({ platform, format, topic, brief }, (chunk, full) => {
          result = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = renderMarkdown(result);
        // Reveal image generation section and wire button
        document.getElementById('image-gen-section')?.classList.remove('hidden');
        this.bindImageGenerationBtn(result, topic);
      } catch (err) {
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
        showToast(err.message, 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = origHTML;
      }
    });
  },

  bindImageGenerationBtn(conceptsText, topic) {
    const btn = document.getElementById('btn-gen-images');
    const grid = document.getElementById('image-grid');
    if (!btn || !grid) return;

    btn.addEventListener('click', async () => {
      const origHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Extrayendo prompts...';

      try {
        // Step 1: Extract 4 image prompts from concepts text
        const prompts = await Agents.extractImagePrompts(conceptsText, topic);

        // Step 2: Show skeleton grid
        grid.classList.remove('hidden');
        grid.innerHTML = prompts.map((p, i) => `
          <div id="img-card-${i}" class="rounded-xl overflow-hidden relative" style="aspect-ratio:16/9;background:var(--glass-border);">
            <div id="img-skeleton-${i}" class="absolute inset-0 flex flex-col items-center justify-center gap-2" style="color:var(--text-tertiary);">
              <i class="fa-solid fa-spinner fa-spin text-xl"></i>
              <span class="text-xs">Generando imagen ${i + 1}...</span>
            </div>
          </div>`).join('');

        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Generando imágenes...';

        // Step 3: Load images in parallel
        await Promise.allSettled(prompts.map((prompt, i) =>
          Agents.loadPollinationsImage(prompt, i).then(url => {
            const card = document.getElementById(`img-card-${i}`);
            const skeleton = document.getElementById(`img-skeleton-${i}`);
            if (!card) return;
            if (skeleton) skeleton.remove();
            const img = document.createElement('img');
            img.src = url;
            img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
            img.alt = `Concepto visual ${i + 1}`;
            card.appendChild(img);
            // Download overlay on hover
            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 flex items-end p-2 opacity-0 hover:opacity-100 transition-opacity';
            overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)';
            overlay.innerHTML = `
              <a href="${url}" download="fisiobox-concepto-${i + 1}.jpg" target="_blank"
                class="btn-ghost px-3 py-1 text-xs" style="color:white;border-color:rgba(255,255,255,0.4);">
                <i class="fa-solid fa-download mr-1"></i>Descargar
              </a>`;
            card.appendChild(overlay);
          }).catch(() => {
            const skeleton = document.getElementById(`img-skeleton-${i}`);
            if (skeleton) skeleton.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i><span class="text-xs mt-1">Error</span>';
          })
        ));

        btn.innerHTML = '<i class="fa-solid fa-rotate-right mr-1"></i>Regenerar';
        btn.disabled = false;
      } catch (err) {
        showToast(err.message, 'error');
        btn.disabled = false;
        btn.innerHTML = origHTML;
      }
    });
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
      outputEl.classList.add('streaming');
      let planText = '';
      try {
        await Agents.generateCalendarPlan({ weeks: 4, primaryPlatform: 'Instagram' }, (chunk, full) => {
          planText = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = renderMarkdown(planText);
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
      const prevStatus = draft.status;
      Storage.saveDraft({ ...draft, status });
      if ((status === 'approved' || status === 'published') && prevStatus !== status) {
        Storage.addLearning({
          type: 'approval',
          platform: draft.platform,
          content: `Contenido ${status === 'published' ? 'publicado' : 'aprobado'} en ${draft.platform}: "${draft.title || draft.topic}"${draft.category ? ` (categoría: ${draft.category})` : ''}`
        });
      }
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
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Reportes anteriores</h3>
        <span class="text-xs" style="color:var(--text-tertiary);">${analyticsData.length} guardados</span>
      </div>
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

  <!-- Performance Coach (requires ≥ 2 historical reports) -->
  ${analyticsData.length >= 2 ? `
    <div class="card p-6" style="background:linear-gradient(135deg,rgba(16,185,129,0.08),var(--glass-bg));border-color:rgba(16,185,129,0.3);">
      <div class="flex items-start gap-4 mb-4">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style="background:rgba(16,185,129,0.15);">
          <i class="fa-solid fa-trophy" style="color:var(--success);font-size:16px;"></i>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-0.5">Coach de Rendimiento</h3>
          <p class="text-sm" style="color:var(--text-secondary);">Analiza tus ${analyticsData.length} reportes guardados para identificar patrones, tendencias y recomendaciones acumuladas.</p>
        </div>
      </div>
      <button id="btn-performance-coach" class="btn-primary px-6 py-2.5 text-sm font-semibold">
        <i class="fa-solid fa-brain mr-2"></i>Analizar historial completo
      </button>
      <div id="coach-output-wrap" class="hidden mt-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold" style="color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;">Insights acumulados</span>
          <button class="btn-ghost px-3 py-1 text-xs" onclick="copyOutputContent('coach-output')">
            <i class="fa-regular fa-copy mr-1"></i>Copiar
          </button>
        </div>
        <div id="coach-output" class="content-output" style="max-height:450px;"></div>
      </div>
    </div>
  ` : analyticsData.length === 1 ? `
    <div class="card p-4 flex items-center gap-3" style="border-color:rgba(16,185,129,0.2);">
      <i class="fa-solid fa-trophy text-xl flex-shrink-0" style="color:rgba(16,185,129,0.4);"></i>
      <p class="text-sm" style="color:var(--text-secondary);">Guarda <strong>al menos 2 reportes</strong> para desbloquear el Coach de Rendimiento con análisis de patrones acumulados.</p>
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
      outputEl.classList.add('streaming');
      try {
        await Agents.analytics(metricsText, (chunk, full) => {
          fullText = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = renderMarkdown(fullText);

        document.getElementById('copy-analytics')?.addEventListener('click', () => copyToClipboard(fullText, 'Análisis'));
        document.getElementById('save-analytics')?.addEventListener('click', () => {
          Storage.saveAnalyticsEntry({ summary: 'Reporte ' + new Date().toLocaleDateString('es-CR'), content: fullText });
          showToast('Reporte guardado', 'success');
          render();
        });
      } catch (err) {
        outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
        showToast(err.message, 'error');
      } finally {
        btn.textContent = 'Analizar con IA';
        btn.disabled = false;
      }
    });

    // ── Performance Coach ──────────────────────────────────────
    document.getElementById('btn-performance-coach')?.addEventListener('click', async () => {
      const entries = Storage.getAnalyticsData();
      if (entries.length < 2) { showToast('Necesitas al menos 2 reportes guardados', 'warning'); return; }
      const btn = document.getElementById('btn-performance-coach');
      const origHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Analizando historial...';

      const wrapEl = document.getElementById('coach-output-wrap');
      const outputEl = document.getElementById('coach-output');
      wrapEl.classList.remove('hidden');
      outputEl.classList.add('streaming');
      outputEl.textContent = '';
      let fullText = '';

      try {
        await Agents.performanceCoach(entries, (chunk, full) => {
          fullText = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = renderMarkdown(fullText);
      } catch (err) {
        outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
        showToast(err.message, 'error');
      } finally {
        btn.disabled = false; btn.innerHTML = origHTML;
      }
    });
  },


  // ══════════════════════════════════════════════════════════
  // INTELLIGENCE VIEW
  // ══════════════════════════════════════════════════════════
  renderIntelligence() {
    const activeTab = App._intelTab || 'tendencias';
    const tools = [
      { id: 'tendencias',   label: 'Tendencias',   icon: 'fa-microphone',    color: 'var(--accent)',        colorRaw: '#0ea5e9' },
      { id: 'competencia',  label: 'Competencia',  icon: 'fa-chart-line',    color: 'var(--error)',         colorRaw: '#ff453a' },
      { id: 'seo',          label: 'SEO',           icon: 'fa-magnifying-glass', color: 'var(--success)',   colorRaw: '#30d158' },
      { id: 'rtp',          label: 'RTP',           icon: 'fa-person-running', color: 'var(--accent-orange)', colorRaw: '#f97316' },
      { id: 'testimonios',  label: 'Testimonios',  icon: 'fa-star',          color: '#ec4899',              colorRaw: '#ec4899' },
    ];
    const active = tools.find(t => t.id === activeTab);

    const tabContent = () => {

      if (activeTab === 'tendencias') return `
<div class="space-y-5">
  <div class="rounded-xl p-4" style="background:rgba(10,132,255,0.07);border:1px solid rgba(10,132,255,0.2);">
    <p class="text-sm font-semibold mb-1" style="color:var(--accent);">Qué obtendrás</p>
    <ul class="space-y-1 text-sm" style="color:var(--text-secondary);">
      ${['Temas de alto interés esta semana en fisio y deporte','Formatos y ángulos de contenido recomendados','Sugerencias de hashtags y horarios de publicación'].map(i => `<li class="flex items-start gap-2"><i class="fa-solid fa-circle-check mt-0.5 flex-shrink-0 text-xs" style="color:var(--success);"></i>${i}</li>`).join('')}
    </ul>
  </div>
  <div>
    <label class="label">Contexto de la semana <span style="color:var(--text-tertiary);font-weight:400;">(opcional)</span></label>
    <input id="listener-context" class="input mb-3" type="text"
      placeholder="Ej: inicio temporada fútbol, semana del back to school, torneo nacional..." />
    <button id="run-listener" class="btn-primary w-full py-2.5 text-sm font-semibold">
      <i class="fa-solid fa-microphone mr-2"></i>Analizar tendencias
    </button>
  </div>
  <div id="listener-output-wrap" class="hidden">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-semibold" style="color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;">Resultado</span>
      <button class="btn-ghost px-3 py-1 text-xs" onclick="copyOutputContent('listener-output')"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
    </div>
    <div id="listener-output" class="content-output" style="min-height:200px;"></div>
  </div>
</div>`;

      if (activeTab === 'competencia') return `
<div class="space-y-5">
  <div class="rounded-xl p-4" style="background:rgba(255,69,58,0.07);border:1px solid rgba(255,69,58,0.2);">
    <p class="text-sm font-semibold mb-1" style="color:var(--error);">Qué obtendrás</p>
    <ul class="space-y-1 text-sm" style="color:var(--text-secondary);">
      ${['Fortalezas y debilidades de la competencia local','Brechas de contenido que nadie está cubriendo','Oportunidades de diferenciación para FisioBox'].map(i => `<li class="flex items-start gap-2"><i class="fa-solid fa-circle-check mt-0.5 flex-shrink-0 text-xs" style="color:var(--success);"></i>${i}</li>`).join('')}
    </ul>
  </div>
  <div>
    <label class="label">Novedades del mercado <span style="color:var(--text-tertiary);font-weight:400;">(opcional)</span></label>
    <input id="competitor-context" class="input mb-3" type="text"
      placeholder="Ej: abrió nueva clínica en Escazú, clínica X publicó mucho sobre rodilla..." />
    <button id="run-competitor" class="btn-primary w-full py-2.5 text-sm font-semibold" style="background:var(--error);">
      <i class="fa-solid fa-chart-line mr-2"></i>Analizar competencia
    </button>
  </div>
  <div id="competitor-output-wrap" class="hidden">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-semibold" style="color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;">Resultado</span>
      <button class="btn-ghost px-3 py-1 text-xs" onclick="copyOutputContent('competitor-output')"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
    </div>
    <div id="competitor-output" class="content-output" style="min-height:200px;"></div>
  </div>
</div>`;

      if (activeTab === 'seo') return `
<div class="space-y-5">
  <div class="rounded-xl p-4" style="background:rgba(48,209,88,0.07);border:1px solid rgba(48,209,88,0.2);">
    <p class="text-sm font-semibold mb-1" style="color:var(--success);">Qué obtendrás</p>
    <ul class="space-y-1 text-sm" style="color:var(--text-secondary);">
      ${['Palabras clave de alto valor para Escazú y CR','Brief completo listo para redactar el artículo','Post optimizado para Google Business Profile'].map(i => `<li class="flex items-start gap-2"><i class="fa-solid fa-circle-check mt-0.5 flex-shrink-0 text-xs" style="color:var(--success);"></i>${i}</li>`).join('')}
    </ul>
  </div>
  <div class="space-y-4">
    <div>
      <label class="label">Tema a posicionar</label>
      <input id="seo-topic" class="input" type="text"
        placeholder="Ej: fisioterapia de rodilla para runners en Escazú" />
    </div>
    <div>
      <label class="label">¿Qué quieres generar?</label>
      <select id="seo-type" class="select">
        <option value="blog_brief">Brief para artículo de blog (SEO)</option>
        <option value="google_business">Post para Google Business Profile</option>
      </select>
    </div>
    <button id="run-seo" class="btn-primary w-full py-2.5 text-sm font-semibold" style="background:var(--success);">
      <i class="fa-solid fa-magnifying-glass mr-2"></i>Generar estrategia SEO
    </button>
  </div>
  <div id="seo-output-wrap" class="hidden">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-semibold" style="color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;">Resultado</span>
      <button class="btn-ghost px-3 py-1 text-xs" onclick="copyOutputContent('seo-output')"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
    </div>
    <div id="seo-output" class="content-output" style="min-height:200px;"></div>
  </div>
</div>`;

      if (activeTab === 'rtp') return `
<div class="space-y-5">
  <div class="rounded-xl p-4" style="background:rgba(249,115,22,0.07);border:1px solid rgba(249,115,22,0.2);">
    <p class="text-sm font-semibold mb-1" style="color:var(--accent-orange);">Qué obtendrás</p>
    <ul class="space-y-1 text-sm" style="color:var(--text-secondary);">
      ${['Contenido clínico validado para pacientes deportistas','Artículos, carruseles o guiones de reel listos para publicar','Diferenciación como expertos en lesiones deportivas'].map(i => `<li class="flex items-start gap-2"><i class="fa-solid fa-circle-check mt-0.5 flex-shrink-0 text-xs" style="color:var(--success);"></i>${i}</li>`).join('')}
    </ul>
  </div>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="label">Deporte</label>
        <input id="rtp-sport" class="input" type="text" placeholder="Fútbol, Running, CrossFit..." />
      </div>
      <div>
        <label class="label">Lesión</label>
        <input id="rtp-injury" class="input" type="text" placeholder="LCA, esguince, hombro..." />
      </div>
    </div>
    <div>
      <label class="label">Etapa de recuperación</label>
      <select id="rtp-phase" class="select">
        <option value="">Todas las etapas (visión general)</option>
        <option value="Fase aguda / primeras 48-72h">Fase 1 — Lesión aguda (primeras 48-72h)</option>
        <option value="Rehabilitación funcional">Fase 2 — Rehabilitación funcional</option>
        <option value="Retorno al entrenamiento">Fase 3 — Retorno al entrenamiento</option>
        <option value="Retorno a la competencia">Fase 4 — Retorno a la competencia</option>
      </select>
    </div>
    <div>
      <label class="label">Formato de contenido</label>
      <select id="rtp-format" class="select">
        <option value="carrusel educativo">Carrusel educativo (Instagram)</option>
        <option value="post informativo">Post informativo (Instagram/Facebook)</option>
        <option value="guión reel">Guión de Reel (60s)</option>
        <option value="artículo blog">Artículo de blog (SEO)</option>
      </select>
    </div>
    <button id="run-rtp" class="btn-orange w-full py-2.5 text-sm font-semibold">
      <i class="fa-solid fa-person-running mr-2"></i>Generar contenido RTP
    </button>
  </div>
  <div id="rtp-output-wrap" class="hidden">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-semibold" style="color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;">Resultado</span>
      <button class="btn-ghost px-3 py-1 text-xs" onclick="copyOutputContent('rtp-output')"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
    </div>
    <div id="rtp-output" class="content-output" style="min-height:200px;"></div>
  </div>
</div>`;

      if (activeTab === 'testimonios') return `
<div class="space-y-5">
  <div class="rounded-xl p-4" style="background:rgba(236,72,153,0.07);border:1px solid rgba(236,72,153,0.2);">
    <p class="text-sm font-semibold mb-1" style="color:#ec4899;">Qué obtendrás</p>
    <ul class="space-y-1 text-sm" style="color:var(--text-secondary);">
      ${['Carrusel de 6 slides con historia del paciente','Script de Reel 30–60s listo para grabar','Post de Facebook narrativo + guía de entrevista'].map(i => `<li class="flex items-start gap-2"><i class="fa-solid fa-circle-check mt-0.5 flex-shrink-0 text-xs" style="color:var(--success);"></i>${i}</li>`).join('')}
    </ul>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="label">Deporte</label>
        <input id="test-sport" class="input" type="text" placeholder="Fútbol, Running..." />
      </div>
      <div>
        <label class="label">Lesión</label>
        <input id="test-injury" class="input" type="text" placeholder="LCA, esguince..." />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="label">Duración del tto.</label>
        <input id="test-duration" class="input" type="text" placeholder="8 semanas..." />
      </div>
      <div>
        <label class="label">Resultado clave</label>
        <input id="test-outcome" class="input" type="text" placeholder="Regresó a competir..." />
      </div>
    </div>
    <div class="md:col-span-2">
      <label class="label">Contexto adicional <span style="color:var(--text-tertiary);font-weight:400;">(opcional)</span></label>
      <input id="test-context" class="input" type="text"
        placeholder="Edad aproximada, nivel deportivo, particularidades del caso..." />
    </div>
  </div>
  <button id="run-testimonial" class="w-full py-2.5 text-sm font-semibold rounded-xl text-white"
    style="background:linear-gradient(135deg,#ec4899,#8b5cf6);">
    <i class="fa-solid fa-star mr-2"></i>Generar paquete de testimonio
  </button>
  <div id="testimonial-output-wrap" class="hidden">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-semibold" style="color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;">Resultado</span>
      <button class="btn-ghost px-3 py-1 text-xs" onclick="copyOutputContent('testimonial-output')"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
    </div>
    <div id="testimonial-output" class="content-output" style="min-height:200px;"></div>
  </div>
</div>`;

      return '';
    };

    return `
<div class="max-w-3xl mx-auto space-y-5">

  <!-- Header -->
  <div class="card p-5">
    <h2 class="text-xl font-bold mb-0.5">Centro de Inteligencia</h2>
    <p class="text-sm" style="color:var(--text-secondary);">Cinco herramientas especializadas para análisis, SEO, competencia y creación de contenido clínico.</p>
  </div>

  <!-- Tab bar -->
  <div class="card p-2">
    <div class="flex gap-1 overflow-x-auto">
      ${tools.map(t => `
        <button onclick="App._intelTab='${t.id}';render();"
          class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-shrink-0"
          style="${t.id === activeTab
            ? `background:${t.colorRaw}18;color:${t.colorRaw};border:1px solid ${t.colorRaw}40;`
            : 'background:transparent;color:var(--text-secondary);border:1px solid transparent;'}">
          <i class="fa-solid ${t.icon} text-xs"></i>
          ${t.label}
        </button>
      `).join('')}
    </div>
  </div>

  <!-- Active tool panel -->
  <div class="card p-6">
    <!-- Tool heading -->
    <div class="flex items-center gap-3 mb-5 pb-4" style="border-bottom:1px solid var(--glass-border);">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style="background:${active.colorRaw}18;">
        <i class="fa-solid ${active.icon}" style="color:${active.colorRaw};font-size:16px;"></i>
      </div>
      <div>
        <h3 class="font-bold" style="font-size:16px;">${
          activeTab === 'tendencias'  ? 'Tendencias de la Semana' :
          activeTab === 'competencia' ? 'Análisis de la Competencia' :
          activeTab === 'seo'         ? 'Posicionamiento en Google' :
          activeTab === 'rtp'         ? 'Contenido de Recuperación Deportiva' :
                                        'Taller de Testimonios'
        }</h3>
        <p class="text-xs mt-0.5" style="color:var(--text-tertiary);">${
          activeTab === 'tendencias'  ? 'Ideal: inicio de semana' :
          activeTab === 'competencia' ? 'Ideal: revisión trimestral' :
          activeTab === 'seo'         ? 'Ideal: antes de publicar blog' :
          activeTab === 'rtp'         ? 'Diferenciador clave de FisioBox' :
                                        'Convierte casos en contenido'
        }</p>
      </div>
    </div>
    ${tabContent()}
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
        const wrapEl = document.getElementById(outputId + '-wrap');
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Procesando...';
        wrapEl?.classList.remove('hidden');
        outputEl.classList.remove('hidden');
        outputEl.innerHTML = '<span class="loading-dots">Procesando</span>';
        outputEl.classList.add('streaming');
        let resultText = '';
        try {
          await agentFn((chunk, full) => {
            resultText = full;
            outputEl.textContent = full;
            outputEl.scrollTop = outputEl.scrollHeight;
          });
          outputEl.classList.remove('streaming');
          outputEl.innerHTML = renderMarkdown(resultText);
        } catch (err) {
          outputEl.classList.remove('streaming');
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

    // ── Testimonial Workshop ────────────────────────────────────
    document.getElementById('run-testimonial')?.addEventListener('click', async () => {
      const sport   = document.getElementById('test-sport')?.value?.trim();
      const injury  = document.getElementById('test-injury')?.value?.trim();
      const duration = document.getElementById('test-duration')?.value?.trim();
      const outcome = document.getElementById('test-outcome')?.value?.trim();
      if (!sport || !injury || !duration || !outcome) {
        showToast('Por favor completa deporte, lesión, duración y resultado', 'warning');
        return;
      }
      const patientContext = document.getElementById('test-context')?.value?.trim() || '';
      const btn = document.getElementById('run-testimonial');
      const origHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Generando paquete...';

      const wrapEl = document.getElementById('testimonial-output-wrap');
      const outputEl = document.getElementById('testimonial-output');
      wrapEl.classList.remove('hidden');
      outputEl.classList.add('streaming');
      outputEl.innerHTML = '<span class="loading-dots">Creando paquete de testimonio</span>';
      let fullText = '';

      try {
        await Agents.testimonialWorkshop({ sport, injury, duration, outcome, patientContext }, (chunk, full) => {
          fullText = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = renderMarkdown(fullText);
      } catch (err) {
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
        showToast(err.message, 'error');
      } finally {
        btn.disabled = false; btn.innerHTML = origHTML;
      }
    });
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
      outputEl.classList.add('streaming');
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
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = renderMarkdown(generatedWA);

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
  // REPURPOSE VIEW
  // ══════════════════════════════════════════════════════════
  renderRepurpose() {
    const drafts = Storage.getDrafts().filter(d => d.content).slice(0, 20);
    const targetPlatforms = [
      { id: 'Instagram', label: 'Instagram', icon: 'fa-brands fa-instagram' },
      { id: 'TikTok',    label: 'TikTok',    icon: 'fa-brands fa-tiktok'    },
      { id: 'Facebook',  label: 'Facebook',  icon: 'fa-brands fa-facebook'  },
      { id: 'Blog',      label: 'Blog/SEO',  icon: 'fa-solid fa-rss'        },
      { id: 'WhatsApp',  label: 'WhatsApp',  icon: 'fa-brands fa-whatsapp'  },
      { id: 'Ads',       label: 'Ads',       icon: 'fa-solid fa-rectangle-ad'},
    ];
    return `
<div class="max-w-3xl mx-auto space-y-6">
  <div class="card p-6" style="background:linear-gradient(135deg,rgba(14,165,233,0.08),var(--glass-bg));">
    <h2 class="text-xl font-bold mb-1">Repropositor de Contenido</h2>
    <p class="text-sm" style="color:var(--text-secondary);">Toma contenido existente y adáptalo para otra plataforma en segundos — manteniendo el mensaje, cambiando el formato.</p>
  </div>

  <!-- Source content -->
  <div class="card p-6">
    <h3 class="font-semibold mb-4">1. Contenido de origen</h3>
    ${drafts.length > 0 ? `
    <div class="mb-3">
      <label class="label">Importar desde Biblioteca</label>
      <select id="repurpose-draft-select" class="select">
        <option value="">— Selecciona un borrador —</option>
        ${drafts.map(d => `<option value="${d.id}">${d.title || d.topic || 'Sin título'} (${d.platform || '?'})</option>`).join('')}
      </select>
    </div>
    <div class="text-center text-xs py-1" style="color:var(--text-tertiary);">— o escribe directamente —</div>
    ` : ''}
    <div class="mt-3">
      <label class="label">Contenido original</label>
      <textarea id="repurpose-source" class="textarea" rows="7"
        placeholder="Pega aquí el texto original que quieres adaptar — caption, artículo, guión..."></textarea>
    </div>
  </div>

  <!-- Target platform -->
  <div class="card p-6">
    <h3 class="font-semibold mb-4">2. Plataforma de destino</h3>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-3" id="repurpose-platform-grid">
      ${targetPlatforms.map(p => `
        <button data-platform="${p.id}" class="repurpose-platform-btn card p-3 text-center transition-all hover:scale-105">
          <i class="${p.icon}" style="font-size:1.3rem;color:var(--accent);"></i>
          <div class="text-xs mt-1.5 font-medium">${p.label}</div>
        </button>
      `).join('')}
    </div>
    <div id="repurpose-format-row" class="hidden mt-4">
      <label class="label">Formato específico <span style="color:var(--text-tertiary);font-weight:400;">(opcional)</span></label>
      <input id="repurpose-target-format" class="input" type="text"
        placeholder="Ej: Reel 30s, Carrusel 6 slides, Post corto..." />
    </div>
  </div>

  <!-- Generate -->
  <div class="flex justify-end">
    <button id="btn-repurpose" class="btn-orange px-8 py-3 font-semibold text-base" disabled>
      <i class="fa-solid fa-arrows-rotate mr-2"></i>Repropositar contenido
    </button>
  </div>

  <!-- Output -->
  <div id="repurpose-output-section" class="hidden">
    <div class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Contenido adaptado</h3>
        <div class="flex gap-2">
          <button id="repurpose-copy" class="btn-ghost px-4 py-2 text-sm"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
          <button id="repurpose-save" class="btn-ghost px-4 py-2 text-sm"><i class="fa-regular fa-floppy-disk mr-1"></i>Guardar borrador</button>
        </div>
      </div>
      <div id="repurpose-output" class="content-output" style="min-height:200px;"></div>
    </div>
  </div>
</div>
    `;
  },

  bindRepurpose() {
    const drafts = Storage.getDrafts().filter(d => d.content);
    let selectedPlatform = '';

    // Import from library
    document.getElementById('repurpose-draft-select')?.addEventListener('change', (e) => {
      const draft = drafts.find(d => d.id === e.target.value);
      if (draft) document.getElementById('repurpose-source').value = draft.content || '';
    });

    // Platform selection
    document.querySelectorAll('.repurpose-platform-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedPlatform = btn.dataset.platform;
        document.querySelectorAll('.repurpose-platform-btn').forEach(b => {
          b.style.borderColor = '';
          b.classList.remove('card-selected');
        });
        btn.style.borderColor = '#f97316';
        btn.classList.add('card-selected');
        document.getElementById('repurpose-format-row').classList.remove('hidden');
        document.getElementById('btn-repurpose').disabled = false;
      });
    });

    // Generate
    document.getElementById('btn-repurpose')?.addEventListener('click', async () => {
      const content = document.getElementById('repurpose-source')?.value?.trim();
      if (!content) { showToast('Por favor ingresa contenido de origen', 'warning'); return; }
      if (!selectedPlatform) { showToast('Selecciona una plataforma de destino', 'warning'); return; }

      const targetFormat = document.getElementById('repurpose-target-format')?.value?.trim() || '';
      const btn = document.getElementById('btn-repurpose');
      const origHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Adaptando...';

      const section = document.getElementById('repurpose-output-section');
      const outputEl = document.getElementById('repurpose-output');
      section.classList.remove('hidden');
      outputEl.classList.add('streaming');
      outputEl.textContent = '';
      let fullText = '';

      try {
        await Agents.repurpose({ content, targetPlatform: selectedPlatform, targetFormat }, (chunk, full) => {
          fullText = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = renderMarkdown(fullText);

        document.getElementById('repurpose-copy')?.addEventListener('click', () => copyToClipboard(fullText, 'Contenido adaptado'));
        document.getElementById('repurpose-save')?.addEventListener('click', () => {
          Storage.saveDraft({ title: `Repropuesto para ${selectedPlatform}`, platform: selectedPlatform, content: fullText, status: 'draft', category: 'educativo' });
          showToast('Borrador guardado', 'success');
        });
      } catch (err) {
        outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
        showToast(err.message, 'error');
      } finally {
        btn.innerHTML = origHTML;
        btn.disabled = false;
      }
    });
  },


  // ══════════════════════════════════════════════════════════
  // PATIENT JOURNEY VIEW
  // ══════════════════════════════════════════════════════════
  renderPaciente() {
    const stages = [
      { id: 'descubrimiento',   label: 'Descubrimiento',   icon: 'fa-magnifying-glass', color: '#0ea5e9', desc: 'El paciente busca información. No sabe si necesita fisioterapia.' },
      { id: 'primera_consulta', label: 'Primera Consulta', icon: 'fa-door-open',          color: '#8b5cf6', desc: 'Ha decidido consultar. Siente ansiedad y dudas antes de venir.' },
      { id: 'tratamiento',      label: 'En Tratamiento',   icon: 'fa-person-walking',     color: '#f97316', desc: 'Paciente activo. Necesita motivación y comprensión del proceso.' },
      { id: 'alta',             label: 'Alta',             icon: 'fa-medal',              color: '#10b981', desc: 'Ha terminado el tratamiento. Listo para celebrar y prevenir.' },
      { id: 'retencion',        label: 'Retención',        icon: 'fa-heart',              color: '#ec4899', desc: 'Paciente dado de alta. Objetivo: fidelizar y generar referidos.' },
    ];
    const activeStage = App._journeyStage || 'descubrimiento';
    const active = stages.find(s => s.id === activeStage);
    return `
<div class="space-y-6">

  <div class="card p-6" style="background:linear-gradient(135deg,rgba(139,92,246,0.10),var(--glass-bg));">
    <h2 class="text-xl font-bold mb-1">Journey del Paciente</h2>
    <p class="text-sm" style="color:var(--text-secondary);">Crea contenido adaptado a cada etapa del recorrido del paciente — desde que te descubre hasta que te recomienda.</p>
  </div>

  <!-- Stage selector -->
  <div class="card p-5">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      ${stages.map(s => `
        <button class="journey-stage-btn flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-all"
          data-stage="${s.id}"
          style="border:2px solid ${s.id === activeStage ? s.color : 'var(--glass-border)'};
                 background:${s.id === activeStage ? `${s.color}18` : 'var(--glass-bg)'};
                 cursor:pointer;">
          <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style="background:${s.id === activeStage ? s.color : 'var(--glass-border)'}18;">
            <i class="fa-solid ${s.icon}" style="color:${s.color};font-size:15px;"></i>
          </div>
          <span class="text-xs font-semibold" style="color:${s.id === activeStage ? s.color : 'var(--text-secondary)'};">${s.label}</span>
        </button>
      `).join('')}
    </div>
  </div>

  <!-- Stage details + generator -->
  <div class="card p-6">
    <div class="flex items-start gap-4 mb-5">
      <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style="background:${active.color}18;">
        <i class="fa-solid ${active.icon}" style="color:${active.color};font-size:18px;"></i>
      </div>
      <div>
        <h3 class="font-bold text-lg">${active.label}</h3>
        <p class="text-sm mt-1" style="color:var(--text-secondary);">${active.desc}</p>
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <label class="label">Tema específico <span style="color:var(--text-tertiary);font-weight:400;">(opcional)</span></label>
        <input id="journey-topic" class="input" type="text"
          placeholder="Ej: lesión de rodilla, dolor de espalda, post-operatorio..." />
      </div>
      <div>
        <label class="label">Contexto adicional <span style="color:var(--text-tertiary);font-weight:400;">(opcional)</span></label>
        <textarea id="journey-brief" class="textarea" rows="2"
          placeholder="Deporte, edad del paciente típico, particularidades..."></textarea>
      </div>
      <button id="btn-journey-generate" class="btn-primary w-full py-3 font-semibold">
        <i class="fa-solid fa-wand-magic-sparkles mr-2"></i>Generar contenido para etapa "${active.label}"
      </button>
    </div>
  </div>

  <!-- Output -->
  <div id="journey-output-section" class="hidden">
    <div class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-semibold">Contenido generado</h3>
          <span class="pill text-xs mt-1" style="background:${active.color}18;color:${active.color};">Etapa: ${active.label}</span>
        </div>
        <div class="flex gap-2">
          <button id="journey-copy" class="btn-ghost px-4 py-2 text-sm"><i class="fa-regular fa-copy mr-1"></i>Copiar</button>
          <button id="journey-save" class="btn-ghost px-4 py-2 text-sm"><i class="fa-regular fa-floppy-disk mr-1"></i>Guardar</button>
        </div>
      </div>
      <div id="journey-output" class="content-output" style="min-height:250px;"></div>
    </div>
  </div>
</div>
    `;
  },

  bindPaciente() {
    document.querySelectorAll('.journey-stage-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        App._journeyStage = btn.dataset.stage;
        render();
      });
    });

    document.getElementById('btn-journey-generate')?.addEventListener('click', async () => {
      const stage = App._journeyStage || 'descubrimiento';
      const topic = document.getElementById('journey-topic')?.value?.trim() || '';
      const brief = document.getElementById('journey-brief')?.value?.trim() || '';

      const btn = document.getElementById('btn-journey-generate');
      const origHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Generando...';

      const section = document.getElementById('journey-output-section');
      const outputEl = document.getElementById('journey-output');
      section.classList.remove('hidden');
      outputEl.classList.add('streaming');
      outputEl.textContent = '';
      let fullText = '';

      try {
        await Agents.journeyContent({ stage, topic, brief }, (chunk, full) => {
          fullText = full;
          outputEl.textContent = full;
          outputEl.scrollTop = outputEl.scrollHeight;
        });
        outputEl.classList.remove('streaming');
        outputEl.innerHTML = renderMarkdown(fullText);

        document.getElementById('journey-copy')?.addEventListener('click', () => copyToClipboard(fullText, 'Contenido de journey'));
        document.getElementById('journey-save')?.addEventListener('click', () => {
          Storage.saveDraft({ title: `Journey ${stage} — ${topic || 'general'}`, platform: 'Instagram', content: fullText, status: 'draft', category: 'educativo' });
          showToast('Borrador guardado', 'success');
        });
      } catch (err) {
        outputEl.innerHTML = `<span style="color:var(--error);">Error: ${err.message}</span>`;
        showToast(err.message, 'error');
      } finally {
        btn.innerHTML = origHTML;
        btn.disabled = false;
      }
    });
  },


  // ══════════════════════════════════════════════════════════
  // SETTINGS VIEW
  // ══════════════════════════════════════════════════════════
  renderSettings() {
    const apiKey = Storage.getApiKey();
    return `
<div class="max-w-2xl mx-auto space-y-6">

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
    ${apiKey
      ? `<p class="text-xs mt-2" style="color:var(--success);"><i class="fa-solid fa-circle-check mr-1"></i>Clave configurada</p>`
      : `<p class="text-xs mt-2" style="color:var(--warning);"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Sin clave configurada</p>`}
  </div>

  <!-- Pointer to Marca -->
  <div class="card p-5 flex items-center gap-4" style="background:linear-gradient(135deg,rgba(14,165,233,0.08),var(--glass-bg));">
    <div class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(14,165,233,0.15);">
      <i class="fa-solid fa-palette" style="color:var(--accent);"></i>
    </div>
    <div class="flex-1">
      <div class="font-semibold text-sm">Configuración de marca</div>
      <div class="text-xs mt-0.5" style="color:var(--text-secondary);">Tono, voz, pilares de contenido, vocabulario y avisos médicos han sido movidos a la sección <strong>Marca → Voz de Marca</strong>.</div>
    </div>
    <button onclick="navigate('marca');App._marcaTab='voz';" class="btn-primary px-4 py-2 text-sm flex-shrink-0">Ir a Marca</button>
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
    document.getElementById('save-api-key')?.addEventListener('click', () => {
      const val = document.getElementById('api-key-input').value.trim();
      if (!val || val.includes('•')) { showToast('Ingresa una clave válida', 'warning'); return; }
      Storage.setApiKey(val);
      showToast('Clave de API guardada', 'success');
      render();
    });

    document.getElementById('clear-all-data')?.addEventListener('click', () => {
      if (confirm('¿Estás seguro? Se eliminarán TODOS los datos: borradores, calendario, campañas, configuración y estadísticas. Esta acción no se puede deshacer.')) {
        Storage.clearAll();
        showToast('Todos los datos han sido eliminados', 'info');
        render();
      }
    });
  },


};
