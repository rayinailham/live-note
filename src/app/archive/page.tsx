'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Note = {
  timestamp: string
  text: string
}

type Stream = {
  name: string
  notes: Note[]
  totalSeconds: number
  date: string
}

export default function Archive() {
  const [archivedStreams, setArchivedStreams] = useState<Stream[]>([])

  useEffect(() => {
    const savedArchivedStreams = localStorage.getItem('livestream-archivedStreams')
    if (savedArchivedStreams) {
      try {
        setArchivedStreams(JSON.parse(savedArchivedStreams))
      } catch (error) {
        console.error('Error parsing saved archived streams:', error)
      }
    }
  }, [])

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Stream Archive
        </h1>

        <div className="mb-6 text-center">
          <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Back to Main
          </Link>
        </div>

        {archivedStreams.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No archived streams yet. Save some streams from the main page!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {archivedStreams.map((stream, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{stream.name}</h2>
                  <p className="text-sm text-gray-500">
                    Total Duration: {formatTime(stream.totalSeconds)} | Saved on: {formatDate(stream.date)}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-700">Notes:</h3>
                  {stream.notes.length === 0 ? (
                    <p className="text-gray-500">No notes for this stream.</p>
                  ) : (
                    <ul className="space-y-2">
                      {stream.notes.map((note, noteIndex) => (
                        <li key={noteIndex} className="bg-gray-50 p-3 rounded-md text-black">
                          <span className="font-mono">{note.timestamp}</span> - {note.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}