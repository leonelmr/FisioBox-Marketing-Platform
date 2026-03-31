// ============================================================
// FISIOBOX AI MARKETING SUITE — Agent API Calls
// ============================================================

const MODEL = 'claude-sonnet-4-20250514';
const API_URL = 'https://api.anthropic.com/v1/messages';

// Core API call function
async function callClaude(systemPrompt, userMessage, onChunk = null) {
  const apiKey = Storage.getApiKey();
  if (!apiKey) throw new Error('API key no configurada. Ve a Configuración para añadir tu clave de API.');

  const body = {
    model: MODEL,
    max_tokens: 4096,
    system: systemPrompt + getDynamicContext(),
    messages: [{ role: 'user', content: userMessage }],
    stream: !!onChunk
  };

  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error?.message || `Error API: ${resp.status}`);
  }

  if (onChunk) {
    // Streaming
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
      for (const line of lines) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === 'content_block_delta' && data.delta?.text) {
            fullText += data.delta.text;
            onChunk(data.delta.text, fullText);
          }
        } catch {}
      }
    }
    return fullText;
  } else {
    const data = await resp.json();
    return data.content[0].text;
  }
}

// Multi-turn chat function for AI assistant conversations
async function callClaudeChat(systemPrompt, messages, onChunk = null) {
  const apiKey = Storage.getApiKey();
  if (!apiKey) throw new Error('API key no configurada. Ve a Configuración para añadir tu clave de API.');

  const body = {
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt + getDynamicContext(),
    messages,
    stream: !!onChunk
  };

  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error?.message || `Error API: ${resp.status}`);
  }

  if (onChunk) {
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
      for (const line of lines) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === 'content_block_delta' && data.delta?.text) {
            fullText += data.delta.text;
            onChunk(data.delta.text, fullText);
          }
        } catch {}
      }
    }
    return fullText;
  } else {
    const data = await resp.json();
    return data.content[0].text;
  }
}

function parseJSON(text) {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
  } catch {}
  return null;
}

// Builds dynamic context from brand settings, social profiles and learnings
function getDynamicContext() {
  const bs = Storage.getBrandSettings();
  const profiles = Storage.getSocialProfiles();
  const learnings = Storage.getLearnings();
  let ctx = '';

  // Brand voice description
  if (bs.brand_voice_description) {
    ctx += `\n\n## VOZ DE MARCA:\n${bs.brand_voice_description}\n`;
  }

  // Tone calibration
  const toneDesc = [
    `Formalidad: ${bs.tone_formal}/100 (${bs.tone_formal >= 60 ? 'formal' : bs.tone_formal >= 40 ? 'neutral' : 'casual'})`,
    `Tecnicismo: ${bs.tone_clinical}/100 (${bs.tone_clinical >= 60 ? 'clínico' : bs.tone_clinical >= 35 ? 'semi-técnico' : 'accesible'})`,
    `Enfoque: ${bs.tone_educational}/100 (${bs.tone_educational >= 60 ? 'educativo' : bs.tone_educational >= 40 ? 'equilibrado' : 'promocional'})`,
  ].join(' · ');
  ctx += `\n\n## CALIBRACIÓN DE TONO:\n${toneDesc}\n`;

  // Custom vocabulary
  if (bs.preferred_vocabulary?.length) {
    ctx += `\n\n## VOCABULARIO PREFERIDO:\n${bs.preferred_vocabulary.slice(0, 10).map(v => `- ${v}`).join('\n')}\n`;
  }
  if (bs.forbidden_phrases?.length) {
    ctx += `\n\n## FRASES PROHIBIDAS (nunca usar):\n${bs.forbidden_phrases.slice(0, 10).map(v => `- ${v}`).join('\n')}\n`;
  }

  // Social channels
  const hasProfiles = Object.values(profiles).some(Boolean);
  if (hasProfiles) {
    ctx += '\n\n## CANALES ACTIVOS:\n';
    if (profiles.instagram)       ctx += `- Instagram: ${profiles.instagram}\n`;
    if (profiles.facebook)        ctx += `- Facebook: ${profiles.facebook}\n`;
    if (profiles.tiktok)          ctx += `- TikTok: ${profiles.tiktok}\n`;
    if (profiles.website)         ctx += `- Sitio web: ${profiles.website}\n`;
    if (profiles.google_business) ctx += `- Google Business: ${profiles.google_business}\n`;
  }

  // Recent learnings
  const recent = learnings.slice(-10);
  if (recent.length > 0) {
    ctx += '\n\n## APRENDIZAJES RECIENTES (aplícalos al generar contenido):\n';
    recent.forEach(l => {
      const date = l.timestamp ? l.timestamp.slice(0, 10) : '';
      ctx += `- [${date}] ${l.content}\n`;
    });
  }

  return ctx;
}

// ── AGENT FUNCTIONS ────────────────────────────────────────

const Agents = {

  // 1. Listener Agent
  async listener(context = '', onChunk) {
    const msg = `Genera un reporte semanal de oportunidades de contenido para FisioBox.
${context ? `Contexto actual: ${context}` : ''}
Fecha actual: ${new Date().toLocaleDateString('es-CR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Considera eventos deportivos en Costa Rica, temporadas, tendencias de salud actuales.`;
    return callClaude(PROMPTS.listener, msg, onChunk);
  },

  // 2. SEO Agent
  async seo(topic, type = 'blog_brief', onChunk) {
    const msg = `Genera ${type === 'blog_brief' ? 'un brief SEO completo para un artículo de blog' : 'un post de Google Business'} sobre: "${topic}"
Asegúrate de incluir keywords locales de Costa Rica y estructura optimizada para búsqueda.`;
    return callClaude(PROMPTS.seo, msg, onChunk);
  },

  // 3. Analytics Agent
  async analytics(metricsText, onChunk) {
    const msg = `Analiza estas métricas de rendimiento de contenido de FisioBox y genera recomendaciones accionables:

${metricsText}

Proporciona el análisis completo según el formato especificado.`;
    return callClaude(PROMPTS.analytics, msg, onChunk);
  },

  // 4. Competitor Intel Agent
  async competitorIntel(context = '', onChunk) {
    const msg = `Genera un análisis competitivo para FisioBox en el mercado de fisioterapia deportiva en Costa Rica.
${context ? `Información adicional: ${context}` : ''}
Identifica brechas de contenido y oportunidades de diferenciación.`;
    return callClaude(PROMPTS.competitorIntel, msg, onChunk);
  },

  // 5. Brand Voice Agent
  async brandVoice(content, onChunk) {
    const msg = `Evalúa el siguiente contenido de FisioBox según los criterios de voz de marca. Responde ÚNICAMENTE con JSON válido:

CONTENIDO A EVALUAR:
${content}`;
    const result = await callClaude(PROMPTS.brandVoice, msg, onChunk);
    return { raw: result, parsed: parseJSON(result) };
  },

  // 6. Medical Safety Agent
  async medicalSafety(content, onChunk) {
    const msg = `Revisa el siguiente contenido de FisioBox para cumplimiento de seguridad médica. Responde ÚNICAMENTE con JSON válido:

CONTENIDO A REVISAR:
${content}`;
    const result = await callClaude(PROMPTS.medicalSafety, msg, onChunk);
    return { raw: result, parsed: parseJSON(result) };
  },

  // 7. RTP Specialist Agent
  async rtpSpecialist({ sport, injury, phase, format, brief = '' }, onChunk) {
    const msg = `Crea contenido sobre Retorno al Deporte para FisioBox:
- DEPORTE: ${sport || 'General'}
- LESIÓN: ${injury || 'General'}
- FASE RTP: ${phase || 'General (todas las fases)'}
- FORMATO: ${format}
${brief ? `- BRIEF ADICIONAL: ${brief}` : ''}

Genera contenido educativo, específico y de alto valor para deportistas costarricenses.`;
    return callClaude(PROMPTS.rtpSpecialist, msg, onChunk);
  },

  // 8. Social Media Agent
  async socialMedia({ platform, format, topic, category, brief = '' }, onChunk) {
    const msg = `Crea contenido de redes sociales para FisioBox:
- PLATAFORMA: ${platform}
- FORMATO: ${format}
- TEMA: ${topic}
- CATEGORÍA: ${category}
${brief ? `- BRIEF: ${brief}` : ''}

Genera el contenido completo listo para publicar, adaptado al formato de ${platform}.`;
    return callClaude(PROMPTS.socialMedia, msg, onChunk);
  },

  // 9. Blog/Web Content Agent
  async blogContent({ topic, type = 'blog', keywords = '' }, onChunk) {
    const msg = `Crea contenido web para FisioBox:
- TIPO: ${type === 'blog' ? 'Artículo de blog completo' : type === 'google_business' ? 'Post de Google Business' : 'Respuesta de Google Q&A'}
- TEMA: ${topic}
${keywords ? `- KEYWORDS TARGET: ${keywords}` : ''}

Optimiza para SEO local (Escazú, Costa Rica) y señales E-E-A-T.`;
    return callClaude(PROMPTS.blogContent, msg, onChunk);
  },

  // 10. Ads Agent
  async ads({ goal, platform, audience = '', brief = '' }, onChunk) {
    const msg = `Crea copy de publicidad pagada para FisioBox:
- OBJETIVO: ${goal}
- PLATAFORMA: ${platform}
${audience ? `- AUDIENCIA: ${audience}` : ''}
${brief ? `- BRIEF: ${brief}` : ''}

Genera 3 variaciones (A/B/C): racional, emocional y urgencia. Incluye todos los campos requeridos para la plataforma.`;
    return callClaude(PROMPTS.ads, msg, onChunk);
  },

  // 11. Engagement Predictor Agent
  async engagementPredictor(content, platform, onChunk) {
    const msg = `Predice el engagement del siguiente contenido de FisioBox para ${platform}. Responde ÚNICAMENTE con JSON válido:

CONTENIDO:
${content}`;
    const result = await callClaude(PROMPTS.engagementPredictor, msg, onChunk);
    return { raw: result, parsed: parseJSON(result) };
  },

  // 12. Patient Nurture Agent
  async patientNurture({ sequenceType, injury = '', sport = '', patientContext = '' }, onChunk) {
    const msg = `Crea una secuencia de mensajes de WhatsApp para FisioBox:
- TIPO DE SECUENCIA: ${sequenceType}
${injury ? `- LESIÓN: ${injury}` : ''}
${sport ? `- DEPORTE: ${sport}` : ''}
${patientContext ? `- CONTEXTO DEL PACIENTE: ${patientContext}` : ''}

Genera mensajes cálidos, personales y listos para enviar por WhatsApp.`;
    return callClaude(PROMPTS.patientNurture, msg, onChunk);
  },

  // 13. Tone Preview Agent
  async tonePreview(bs, onChunk) {
    const formal      = bs.tone_formal ?? 50;
    const clinical    = bs.tone_clinical ?? 30;
    const educational = bs.tone_educational ?? 70;
    const voiceDesc   = bs.brand_voice_description || '';
    const preferred   = (bs.preferred_vocabulary || []).slice(0, 5).join(', ');
    const forbidden   = (bs.forbidden_phrases || []).slice(0, 5).join(', ');

    const system = `Eres el copywriter de FisioBox, una clínica de fisioterapia deportiva en Escazú, Costa Rica.
Tu única tarea es generar una muestra de contenido aplicando exactamente la configuración de voz indicada.
NO expliques tu proceso. NO agregues comentarios. Solo entrega el contenido.`;

    const msg = `Genera UN caption de Instagram (máximo 4 oraciones) sobre los beneficios del fortalecimiento muscular para prevenir lesiones en corredores. Aplica esta configuración de voz exacta:

CALIBRACIÓN:
- Formalidad: ${formal}/100 → ${formal >= 60 ? 'tono formal y profesional' : formal >= 40 ? 'tono neutral, ni muy casual ni muy formal' : 'tono casual y cercano'}
- Tecnicismo: ${clinical}/100 → ${clinical >= 60 ? 'usa terminología clínica y técnica' : clinical >= 35 ? 'mezcla términos técnicos con lenguaje accesible' : 'lenguaje completamente accesible, sin jerga médica'}
- Enfoque: ${educational}/100 → ${educational >= 60 ? 'principalmente educativo, aporta conocimiento' : educational >= 40 ? 'equilibra información con promoción' : 'orientado a promocionar el servicio'}

${voiceDesc ? `VOZ DE MARCA: ${voiceDesc}` : ''}
${preferred ? `FRASES QUE DEBES USAR (al menos una): ${preferred}` : ''}
${forbidden ? `FRASES PROHIBIDAS (nunca incluir): ${forbidden}` : ''}

Entrega solo el caption, sin emojis iniciales, sin hashtags, sin explicación.`;

    return callClaude(system, msg, onChunk);
  },

  // 14. Visual Concepts Agent
  async visualConcepts({ platform, format, topic, brief = '' }, onChunk) {
    const systemPrompt = `Eres un director creativo y productor de contenido visual para FisioBox, clínica de fisioterapia deportiva en Escazú, Costa Rica.
Tu trabajo es generar conceptos visuales concretos, listos para producción, que complementen piezas de contenido de marketing.
Cada concepto debe ser específico, accionable y realista para una clínica de fisioterapia con recursos moderados.
Responde siempre en español con formato markdown claro.`;

    const msg = `Genera EXACTAMENTE 4 conceptos visuales de producción para el siguiente contenido:

PLATAFORMA: ${platform}
FORMATO: ${format}
TEMA: ${topic}
${brief ? `CONTEXTO: ${brief}` : ''}

Para cada concepto usa esta estructura:

## Concepto [N]: "[Título evocador]"

**Escena principal:** [Descripción específica de qué ocurre en el visual]
**Locación:** [Dónde se filma/fotografía — sala de tratamiento, exterior, etc.]
**Tipo de toma:** [Plano detalle / Plano medio / Gran angular / POV / Time-lapse / etc.]
**Sujeto:** [Quién aparece — fisioterapeuta, paciente, equipamiento, ilustración]
**Overlays de texto:** "[Texto 1]" → "[Texto 2]" → "[CTA]"
**Mood/Estética:** [2-3 adjetivos que describen el tono visual]
**Por qué funciona:** [Una línea que explica el valor de este concepto para el objetivo]

---

Varía los 4 conceptos entre sí: uno más educativo, uno emocional/testimonial, uno de autoridad/equipo, uno de acción/movimiento.`;

    return callClaude(systemPrompt, msg, onChunk);
  },

  // 15. Extract image prompts from visual concepts text
  async extractImagePrompts(conceptsText, topic) {
    const system = `Eres un experto en prompts para generación de imágenes con IA (Flux, Stable Diffusion).
Tu única tarea es extraer exactamente 4 prompts de imagen en inglés a partir de conceptos de producción visual.
Responde SOLO con un JSON array de 4 strings. Sin explicaciones, sin markdown, sin bloque de código.`;

    const msg = `Genera 4 prompts de imagen en inglés optimizados para Flux a partir de estos conceptos visuales.
Tema general: "${topic}". Contexto: clínica de fisioterapia deportiva moderna.

Reglas para los prompts:
- En inglés
- Fotorrealistas, cinemáticos, estilo editorial de salud/deporte
- Incluir: sujeto principal, locación, iluminación, composición, mood
- 60–120 caracteres por prompt
- Sin texto negativo ("no X", "without X"), solo descripción positiva

Conceptos:
${conceptsText.slice(0, 3000)}

Responde ÚNICAMENTE con el JSON array: ["prompt1", "prompt2", "prompt3", "prompt4"]`;

    const raw = await callClaude(system, msg);
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No se pudieron extraer los prompts de imagen');
    const prompts = JSON.parse(match[0]);
    if (!Array.isArray(prompts) || prompts.length < 4) throw new Error('Respuesta de prompts inválida');
    return prompts.slice(0, 4);
  },

  // 16. Load an image from Pollinations.ai (Flux, free, CORS-enabled)
  loadPollinationsImage(prompt, index) {
    const seed = 1000 + index * 137;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1280&height=720&model=flux&seed=${seed}&nologo=true`;
    const timeout = 60000; // 60s — Pollinations can be slow on free tier
    return new Promise((resolve, reject) => {
      const img = new Image();
      const timer = setTimeout(() => {
        img.src = ''; // abort
        reject(new Error(`Timeout cargando imagen ${index + 1}`));
      }, timeout);
      img.onload = () => { clearTimeout(timer); resolve(url); };
      img.onerror = () => { clearTimeout(timer); reject(new Error(`Error cargando imagen ${index + 1}`)); };
      img.src = url;
    });
  },

  // 17. Content Package Agent — one topic → all formats at once
  async contentPackage({ topic, brief = '', category = 'educativo', formats = [] }, onChunk) {
    const formatList = formats.length > 0 ? formats : [
      'Instagram Carrusel', 'Instagram Reel', 'Facebook Post',
      'WhatsApp Mensaje', 'Blog/SEO Brief', 'Instagram Stories'
    ];
    const system = `Eres el estratega de contenido de FisioBox, clínica de fisioterapia deportiva en Escazú, Costa Rica.
Tu especialidad es crear paquetes de contenido temáticos: un mismo tema trabajado para múltiples formatos y plataformas simultáneamente.
Mantén coherencia temática entre todas las piezas. Adapta cada una a las normas de su plataforma.
Responde ÚNICAMENTE con JSON válido. Sin markdown, sin bloque de código, sin explicaciones.`;

    const msg = `Crea un paquete de contenido completo para FisioBox sobre este tema:

TEMA: ${topic}
${brief ? `CONTEXTO: ${brief}` : ''}
CATEGORÍA: ${category}
FORMATOS: ${formatList.join(', ')}

Responde con este JSON exacto:
{
  "topic": "${topic}",
  "key_message": "mensaje central en 1 oración",
  "formats": [
    {
      "format": "nombre del formato",
      "platform": "plataforma principal",
      "content": "contenido completo listo para usar",
      "notes": "hashtags o notas de producción"
    }
  ]
}

Genera ${formatList.length} objetos en "formats", uno por cada formato. Cada pieza debe ser completa y lista para publicar.`;

    const result = await callClaude(system, msg, onChunk);
    const match = result.match(/\{[\s\S]*\}/);
    if (match) {
      try { return { raw: result, parsed: JSON.parse(match[0]) }; } catch {}
    }
    return { raw: result, parsed: null };
  },

  // 18. Repurpose Agent — adapt existing content to a new platform
  async repurpose({ content, targetPlatform, targetFormat = '' }, onChunk) {
    const msg = `Repropón el siguiente contenido de FisioBox para ${targetPlatform}${targetFormat ? ` — formato: ${targetFormat}` : ''}:

CONTENIDO ORIGINAL:
${content}

Adapta completamente este contenido a las normas y mejores prácticas de ${targetPlatform}.
Mantén el mensaje central pero transforma formato, longitud, estructura y vocabulario.
El resultado debe sentirse 100% nativo en ${targetPlatform}.

${targetPlatform === 'Instagram' ? 'Incluye caption completo + hashtags (20-30) + CTA.' : ''}
${targetPlatform === 'TikTok' ? 'Genera hook (primeros 3s) + guión completo + CTA + hashtags TikTok.' : ''}
${targetPlatform === 'Facebook' ? 'Post completo con enganche, desarrollo y pregunta de engagement al final.' : ''}
${targetPlatform === 'Blog' ? 'Expande a artículo SEO completo: H1, introducción, 3+ secciones con subtítulos H2, conclusión, CTA.' : ''}
${targetPlatform === 'WhatsApp' ? 'Mensaje cálido, personal, máx. 3 párrafos cortos, sin jerga de redes sociales.' : ''}
${targetPlatform === 'Ads' ? 'Genera 3 variantes de copy corto (headline + descripción): racional, emocional y urgencia.' : ''}`;
    return callClaude(PROMPTS.socialMedia, msg, onChunk);
  },

  // 19. Hashtag Suggestions Agent
  async hashtagSuggestions({ topic, platform = 'Instagram', existingTags = [] }, onChunk) {
    const existing = existingTags.join(', ');
    const msg = `Genera hashtags estratégicos para FisioBox sobre el tema: "${topic}" en ${platform}.
${existing ? `Hashtags existentes (no repetir): ${existing}` : ''}

Genera 15-20 hashtags nuevos organizados en grupos:
- **Marca** (2-3): relacionados directamente con FisioBox
- **Especialidad** (4-5): fisioterapia deportiva, rehabilitación
- **Tema específico** (4-5): relacionados con "${topic}"
- **Local** (2-3): Costa Rica, Escazú y alrededores
- **Tendencia** (2-3): hashtags populares en salud/deporte

Para cada grupo indica el nivel de competencia (alto/medio/bajo) y alcance estimado.`;
    return callClaude(PROMPTS.socialMedia, msg, onChunk);
  },

  // 20. Performance Coach Agent — cumulative analytics insights
  async performanceCoach(historicalEntries, onChunk) {
    const summary = historicalEntries.slice(0, 20).map((e, i) =>
      `Reporte ${i + 1} (${e.savedAt?.slice(0, 10) || 'sin fecha'}): ${e.summary || 'Sin título'}\n${(e.content || '').slice(0, 400)}`
    ).join('\n\n---\n\n');

    const msg = `Analiza el historial de rendimiento de FisioBox y genera insights acumulados:

HISTORIAL (${historicalEntries.length} reportes):
${summary}

Proporciona:
1. **Patrones identificados**: Qué tipos de contenido rinden mejor consistentemente
2. **Tendencias**: Mejoras o deterioros a lo largo del tiempo
3. **Top performers**: Formatos, temas y plataformas más exitosas
4. **Brechas**: Qué falta o tiene bajo rendimiento
5. **Recomendaciones para el próximo mes**: 3-5 acciones concretas y priorizadas`;
    return callClaude(PROMPTS.analytics, msg, onChunk);
  },

  // 21. Journey Content Agent — stage-aware content
  async journeyContent({ stage, topic = '', brief = '' }, onChunk) {
    const stageGuides = {
      descubrimiento:   { label: 'Descubrimiento',   tone: 'educativo, inspirador, accesible',           goal: 'Generar conciencia y atraer nuevos pacientes potenciales' },
      primera_consulta: { label: 'Primera Consulta', tone: 'tranquilizador, profesional, empático',       goal: 'Reducir ansiedad y generar confianza antes de la primera visita' },
      tratamiento:      { label: 'Tratamiento',       tone: 'motivador, técnico-accesible, de apoyo',     goal: 'Mantener adherencia al tratamiento y educar durante el proceso' },
      alta:             { label: 'Alta',              tone: 'celebratorio, motivador, empoderador',        goal: 'Celebrar el alta y preparar para la prevención a largo plazo' },
      retencion:        { label: 'Retención',         tone: 'comunitario, exclusivo, proactivo',          goal: 'Fidelizar pacientes y generar referidos' },
    };
    const guide = stageGuides[stage] || stageGuides['descubrimiento'];
    const msg = `Crea contenido para la etapa "${guide.label}" del viaje del paciente de FisioBox.

OBJETIVO DE ESTA ETAPA: ${guide.goal}
TONO RECOMENDADO: ${guide.tone}
${topic ? `TEMA ESPECÍFICO: ${topic}` : ''}
${brief ? `CONTEXTO ADICIONAL: ${brief}` : ''}

El contenido debe resonar con alguien que está exactamente en este momento de su proceso.
Genera contenido completo (caption + hashtags) listo para publicar en Instagram.`;
    return callClaude(PROMPTS.socialMedia, msg, onChunk);
  },

  // 22. Testimonial Workshop Agent — structured patient success story
  async testimonialWorkshop({ sport, injury, duration, outcome, patientContext = '' }, onChunk) {
    const disclaimer = Storage.getBrandSettings().results_disclaimer || 'Los resultados pueden variar según cada persona y condición.';
    const msg = `Crea un caso de éxito completo para FisioBox:

DEPORTE: ${sport}
LESIÓN: ${injury}
DURACIÓN DEL TRATAMIENTO: ${duration}
RESULTADO CLAVE: ${outcome}
${patientContext ? `CONTEXTO ADICIONAL: ${patientContext}` : ''}

Genera 4 piezas de contenido:

## 1. Instagram Carrusel (6 slides)
Slide 1 — Hook visual (el reto inicial)
Slide 2–4 — El proceso de tratamiento paso a paso
Slide 5 — El resultado: "${outcome}"
Slide 6 — CTA hacia consulta + disclaimer

## 2. Script de Reel (30-60 segundos)
Hook (0-3s) | Desarrollo | Resultado | CTA

## 3. Facebook Post
Historia narrativa completa con inicio, proceso y desenlace positivo

## 4. Guía de entrevista al paciente
7-8 preguntas abiertas para obtener la historia en sus propias palabras

FRAMING OBLIGATORIO: Usa "Este atleta logró..." y "El proceso permitió..." nunca "Curamos" ni promesas.
Añade al final de cada pieza: "${disclaimer}"`;
    return callClaude(PROMPTS.socialMedia, msg, onChunk);
  },

  // ── COMBINED REVIEW PIPELINE ────────────────────────────────
  async runReviewPipeline(content, platform) {
    const [brandResult, medicalResult, engagementResult] = await Promise.all([
      Agents.brandVoice(content),
      Agents.medicalSafety(content),
      Agents.engagementPredictor(content, platform)
    ]);
    return {
      brand: brandResult,
      medical: medicalResult,
      engagement: engagementResult
    };
  },

  // ── CALENDAR AUTO-FILL ──────────────────────────────────────
  async generateCalendarPlan({ weeks = 4, primaryPlatform = 'Instagram' }, onChunk) {
    const systemPrompt = PROMPTS.socialMedia;
    const msg = `Genera un plan de contenido de ${weeks} semanas para FisioBox en ${primaryPlatform}.

DISTRIBUCIÓN REQUERIDA (40/30/20/5/5):
- 40% Educativo
- 30% Promocional
- 20% Prueba Social
- 5% Cultura de Clínica
- 5% Comunidad

Para cada pieza de contenido incluye:
- DÍA Y FECHA (comenzando desde el lunes próximo)
- PILAR DE CONTENIDO
- PLATAFORMA
- FORMATO (carrusel/reel/post/story)
- TEMA ESPECÍFICO
- HASHTAGS SUGERIDOS
- CAPTION CORTO (máximo 2 oraciones)

Organiza por semana. Genera el plan completo.`;
    return callClaude(systemPrompt, msg, onChunk);
  },

  // ── CAMPAIGN BUILDER ────────────────────────────────────────
  async buildCampaign({ goal, duration, platform, budgetType, brief = '' }, onProgress) {
    const steps = [
      { label: 'Creando concepto de campaña...', fn: () => callClaude(PROMPTS.rtpSpecialist,
        `Crea el concepto y nombre para una campaña de FisioBox:
Objetivo: ${goal} | Duración: ${duration} semanas | Plataforma: ${platform} | Presupuesto: ${budgetType}
${brief ? `Brief: ${brief}` : ''}
Incluye: nombre de campaña, eslogan, concepto central, tono, 3 mensajes clave.`) },
      { label: 'Generando plan semana a semana...', fn: () => callClaude(PROMPTS.socialMedia,
        `Genera el plan de contenido semana a semana para una campaña de ${duration} semanas en ${platform}.
Objetivo: ${goal}. Sigue la distribución 40/30/20/5/5 de pilares de contenido.
Lista cada semana con 3-5 piezas de contenido específicas con temas y formatos.`) },
      { label: 'Redactando piezas de contenido...', fn: () => callClaude(PROMPTS.socialMedia,
        `Para la campaña de FisioBox (${goal}, ${duration} semanas, ${platform}), genera las primeras 3 piezas de contenido completas.
Incluye captions completos, hashtags y guiones si aplica.`) },
    ];

    const results = [];
    for (let i = 0; i < steps.length; i++) {
      if (onProgress) onProgress(steps[i].label, i, steps.length);
      results.push(await steps[i].fn());
    }

    if (budgetType !== 'Orgánico') {
      if (onProgress) onProgress('Creando variaciones de anuncios...', steps.length, steps.length + 1);
      results.push(await Agents.ads({ goal, platform, brief }));
    }

    return results;
  }
};
