// Lógica del chatbot de ventas IA
class ChatbotIA {
  constructor() {
    this.context = {
      industria_usuario: null,
      categoria_interes: null,
      proyectos_mostrados: [],
      etapa_conversacion: "saludo"
    };

    this.keywords = {
      saludo: ["hola", "buenos dias", "buenas tardes", "hey", "saludos", "que tal"],
      despedida: ["adios", "chao", "hasta luego", "gracias", "nos vemos"],
      ayuda: ["ayuda", "ayudame", "no entiendo", "como funciona"],
      prediccion: ["prediccion", "predecir", "forecast", "pronostico", "machine learning"],
      vision: ["vision", "imagen", "video", "camara", "visual", "deteccion"],
      nlp: ["texto", "lenguaje", "nlp", "chatbot", "sentimiento"],
      optimizacion: ["optimizar", "optimizacion", "ruta", "inventario", "precio"],
      analytics: ["dashboard", "reporte", "visualizacion", "bi", "kpi"],
      beneficios: ["beneficio", "roi", "retorno", "ahorro"],
      recomendar: ["recomienda", "sugerir", "cual", "mejor opcion"]
    };
  }

  detectarIntencion(mensaje) {
    const mensajeLower = mensaje.toLowerCase();
    const intenciones = [];

    for (const [intencion, keywords] of Object.entries(this.keywords)) {
      if (keywords.some(kw => mensajeLower.includes(kw))) {
        intenciones.push(intencion);
      }
    }

    return intenciones.length > 0 ? intenciones : ["general"];
  }

  extraerIndustria(mensaje) {
    const mensajeLower = mensaje.toLowerCase();

    for (const [key, nombre] of Object.entries(CATALOGO.industrias)) {
      if (mensajeLower.includes(key.toLowerCase()) ||
          mensajeLower.includes(nombre.toLowerCase())) {
        return key;
      }
    }
    return null;
  }

  extraerCategoria(mensaje) {
    const mensajeLower = mensaje.toLowerCase();

    if (this.keywords.prediccion.some(kw => mensajeLower.includes(kw))) {
      return "prediccion_ML";
    } else if (this.keywords.vision.some(kw => mensajeLower.includes(kw))) {
      return "computer_vision";
    } else if (this.keywords.nlp.some(kw => mensajeLower.includes(kw))) {
      return "nlp_texto";
    } else if (this.keywords.optimizacion.some(kw => mensajeLower.includes(kw))) {
      return "optimizacion";
    } else if (this.keywords.analytics.some(kw => mensajeLower.includes(kw))) {
      return "analytics_bi";
    }

    return null;
  }

  buscarProyectosPorIndustria(industria) {
    const proyectosRelevantes = [];

    for (const [catKey, categoria] of Object.entries(CATALOGO.categorias)) {
      for (const proyecto of categoria.proyectos) {
        if (proyecto.industrias.includes(industria) || proyecto.industrias.includes("todos")) {
          proyectosRelevantes.push({
            ...proyecto,
            categoria: catKey,
            categoria_nombre: categoria.nombre,
            icono: categoria.icono
          });
        }
      }
    }

    return proyectosRelevantes;
  }

  buscarProyectosPorCategoria(categoria) {
    if (CATALOGO.categorias[categoria]) {
      return CATALOGO.categorias[categoria].proyectos.map(p => ({
        ...p,
        categoria: categoria,
        categoria_nombre: CATALOGO.categorias[categoria].nombre,
        icono: CATALOGO.categorias[categoria].icono
      }));
    }
    return [];
  }

  generarPropuestaPersonalizada(industria = null, categoria = null) {
    let proyectos = [];

    if (industria) {
      proyectos = this.buscarProyectosPorIndustria(industria);
    } else if (categoria) {
      proyectos = this.buscarProyectosPorCategoria(categoria);
    } else {
      // Obtener todos los proyectos
      for (const [catKey, cat] of Object.entries(CATALOGO.categorias)) {
        for (const proy of cat.proyectos) {
          proyectos.push({
            ...proy,
            categoria: catKey,
            categoria_nombre: cat.nombre,
            icono: cat.icono
          });
        }
      }
    }

    if (proyectos.length === 0) {
      return "No encontré proyectos específicos para ese criterio. ¿Podrías darme más información?";
    }

    // Seleccionar el mejor proyecto por ROI
    const mejorProyecto = proyectos.reduce((best, current) => {
      const currentRoi = parseInt(current.roi_estimado.split("-")[1].replace("%", ""));
      const bestRoi = parseInt(best.roi_estimado.split("-")[1].replace("%", ""));
      return currentRoi > bestRoi ? current : best;
    });

    const industriaNombre = industria ?
      (CATALOGO.industrias[industria] || "tu sector") : "tu sector";

    return this.formatearPropuesta(mejorProyecto, industriaNombre);
  }

  formatearPropuesta(proyecto, industriaNombre) {
    let html = `
      <div class="propuesta">
        <h3>${proyecto.icono} Propuesta para ${industriaNombre}</h3>
        <h4>${proyecto.nombre}</h4>

        <p><strong>📋 Descripción:</strong><br>${proyecto.descripcion}</p>

        <div class="beneficios">
          <strong>💰 Beneficios Clave:</strong>
          <ul>
            ${proyecto.beneficios.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>

        <div class="metricas">
          <span class="metrica">⏱️ ${proyecto.tiempo_implementacion}</span>
          <span class="metrica">📈 ROI: ${proyecto.roi_estimado}</span>
        </div>

        <p><strong>🔧 Tecnologías:</strong> ${proyecto.tecnologias.slice(0, 4).join(', ')}</p>

        <p class="cta">¿Te gustaría conocer más detalles o explorar otras opciones?</p>
      </div>
    `;

    return html;
  }

  formatearProyecto(proyecto) {
    return `
      <div class="proyecto-card">
        <h4>${proyecto.icono || '🚀'} ${proyecto.nombre}</h4>
        <p>${proyecto.descripcion}</p>
        <div class="proyecto-meta">
          <span>📈 ROI: ${proyecto.roi_estimado}</span>
          <span>⏱️ ${proyecto.tiempo_implementacion}</span>
        </div>
      </div>
    `;
  }

  procesarMensaje(mensaje) {
    const intenciones = this.detectarIntencion(mensaje);
    const industria = this.extraerIndustria(mensaje);
    const categoria = this.extraerCategoria(mensaje);

    // Actualizar contexto
    if (industria) this.context.industria_usuario = industria;
    if (categoria) this.context.categoria_interes = categoria;

    // Saludo inicial
    if (intenciones.includes("saludo") && this.context.etapa_conversacion === "saludo") {
      this.context.etapa_conversacion = "exploracion";
      return `
        <div class="mensaje-bienvenida">
          <h3>¡Hola! 👋</h3>
          <p>Soy tu asistente especializado en <strong>proyectos de IA y Análisis de Datos</strong>.</p>

          <p>Puedo ayudarte a encontrar la solución perfecta para transformar tu negocio:</p>

          <div class="categorias-lista">
            <div>🤖 Machine Learning y Predicción</div>
            <div>👁️ Computer Vision</div>
            <div>📝 Procesamiento de Lenguaje Natural</div>
            <div>⚡ Optimización de Procesos</div>
            <div>📊 Analytics y Business Intelligence</div>
          </div>

          <p class="highlight">¿En qué industria o sector trabajas?</p>

          <p><small>También puedes preguntarme sobre proyectos específicos, ROI, casos de uso, etc.</small></p>
        </div>
      `;
    }

    // Despedida
    if (intenciones.includes("despedida")) {
      return `
        <p>¡Gracias por tu interés! 🚀</p>
        <p>Si necesitas más información sobre algún proyecto, no dudes en volver. ¡Éxito con tus iniciativas de IA!</p>
      `;
    }

    // Ayuda
    if (intenciones.includes("ayuda")) {
      return `
        <div class="ayuda-box">
          <h4>📋 ¿Cómo puedo ayudarte?</h4>

          <p><strong>Puedes preguntarme:</strong></p>
          <ul>
            <li>🏢 <em>"¿Qué proyectos tienes para retail?"</em></li>
            <li>🤖 <em>"Quiero algo de predicción"</em></li>
            <li>💰 <em>"¿Cuánto puedo ahorrar?"</em></li>
            <li>⏱️ <em>"¿Cuánto tarda la implementación?"</em></li>
            <li>💡 <em>"Dame una recomendación"</em></li>
          </ul>
        </div>
      `;
    }

    // Beneficios/ROI
    if (intenciones.includes("beneficios")) {
      return `
        <div class="roi-info">
          <h4>💰 Beneficios y ROI de Proyectos de IA</h4>

          <div class="stats">
            <div class="stat-item">
              <span class="stat-number">200-500%</span>
              <span class="stat-label">ROI promedio año 1</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">6-18 meses</span>
              <span class="stat-label">Tiempo de retorno</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">$200K-$5M</span>
              <span class="stat-label">Ahorros anuales</span>
            </div>
          </div>

          <p><strong>Beneficios comunes:</strong></p>
          <ul>
            <li>✅ Reducción de costos operativos: 20-40%</li>
            <li>✅ Aumento de eficiencia: 30-60%</li>
            <li>✅ Mejora en toma de decisiones</li>
            <li>✅ Ventaja competitiva</li>
          </ul>

          <p class="cta">¿Quieres ver proyectos con el mejor ROI para tu industria?</p>
        </div>
      `;
    }

    // Recomendación o propuesta
    if (intenciones.includes("recomendar") ||
        (intenciones.includes("general") && !this.context.proyectos_mostrados.length)) {
      return this.generarPropuestaPersonalizada(
        this.context.industria_usuario,
        this.context.categoria_interes
      );
    }

    // Si se menciona una industria
    if (industria) {
      const proyectos = this.buscarProyectosPorIndustria(industria);
      if (proyectos.length > 0) {
        const industriaNombre = CATALOGO.industrias[industria];
        let html = `
          <div class="resultados-industria">
            <h4>Proyectos de IA para ${industriaNombre}</h4>
            <p>Encontré <strong>${proyectos.length} proyectos</strong> perfectos para tu sector:</p>
            <div class="proyectos-grid">
        `;

        proyectos.slice(0, 3).forEach(proyecto => {
          html += this.formatearProyecto(proyecto);
        });

        html += `
            </div>
            ${proyectos.length > 3 ? `<p><em>Y ${proyectos.length - 3} proyectos más...</em></p>` : ''}
            <p class="cta">¿Quieres conocer más detalles sobre alguno?</p>
          </div>
        `;

        this.context.proyectos_mostrados = proyectos;
        return html;
      }
    }

    // Si se menciona una categoría
    if (categoria) {
      const catInfo = CATALOGO.categorias[categoria];
      let html = `
        <div class="categoria-info">
          <h4>${catInfo.icono} ${catInfo.nombre}</h4>
          <p>${catInfo.descripcion}</p>

          <p><strong>Proyectos disponibles:</strong></p>
          <div class="proyectos-grid">
      `;

      catInfo.proyectos.forEach(proyecto => {
        html += this.formatearProyecto({...proyecto, icono: catInfo.icono});
      });

      html += `
          </div>
          <p class="cta">¿Te gustaría conocer los detalles de algún proyecto específico?</p>
        </div>
      `;

      return html;
    }

    // Respuesta por defecto
    return this.generarPropuestaPersonalizada(
      this.context.industria_usuario,
      this.context.categoria_interes
    );
  }
}

// Inicializar el chatbot cuando el DOM esté listo
let chatbot;
document.addEventListener('DOMContentLoaded', () => {
  chatbot = new ChatbotIA();
  iniciarChat();
});

function iniciarChat() {
  const mensajeBienvenida = chatbot.procesarMensaje("hola");
  agregarMensaje(mensajeBienvenida, 'bot');
}

function agregarMensaje(contenido, tipo) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${tipo}-message`;

  if (tipo === 'user') {
    messageDiv.innerHTML = `
      <div class="message-header">👤 Tú</div>
      <div class="message-content">${contenido}</div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="message-header">🤖 Asistente IA</div>
      <div class="message-content">${contenido}</div>
    `;
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function enviarMensaje() {
  const input = document.getElementById('user-input');
  const mensaje = input.value.trim();

  if (!mensaje) return;

  // Mostrar mensaje del usuario
  agregarMensaje(mensaje, 'user');
  input.value = '';

  // Simular "escribiendo..."
  const chatMessages = document.getElementById('chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(typingDiv);

  // Procesar y responder
  setTimeout(() => {
    typingDiv.remove();
    const respuesta = chatbot.procesarMensaje(mensaje);
    agregarMensaje(respuesta, 'bot');
  }, 800);
}

function explorarCategoria(categoria) {
  const nombres = {
    'prediccion_ML': 'proyectos de predicción y machine learning',
    'computer_vision': 'proyectos de computer vision',
    'nlp_texto': 'proyectos de procesamiento de lenguaje natural',
    'optimizacion': 'proyectos de optimización',
    'analytics_bi': 'proyectos de analytics y BI'
  };

  const mensaje = `Cuéntame sobre ${nombres[categoria]}`;
  agregarMensaje(mensaje, 'user');

  setTimeout(() => {
    const respuesta = chatbot.procesarMensaje(mensaje);
    agregarMensaje(respuesta, 'bot');
  }, 500);
}

function accionRapida(tipo) {
  const mensajes = {
    'recomendar': 'Recomiéndame un proyecto',
    'roi': 'Cuéntame sobre los beneficios y ROI',
    'ayuda': 'Ayuda'
  };

  const mensaje = mensajes[tipo];
  agregarMensaje(mensaje, 'user');

  setTimeout(() => {
    const respuesta = chatbot.procesarMensaje(mensaje);
    agregarMensaje(respuesta, 'bot');
  }, 500);
}

// Permitir enviar con Enter
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('user-input');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        enviarMensaje();
      }
    });
  }
});
