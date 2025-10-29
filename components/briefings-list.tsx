"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Calendar,
  Globe,
  Package,
  Palette,
  FileText,
  Clock,
  DollarSign,
  Eye,
  Trash2,
  Mail,
  Phone,
  User,
  Download,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { deleteBriefing } from "@/app/actions/delete-briefing"
import { useRouter } from "next/navigation"

interface Briefing {
  id: string
  created_at: string
  contact_name: string | null
  contact_phone: string | null
  contact_email: string | null
  project_name: string
  project_type: string
  project_description: string
  has_domain: boolean
  domain_name: string | null
  products: string[] | null
  has_logo: boolean
  logo_url: string | null
  brand_colors: string[] | null
  visual_references: string | null
  design_style: string | null
  pages_needed: string[] | null
  other_pages: string | null
  functionalities: string[] | null
  custom_functionalities: string[] | null
  other_functionalities: string | null
  integrations: string | null
  launch_deadline: string | null
  budget: string | null
  has_content: string | null
  needs_maintenance: string | null
  who_manages: string | null
  additional_info: string | null
}

interface BriefingsListProps {
  briefings: Briefing[]
}

export function BriefingsList({ briefings }: BriefingsListProps) {
  const [selectedBriefing, setSelectedBriefing] = useState<Briefing | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [briefingToDelete, setBriefingToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const getProjectTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      institucional: "Site Institucional",
      ecommerce: "E-commerce",
      landing: "Landing Page",
      blog: "Blog/Portal",
      portfolio: "Portfólio",
      outro: "Outro",
    }
    return types[type] || type
  }

  const handleDeleteClick = (e: React.MouseEvent, briefingId: string) => {
    e.stopPropagation()
    setBriefingToDelete(briefingId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!briefingToDelete) return

    setIsDeleting(true)
    try {
      const result = await deleteBriefing(briefingToDelete)

      if (result.success) {
        setDeleteDialogOpen(false)
        setBriefingToDelete(null)
        // Force a hard refresh to update the list
        window.location.reload()
      } else {
        alert("Erro ao excluir briefing: " + result.error)
      }
    } catch (error) {
      alert("Erro ao excluir briefing")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDownloadLogo = async (logoUrl: string, projectName: string) => {
    try {
      const response = await fetch(logoUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `logo-${projectName.toLowerCase().replace(/\s+/g, "-")}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading logo:", error)
      alert("Erro ao baixar logo")
    }
  }

  if (briefings.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Nenhum briefing recebido ainda</p>
          <p className="text-gray-500 text-sm mt-2">Os briefings submetidos aparecerão aqui</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {briefings.map((briefing) => (
          <Card key={briefing.id} className="hover:shadow-lg transition-shadow group relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                    {briefing.project_name}
                  </CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    {getProjectTypeLabel(briefing.project_type)}
                  </Badge>
                </div>
                {briefing.logo_url && (
                  <img
                    src={briefing.logo_url || "/placeholder.svg"}
                    alt="Logo"
                    className="w-12 h-12 object-contain rounded"
                  />
                )}
              </div>
              <CardDescription className="line-clamp-2">{briefing.project_description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {briefing.contact_name && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{briefing.contact_name}</span>
                  </div>
                )}

                {briefing.contact_email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{briefing.contact_email}</span>
                  </div>
                )}

                {briefing.contact_phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{briefing.contact_phone}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(briefing.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                </div>

                {briefing.products && briefing.products.length > 0 && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Package className="w-4 h-4 mt-0.5" />
                    <div className="flex flex-wrap gap-1">
                      {briefing.products.slice(0, 3).map((product) => (
                        <Badge key={product} variant="outline" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                      {briefing.products.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{briefing.products.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {briefing.launch_deadline && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{briefing.launch_deadline}</span>
                  </div>
                )}

                {briefing.budget && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{briefing.budget}</span>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button onClick={() => setSelectedBriefing(briefing)} className="flex-1 gap-2" variant="outline">
                    <Eye className="w-4 h-4" />
                    Ver Detalhes
                  </Button>
                  <Button
                    onClick={(e) => handleDeleteClick(e, briefing.id)}
                    variant="destructive"
                    size="icon"
                    className="shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedBriefing} onOpenChange={() => setSelectedBriefing(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedBriefing?.project_name}</DialogTitle>
            <DialogDescription>
              Recebido em{" "}
              {selectedBriefing &&
                format(new Date(selectedBriefing.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
            </DialogDescription>
          </DialogHeader>

          {selectedBriefing && (
            <div className="space-y-6 mt-4">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações de Contato
                </h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  {selectedBriefing.contact_name && (
                    <div>
                      <p className="text-sm text-gray-600">Nome</p>
                      <p className="font-medium">{selectedBriefing.contact_name}</p>
                    </div>
                  )}
                  {selectedBriefing.contact_email && (
                    <div>
                      <p className="text-sm text-gray-600">E-mail</p>
                      <p className="font-medium">{selectedBriefing.contact_email}</p>
                    </div>
                  )}
                  {selectedBriefing.contact_phone && (
                    <div>
                      <p className="text-sm text-gray-600">Telefone</p>
                      <p className="font-medium">{selectedBriefing.contact_phone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sobre o Projeto */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Sobre o Projeto
                </h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Tipo de Projeto</p>
                    <p className="font-medium">{getProjectTypeLabel(selectedBriefing.project_type)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Descrição</p>
                    <p className="font-medium">{selectedBriefing.project_description}</p>
                  </div>
                  {selectedBriefing.products && selectedBriefing.products.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Produtos</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedBriefing.products.map((product) => (
                          <Badge key={product} variant="secondary">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Domínio</p>
                    <p className="font-medium">
                      {selectedBriefing.has_domain ? selectedBriefing.domain_name || "Sim, possui" : "Não possui"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual e Identidade */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Visual e Identidade
                </h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  {selectedBriefing.logo_url && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Logo</p>
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedBriefing.logo_url || "/placeholder.svg"}
                          alt="Logo"
                          className="w-32 h-32 object-contain bg-white p-2 rounded border"
                        />
                        <Button
                          onClick={() => handleDownloadLogo(selectedBriefing.logo_url!, selectedBriefing.project_name)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Baixar Logo
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedBriefing.brand_colors && selectedBriefing.brand_colors.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Cores da Marca</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedBriefing.brand_colors.map((color, index) => (
                          <div key={index} className="flex items-center gap-2 bg-white p-2 rounded border">
                            <div className="w-8 h-8 rounded border" style={{ backgroundColor: color }} />
                            <span className="text-sm font-mono">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedBriefing.design_style && (
                    <div>
                      <p className="text-sm text-gray-600">Estilo de Design</p>
                      <p className="font-medium">{selectedBriefing.design_style}</p>
                    </div>
                  )}
                  {selectedBriefing.visual_references && (
                    <div>
                      <p className="text-sm text-gray-600">Referências Visuais</p>
                      <p className="font-medium">{selectedBriefing.visual_references}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Estrutura */}
              {selectedBriefing.pages_needed && selectedBriefing.pages_needed.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Estrutura do Site
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {selectedBriefing.pages_needed.map((page) => (
                        <Badge key={page} variant="outline">
                          {page}
                        </Badge>
                      ))}
                    </div>
                    {selectedBriefing.other_pages && (
                      <p className="mt-3 text-sm">
                        <span className="text-gray-600">Outras páginas: </span>
                        {selectedBriefing.other_pages}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Funcionalidades */}
              {((selectedBriefing.functionalities && selectedBriefing.functionalities.length > 0) ||
                (selectedBriefing.custom_functionalities && selectedBriefing.custom_functionalities.length > 0)) && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Funcionalidades</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    {selectedBriefing.functionalities && selectedBriefing.functionalities.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedBriefing.functionalities.map((func) => (
                          <Badge key={func} variant="outline">
                            {func}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {selectedBriefing.custom_functionalities && selectedBriefing.custom_functionalities.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Funcionalidades Personalizadas:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedBriefing.custom_functionalities.map((func, index) => (
                            <Badge key={index} variant="secondary">
                              {func}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedBriefing.other_functionalities && (
                      <p className="text-sm">
                        <span className="text-gray-600">Detalhes: </span>
                        {selectedBriefing.other_functionalities}
                      </p>
                    )}
                    {selectedBriefing.integrations && (
                      <p className="text-sm">
                        <span className="text-gray-600">Integrações: </span>
                        {selectedBriefing.integrations}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Detalhes Finais */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Detalhes Finais
                </h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  {selectedBriefing.launch_deadline && (
                    <div>
                      <p className="text-sm text-gray-600">Prazo Desejado</p>
                      <p className="font-medium">{selectedBriefing.launch_deadline}</p>
                    </div>
                  )}
                  {selectedBriefing.budget && (
                    <div>
                      <p className="text-sm text-gray-600">Orçamento</p>
                      <p className="font-medium">{selectedBriefing.budget}</p>
                    </div>
                  )}
                  {selectedBriefing.has_content && (
                    <div>
                      <p className="text-sm text-gray-600">Conteúdo Pronto</p>
                      <p className="font-medium">{selectedBriefing.has_content}</p>
                    </div>
                  )}
                  {selectedBriefing.needs_maintenance && (
                    <div>
                      <p className="text-sm text-gray-600">Necessita Manutenção</p>
                      <p className="font-medium">{selectedBriefing.needs_maintenance}</p>
                    </div>
                  )}
                  {selectedBriefing.who_manages && (
                    <div>
                      <p className="text-sm text-gray-600">Quem Gerenciará</p>
                      <p className="font-medium">{selectedBriefing.who_manages}</p>
                    </div>
                  )}
                  {selectedBriefing.additional_info && (
                    <div>
                      <p className="text-sm text-gray-600">Informações Adicionais</p>
                      <p className="font-medium">{selectedBriefing.additional_info}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O briefing será permanentemente excluído do banco de dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
