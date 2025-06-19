"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import TrashItem from "./trash-item"
import RecyclingBin from "./recycling-bin"
import { Heart, Trophy, Info } from "lucide-react"

interface GameScreenProps {
  onGameEnd: (score: number) => void
}

interface TrashItemType {
  id: string
  type: "paper" | "plastic" | "organic"
  emoji: string
  name: string
}

const trashItems: Omit<TrashItemType, "id">[] = [
  // Papel
  { type: "paper", emoji: "📄", name: "Papel" },
  { type: "paper", emoji: "📰", name: "Periódico" },
  { type: "paper", emoji: "📚", name: "Libro" },
  { type: "paper", emoji: "📦", name: "Caja de cartón" },
  { type: "paper", emoji: "🧻", name: "Papel higiénico" },

  // Plástico
  { type: "plastic", emoji: "🥤", name: "Vaso plástico" },
  { type: "plastic", emoji: "🍼", name: "Botella" },
  { type: "plastic", emoji: "🛍️", name: "Bolsa plástica" },
  { type: "plastic", emoji: "🥛", name: "Envase de leche" },
  { type: "plastic", emoji: "🧴", name: "Botella de champú" },

  // Orgánico
  { type: "organic", emoji: "🍎", name: "Manzana" },
  { type: "organic", emoji: "🍌", name: "Plátano" },
  { type: "organic", emoji: "🥕", name: "Zanahoria" },
  { type: "organic", emoji: "🍞", name: "Pan" },
  { type: "organic", emoji: "🥬", name: "Lechuga" },
]

export default function GameScreen({ onGameEnd }: GameScreenProps) {
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [currentTrash, setCurrentTrash] = useState<TrashItemType | null>(null)
  const [showMessage, setShowMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const [showEducationalTip, setShowEducationalTip] = useState(false)

  const educationalTips = [
    "💡 ¿Sabías que reciclar una tonelada de papel salva 17 árboles?",
    "💡 Las botellas de plástico pueden tardar hasta 450 años en descomponerse.",
    "💡 Los residuos orgánicos se convierten en abono natural para las plantas.",
    "💡 Reciclar ayuda a reducir la contaminación del aire y del agua.",
    "💡 ¡Cada persona produce aproximadamente 1.5 kg de basura al día!",
  ]

  const generateNewTrash = useCallback(() => {
    const randomTrash = trashItems[Math.floor(Math.random() * trashItems.length)]
    setCurrentTrash({
      ...randomTrash,
      id: Date.now().toString(),
    })
  }, [])

  useEffect(() => {
    generateNewTrash()
  }, [generateNewTrash])

  useEffect(() => {
    if (lives <= 0) {
      // Guardar puntuación alta
      const highScore = localStorage.getItem("recycling-high-score")
      if (!highScore || score > Number.parseInt(highScore)) {
        localStorage.setItem("recycling-high-score", score.toString())
      }
      onGameEnd(score)
    }
  }, [lives, score, onGameEnd])

  const handleCorrectDrop = () => {
    setScore((prev) => prev + 10)
    setShowMessage({ text: "¡Excelente! +10 puntos 🎉", type: "success" })
    generateNewTrash()

    // Mostrar tip educacional ocasionalmente
    if (Math.random() < 0.3) {
      setTimeout(() => {
        setShowEducationalTip(true)
        setTimeout(() => setShowEducationalTip(false), 3000)
      }, 1000)
    }
  }

  const handleIncorrectDrop = (correctBin: string) => {
    setLives((prev) => prev - 1)
    setShowMessage({
      text: `¡Ups! Esto va en ${correctBin}. -1 vida 💔`,
      type: "error",
    })
    generateNewTrash()
  }

  const handleDrop = (binType: string) => {
    if (!currentTrash) return

    const isCorrect = currentTrash.type === binType

    if (isCorrect) {
      handleCorrectDrop()
    } else {
      const correctBinName = getBinName(currentTrash.type)
      handleIncorrectDrop(correctBinName)
    }
  }

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [showMessage])

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
    <div className="min-h-screen p-3 sm:p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg gap-3 sm:gap-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            <span className="text-lg sm:text-xl font-bold text-gray-700">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 sm:w-6 sm:h-6 ${i < lives ? "text-red-500 fill-red-500" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEducationalTip(!showEducationalTip)}
          className="flex items-center gap-2 text-xs sm:text-sm"
        >
          <Info className="w-3 h-3 sm:w-4 sm:h-4" />
          Tips
        </Button>
      </div>

      {/* Educational Tip */}
      {showEducationalTip && (
        <div className="mb-4 sm:mb-6 bg-blue-100 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg animate-slide-in">
          <p className="text-blue-800 font-medium text-sm sm:text-base">
            {educationalTips[Math.floor(Math.random() * educationalTips.length)]}
          </p>
        </div>
      )}

      {/* Message Display */}
      {showMessage && (
        <div
          className={`fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-white shadow-lg animate-bounce-in text-sm sm:text-base ${
            showMessage.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {showMessage.text}
        </div>
      )}

      {/* Game Area */}
      <div className="flex flex-col gap-6 sm:gap-8 max-w-6xl mx-auto">
        {/* Trash Item */}
        <div className="flex flex-col items-center justify-center order-2 sm:order-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 text-center px-2">
            ¡Arrastra este objeto al contenedor correcto!
          </h2>
          {currentTrash && <TrashItem item={currentTrash} />}
        </div>

        {/* Recycling Bins */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 order-1 sm:order-2">
          <RecyclingBin type="paper" emoji="📄" label="Papel" color="from-blue-400 to-blue-600" onDrop={handleDrop} />
          <RecyclingBin
            type="plastic"
            emoji="🥤"
            label="Plástico"
            color="from-yellow-400 to-yellow-600"
            onDrop={handleDrop}
          />
          <RecyclingBin
            type="organic"
            emoji="🍎"
            label="Orgánico"
            color="from-green-400 to-green-600"
            onDrop={handleDrop}
          />
        </div>
      </div>
    </div>
  )
}
