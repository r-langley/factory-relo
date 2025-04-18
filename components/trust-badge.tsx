import { Shield } from "lucide-react"

export function TrustBadge() {
  return (
    <div className="mt-12 flex justify-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f0e4] border border-[#e5dfd0] rounded-full">
        <Shield className="h-4 w-4 text-[#8B3E2F]" />
        <p className="text-xs font-medium text-gray-700">Trusted by small teams and Fortune 500 companies</p>
      </div>
    </div>
  )
}
