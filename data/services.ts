export interface Service {
  id: number
  title: string
  frontDescription: string
  backDescription: string
  benefits: string[]
  icon: string
}

export const services: Service[] = [
  {
    id: 1,
    title: "Planificación Financiera Integral",
    frontDescription: "Diseño personalizado de tu estrategia financiera completa",
    backDescription: "Análisis profundo de tu situación actual y objetivos futuros",
    benefits: [
      "Diagnóstico financiero completo",
      "Plan de ahorro personalizado",
      "Estrategias de optimización fiscal",
      "Seguimiento mensual de progreso",
    ],
    icon: "target",
  },
  {
    id: 2,
    title: "Carteras de Inversión a Medida",
    frontDescription: "Portfolios diversificados según tu perfil de riesgo",
    backDescription: "Construcción de carteras balanceadas para maximizar retornos",
    benefits: [
      "Diversificación inteligente",
      "Rebalanceo automático",
      "Análisis de riesgo/retorno",
      "Reportes de performance",
    ],
    icon: "trending-up",
  },
  {
    id: 3,
    title: "Protección & Objetivos",
    frontDescription: "Fondo de emergencia, vivienda y planificación del retiro",
    backDescription: "Estrategias para proteger y hacer crecer tu patrimonio",
    benefits: [
      "Fondo de emergencia optimizado",
      "Plan de compra de vivienda",
      "Estrategia de jubilación",
      "Seguros de protección familiar",
    ],
    icon: "shield-check",
  },
]
