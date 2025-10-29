// Local storage utilities for saving briefing progress
export interface BriefingData {
  // Step 1 - Contact & About
  contactName: string
  contactPhone: string
  contactEmail: string
  projectName: string
  projectType: string
  projectDescription: string
  hasDomain: boolean
  domainName: string
  products: string[]

  // Step 2 - Visual
  hasLogo: boolean
  logoFile?: File
  logoUrl?: string
  brandColors: string[]
  visualReferences: string
  designStyle: string

  // Step 3 - Structure
  pagesNeeded: string[]
  otherPages: string

  // Step 4 - Functionalities (dynamic based on project type)
  functionalities: string[]
  customFunctionalities: string[]
  otherFunctionalities: string
  integrations: string

  // Step 5 - Final Details
  launchDeadline: string
  budget: string
  hasContent: string
  needsMaintenance: string
  whoManages: string
  additionalInfo: string
}

const STORAGE_KEY = "briefing-progress"

export function saveBriefingProgress(data: Partial<BriefingData>) {
  try {
    const existing = getBriefingProgress()
    const updated = { ...existing, ...data }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error("Error saving briefing progress:", error)
  }
}

export function getBriefingProgress(): Partial<BriefingData> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error("Error loading briefing progress:", error)
    return {}
  }
}

export function clearBriefingProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing briefing progress:", error)
  }
}
