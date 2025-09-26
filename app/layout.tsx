import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Darío Obregón | Asesor Financiero",
  description:
    "Asesoría financiera personalizada. Ordená tus finanzas e invertí con un plan claro. Planificación integral y carteras de inversión a medida.",
  keywords: "asesor financiero, planificación financiera, inversiones, Argentina, carteras de inversión",
  openGraph: {
    title: "Darío Obregón | Asesor Financiero",
    description: "Asesoría financiera personalizada. Ordená tus finanzas e invertí con un plan claro.",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          {children}
          <Toaster />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
