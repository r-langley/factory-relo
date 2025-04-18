interface ResultCardProps {
  title: string
  description: string
}

export function ResultCard({ title, description }: ResultCardProps) {
  return (
    <div>
      <p className="text-[#8B3E2F] uppercase text-xs font-semibold tracking-wider mb-3">{title}</p>
      <div className="bg-[#f5f0e4] h-32 mb-4 rounded-sm overflow-hidden">
        <img src="/images/shipping-port.png" alt="Shipping port illustration" className="w-full h-full object-cover" />
      </div>
      <p className="body-text">{description}</p>
    </div>
  )
}
