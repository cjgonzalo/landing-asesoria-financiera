import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
  email: z.string().email(),
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  motivo: z.string().min(10).max(300),
  actividadOcupacion: z.string().optional(),
  provincia: z.string().optional(),
  invirtioBolsa: z.enum(["si", "no"]).optional(),
  cuentaComitente: z.string().optional(),
  objetivoInversion: z.string().max(300).optional(),
  horizonte: z.string().optional(),
  riesgo: z.enum(["bajo", "moderado", "alto"]),
  consentimiento: z.boolean().refine((val) => val === true),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // Log the contact form submission (in production, you'd save to database or send email)
    console.log("New contact form submission:", {
      timestamp: new Date().toISOString(),
      ...validatedData,
    })

    // TODO: Replace with actual email service (Resend, SendGrid, etc.)
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@darioobregon.com',
    //   to: 'dario@ejemplo.com',
    //   subject: `Nueva consulta de ${validatedData.nombre} ${validatedData.apellido}`,
    //   html: generateEmailTemplate(validatedData),
    // })

    return NextResponse.json({ message: "Formulario enviado correctamente" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
