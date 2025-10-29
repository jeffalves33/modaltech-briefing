"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteBriefing(briefingId: string) {
  try {
    const supabase = await createClient()

    const { data: briefing } = await supabase.from("briefings").select("logo_url").eq("id", briefingId).single()

    // Delete logo from storage if exists
    if (briefing?.logo_url) {
      const logoPath = briefing.logo_url.split("/").pop()
      if (logoPath) {
        await supabase.storage.from("briefing-logos").remove([logoPath])
      }
    }

    // Delete briefing from database
    const { error } = await supabase.from("briefings").delete().eq("id", briefingId)

    if (error) {
      console.error("Error deleting briefing:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/briefings")
    return { success: true }
  } catch (error) {
    console.error("Error deleting briefing:", error)
    return { success: false, error: "Erro ao excluir briefing" }
  }
}
