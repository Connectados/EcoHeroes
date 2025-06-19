"use client"

import { Button } from "@/components/ui/button"
import { Trophy, RotateCcw, Home, Star } from "lucide-react"

interface GameOverScreenProps {
  score: number
  onRestart: () => void
  onBackToStart: () => void
}

export default function GameOverScreen({ score, onRestart, onBackToStart }: GameOverScreenProps) {
  const highScore = typeof window !== "undefined" ? localStorage.getItem("recycling-high-score") || "0" : "0"
  const isNewRecord = score >= Number.parseInt(highScore)

  const getScoreMessage = () => {
    if (score >= 100) return "¡Eres un súper héroe del reciclaje! 🦸‍♂️"
    if (score >= 50) return "¡Excelente trabajo, eco-guerrero! 🌟"
    if (score >= 20) return "¡Buen trabajo, sigue practicando! 👍"
    return "¡No te rindas, cada intento cuenta! 💪"
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto animate-bounce-in">
        {isNewRecord && (
          <div className="mb-4 sm:mb-6 animate-pulse">
            <Star className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-yellow-500 mx-auto mb-2 animate-spin-slow" />
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">¡NUEVO RÉCORD!</p>
          </div>
        )}

        <div className="mb-4 sm:mb-6">
          <Trophy className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 text-yellow-500 mx-auto mb-3 sm:mb-4 animate-bounce" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-700 mb-3 sm:mb-4">¡Juego Terminado!</h1>
        </div>

        <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <p className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2">Puntuación: {score}</p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">{getScoreMessage()}</p>
          </div>

          <div className="bg-yellow-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-gray-600">Récord personal: {highScore} puntos</p>
          </div>
        </div>

        <div className="mb-4 sm:mb-6 bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-700 mb-2 sm:mb-3">
            ¡Datos curiosos sobre reciclaje! 🌍
          </h3>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-green-600">
            <p>• Reciclar una lata de aluminio ahorra energía para 3 horas de TV</p>
            <p>• El vidrio puede reciclarse infinitas veces sin perder calidad</p>
            <p>• Reciclar reduce hasta un 70% la contaminación del aire</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 justify-center">
          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200 w-full text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            Jugar de Nuevo
          </Button>

          <Button
            onClick={onBackToStart}
            variant="outline"
            className="font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200 w-full text-sm sm:text-base"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Inicio
          </Button>
        </div>
      </div>
    </div>
  )
}
