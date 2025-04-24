"use client"

import { Button } from "@/components/ui/button"
import { GridBackground } from "@/components/grid-background"
import { Logo } from "@/components/logo"
import { Section } from "@/components/section"
import { FeatureCard } from "@/components/feature-card"
import { ServiceCard } from "@/components/service-card"
import { TrustBadge } from "@/components/trust-badge"
import { ContactForm } from "@/components/contact-form"
import { InlineContactForm } from "@/components/inline-contact-form"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { useState, useEffect } from "react"
import { BarChart3, Clock, Factory, Globe, Truck, Wrench, Shield, Calculator, Building2 } from "lucide-react"
import { track } from "@vercel/analytics/react"

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
            <h2 className="text-4xl mb-6">Manufacturing relocation experts</h2>
            <p className="body-text text-center mx-auto mb-10">
              Factory Relo provides expert support for factory relocation, new product launches, and minimizing tariff
              exposure amid shifting supply chains.
            </p>
            <div className="max-w-md mx-auto">
              <InlineContactForm />
            </div>
            <TrustBadge />
          </Section>

          {/* Our Expertise Section */}
          <Section>
            <h2 className="text-3xl text-center mb-8">Our Expertise</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Consumer Electronics"
                description="We offer expertise in PCB assembly, component sourcing, and testing protocols that meet international standards—all with built-in supply chain resilience to navigate component shortages and trade uncertainties."
                imageSrc="/images/circuit-board.jpeg"
                imageAlt="Close-up of a blue circuit board with electronic components"
              />
              <FeatureCard
                title="Apparel & Textiles"
                description="Whether you need technical performance fabrics or sustainable materials, our partners deliver quality craftsmanship with transparent labor practices and the agility to shift production when market conditions change."
                imageSrc="/images/apparel-tshirts.jpeg"
                imageAlt="Neatly folded t-shirts in pink, white, and black colors"
              />
              <FeatureCard
                title="Packaged Goods"
                description="Transform your packaged goods concepts into market-ready products with manufacturers experienced in packaging, distribution, and supply chain optimization for consumer products."
                imageSrc="/images/packaged-boxes.jpeg"
                imageAlt="Stacked brown cardboard boxes with branding"
              />
            </div>
          </Section>

          {/* Navigate Trade Volatility Section */}
          <Section>
            <h2 className="text-3xl text-center mb-4">Navigate Trade Volatility With Confidence</h2>
            <p className="body-text text-center mx-auto mb-12 max-w-3xl">
              Our comprehensive approach helps manufacturers adapt to changing trade policies, minimize tariff exposure,
              and build resilient supply chains for uncertain times.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <ServiceCard
                icon={BarChart3}
                title="Tariff Exposure Reduction"
                description="Comprehensive analysis of your product portfolio to identify tariff vulnerabilities and develop targeted strategies that minimize duty exposure while maintaining quality standards."
              />
              <ServiceCard
                icon={Globe}
                title="Diversification Strategy"
                description="Multi-region sourcing plans that protect your supply chain from disruption with optimized manufacturing networks across strategic countries based on your specific product requirements."
              />
              <ServiceCard
                icon={Factory}
                title="US Reshoring Incentives"
                description="Navigate complex federal, state, and local tax credits, grants, and incentives designed to encourage domestic manufacturing, maximizing financial benefits of reshoring operations."
              />
              <ServiceCard
                icon={Shield}
                title="Supply Chain Geopolitical Risk"
                description="AI-powered analysis of geopolitical factors affecting your supply chain with actionable mitigation strategies for high-risk scenarios and real-time monitoring of emerging threats."
              />
              <ServiceCard
                icon={Clock}
                title="Manufacturing Relocation Timeline"
                description="Detailed project roadmaps with realistic milestones for manufacturing transitions, including contingency planning to prevent disruption during critical relocation phases."
              />
              <ServiceCard
                icon={Truck}
                title="Supply Chain Continuity"
                description="Develop robust business continuity strategies that ensure uninterrupted operations during manufacturing transitions with dual-sourcing approaches and inventory management optimization."
              />
              <ServiceCard
                icon={Calculator}
                title="Factory Relocation ROI Analysis"
                description="Comprehensive cost-benefit analysis of relocation options with 5-year projected ROI models that account for tariffs, labor, transportation, and incentives to support investment decisions."
              />
              <ServiceCard
                icon={Building2}
                title="Consumer Goods Industry Expertise"
                description="Specialized knowledge in electronics, apparel, and packaged goods manufacturing with sector-specific relocation strategies that address unique requirements for each product category."
              />
              <ServiceCard
                icon={Wrench}
                title="Relocation Project Management"
                description="End-to-end implementation support from our experienced team who have executed over 75 successful manufacturing relocations across consumer goods sectors worldwide."
              />
            </div>
          </Section>

          {/* CTA Section with Inline Form */}
          <Section className="text-center">
            <h2 className="text-3xl mb-6">Consulting packages starting at $5,000</h2>
            <p className="body-text mb-8">Transform uncertainty into opportunity.</p>
            <InlineContactForm />
          </Section>
        </div>
      </main>

      <ContactForm isOpen={isContactFormOpen} onClose={closeContactForm} />
    </>
  )
}
