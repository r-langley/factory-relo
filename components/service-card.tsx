import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-[#fffcf5] border border-[#e5dfd0] rounded-lg p-6 transition-all hover:shadow-md">
      <div className="bg-[#fff9e8] inline-flex p-3 rounded-md mb-4">
        <Icon className="h-6 w-6 text-[#8B3E2F]" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
