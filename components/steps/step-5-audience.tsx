"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { BriefingData } from "@/lib/briefing-storage"

interface StepProps {
  data: Partial<BriefingData>
  updateData: (data: Partial<BriefingData>) => void
}

export function Step5Audience({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="launchDeadline" className="text-base font-semibold">
          Prazo desejado para lançamento
        </Label>
        <Input
          id="launchDeadline"
          type="date"
          value={data.launchDeadline || ""}
          onChange={(e) => updateData({ launchDeadline: e.target.value })}
          className="text-base"
        />
        <p className="text-sm text-gray-500">Quando você gostaria que o site estivesse pronto?</p>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">Orçamento estimado</Label>
        <RadioGroup
          value={data.budget || ""}
          onValueChange={(value) => updateData({ budget: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="ate-5k" id="ate-5k" />
            <Label htmlFor="ate-5k" className="cursor-pointer flex-1">
              Até R$ 5.000
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="5k-15k" id="5k-15k" />
            <Label htmlFor="5k-15k" className="cursor-pointer flex-1">
              R$ 5.000 - R$ 15.000
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="15k-30k" id="15k-30k" />
            <Label htmlFor="15k-30k" className="cursor-pointer flex-1">
              R$ 15.000 - R$ 30.000
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="acima-30k" id="acima-30k" />
            <Label htmlFor="acima-30k" className="cursor-pointer flex-1">
              Acima de R$ 30.000
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="nao-definido" id="nao-definido" />
            <Label htmlFor="nao-definido" className="cursor-pointer flex-1">
              Ainda não defini
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">Você já tem o conteúdo pronto?</Label>
        <RadioGroup
          value={data.hasContent || ""}
          onValueChange={(value) => updateData({ hasContent: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="completo" id="completo" />
            <Label htmlFor="completo" className="cursor-pointer flex-1">
              Sim, tenho textos e imagens prontos
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="parcial" id="parcial" />
            <Label htmlFor="parcial" className="cursor-pointer flex-1">
              Tenho parte do conteúdo
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="nenhum" id="nenhum" />
            <Label htmlFor="nenhum" className="cursor-pointer flex-1">
              Não, preciso de ajuda com o conteúdo
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">Precisa de manutenção após o lançamento?</Label>
        <RadioGroup
          value={data.needsMaintenance || ""}
          onValueChange={(value) => updateData({ needsMaintenance: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="sim-mensal" id="sim-mensal" />
            <Label htmlFor="sim-mensal" className="cursor-pointer flex-1">
              Sim, manutenção mensal
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="sim-eventual" id="sim-eventual" />
            <Label htmlFor="sim-eventual" className="cursor-pointer flex-1">
              Sim, apenas quando necessário
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="nao" id="nao-manutencao" />
            <Label htmlFor="nao-manutencao" className="cursor-pointer flex-1">
              Não, vou gerenciar sozinho
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="nao-sei" id="nao-sei" />
            <Label htmlFor="nao-sei" className="cursor-pointer flex-1">
              Não sei ainda
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">Quem vai gerenciar o site?</Label>
        <RadioGroup
          value={data.whoManages || ""}
          onValueChange={(value) => updateData({ whoManages: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="eu-mesmo" id="eu-mesmo" />
            <Label htmlFor="eu-mesmo" className="cursor-pointer flex-1">
              Eu mesmo vou atualizar
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="equipe-interna" id="equipe-interna" />
            <Label htmlFor="equipe-interna" className="cursor-pointer flex-1">
              Minha equipe interna
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="terceirizado" id="terceirizado" />
            <Label htmlFor="terceirizado" className="cursor-pointer flex-1">
              Quero contratar alguém
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="nao-sei-ainda" id="nao-sei-ainda" />
            <Label htmlFor="nao-sei-ainda" className="cursor-pointer flex-1">
              Ainda não decidi
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="text-base font-semibold">
          Observações adicionais
        </Label>
        <Textarea
          id="additionalInfo"
          placeholder="Alguma informação importante que não foi mencionada? Conte-nos aqui..."
          value={data.additionalInfo || ""}
          onChange={(e) => updateData({ additionalInfo: e.target.value })}
          rows={5}
          className="text-base resize-none"
        />
        <p className="text-sm text-gray-500">Espaço livre para qualquer observação adicional</p>
      </div>
    </div>
  )
}
