import type { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`mx-auto w-[95vw] sm:w-[85vw] md:w-[75vw] lg:max-w-[60vw] py-16 ${className}`}>
      {children}
    </section>
  )
}
