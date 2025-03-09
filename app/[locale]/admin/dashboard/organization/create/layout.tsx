import type { ReactNode } from "react"

export default function CreateOrganizationLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-primary/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary font-bold text-3xl">Y</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

