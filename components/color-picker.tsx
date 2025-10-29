"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, Plus } from "lucide-react"

interface ColorPickerProps {
  colors: string[]
  onChange: (colors: string[]) => void
}

export function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [newColor, setNewColor] = useState("#3b82f6")

  const addColor = () => {
    if (colors.length < 10) {
      onChange([...colors, newColor])
    }
  }

  const removeColor = (index: number) => {
    onChange(colors.filter((_, i) => i !== index))
  }

  const updateColor = (index: number, color: string) => {
    const updated = [...colors]
    updated[index] = color
    onChange(updated)
  }

  // Convert hex to RGB for display
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? `RGB(${Number.parseInt(result[1], 16)}, ${Number.parseInt(result[2], 16)}, ${Number.parseInt(result[3], 16)})`
      : "RGB(0, 0, 0)"
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input
              type="color"
              value={color}
              onChange={(e) => updateColor(index, e.target.value)}
              className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300"
            />
            <div className="flex-1">
              <div className="font-medium text-sm">{color.toUpperCase()}</div>
              <div className="text-xs text-gray-500">{hexToRgb(color)}</div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeColor(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {colors.length < 10 && (
        <div className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300"
          />
          <div className="flex-1">
            <Label className="text-sm font-medium">Adicionar nova cor</Label>
            <p className="text-xs text-gray-500">Clique no quadrado para escolher</p>
          </div>
          <Button type="button" onClick={addColor} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>
      )}

      {colors.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          Nenhuma cor selecionada. Adicione cores para sua marca!
        </p>
      )}
    </div>
  )
}
