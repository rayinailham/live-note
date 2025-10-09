import React, { useState, useEffect } from 'react'

export const useTimer = (seconds: number, setSeconds: React.Dispatch<React.SetStateAction<number>>) => {
  const [isRunning, setIsRunning] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [isClicked, setIsClicked] = useState(false)

  const handleStartTimer = () => {
    if (!isRunning) {
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 500)
      setIsRunning(true)
      const id = setInterval(() => {
        setSeconds((prev: number) => prev + 1)
      }, 1000)
      setIntervalId(id)
    }
  }

  const handleStopTimer = () => {
    if (isRunning && intervalId) {
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 500)
      clearInterval(intervalId)
      setIsRunning(false)
      setIntervalId(null)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [intervalId])

  return {
    isRunning,
    handleStartTimer,
    handleStopTimer,
    isClicked
  }
}