"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Step1About } from "./steps/step-1-about"
import { Step2Visual } from "./steps/step-2-visual"
import { Step3Structure } from "./steps/step-3-structure"
import { Step4Functionalities } from "./steps/step-4-functionalities"
import { Step5Audience } from "./steps/step-5-audience"
import {
  type BriefingData,
  saveBriefingProgress,
  getBriefingProgress,
  clearBriefingProgress,
} from "@/lib/briefing-storage"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const STEPS = [
  { id: 1, title: "Sobre o Projeto", description: "Informações básicas" },
  { id: 2, title: "Visual e Identidade", description: "Marca e design" },
  { id: 3, title: "Estrutura do Site", description: "Páginas necessárias" },
  { id: 4, title: "Funcionalidades", description: "Recursos e integrações" },
  { id: 5, title: "Detalhes Finais", description: "Prazos e informações práticas" },
]

export function BriefingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<BriefingData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Load saved progress on mount
  useEffect(() => {
    const saved = getBriefingProgress()
    if (Object.keys(saved).length > 0) {
      setFormData(saved)
    }
  }, [])

  // Save progress whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      saveBriefingProgress(formData)
    }
  }, [formData])

  const updateFormData = (data: Partial<BriefingData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const progress = (currentStep / STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const supabase = createClient()

    try {
      // Upload logo if exists
      let logoUrl = formData.logoUrl
      if (formData.logoFile) {
        const fileExt = formData.logoFile.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("briefing-logos")
          .upload(fileName, formData.logoFile)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("briefing-logos").getPublicUrl(uploadData.path)

        logoUrl = publicUrl
      }

      // Insert briefing data
      const { data, error } = await supabase
        .from("briefings")
        .insert({
          contact_name: formData.contactName,
          contact_phone: formData.contactPhone,
          contact_email: formData.contactEmail,
          project_name: formData.projectName,
          project_type: formData.projectType,
          project_description: formData.projectDescription,
          has_domain: formData.hasDomain,
          domain_name: formData.domainName,
          products: formData.products,
          has_logo: formData.hasLogo,
          logo_url: logoUrl,
          brand_colors: formData.brandColors,
          visual_references: formData.visualReferences,
          design_style: formData.designStyle,
          pages_needed: formData.pagesNeeded,
          other_pages: formData.otherPages,
          functionalities: formData.functionalities,
          custom_functionalities: formData.customFunctionalities,
          other_functionalities: formData.otherFunctionalities,
          integrations: formData.integrations,
          launch_deadline: formData.launchDeadline,
          budget: formData.budget,
          has_content: formData.hasContent,
          needs_maintenance: formData.needsMaintenance,
          who_manages: formData.whoManages,
          additional_info: formData.additionalInfo,
        })
        .select()
        .single()

      if (error) throw error

      // Clear local storage
      clearBriefingProgress()

      // Redirect to success page
      router.push(`/success?id=${data.id}`)
    } catch (error) {
      console.error("Error submitting briefing:", error)
      alert("Erro ao enviar briefing. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-balance">Briefing do Projeto</h1>
          <p className="text-lg text-gray-600 text-pretty">
            Vamos conhecer melhor o seu projeto em {STEPS.length} etapas simples
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Etapa {currentStep} de {STEPS.length}
            </span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% completo</span>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${step.id <= currentStep ? "text-blue-600" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${
                    step.id < currentStep
                      ? "bg-blue-600 text-white"
                      : step.id === currentStep
                        ? "bg-blue-100 text-blue-600 ring-2 ring-blue-600"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-xs font-medium hidden sm:block text-center">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{STEPS[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-base">{STEPS[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && <Step1About data={formData} updateData={updateFormData} />}
            {currentStep === 2 && <Step2Visual data={formData} updateData={updateFormData} />}
            {currentStep === 3 && <Step3Structure data={formData} updateData={updateFormData} />}
            {currentStep === 4 && <Step4Functionalities data={formData} updateData={updateFormData} />}
            {currentStep === 5 && <Step5Audience data={formData} updateData={updateFormData} />}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>

              {currentStep < STEPS.length ? (
                <Button onClick={handleNext} className="gap-2">
                  Próxima
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Enviando..." : "Finalizar"}
                  <Check className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Seu progresso é salvo automaticamente. Você pode voltar a qualquer momento.
        </p>
      </div>
    </div>
  )
}
