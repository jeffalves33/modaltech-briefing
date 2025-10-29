import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-20 h-20 text-green-600" />
          </div>
          <CardTitle className="text-3xl text-balance">Briefing Enviado com Sucesso!</CardTitle>
          <CardDescription className="text-lg text-pretty">
            Obrigado por compartilhar os detalhes do seu projeto conosco
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-lg text-blue-900">Próximos passos:</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Nossa equipe vai analisar todas as informações fornecidas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Entraremos em contato em até 24 horas úteis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Vamos preparar uma proposta personalizada para você</span>
              </li>
            </ul>
          </div>

          {params.id && (
            <div className="text-center text-sm text-gray-600">
              <p>Número do seu briefing:</p>
              <code className="bg-gray-100 px-3 py-1 rounded text-xs font-mono">{params.id}</code>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button asChild size="lg">
              <Link href="/">Criar Novo Briefing</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
