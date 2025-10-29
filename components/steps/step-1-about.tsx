"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ProductTagsInput } from "@/components/product-tags-input"
import type { BriefingData } from "@/lib/briefing-storage"

interface StepProps {
  data: Partial<BriefingData>
  updateData: (data: Partial<BriefingData>) => void
}

export function Step1About({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-3">Informações de Contato</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactName" className="text-base font-semibold">
              Seu nome completo *
            </Label>
            <Input
              id="contactName"
              placeholder="Ex: João Silva"
              value={data.contactName || ""}
              onChange={(e) => updateData({ contactName: e.target.value })}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone" className="text-base font-semibold">
              Telefone/WhatsApp *
            </Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="Ex: (11) 99999-9999"
              value={data.contactPhone || ""}
              onChange={(e) => updateData({ contactPhone: e.target.value })}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-base font-semibold">
              E-mail *
            </Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="Ex: joao@email.com"
              value={data.contactEmail || ""}
              onChange={(e) => updateData({ contactEmail: e.target.value })}
              className="text-base"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectName" className="text-base font-semibold">
          Qual o nome da sua marca? *
        </Label>
        <Input
          id="projectName"
          placeholder="Ex: Loja Virtual de Roupas"
          value={data.projectName || ""}
          onChange={(e) => updateData({ projectName: e.target.value })}
          className="text-base"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">Que tipo de site você precisa? *</Label>
        <RadioGroup
          value={data.projectType || ""}
          onValueChange={(value) => updateData({ projectType: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="ecommerce" id="ecommerce" />
            <Label htmlFor="ecommerce" className="cursor-pointer flex-1">
              E-commerce (vender produtos online)
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="landing" id="landing" />
            <Label htmlFor="landing" className="cursor-pointer flex-1">
              Landing Page (capturar leads/conversões)
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="institucional" id="institucional" />
            <Label htmlFor="institucional" className="cursor-pointer flex-1">
              Site Institucional (apresentar empresa/serviços)
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="blog" id="blog" />
            <Label htmlFor="blog" className="cursor-pointer flex-1">
              Blog/Portal de Conteúdo
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="portfolio" id="portfolio" />
            <Label htmlFor="portfolio" className="cursor-pointer flex-1">
              Portfólio (mostrar trabalhos/projetos)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.projectType === "ecommerce" && (
        <div className="space-y-2">
          <Label className="text-base font-semibold">Que tipos de produtos você vende? *</Label>
          <ProductTagsInput products={data.products || []} onChange={(products) => updateData({ products })} />
          <p className="text-sm text-gray-500">Exemplos: Blusas, Calças, Shorts, Calçados, Acessórios, etc.</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="projectDescription" className="text-base font-semibold">
          Descreva seu projeto em poucas palavras *
        </Label>
        <Textarea
          id="projectDescription"
          placeholder="Ex: Quero criar uma loja online para vender roupas femininas, com foco em peças sustentáveis e de qualidade..."
          value={data.projectDescription || ""}
          onChange={(e) => updateData({ projectDescription: e.target.value })}
          rows={5}
          className="text-base resize-none"
        />
        <p className="text-sm text-gray-500">Conte-nos sobre o que você faz, o que vende ou qual serviço oferece</p>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">Você já tem um domínio (endereço do site)?</Label>
        <RadioGroup
          value={data.hasDomain ? "sim" : "nao"}
          onValueChange={(value) => updateData({ hasDomain: value === "sim" })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="sim" id="domain-sim" />
            <Label htmlFor="domain-sim" className="cursor-pointer">
              Sim, já tenho
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="nao" id="domain-nao" />
            <Label htmlFor="domain-nao" className="cursor-pointer">
              Não, preciso de ajuda com isso
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.hasDomain && (
        <div className="space-y-2">
          <Label htmlFor="domainName" className="text-base font-semibold">
            Qual é o domínio?
          </Label>
          <Input
            id="domainName"
            placeholder="Ex: www.minhaloja.com.br"
            value={data.domainName || ""}
            onChange={(e) => updateData({ domainName: e.target.value })}
            className="text-base"
          />
        </div>
      )}
    </div>
  )
}
