'use client'

import { useState } from 'react'

export default function Home() {
  const [notes, setNotes] = useState<string[]>([])
  const [currentNote, setCurrentNote] = useState('')

  const handleAddNote = () => {
    if (currentNote.trim()) {
      setNotes([...notes, currentNote])
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
          <div className="flex justify-center mb-6">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Start Timer
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
                <li key={index} className="bg-gray-50 p-3 rounded-md">
                  {note}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}