'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { streamService } from '@/services/streamService'
import { formatTime, formatDate } from '@/lib/utils'
import type { Stream } from '@/types/stream'

export default function Archive() {
  const { archivedStreams, setArchivedStreams } = useLocalStorage()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')

  const handleDelete = (index: number) => {
    streamService.deleteStream(archivedStreams, setArchivedStreams, index)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setEditingName(archivedStreams[index].name)
  }

  const handleSaveEdit = () => {
    if (!editingName.trim()) {
      alert('Stream name cannot be empty.')
      return
    }
    if (archivedStreams.some((stream, i) => i !== editingIndex && stream.name === editingName.trim())) {
      alert('A stream with this name already exists. Please choose a different name.')
      return
    }
    const updatedStreams = [...archivedStreams]
    updatedStreams[editingIndex!].name = editingName.trim()
    setArchivedStreams(updatedStreams)
    setEditingIndex(null)
    setEditingName('')
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditingName('')
  }

  const handleExportStream = (stream: Stream) => {
    streamService.exportSelectedStream(stream)
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
                  {editingIndex === index ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <h2 className="text-xl font-semibold text-gray-800">{stream.name}</h2>
                  )}
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
                {editingIndex !== index && (
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Edit Name
                    </button>
                    <button
                      onClick={() => handleExportStream(stream)}
                      disabled={stream.notes.length === 0}
                      className={`px-4 py-2 rounded-md ${
                        stream.notes.length > 0
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Export
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}