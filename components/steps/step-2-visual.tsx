"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { BriefingData } from "@/lib/briefing-storage"
import { Upload } from "lucide-react"
import { useState } from "react"
import { ColorPicker } from "@/components/color-picker"

interface StepProps {
  data: Partial<BriefingData>
  updateData: (data: Partial<BriefingData>) => void
}

const DESIGN_STYLES_BY_TYPE: Record<
  string,
  Array<{ id: string; label: string; description: string; image: string }>
> = {
  ecommerce: [
    {
      id: "moderno-ecommerce",
      label: "Moderno e Clean",
      description: "Layout limpo, foco nos produtos, navegação intuitiva",
      image: "/modern-ecommerce-clean-product-focus-intuitive-nav.jpg",
    },
    {
      id: "luxo-ecommerce",
      label: "Luxo e Sofisticação",
      description: "Elegante, premium, cores escuras, detalhes refinados",
      image: "/luxury-sophisticated-ecommerce-elegant-premium-dark.jpg",
    },
    {
      id: "vibrante-ecommerce",
      label: "Vibrante e Jovem",
      description: "Colorido, dinâmico, apelo jovem, energético",
      image: "/vibrant-young-ecommerce-colorful-dynamic-energetic.jpg",
    },
    {
      id: "minimalista-ecommerce",
      label: "Minimalista",
      description: "Simples, essencial, muito espaço branco, tipografia forte",
      image: "/minimalist-ecommerce-simple-white-space-typography.jpg",
    },
  ],
  landing: [
    {
      id: "conversao-landing",
      label: "Foco em Conversão",
      description: "CTAs destacados, prova social, design persuasivo",
      image: "/conversion-focused-landing-cta-social-proof-persuas.jpg",
    },
    {
      id: "moderno-landing",
      label: "Moderno e Impactante",
      description: "Visual forte, animações, hero section marcante",
      image: "/modern-impactful-landing-strong-visual-animations.jpg",
    },
    {
      id: "profissional-landing",
      label: "Profissional e Confiável",
      description: "Corporativo, sério, transmite credibilidade",
      image: "/professional-trustworthy-landing-corporate-credible.jpg",
    },
    {
      id: "criativo-landing",
      label: "Criativo e Diferente",
      description: "Ousado, único, quebra padrões, memorável",
      image: "/creative-unique-landing-bold-memorable-different.jpg",
    },
  ],
  institucional: [
    {
      id: "corporativo-institucional",
      label: "Corporativo e Profissional",
      description: "Formal, confiável, cores neutras, estruturado",
      image: "/corporate-professional-institutional-formal-neutral.jpg",
    },
    {
      id: "moderno-institucional",
      label: "Moderno e Acessível",
      description: "Contemporâneo, amigável, clean, acolhedor",
      image: "/modern-accessible-institutional-contemporary-friend.jpg",
    },
    {
      id: "inovador-institucional",
      label: "Inovador e Tech",
      description: "Tecnológico, futurista, dinâmico, inovador",
      image: "/innovative-tech-institutional-futuristic-dynamic.jpg",
    },
    {
      id: "humanizado-institucional",
      label: "Humanizado e Próximo",
      description: "Pessoal, caloroso, fotos reais, conexão emocional",
      image: "/humanized-personal-institutional-warm-emotional.jpg",
    },
  ],
  blog: [
    {
      id: "editorial-blog",
      label: "Editorial e Limpo",
      description: "Foco na leitura, tipografia clara, espaçamento generoso",
      image: "/editorial-clean-blog-reading-focus-typography.jpg",
    },
    {
      id: "magazine-blog",
      label: "Estilo Magazine",
      description: "Grid de artigos, imagens grandes, visual rico",
      image: "/magazine-style-blog-article-grid-rich-visual.jpg",
    },
    {
      id: "minimalista-blog",
      label: "Minimalista",
      description: "Simples, sem distrações, foco total no conteúdo",
      image: "/minimalist-blog-simple-distraction-free-content.jpg",
    },
    {
      id: "moderno-blog",
      label: "Moderno e Dinâmico",
      description: "Layouts variados, cards, interativo, visual atraente",
      image: "/modern-dynamic-blog-varied-layouts-interactive.jpg",
    },
  ],
  portfolio: [
    {
      id: "minimalista-portfolio",
      label: "Minimalista",
      description: "Trabalhos em destaque, muito espaço branco, elegante",
      image: "/minimalist-portfolio-work-showcase-white-space.jpg",
    },
    {
      id: "criativo-portfolio",
      label: "Criativo e Ousado",
      description: "Layouts únicos, animações, personalidade forte",
      image: "/creative-bold-portfolio-unique-layouts-personality.jpg",
    },
    {
      id: "grid-portfolio",
      label: "Grid Organizado",
      description: "Galeria estruturada, fácil navegação, profissional",
      image: "/organized-grid-portfolio-structured-gallery-profes.jpg",
    },
    {
      id: "storytelling-portfolio",
      label: "Storytelling",
      description: "Narrativo, imersivo, conta histórias dos projetos",
      image: "/storytelling-portfolio-narrative-immersive-project.jpg",
    },
  ],
}

export function Step2Visual({ data, updateData }: StepProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const designStyles = DESIGN_STYLES_BY_TYPE[data.projectType || ""] || DESIGN_STYLES_BY_TYPE.institucional

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateData({ logoFile: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base font-semibold">Você já tem uma logo?</Label>
        <RadioGroup
          value={data.hasLogo ? "sim" : "nao"}
          onValueChange={(value) => updateData({ hasLogo: value === "sim" })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="sim" id="logo-sim" />
            <Label htmlFor="logo-sim" className="cursor-pointer">
              Sim, já tenho uma logo
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="nao" id="logo-nao" />
            <Label htmlFor="logo-nao" className="cursor-pointer">
              Não, preciso criar uma
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.hasLogo && (
        <div className="space-y-2">
          <Label htmlFor="logo" className="text-base font-semibold">
            Faça upload da sua logo
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <input type="file" id="logo" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            <label htmlFor="logo" className="cursor-pointer">
              {logoPreview ? (
                <div className="space-y-2">
                  <img src={logoPreview || "/placeholder.svg"} alt="Logo preview" className="max-h-32 mx-auto" />
                  <p className="text-sm text-gray-600">Clique para alterar</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-600">Clique para fazer upload ou arraste o arquivo aqui</p>
                  <p className="text-xs text-gray-500">PNG, JPG ou SVG</p>
                </div>
              )}
            </label>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-base font-semibold">Paleta de cores
</Label>
        <ColorPicker colors={data.brandColors || []} onChange={(colors) => updateData({ brandColors: colors })} />
        <p className="text-sm text-gray-500">
          Selecione as cores que representam sua marca. Você pode adicionar até 10 cores.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">Qual estilo visual você prefere?</Label>
        <p className="text-sm text-gray-500 mb-4">
          Escolha o estilo que mais combina com seu{" "}
          {data.projectType === "ecommerce"
            ? "e-commerce"
            : data.projectType === "landing"
              ? "landing page"
              : data.projectType === "blog"
                ? "blog"
                : data.projectType === "portfolio"
                  ? "portfólio"
                  : "site"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {designStyles.map((style) => (
            <label
              key={style.id}
              className={`cursor-pointer rounded-lg border-2 overflow-hidden transition-all ${
                data.designStyle === style.id
                  ? "border-blue-600 ring-2 ring-blue-600 ring-offset-2"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="designStyle"
                value={style.id}
                checked={data.designStyle === style.id}
                onChange={(e) => updateData({ designStyle: e.target.value })}
                className="sr-only"
              />
              <img src={style.image || "/placeholder.svg"} alt={style.label} className="w-full h-40 object-cover" />
              <div className="p-3 bg-white">
                <div className="font-semibold">{style.label}</div>
                <div className="text-sm text-gray-500">{style.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="visualReferences" className="text-base font-semibold">
          Referências visuais (opcional)
        </Label>
        <Textarea
          id="visualReferences"
          placeholder="Ex: Gosto do estilo do site da Nike, clean e moderno. Também gosto das cores do site da Apple..."
          value={data.visualReferences || ""}
          onChange={(e) => updateData({ visualReferences: e.target.value })}
          rows={4}
          className="text-base resize-none"
        />
        <p className="text-sm text-gray-500">Tem algum site que você admira? Cole os links ou descreva o estilo</p>
      </div>
    </div>
  )
}
