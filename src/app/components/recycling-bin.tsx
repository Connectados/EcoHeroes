"use client"

import type React from "react"
import { useState } from "react"

interface RecyclingBinProps {
  type: string
  emoji: string
  label: string
  color: string
  onDrop: (binType: string) => void
}

export default function RecyclingBin({ type, emoji, label, color, onDrop }: RecyclingBinProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDropping, setIsDropping] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setIsHovered(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Solo cambiar el estado si realmente salimos del contenedor
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsHovered(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsHovered(false)
    setIsDropping(true)

    try {
    //   const itemData = JSON.parse(e.dataTransfer.getData("application/json"))

      // Animación de drop
      setTimeout(() => {
        setIsDropping(false)
        onDrop(type)
      }, 300)
    } catch (error) {
      console.error("Error parsing dropped data:", error)
      setIsDropping(false)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 text-center transition-all duration-300 transform
        bg-gradient-to-br ${color} shadow-lg sm:shadow-xl
        ${isHovered ? "scale-105 sm:scale-110 shadow-xl sm:shadow-2xl ring-2 sm:ring-4 ring-white ring-opacity-50" : "hover:scale-105"}
        ${isDropping ? "animate-pulse scale-105" : ""}
        cursor-pointer min-h-[120px] sm:min-h-[160px] md:min-h-[200px] flex flex-col justify-center
        border-2 sm:border-4 border-white/20
      `}
    >
      {/* Contenido principal */}
      <div className="text-white relative z-10">
        <div
          className={`text-3xl sm:text-4xl md:text-6xl mb-1 sm:mb-2 md:mb-3 transition-transform duration-300 ${isHovered ? "animate-bounce scale-110" : ""}`}
        >
          {emoji}
        </div>
        <h3 className="text-sm sm:text-base md:text-xl font-bold mb-1 sm:mb-2 drop-shadow-lg">{label}</h3>
        <div className="text-xs sm:text-sm opacity-90 font-medium hidden sm:block">
          Contenedor de {label.toLowerCase()}
        </div>
      </div>

      {/* Indicador de drop */}
      {isHovered && (
        <div className="absolute inset-1 sm:inset-2 border-2 sm:border-4 border-white border-dashed rounded-xl sm:rounded-2xl animate-pulse bg-white/10" />
      )}

      {/* Animación de éxito */}
      {isDropping && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/20 rounded-2xl sm:rounded-3xl">
          <div className="text-3xl sm:text-4xl md:text-6xl animate-bounce">✨</div>
        </div>
      )}

      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/20 rounded-2xl sm:rounded-3xl pointer-events-none" />

      {/* Sombra interna */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl shadow-inner pointer-events-none" />
    </div>
  )
}
