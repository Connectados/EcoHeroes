"use client"

import { useEffect } from "react"

interface UseGameEventsProps {
  onCorrectDrop: () => void
  onIncorrectDrop: (correctBin: string) => void
}

export function useGameEvents({ onCorrectDrop, onIncorrectDrop }: UseGameEventsProps) {
  useEffect(() => {
    const handleCorrectDrop = () => {
      onCorrectDrop()
    }

    const handleIncorrectDrop = (event: CustomEvent) => {
      onIncorrectDrop(event.detail.correctBin)
    }

    window.addEventListener("correctDrop", handleCorrectDrop)
    window.addEventListener("incorrectDrop", handleIncorrectDrop as EventListener)

    return () => {
      window.removeEventListener("correctDrop", handleCorrectDrop)
      window.removeEventListener("incorrectDrop", handleIncorrectDrop as EventListener)
    }
  }, [onCorrectDrop, onIncorrectDrop])
}
