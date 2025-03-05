import { DemoRequestForm } from "./demoRequestForm"

export default function DemoRequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Request a Demo
            </h1>
            <p className="text-lg text-slate-600">
              Experience how Yhdisteri can simplify member management for your association
            </p>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
            <DemoRequestForm />
          </div>
          
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>
              Have questions? Contact us at{" "}
              <a href="mailto:support@yhdisteri.com" className="text-blue-600 hover:underline">
                support@yhdisteri.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
