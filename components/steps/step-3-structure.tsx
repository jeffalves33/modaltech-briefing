"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import type { BriefingData } from "@/lib/briefing-storage"

interface StepProps {
  data: Partial<BriefingData>
  updateData: (data: Partial<BriefingData>) => void
}

const PAGE_OPTIONS = [
  { id: "home", label: "Página Inicial (Home)" },
  { id: "sobre", label: "Sobre Nós / Quem Somos" },
  { id: "servicos", label: "Serviços / Produtos" },
  { id: "portfolio", label: "Portfólio / Galeria" },
  { id: "blog", label: "Blog / Notícias" },
  { id: "contato", label: "Contato" },
  { id: "depoimentos", label: "Depoimentos / Avaliações" },
  { id: "faq", label: "FAQ / Perguntas Frequentes" },
]

export function Step3Structure({ data, updateData }: StepProps) {
  const handlePageToggle = (pageId: string) => {
    const current = data.pagesNeeded || []
    const updated = current.includes(pageId) ? current.filter((id) => id !== pageId) : [...current, pageId]
    updateData({ pagesNeeded: updated })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base font-semibold">Quais páginas você precisa no seu site? *</Label>
        <p className="text-sm text-gray-500 mb-4">Selecione todas as páginas que você gostaria de ter</p>
        <div className="space-y-3">
          {PAGE_OPTIONS.map((page) => (
            <div key={page.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <Checkbox
                id={page.id}
                checked={data.pagesNeeded?.includes(page.id) || false}
                onCheckedChange={() => handlePageToggle(page.id)}
              />
              <Label htmlFor={page.id} className="cursor-pointer flex-1 font-normal">
                {page.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otherPages" className="text-base font-semibold">
          Outras páginas específicas
        </Label>
        <Textarea
          id="otherPages"
          placeholder="Ex: Página de agendamento, área de membros, calculadora de preços..."
          value={data.otherPages || ""}
          onChange={(e) => updateData({ otherPages: e.target.value })}
          rows={4}
          className="text-base resize-none"
        />
        <p className="text-sm text-gray-500">Descreva qualquer página especial que não esteja na lista acima</p>
      </div>
    </div>
  )
}
