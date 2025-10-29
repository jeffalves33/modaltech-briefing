import { createClient } from "@/lib/supabase/server"
import { BriefingsList } from "@/components/briefings-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function AdminBriefingsPage() {
  const supabase = await createClient()

  const { data: briefings, error } = await supabase
    .from("briefings")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching briefings:", error)
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Erro ao carregar briefings. Por favor, tente novamente.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <Button variant="ghost" className="gap-2 mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Briefings Recebidos</h1>
              <p className="text-gray-600 mt-1">
                {briefings?.length || 0} {briefings?.length === 1 ? "briefing" : "briefings"} no total
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BriefingsList briefings={briefings || []} />
      </div>
    </div>
  )
}
