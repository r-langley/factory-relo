import type { LucideIcon } from "lucide-react"

interface IconGridItemProps {
  icon: LucideIcon
  title: string
}

export function IconGridItem({ icon: Icon, title }: IconGridItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-[#f5f0e4] p-4 rounded-sm mb-3 w-16 h-16 flex items-center justify-center">
        <Icon className="h-8 w-8 text-[#8B3E2F]" />
      </div>
      <p className="text-sm font-medium text-gray-700">{title}</p>
    </div>
  )
}
