"use client"

import { Button } from "@/components/ui/button"
import { Recycle, Leaf, Heart } from "lucide-react"

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const highScore = typeof window !== "undefined" ? localStorage.getItem("recycling-high-score") || "0" : "0"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto animate-bounce-in">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative">
            <Recycle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-green-600 animate-spin-slow" />
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500 absolute -top-1 -right-1 sm:-top-2 sm:-right-2 animate-pulse" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-green-700 mb-3 sm:mb-4 font-comic">
          ¡EcoHéroes!
        </h1>

        <p className="text-sm sm:text-base md:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed px-2">
          ¡Bienvenido pequeño héroe del planeta! 🌍
          <br className="hidden sm:block" />
          <span className="block sm:inline"> Ayúdanos a salvar la Tierra clasificando la basura correctamente.</span>
          <br />
          <span className="font-semibold text-green-600">¡Cada decisión cuenta!</span>
        </p>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm">
          <div className="bg-blue-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📄</div>
            <div className="font-semibold text-blue-700">Papel</div>
          </div>
          <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🥤</div>
            <div className="font-semibold text-yellow-700">Plástico</div>
          </div>
          <div className="bg-green-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🍎</div>
            <div className="font-semibold text-green-700">Orgánico</div>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <span className="text-xs sm:text-sm text-gray-600">Récord actual: {highScore} puntos</span>
          </div>
        </div>

        <Button
          onClick={onStart}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
        >
          ¡Comenzar Aventura! 🚀
        </Button>
      </div>
    </div>
  )
}
