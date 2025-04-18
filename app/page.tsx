"use client"

import { Button } from "@/components/ui/button"
import { GridBackground } from "@/components/grid-background"
import { Logo } from "@/components/logo"
import { Section } from "@/components/section"
import { FeatureCard } from "@/components/feature-card"
import { IconGridItem } from "@/components/icon-grid-item"
import { TrustBadge } from "@/components/trust-badge"
import { ContactForm } from "@/components/contact-form"
import { InlineContactForm } from "@/components/inline-contact-form"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { useState, useEffect } from "react"
import { BarChart3, Clock, Eye, Factory, Globe, LineChart, Truck, Warehouse, Wrench } from "lucide-react"
import { track } from "@vercel/analytics"

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  // Track page view on component mount
  useEffect(() => {
    track("page_view", { page: "home" })
  }, [])

  const openContactForm = () => {
    setIsContactFormOpen(true)
    track("contact_button_clicked", { location: "header_or_hero" })
  }

  const closeContactForm = () => {
    setIsContactFormOpen(false)
  }

  return (
    <>
      <GridBackground />
      <main className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f9f5eb] bg-opacity-75 z-0"></div>
        <div className="relative z-10">
          {/* Announcement Banner */}
          <AnnouncementBanner />

          {/* Header */}
          <header className="mx-auto w-[95vw] sm:w-[85vw] md:w-[75vw] lg:max-w-[60vw] flex items-center justify-between py-6">
            <div className="flex items-center">
              <Logo className="mr-3" />
              <h1 className="text-xl">Factory Relo</h1>
            </div>
            <Button
              className="bg-[#8B3E2F] hover:bg-[#6F3226] text-white rounded-md px-4 py-2 text-sm"
              onClick={openContactForm}
            >
              Get in Touch
            </Button>
          </header>

          {/* Hero Section */}
          <Section className="text-center">
            <h2 className="text-4xl mb-6">Navigate unprecedented times</h2>
            <p className="body-text text-center mx-auto mb-10">
              Factory Relo provides expert consulting to help businesses navigate complex supply chain transitions,
              minimize tariff exposure, and execute factory relocation without production interruption.
            </p>
            <div className="max-w-md mx-auto">
              <InlineContactForm />
            </div>
            <TrustBadge />
          </Section>

          {/* How it works */}
          <Section>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Tariff Impact Assessment"
                description="We perform evaluations of your current manufacturing footprint, identifying vulnerabilities and calculating potential cost savings through strategic relocation."
                imageSrc="/images/cargo-ship.png"
                imageAlt="Cargo ship loaded with shipping containers"
              />
              <FeatureCard
                title="Transition Planning"
                description="Our team develops practical reshoring and nearshoring strategies tailored to your specific manufacturing needs with detailed ROI calculations."
                imageSrc="/images/strategic-tower.png"
                imageAlt="Industrial tower with staircase against sunset sky"
              />
              <FeatureCard
                title="Factory Move Execution"
                description="Factory Relo consultants provide hands-on support throughout the entire relocation timeline while maintaining production continuity and reducing supply chain geopolitical risk."
                imageSrc="/images/migration-airplane.png"
                imageAlt="Airplane taking off at night with runway lights"
              />
            </div>
          </Section>

          {/* Results */}
          <Section>
            <h2 className="text-3xl text-center mb-8">Professional Services</h2>
            <p className="body-text text-center mx-auto mb-12">
              <span className="font-medium">Factory Relo</span> combines traditional consulting methodologies with deep
              industry expertise to help consumer goods manufacturers analyze relocation costs, secure tax benefits, and
              develop supplier diversification strategies during trade volatility.
            </p>

            <div className="grid grid-cols-3 gap-x-6 gap-y-8 max-w-3xl mx-auto">
              <IconGridItem icon={BarChart3} title="Tariff Exposure Reduction" />
              <IconGridItem icon={Globe} title="Global Sourcing Strategy" />
              <IconGridItem icon={Factory} title="US Reshoring Incentives" />
              <IconGridItem icon={Truck} title="Supply Chain Relocation" />
              <IconGridItem icon={Clock} title="Manufacturing Relocation Timeline" />
              <IconGridItem icon={Eye} title="Supply Chain Geopolitical Risk" />
              <IconGridItem icon={Warehouse} title="Consumer Goods Reshoring" />
              <IconGridItem icon={LineChart} title="Factory Relocation ROI" />
              <IconGridItem icon={Wrench} title="Relocation Project Management" />
            </div>
          </Section>

          {/* CTA Section with Inline Form */}
          <Section className="text-center">
            <h2 className="text-3xl mb-6">Consulting packages starting at $25,000</h2>
            <p className="body-text mb-8">Transform uncertainty into opportunity.</p>
            <InlineContactForm />
          </Section>
        </div>
      </main>

      <ContactForm isOpen={isContactFormOpen} onClose={closeContactForm} />
    </>
  )
}
