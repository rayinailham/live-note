'use client'

import { useState, useEffect } from 'react'

type Note = {
  timestamp: string
  text: string
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [isClicked, setIsClicked] = useState(false)

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartTimer = () => {
    if (!isRunning) {
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 500)
      setIsRunning(true)
      const id = setInterval(() => {
        setSeconds(prev => prev + 1)
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

  const handleAddNote = () => {
    if (currentNote.trim() && isRunning) {
      const newNote: Note = {
        timestamp: formatTime(seconds),
        text: currentNote.trim()
      }
      setNotes([...notes, newNote])
      setCurrentNote('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Livestream Timestamp App
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-center space-x-4 mb-6">
            <div className={`text-4xl font-mono font-bold text-gray-800 transition-opacity duration-500 ${isClicked ? 'opacity-50' : 'opacity-100'}`}>
              {formatTime(seconds)}
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <button
              onClick={isRunning ? handleStopTimer : handleStartTimer}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              {isRunning ? 'Stop Timer' : 'Start Timer'}
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="noteInput" className="block text-sm font-medium text-gray-700 mb-2">
              Add Note
            </label>
            <input
              id="noteInput"
              type="text"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  e.preventDefault()
                  handleAddNote()
                }
              }}
              placeholder="Enter your note here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleAddNote}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Add Note
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Notes List</h2>
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center">No notes yet. Add your first note above!</p>
          ) : (
            <ul className="space-y-2">
              {notes.map((note, index) => (
                <li key={index} className="bg-gray-50 p-3 rounded-md text-black">
                  <span className="font-mono">{note.timestamp}</span> - {note.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}