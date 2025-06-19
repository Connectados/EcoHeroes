"use client"

import type React from "react"

interface TrashItemProps {
  item: {
    id: string
    type: "paper" | "plastic" | "organic"
    emoji: string
    name: string
  }
}

export default function TrashItem({ item }: TrashItemProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item))
    e.dataTransfer.effectAllowed = "move"
  }

  const getBinName = (type: string) => {
    switch (type) {
      case "paper":
        return "papel"
      case "plastic":
        return "plástico"
      case "organic":
        return "orgánico"
      default:
        return ""
    }
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl cursor-grab active:cursor-grabbing transform hover:scale-105 transition-all duration-200 animate-float border-2 sm:border-4 border-gray-200 hover:border-blue-400 select-none w-full max-w-xs sm:max-w-sm mx-auto"
    >
      <div className="text-center">
        <div className="text-5xl sm:text-6xl md:text-8xl mb-2 sm:mb-3 md:mb-4 animate-bounce-gentle">{item.emoji}</div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mb-1 sm:mb-2">{item.name}</h3>
        <p className="text-gray-500 text-xs sm:text-sm">¡Arrástrame al contenedor de {getBinName(item.type)}!</p>
      </div>
    </div>
  )
}
