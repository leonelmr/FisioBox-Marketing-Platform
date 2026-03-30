// ============================================================
// FISIOBOX AI MARKETING SUITE — Chat Assistant
// ============================================================

const CHAT_SYSTEM_PROMPT = `Eres el asistente de IA de FisioBox AI Marketing Suite. FisioBox es una clínica de fisioterapia deportiva de alta especialización en Escazú, Costa Rica, que atiende a deportistas de todos los niveles.

Tu rol es DUAL:

1. GUÍA DE LA APP — Ayudas a los usuarios a aprovechar al máximo las 9 secciones:
   • Dashboard: métricas de contenido, borradores recientes, calendario semanal y distribución de pilares
   • Generador de Contenido: crea posts, reels, carruseles, artículos SEO, anuncios y mensajes en 4 pasos guiados (plataforma → formato → detalles → resultado)
   • Calendario: programa publicaciones mes a mes, genera planes de contenido con IA
   • Biblioteca: gestiona borradores por estado (borrador, en revisión, aprobado, publicado)
   • Analítica: pega métricas de cualquier red social y recibe análisis y recomendaciones accionables con IA
   • Inteligencia: análisis competitivo, tendencias, estrategia SEO local para Escazú, contenido especializado de Retorno al Deporte (RTP)
   • WhatsApp: genera secuencias de seguimiento para pacientes (post-cita, RTP, reactivación, prevención)
   • Campañas: construye campañas completas con concepto, plan semanal, piezas de contenido y copy de anuncios
   • Configuración: configura la clave de API, el tono de marca, los pilares de contenido y el vocabulario

2. EXPERTO EN MARKETING DIGITAL para clínicas de salud y fisioterapia:
   • Estrategia de contenido y frecuencia de publicación para profesionales de salud
   • Instagram, TikTok, Facebook para fisioterapeutas deportivos
   • Meta Ads y Google Ads para servicios médicos en Costa Rica
   • SEO local en Escazú y Gran Área Metropolitana
   • WhatsApp Business para seguimiento de pacientes
   • Ética y cumplimiento en publicidad de servicios de salud
   • Diferenciación de marca para clínicas especializadas en deporte
   • Generación de leads y retención de pacientes
   • Posicionamiento como expertos en lesiones deportivas

ESTILO DE RESPUESTA:
- Responde siempre en español
- Sé conciso y práctico — máximo 3-4 párrafos o una lista corta
- Cuando sugieras usar una función de la app, menciona el nombre exacto de la sección
- Si el usuario menciona un problema de marketing, ofrece consejo concreto + sugiere la función de la app más relevante
- Usa un tono profesional pero cercano, como un consultor de confianza`;

const SUGGESTED_PROMPTS = {
  dashboard: [
    '¿Cómo empiezo a crear mi primer contenido?',
    '¿Qué debo configurar primero en la app?',
    'Dame ideas de contenido para esta semana',
  ],
  generator: [
    '¿Qué formato de Instagram genera más engagement?',
    '¿Cómo escribo un brief efectivo para el generador?',
    '¿Para qué sirve el carrusel educativo?',
  ],
  calendar: [
    '¿Con qué frecuencia debe publicar una clínica de fisio?',
    '¿Qué días y horas son mejores para publicar en CR?',
    '¿Cómo planifico un mes de contenido?',
  ],
  library: [
    '¿Cómo organizo el flujo de aprobación de contenido?',
    '¿Cuándo debo marcar un post como "aprobado"?',
    '¿Puedo reutilizar contenido de la biblioteca?',
  ],
  analytics: [
    '¿Qué métricas son más importantes para una clínica?',
    '¿Cómo interpreto un buen engagement rate?',
    '¿Qué hacer si mis posts tienen poco alcance?',
  ],
  intelligence: [
    '¿Cómo me diferencio de otras clínicas de fisio en CR?',
    '¿Qué tendencias de contenido funcionan en fisioterapia?',
    '¿Qué es el contenido RTP y cómo usarlo?',
  ],
  whatsapp: [
    '¿Cuál es el largo ideal de un mensaje de seguimiento?',
    '¿Cada cuántos días enviar mensajes post-cita?',
    'Mejores prácticas de WhatsApp para clínicas de salud',
  ],
  campaigns: [
    '¿Cuándo conviene lanzar una campaña de temporada?',
    '¿Cuál es el presupuesto mínimo para Meta Ads en CR?',
    '¿Qué objetivo uso para captar nuevos pacientes?',
  ],
  settings: [
    '¿Cómo defino el tono de voz de mi clínica?',
    '¿Qué son los pilares de contenido y cómo los distribuyo?',
    '¿Cuánto porcentaje de contenido educativo recomiendas?',
  ],
  default: [
    '¿En qué te puedo ayudar hoy?',
    'Dame ideas de contenido para fisioterapia',
    '¿Cómo mejorar el marketing de mi clínica?',
  ],
};

// ── STATE ─────────────────────────────────────────────────────
const ChatState = {
  isOpen: false,
  isTyping: false,
  messages: [], // [{role, content, time}]
};

// ── INITIALIZATION ────────────────────────────────────────────
function chatInit() {
  // Load persisted history
  const saved = Storage.getChatHistory();
  ChatState.messages = saved;

  // Bind toggle button
  document.getElementById('chat-toggle-btn')?.addEventListener('click', chatToggle);
  document.getElementById('chat-close-btn')?.addEventListener('click', chatClose);
  document.getElementById('chat-clear-btn')?.addEventListener('click', chatClear);
  document.getElementById('chat-send-btn')?.addEventListener('click', chatSend);

  const input = document.getElementById('chat-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatSend();
      }
    });
    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });
  }

  // Render initial state
  chatRenderMessages();

  // If no history, show welcome on first open
  if (ChatState.messages.length === 0) {
    document.getElementById('chat-badge')?.classList.remove('hidden');
  }
}

// ── TOGGLE / OPEN / CLOSE ─────────────────────────────────────
function chatToggle() {
  if (ChatState.isOpen) {
    chatClose();
  } else {
    chatOpen();
  }
}

function chatOpen() {
  ChatState.isOpen = true;
  const panel = document.getElementById('chat-panel');
  if (panel) {
    panel.classList.remove('hidden');
    // Re-trigger animation
    panel.style.animation = 'none';
    panel.offsetHeight; // reflow
    panel.style.animation = '';
  }
  document.getElementById('chat-badge')?.classList.add('hidden');
  document.getElementById('chat-toggle-icon')?.setAttribute('class', 'fa-solid fa-xmark');

  // Show welcome message if first open
  if (ChatState.messages.length === 0) {
    chatAddMessage('assistant', `¡Hola! Soy tu asistente de marketing de FisioBox. Puedo ayudarte a:\n\n- **Usar las funciones de la app** — generador, calendario, campañas...\n- **Responder preguntas de marketing** — redes sociales, SEO, Meta Ads, WhatsApp para pacientes\n- **Idear contenido** para tu clínica de fisioterapia deportiva\n\n¿En qué puedo ayudarte hoy?`);
  }

  chatRenderSuggestions();
  chatScrollToBottom();

  // Focus input
  setTimeout(() => document.getElementById('chat-input')?.focus(), 150);
}

function chatClose() {
  ChatState.isOpen = false;
  document.getElementById('chat-panel')?.classList.add('hidden');
  document.getElementById('chat-toggle-icon')?.setAttribute('class', 'fa-solid fa-comments');
}

function chatClear() {
  if (!confirm('¿Limpiar el historial del chat?')) return;
  ChatState.messages = [];
  Storage.clearChatHistory();
  chatRenderMessages();
  chatRenderSuggestions();
  // Show welcome again
  chatAddMessage('assistant', `Historial limpiado. ¿En qué puedo ayudarte?`);
}

// ── SEND MESSAGE ──────────────────────────────────────────────
async function chatSend() {
  if (ChatState.isTyping) return;
  const input = document.getElementById('chat-input');
  const text = input?.value?.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';
  document.getElementById('chat-suggestions')?.classList.add('hidden');

  chatAddMessage('user', text);
  chatScrollToBottom();
  await chatGetResponse(text);
}

// ── AI RESPONSE ───────────────────────────────────────────────
async function chatGetResponse(userText) {
  ChatState.isTyping = true;
  const sendBtn = document.getElementById('chat-send-btn');
  if (sendBtn) sendBtn.disabled = true;

  // Show typing indicator
  const typingId = 'chat-typing-' + Date.now();
  const messagesEl = document.getElementById('chat-messages');
  if (messagesEl) {
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-msg ai';
    typingEl.id = typingId;
    typingEl.innerHTML = `
      <div class="chat-bubble">
        <div class="chat-typing">
          <span></span><span></span><span></span>
        </div>
      </div>`;
    messagesEl.appendChild(typingEl);
    chatScrollToBottom();
  }

  // Build messages for API (last 6 messages for context, save tokens)
  const apiMessages = ChatState.messages.slice(-6).map(m => ({
    role: m.role,
    content: m.content,
  }));
  // Add current user message if not already last
  if (apiMessages.length === 0 || apiMessages[apiMessages.length - 1].content !== userText) {
    apiMessages.push({ role: 'user', content: userText });
  }

  // Add context about current view
  const currentView = window.App?.currentView || 'dashboard';
  const contextualSystem = CHAT_SYSTEM_PROMPT + `\n\nContexto actual: el usuario está en la sección "${currentView}" de la app.`;

  let fullResponse = '';
  try {
    // Create response bubble (streaming into it)
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.innerHTML = `<div class="chat-bubble"></div>`;
    }
    const bubbleEl = typingEl?.querySelector('.chat-bubble');

    await callClaudeChat(contextualSystem, apiMessages, (chunk, full) => {
      fullResponse = full;
      if (bubbleEl) {
        bubbleEl.textContent = full;
        chatScrollToBottom();
      }
    });

    // Final render with markdown
    if (bubbleEl) {
      bubbleEl.innerHTML = renderMarkdown(fullResponse);
      chatScrollToBottom();
    }

    // Save to history
    chatAddMessage('assistant', fullResponse, false); // false = don't re-render DOM (already shown)
  } catch (err) {
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.innerHTML = `<div class="chat-bubble" style="color:var(--error);">${err.message.includes('API key') ? 'Para usar el asistente necesitas configurar tu clave de API en <b>Configuración</b>.' : 'Error al conectar con el asistente: ' + err.message}</div>`;
    }
  } finally {
    ChatState.isTyping = false;
    if (sendBtn) sendBtn.disabled = false;
    chatRenderSuggestions();
    document.getElementById('chat-suggestions')?.classList.remove('hidden');
  }
}

// ── MESSAGE MANAGEMENT ────────────────────────────────────────
function chatAddMessage(role, content, renderDOM = true) {
  const msg = { role, content, time: new Date().toISOString() };
  ChatState.messages.push(msg);
  Storage.saveChatHistory(ChatState.messages);
  if (renderDOM) {
    chatRenderMessages();
  }
}

function chatRenderMessages() {
  const el = document.getElementById('chat-messages');
  if (!el) return;
  el.innerHTML = ChatState.messages.map(m => chatMessageHTML(m)).join('');
  chatScrollToBottom();
}

function chatMessageHTML(msg) {
  const isUser = msg.role === 'user';
  const timeStr = msg.time ? new Date(msg.time).toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }) : '';
  const content = isUser
    ? escapeHtml(msg.content)
    : renderMarkdown(msg.content);

  return `
    <div class="chat-msg ${isUser ? 'user' : 'ai'}">
      <div class="chat-bubble">${content}</div>
    </div>`;
}

function escapeHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── SUGGESTED PROMPTS ─────────────────────────────────────────
function chatRenderSuggestions() {
  const el = document.getElementById('chat-suggestions');
  if (!el) return;
  const view = window.App?.currentView || 'default';
  const prompts = SUGGESTED_PROMPTS[view] || SUGGESTED_PROMPTS.default;

  // Show max 2 chips to keep UI clean
  el.innerHTML = prompts.slice(0, 2).map(p => `
    <button class="chat-chip" onclick="chatUseSuggestion(this.textContent)">${p}</button>
  `).join('');
}

function chatUseSuggestion(text) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = text;
    input.focus();
    chatSend();
  }
}

// ── UTILS ─────────────────────────────────────────────────────
function chatScrollToBottom() {
  const el = document.getElementById('chat-messages');
  if (el) el.scrollTop = el.scrollHeight;
}

// ── BOOT ─────────────────────────────────────────────────────
// Initialize after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', chatInit);
} else {
  chatInit();
}
