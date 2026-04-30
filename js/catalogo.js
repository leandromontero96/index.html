// Catálogo de proyectos de IA y Data Analytics
const CATALOGO = {
  categorias: {
    prediccion_ML: {
      nombre: "Predicción y Machine Learning",
      descripcion: "Proyectos que utilizan algoritmos de ML para predecir tendencias y comportamientos",
      icono: "🤖",
      proyectos: [
        {
          id: "pred_001",
          nombre: "Predicción de Demanda de Productos",
          descripcion: "Sistema de ML que predice la demanda futura de productos basándose en datos históricos, estacionalidad y factores externos",
          industrias: ["retail", "manufactura", "e-commerce"],
          beneficios: [
            "Reducción de inventario excesivo en 30-40%",
            "Mejora en la disponibilidad de productos en 25%",
            "Ahorro estimado de $500K-$2M anuales"
          ],
          tecnologias: ["Python", "Scikit-learn", "XGBoost", "Prophet", "LSTM"],
          tiempo_implementacion: "8-12 semanas",
          roi_estimado: "200-350%"
        },
        {
          id: "pred_002",
          nombre: "Predicción de Churn de Clientes",
          descripcion: "Modelo predictivo que identifica clientes con alta probabilidad de cancelar el servicio",
          industrias: ["telecomunicaciones", "SaaS", "banca", "seguros"],
          beneficios: [
            "Reducción de churn en 15-25%",
            "Identificación temprana de clientes en riesgo",
            "ROI de 300-500% en retención"
          ],
          tecnologias: ["Python", "Random Forest", "Gradient Boosting", "Logistic Regression"],
          tiempo_implementacion: "6-10 semanas",
          roi_estimado: "300-500%"
        },
        {
          id: "pred_003",
          nombre: "Predicción de Fallas en Equipos",
          descripcion: "Sistema que predice fallas en maquinaria industrial antes de que ocurran",
          industrias: ["manufactura", "energia", "mineria", "petroleo"],
          beneficios: [
            "Reducción de downtime no planificado en 40-60%",
            "Ahorro en costos de mantenimiento de 20-35%",
            "Aumento de vida útil de equipos en 15-25%"
          ],
          tecnologias: ["Python", "LSTM", "Isolation Forest", "IoT sensors", "Azure ML"],
          tiempo_implementacion: "10-16 semanas",
          roi_estimado: "250-400%"
        }
      ]
    },
    computer_vision: {
      nombre: "Computer Vision",
      descripcion: "Proyectos que utilizan visión artificial para analizar imágenes y video",
      icono: "👁️",
      proyectos: [
        {
          id: "cv_001",
          nombre: "Detección de Defectos en Producción",
          descripcion: "Sistema de inspección visual automática que detecta defectos en productos usando cámaras y deep learning",
          industrias: ["manufactura", "automotriz", "electronica", "alimentos"],
          beneficios: [
            "Reducción de defectos que llegan al cliente en 80-95%",
            "Aumento de velocidad de inspección en 10x",
            "Ahorro de costos de calidad de $800K-$3M anuales"
          ],
          tecnologias: ["OpenCV", "YOLO", "CNN", "PyTorch", "TensorFlow"],
          tiempo_implementacion: "12-16 semanas",
          roi_estimado: "300-600%"
        },
        {
          id: "cv_002",
          nombre: "Conteo y Tracking de Personas/Objetos",
          descripcion: "Sistema que cuenta y rastrea personas u objetos en tiempo real usando video",
          industrias: ["retail", "transporte", "seguridad", "eventos"],
          beneficios: [
            "Insights de tráfico y comportamiento en tiempo real",
            "Optimización de layout y staffing",
            "Mejora en seguridad y prevención de pérdidas"
          ],
          tecnologias: ["YOLO", "DeepSORT", "OpenCV", "Detectron2"],
          tiempo_implementacion: "8-12 semanas",
          roi_estimado: "150-250%"
        }
      ]
    },
    nlp_texto: {
      nombre: "NLP y Análisis de Texto",
      descripcion: "Proyectos que analizan y procesan lenguaje natural",
      icono: "📝",
      proyectos: [
        {
          id: "nlp_001",
          nombre: "Análisis de Sentimiento de Clientes",
          descripcion: "Sistema que analiza automáticamente opiniones, reseñas y feedback de clientes",
          industrias: ["retail", "hoteleria", "SaaS", "e-commerce"],
          beneficios: [
            "Identificación automática de problemas emergentes",
            "Priorización de mejoras basada en impacto",
            "Mejora en NPS de 10-20 puntos"
          ],
          tecnologias: ["BERT", "transformers", "spaCy", "NLTK", "TextBlob"],
          tiempo_implementacion: "6-8 semanas",
          roi_estimado: "180-280%"
        },
        {
          id: "nlp_002",
          nombre: "Chatbot de Atención al Cliente",
          descripcion: "Asistente virtual inteligente que responde preguntas frecuentes y resuelve problemas comunes",
          industrias: ["todos"],
          beneficios: [
            "Reducción de tickets de soporte en 40-60%",
            "Disponibilidad 24/7",
            "Ahorro de costos de soporte de $300K-$1.5M anuales"
          ],
          tecnologias: ["Rasa", "Dialogflow", "LangChain", "GPT", "Claude"],
          tiempo_implementacion: "10-14 semanas",
          roi_estimado: "250-450%"
        }
      ]
    },
    optimizacion: {
      nombre: "Optimización",
      descripcion: "Proyectos que optimizan procesos y recursos",
      icono: "⚡",
      proyectos: [
        {
          id: "opt_001",
          nombre: "Optimización de Rutas de Entrega",
          descripcion: "Sistema que optimiza rutas de vehículos de entrega para minimizar costos y tiempo",
          industrias: ["logistica", "e-commerce", "alimentos", "distribucion"],
          beneficios: [
            "Reducción de costos de combustible en 20-35%",
            "Aumento de entregas por vehículo en 15-25%",
            "Reducción de emisiones de CO2 en 25-40%"
          ],
          tecnologias: ["OR-Tools", "Genetic Algorithms", "Dijkstra", "Google Maps API"],
          tiempo_implementacion: "8-12 semanas",
          roi_estimado: "300-500%"
        },
        {
          id: "opt_002",
          nombre: "Sistema de Pricing Dinámico",
          descripcion: "Algoritmo que ajusta precios automáticamente basado en demanda, competencia y otros factores",
          industrias: ["e-commerce", "hoteleria", "aerolineas", "retail"],
          beneficios: [
            "Aumento de margen bruto en 5-15%",
            "Mejora en competitividad de precios",
            "Incremento de revenue de $1M-$5M anuales"
          ],
          tecnologias: ["Reinforcement Learning", "Time Series Analysis", "Regression Models"],
          tiempo_implementacion: "10-16 semanas",
          roi_estimado: "350-600%"
        }
      ]
    },
    analytics_bi: {
      nombre: "Analytics y BI",
      descripcion: "Proyectos de visualización y análisis de datos",
      icono: "📊",
      proyectos: [
        {
          id: "bi_001",
          nombre: "Dashboard Ejecutivo en Tiempo Real",
          descripcion: "Plataforma de visualización que muestra KPIs críticos del negocio en tiempo real",
          industrias: ["todos"],
          beneficios: [
            "Visibilidad en tiempo real de métricas clave",
            "Mejor toma de decisiones basada en datos",
            "Identificación rápida de problemas y oportunidades"
          ],
          tecnologias: ["Power BI", "Tableau", "Streamlit", "Plotly", "SQL"],
          tiempo_implementacion: "6-10 semanas",
          roi_estimado: "150-250%"
        },
        {
          id: "bi_002",
          nombre: "Customer Analytics 360°",
          descripcion: "Plataforma integral de análisis de clientes: segmentación, LTV, comportamiento, journey",
          industrias: ["retail", "e-commerce", "SaaS", "banca"],
          beneficios: [
            "Segmentación precisa para marketing dirigido",
            "Aumento en LTV de clientes en 15-30%",
            "Mejora en conversión de campañas de 20-40%"
          ],
          tecnologias: ["Python", "SQL", "Clustering", "RFM Analysis", "Cohort Analysis"],
          tiempo_implementacion: "8-12 semanas",
          roi_estimado: "250-450%"
        }
      ]
    }
  },

  industrias: {
    retail: "Retail",
    "e-commerce": "E-commerce",
    manufactura: "Manufactura",
    logistica: "Logística",
    banca: "Banca",
    seguros: "Seguros",
    telecomunicaciones: "Telecomunicaciones",
    salud: "Salud",
    energia: "Energía",
    petroleo: "Petróleo y Gas",
    mineria: "Minería",
    SaaS: "SaaS",
    hoteleria: "Hotelería",
    automotriz: "Automotriz",
    electronica: "Electrónica",
    alimentos: "Alimentos",
    transporte: "Transporte",
    seguridad: "Seguridad",
    eventos: "Eventos",
    distribucion: "Distribución",
    aerolineas: "Aerolíneas",
    todos: "Todas las industrias"
  }
};
