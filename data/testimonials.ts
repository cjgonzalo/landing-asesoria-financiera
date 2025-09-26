export interface Testimonial {
  id: number
  name: string
  occupation: string
  text: string
  rating: number
  avatar: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    occupation: "Contadora",
    text: "Darío me ayudó a organizar mis finanzas personales y crear un plan de inversión. En 6 meses ya veo resultados concretos.",
    rating: 5,
    avatar: "/professional-woman-avatar.png",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    occupation: "Ingeniero",
    text: "Excelente asesoramiento. Me guió paso a paso para diversificar mi cartera y reducir riesgos. Muy recomendable.",
    rating: 5,
    avatar: "/professional-man-avatar.png",
  },
  {
    id: 3,
    name: "Ana Martínez",
    occupation: "Médica",
    text: "Profesional, claro en sus explicaciones y siempre disponible para consultas. Mi patrimonio creció de forma sostenible.",
    rating: 5,
    avatar: "/professional-woman-doctor-avatar.jpg",
  },
  {
    id: 4,
    name: "Roberto Silva",
    occupation: "Comerciante",
    text: "Me ayudó a planificar la jubilación y proteger mi familia. Su enfoque integral me dio mucha tranquilidad.",
    rating: 5,
    avatar: "/professional-businessman-avatar.jpg",
  },
  {
    id: 5,
    name: "Laura Fernández",
    occupation: "Arquitecta",
    text: "Darío transformó mi relación con el dinero. Ahora tengo objetivos claros y un plan para alcanzarlos.",
    rating: 5,
    avatar: "/professional-woman-architect-avatar.jpg",
  },
  {
    id: 6,
    name: "Diego Morales",
    occupation: "Abogado",
    text: "Su conocimiento del mercado argentino es excepcional. Me ayudó a navegar la volatilidad con estrategias sólidas.",
    rating: 5,
    avatar: "/professional-lawyer-avatar.png",
  },
]
