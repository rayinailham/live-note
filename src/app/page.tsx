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

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [isClicked, setIsClicked] = useState(false)
  const [streamName, setStreamName] = useState('')
  const [archivedStreams, setArchivedStreams] = useState<Stream[]>([])
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null)

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

  // Load data from local storage on mount
  useEffect(() => {
    const savedStreamName = localStorage.getItem('livestream-streamName')
    const savedNotes = localStorage.getItem('livestream-notes')
    const savedSeconds = localStorage.getItem('livestream-seconds')
    const savedArchivedStreams = localStorage.getItem('livestream-archivedStreams')

    if (savedStreamName) {
      setStreamName(savedStreamName)
    }
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (error) {
        console.error('Error parsing saved notes:', error)
      }
    }
    if (savedSeconds) {
      setSeconds(parseInt(savedSeconds, 10) || 0)
    }
    if (savedArchivedStreams) {
      try {
        setArchivedStreams(JSON.parse(savedArchivedStreams))
      } catch (error) {
        console.error('Error parsing saved archived streams:', error)
      }
    }
  }, [])

  // Save data to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('livestream-streamName', streamName)
  }, [streamName])

  useEffect(() => {
    localStorage.setItem('livestream-notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('livestream-archivedStreams', JSON.stringify(archivedStreams))
  }, [archivedStreams])

  const handleAddNote = () => {
    if (!currentNote.trim()) {
      return // Don't add empty notes
    }
    
    if (!isRunning) {
      alert('Please start the timer first to add notes with timestamps.')
      return
    }

    const newNote: Note = {
      timestamp: formatTime(seconds),
      text: currentNote.trim()
    }
    setNotes([...notes, newNote])
    setCurrentNote('')
  }

  const handleSaveStream = () => {
    if (!streamName.trim()) {
      alert('Please enter a stream name before saving.')
      return
    }
    if (notes.length === 0) {
      alert('No notes to save. Add some notes first.')
      return
    }
    if (archivedStreams.some(stream => stream.name === streamName.trim())) {
      alert('A stream with this name already exists. Please choose a different name.')
      return
    }
    const newStream: Stream = {
      name: streamName.trim(),
      notes: [...notes],
      totalSeconds: seconds,
      date: new Date().toISOString()
    }
    setArchivedStreams([...archivedStreams, newStream])
    // Reset current state
    setStreamName('')
    setNotes([])
    setSeconds(0)
    setIsRunning(false)
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  const handleExportNotes = () => {
    if (notes.length === 0) {
      alert('No notes to export. Add some notes first.')
      return
    }
    const content = notes.map(note => `${note.timestamp} - ${note.text}`).join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'livestream-notes.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleExportSelectedStream = () => {
    if (!selectedStream || selectedStream.notes.length === 0) {
      alert('No notes to export for this stream.')
      return
    }
    const content = selectedStream.notes.map(note => `${note.timestamp} - ${note.text}`).join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedStream.name}-notes.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Archived Streams</h2>
        <button
          onClick={() => setSelectedStream(null)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4 transition-colors"
        >
          New Stream
        </button>
        {archivedStreams.length === 0 ? (
          <p className="text-gray-500 text-sm">No archived streams yet.</p>
        ) : (
          <ul className="space-y-2">
            {archivedStreams.map((stream, index) => (
              <li
                key={index}
                onClick={() => setSelectedStream(stream)}
                className={`cursor-pointer p-2 rounded-md transition-colors ${
                  selectedStream?.name === stream.name ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="font-medium">{stream.name}</div>
                <div className="text-xs text-gray-500">{formatTime(stream.totalSeconds)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-3/4 p-8 flex flex-col min-h-0">
        {selectedStream ? (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
              {selectedStream.name}
            </h1>
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6">
              <p className="text-sm text-gray-500 mb-4">
                Total Duration: {formatTime(selectedStream.totalSeconds)} | Saved on: {new Date(selectedStream.date).toLocaleDateString()} {new Date(selectedStream.date).toLocaleTimeString()}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Notes</h2>
              {selectedStream.notes.length === 0 ? (
                <p className="text-gray-500 text-center">No notes for this stream.</p>
              ) : (
                <ul className="space-y-2">
                  {selectedStream.notes.map((note, index) => (
                    <li key={index} className="bg-gray-50 p-3 rounded-md text-black">
                      <span className="font-mono">{note.timestamp}</span> - {note.text}
                    </li>
                  ))}
                </ul>
              )}
              {selectedStream.notes.length > 0 && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleExportSelectedStream}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Export Notes
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Live Note - Livestream Timestamp Tool
              </h1>
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveStream}
                  disabled={!streamName.trim() || notes.length === 0}
                  className={`font-semibold py-2 px-6 rounded-lg transition-colors ${
                    streamName.trim() && notes.length > 0
                      ? 'bg-purple-500 hover:bg-purple-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Save Stream
                </button>
                <button
                  onClick={handleExportNotes}
                  disabled={notes.length === 0}
                  className={`font-semibold py-2 px-6 rounded-lg transition-colors ${
                    notes.length > 0
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Export Notes
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-6 flex-1 min-h-0 overflow-y-auto">
              {/* Stream Name Section */}
              <div className="mb-8">
                <label htmlFor="streamName" className="block text-sm font-medium text-gray-700 mb-2">
                  Stream Name
                </label>
                <input
                  id="streamName"
                  type="text"
                  value={streamName}
                  onChange={(e) => setStreamName(e.target.value)}
                  placeholder="Enter stream name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              {/* Timer Section */}
              <div className="mb-8">
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
                  <div className="flex">
                    <input
                      id="noteInput"
                      type="text"
                      value={currentNote}
                      onChange={(e) => setCurrentNote(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) {
                          e.preventDefault()
                          if (!currentNote.trim()) return
                          if (!isRunning) {
                            alert('Please start the timer first to add notes with timestamps.')
                            return
                          }
                          handleAddNote()
                        }
                      }}
                      placeholder="Enter your note here..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button
                      onClick={handleAddNote}
                      disabled={!isRunning || !currentNote.trim()}
                      className={`px-4 py-2 rounded-r-md transition-colors ${
                        isRunning && currentNote.trim()
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes List Section */}
              <div>
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
        )}
      </div>
    </div>
  )
}