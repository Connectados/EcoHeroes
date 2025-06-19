"use client"

import { useState } from "react"
import StartScreen from "./components/start-screen"
import GameScreen from "./components/game-screen"
import GameOverScreen from "./components/game-over-screen"

export default function RecyclingApp() {
  const [gameState, setGameState] = useState<"start" | "playing" | "gameOver">("start")
  const [finalScore, setFinalScore] = useState(0)

  const startGame = () => {
    setGameState("playing")
  }

  const endGame = (score: number) => {
    setFinalScore(score)
    setGameState("gameOver")
  }

  const restartGame = () => {
    setGameState("start")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-500">
      {gameState === "start" && <StartScreen onStart={startGame} />}
      {gameState === "playing" && <GameScreen onGameEnd={endGame} />}
      {gameState === "gameOver" && (
        <GameOverScreen score={finalScore} onRestart={restartGame} onBackToStart={() => setGameState("start")} />
      )}
    </div>
  )
}
