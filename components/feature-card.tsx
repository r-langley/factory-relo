interface FeatureCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export function FeatureCard({ title, description, imageSrc, imageAlt }: FeatureCardProps) {
  return (
    <div>
      <p className="text-[#8B3E2F] uppercase text-xs font-semibold tracking-wider mb-3">{title}</p>
      <div className="bg-[#f5f0e4] mb-4 rounded-sm overflow-hidden relative" style={{ paddingTop: "150%" }}>
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <p className="body-text">{description}</p>
    </div>
  )
}
