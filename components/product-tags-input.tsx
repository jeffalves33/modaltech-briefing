"use client"

import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ProductTagsInputProps {
  products: string[]
  onChange: (products: string[]) => void
}

export function ProductTagsInput({ products, onChange }: ProductTagsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      if (!products.includes(inputValue.trim())) {
        onChange([...products, inputValue.trim()])
      }
      setInputValue("")
    } else if (e.key === "Backspace" && !inputValue && products.length > 0) {
      onChange(products.slice(0, -1))
    }
  }

  const removeProduct = (productToRemove: string) => {
    onChange(products.filter((p) => p !== productToRemove))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-lg bg-white">
        {products.map((product) => (
          <Badge key={product} variant="secondary" className="gap-1 px-3 py-1 text-sm">
            {product}
            <button
              type="button"
              onClick={() => removeProduct(product)}
              className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={products.length === 0 ? "Digite um produto e pressione Enter" : "Adicionar mais..."}
          className="flex-1 min-w-[200px] border-0 focus-visible:ring-0 shadow-none px-0"
        />
      </div>
      <p className="text-sm text-gray-500">
        Digite o nome do produto e pressione <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> para
        adicionar
      </p>
    </div>
  )
}
