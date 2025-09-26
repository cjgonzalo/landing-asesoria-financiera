"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Mail, MessageCircle, Calendar, Send, Clock, MapPin } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email("Ingresá un email válido"),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  motivo: z.string().min(10, "Describí brevemente el motivo de tu consulta").max(300, "Máximo 300 caracteres"),
  actividadOcupacion: z.string().optional(),
  provincia: z.string().optional(),
  invirtioBolsa: z.enum(["si", "no"]).optional(),
  cuentaComitente: z.string().optional(),
  objetivoInversion: z.string().max(300, "Máximo 300 caracteres").optional(),
  horizonte: z.string().optional(),
  riesgo: z.enum(["bajo", "moderado", "alto"], {
    required_error: "Seleccioná tu perfil de riesgo",
  }),
  consentimiento: z.boolean().refine((val) => val === true, {
    message: "Debés aceptar el tratamiento de datos personales",
  }),
})

type FormData = z.infer<typeof formSchema>

const provincias = [
  "Capital Federal",
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
]

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      nombre: "",
      apellido: "",
      motivo: "",
      actividadOcupacion: "",
      provincia: "",
      objetivoInversion: "",
      consentimiento: false,
    },
  })

  const motivoLength = form.watch("motivo")?.length || 0
  const objetivoLength = form.watch("objetivoInversion")?.length || 0

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Te contactaré dentro de las próximas 24 horas.",
        })
        form.reset()
        setIsOpen(false)
      } else {
        throw new Error("Error al enviar el mensaje")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Intentá nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Comenzá tu <span className="text-primary">transformación financiera</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Agenda una consulta gratuita de 20 minutos y descubrí cómo mejorar tus finanzas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-card border-border shadow-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contacto directo</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <a
                      href="mailto:dario@ejemplo.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      dario@ejemplo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">WhatsApp</h4>
                    <a
                      href="https://wa.me/54911XXXXYYYY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-analytics="cta_whatsapp"
                    >
                      +54 9 11 XXXX-YYYY
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horario de atención</h4>
                    <p className="text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</p>
                    <p className="text-muted-foreground">Sábados: 9:00 - 13:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Ubicación</h4>
                    <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                    <p className="text-sm text-muted-foreground mt-1">Consultas presenciales y virtuales</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-primary text-primary-foreground p-8">
              <h3 className="text-xl font-bold mb-4">¿Por qué elegir mi asesoramiento?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                  <span>Consulta inicial gratuita de 20 minutos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                  <span>Estrategias personalizadas según tu perfil</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                  <span>Seguimiento continuo de tus objetivos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                  <span>Transparencia total en cada decisión</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-border shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Formulario de contacto</h3>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="rounded-2xl" data-analytics="cta_form_open">
                      <Calendar className="mr-2 h-4 w-4" />
                      Abrir formulario
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Solicitar asesoría financiera</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Datos personales */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-foreground">Datos personales</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="nombre"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nombre *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Tu nombre" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="apellido"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Apellido *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Tu apellido" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="tu@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="motivo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Motivo de la consulta * ({motivoLength}/300)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Contame brevemente qué te gustaría lograr con tu asesoramiento financiero..."
                                    className="min-h-[100px]"
                                    maxLength={300}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="actividadOcupacion"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Actividad/Ocupación</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ej: Contador, Médico, etc." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="provincia"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Provincia</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Seleccioná tu provincia" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {provincias.map((provincia) => (
                                        <SelectItem key={provincia} value={provincia}>
                                          {provincia}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Experiencia en mercado */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-foreground">Experiencia en mercado</h4>
                          <FormField
                            control={form.control}
                            name="invirtioBolsa"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>¿Invertiste en bolsa anteriormente?</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-6"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="si" id="si" />
                                      <label htmlFor="si">Sí</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="no" id="no" />
                                      <label htmlFor="no">No</label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cuentaComitente"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>¿Tenés cuenta comitente?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccioná una opción" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="balanz">Balanz</SelectItem>
                                    <SelectItem value="invertir-online">Invertir Online</SelectItem>
                                    <SelectItem value="bull-market">Bull Market Brokers</SelectItem>
                                    <SelectItem value="otra">Otra</SelectItem>
                                    <SelectItem value="no-tengo">No tengo cuenta comitente</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Perfil de inversión */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-foreground">Perfil de inversión</h4>
                          <FormField
                            control={form.control}
                            name="objetivoInversion"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Objetivo de inversión ({objetivoLength}/300)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Ej: Ahorrar para la jubilación, comprar una casa, generar ingresos pasivos..."
                                    className="min-h-[80px]"
                                    maxLength={300}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="horizonte"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Horizonte de inversión</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="¿En cuánto tiempo necesitás el dinero?" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="menos-1-año">Menos de 1 año</SelectItem>
                                    <SelectItem value="1-5-años">Entre 1 y 5 años</SelectItem>
                                    <SelectItem value="mas-5-años">Más de 5 años</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="riesgo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Perfil de riesgo *</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="space-y-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="bajo" id="bajo" />
                                      <label htmlFor="bajo" className="text-sm">
                                        <strong>Bajo:</strong> Prefiero seguridad, aunque los retornos sean menores
                                      </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="moderado" id="moderado" />
                                      <label htmlFor="moderado" className="text-sm">
                                        <strong>Moderado:</strong> Acepto cierta volatilidad por mejores retornos
                                      </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="alto" id="alto" />
                                      <label htmlFor="alto" className="text-sm">
                                        <strong>Alto:</strong> Busco maximizar retornos, acepto alta volatilidad
                                      </label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Consentimiento */}
                        <FormField
                          control={form.control}
                          name="consentimiento"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm">
                                  Acepto el tratamiento de mis datos personales para recibir asesoramiento financiero *
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        {/* Disclaimer */}
                        <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                          <p className="mb-2">
                            <strong>Aviso legal:</strong> La información proporcionada es confidencial y será utilizada
                            únicamente para brindar asesoramiento financiero personalizado.
                          </p>
                          <p>
                            Las inversiones conllevan riesgos y los rendimientos pasados no garantizan resultados
                            futuros. Toda recomendación será adaptada a tu perfil específico.
                          </p>
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full rounded-2xl"
                          data-analytics="form_submit"
                        >
                          {isSubmitting ? (
                            "Enviando..."
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Enviar solicitud
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-muted-foreground text-pretty">
                Completá el formulario detallado para que pueda preparar una propuesta personalizada antes de nuestra
                primera reunión. La consulta inicial es completamente gratuita y sin compromiso.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
