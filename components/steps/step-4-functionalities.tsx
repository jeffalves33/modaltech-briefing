"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import type { BriefingData } from "@/lib/briefing-storage"
import { useState } from "react"

interface StepProps {
  data: Partial<BriefingData>
  updateData: (data: Partial<BriefingData>) => void
}

const FUNCTIONALITIES_BY_TYPE: Record<string, Array<{ id: string; label: string }>> = {
  ecommerce: [
    { id: "carrinho", label: "Carrinho de compras" },
    { id: "pagamento", label: "Sistema de pagamento online" },
    { id: "cadastro-produtos", label: "Cadastro de produtos" },
    { id: "busca-produtos", label: "Busca e filtros de produtos" },
    { id: "wishlist", label: "Lista de desejos" },
    { id: "avaliacoes", label: "Sistema de avaliações" },
    { id: "cupons", label: "Cupons de desconto" },
    { id: "rastreamento", label: "Rastreamento de pedidos" },
    { id: "area-cliente", label: "Área do cliente" },
    { id: "newsletter", label: "Newsletter" },
  ],
  landing: [
    { id: "formulario-lead", label: "Formulário de captura de leads" },
    { id: "cta-whatsapp", label: "Botão de WhatsApp" },
    { id: "popup", label: "Pop-up de conversão" },
    { id: "countdown", label: "Contador regressivo" },
    { id: "depoimentos", label: "Seção de depoimentos" },
    { id: "faq", label: "FAQ / Perguntas frequentes" },
    { id: "video", label: "Vídeo de apresentação" },
    { id: "chat", label: "Chat online" },
    { id: "integracao-email", label: "Integração com e-mail marketing" },
  ],
  institucional: [
    { id: "formulario-contato", label: "Formulário de contato" },
    { id: "mapa", label: "Mapa de localização" },
    { id: "chat", label: "Chat online / WhatsApp" },
    { id: "newsletter", label: "Newsletter" },
    { id: "multiidioma", label: "Múltiplos idiomas" },
    { id: "area-cliente", label: "Área do cliente / Login" },
    { id: "busca", label: "Sistema de busca" },
    { id: "galeria", label: "Galeria de fotos/vídeos" },
    { id: "depoimentos", label: "Depoimentos de clientes" },
    { id: "equipe", label: "Página da equipe" },
  ],
  blog: [
    { id: "comentarios", label: "Sistema de comentários" },
    { id: "busca", label: "Busca de artigos" },
    { id: "categorias", label: "Categorias e tags" },
    { id: "newsletter", label: "Newsletter" },
    { id: "compartilhamento", label: "Botões de compartilhamento social" },
    { id: "autor", label: "Perfis de autores" },
    { id: "relacionados", label: "Artigos relacionados" },
    { id: "rss", label: "Feed RSS" },
    { id: "area-autor", label: "Área do autor" },
  ],
  portfolio: [
    { id: "galeria", label: "Galeria de projetos" },
    { id: "filtros", label: "Filtros por categoria" },
    { id: "lightbox", label: "Visualização em lightbox" },
    { id: "formulario-contato", label: "Formulário de contato" },
    { id: "depoimentos", label: "Depoimentos de clientes" },
    { id: "sobre", label: "Página sobre mim/empresa" },
    { id: "blog", label: "Blog integrado" },
    { id: "download-cv", label: "Download de CV/portfólio" },
  ],
}

export function Step4Functionalities({ data, updateData }: StepProps) {
  const [newCustomFunc, setNewCustomFunc] = useState("")

  const functionalities = FUNCTIONALITIES_BY_TYPE[data.projectType || ""] || FUNCTIONALITIES_BY_TYPE.institucional

  const handleFunctionalityToggle = (funcId: string) => {
    const current = data.functionalities || []
    const updated = current.includes(funcId) ? current.filter((id) => id !== funcId) : [...current, funcId]
    updateData({ functionalities: updated })
  }

  const handleAddCustomFunc = () => {
    if (newCustomFunc.trim()) {
      const current = data.customFunctionalities || []
      updateData({ customFunctionalities: [...current, newCustomFunc.trim()] })
      setNewCustomFunc("")
    }
  }

  const handleRemoveCustomFunc = (index: number) => {
    const current = data.customFunctionalities || []
    updateData({ customFunctionalities: current.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base font-semibold">Quais funcionalidades você precisa? *</Label>
        <p className="text-sm text-gray-500 mb-4">
          Selecione os recursos específicos para{" "}
          {data.projectType === "ecommerce"
            ? "e-commerce"
            : data.projectType === "landing"
              ? "landing page"
              : data.projectType === "blog"
                ? "blog"
                : data.projectType === "portfolio"
                  ? "portfólio"
                  : "seu site"}
        </p>
        <div className="space-y-3">
          {functionalities.map((func) => (
            <div key={func.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <Checkbox
                id={func.id}
                checked={data.functionalities?.includes(func.id) || false}
                onCheckedChange={() => handleFunctionalityToggle(func.id)}
              />
              <Label htmlFor={func.id} className="cursor-pointer flex-1 font-normal">
                {func.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">Adicionar funcionalidades personalizadas</Label>
        <p className="text-sm text-gray-500 mb-2">Precisa de algo específico que não está na lista? Adicione aqui!</p>
        <div className="flex gap-2">
          <Input
            placeholder="Ex: Sistema de agendamento online"
            value={newCustomFunc}
            onChange={(e) => setNewCustomFunc(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddCustomFunc()}
            className="text-base"
          />
          <Button type="button" onClick={handleAddCustomFunc} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>

        {data.customFunctionalities && data.customFunctionalities.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Funcionalidades personalizadas:</p>
            <div className="space-y-2">
              {data.customFunctionalities.map((func, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border">
                  <span className="text-sm">{func}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCustomFunc(index)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="otherFunctionalities" className="text-base font-semibold">
          Detalhes adicionais sobre funcionalidades
        </Label>
        <Textarea
          id="otherFunctionalities"
          placeholder="Ex: O sistema de pagamento precisa aceitar PIX e cartão. A busca deve ter filtro por preço..."
          value={data.otherFunctionalities || ""}
          onChange={(e) => updateData({ otherFunctionalities: e.target.value })}
          rows={4}
          className="text-base resize-none"
        />
        <p className="text-sm text-gray-500">Descreva detalhes específicos sobre as funcionalidades selecionadas</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="integrations" className="text-base font-semibold">
          Integrações necessárias
        </Label>
        <Textarea
          id="integrations"
          placeholder="Ex: Google Analytics, Facebook Pixel, Mailchimp, Mercado Pago, sistema de ERP..."
          value={data.integrations || ""}
          onChange={(e) => updateData({ integrations: e.target.value })}
          rows={4}
          className="text-base resize-none"
        />
        <p className="text-sm text-gray-500">Precisa integrar com alguma ferramenta ou plataforma específica?</p>
      </div>
    </div>
  )
}
