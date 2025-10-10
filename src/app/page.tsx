'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatTime } from '@/lib/utils'
import { useTimer } from '@/hooks/useTimer'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { streamService } from '@/services/streamService'
import type { Note, Stream } from '@/types/stream'

export default function Home() {
  const [currentNote, setCurrentNote] = useState('')
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null)
  const [editingNoteText, setEditingNoteText] = useState('')
  const [editingStreamName, setEditingStreamName] = useState(false)
  const [editingStreamNameText, setEditingStreamNameText] = useState('')
  const [mounted, setMounted] = useState(false)

  const {
    streamName,
    setStreamName,
    notes,
    setNotes,
    seconds,
    setSeconds,
    archivedStreams,
    setArchivedStreams,
    selectedStream,
    setSelectedStream
  } = useLocalStorage()

  const {
    isRunning,
    handleStartTimer,
    handleStopTimer,
    isClicked
  } = useTimer(seconds, setSeconds)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddNote = () => {
    streamService.addNote(
      currentNote,
      setCurrentNote,
      notes,
      setNotes,
      seconds,
      isRunning,
      formatTime
    )
  }

  const handleSaveStream = () => {
    streamService.saveStream(
      streamName,
      notes,
      seconds,
      archivedStreams,
      setArchivedStreams,
      setStreamName,
      setNotes,
      setSeconds,
      handleStopTimer
    )
  }

  const handleExportNotes = () => {
    streamService.exportNotes(notes)
  }

  const handleExportSelectedStream = () => {
    streamService.exportSelectedStream(selectedStream)
  }

  const handleEditNote = (index: number, text: string) => {
    setEditingNoteIndex(index)
    setEditingNoteText(text)
  }

  const handleSaveEdit = () => {
    streamService.editNote(
      editingNoteIndex!,
      editingNoteText,
      selectedStream,
      archivedStreams,
      setArchivedStreams,
      setSelectedStream
    )
    setEditingNoteIndex(null)
    setEditingNoteText('')
  }

  const handleCancelEdit = () => {
    setEditingNoteIndex(null)
    setEditingNoteText('')
  }

  const handleEditStreamName = () => {
    if (!selectedStream) return
    setEditingStreamName(true)
    setEditingStreamNameText(selectedStream.name)
  }

  const handleSaveEditStreamName = () => {
    streamService.editStreamName(
      editingStreamNameText,
      selectedStream,
      archivedStreams,
      setArchivedStreams,
      setSelectedStream
    )
    setEditingStreamName(false)
    setEditingStreamNameText('')
  }

  const handleCancelEditStreamName = () => {
    setEditingStreamName(false)
    setEditingStreamNameText('')
  }

  const handleDeleteNote = (index: number) => {
    streamService.deleteNote(
      index,
      selectedStream,
      archivedStreams,
      setArchivedStreams,
      setSelectedStream
    )
  }

  if (!mounted) {
    return null
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
      <div className="w-3/4 p-8 flex flex-col h-full">
        {selectedStream ? (
          <div>
            <div className="flex items-center space-x-4 mb-8">
              {editingStreamName ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editingStreamNameText}
                    onChange={(e) => setEditingStreamNameText(e.target.value)}
                    className="text-3xl font-bold px-2 py-1 border border-gray-300 rounded text-black"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEditStreamName()
                      if (e.key === 'Escape') handleCancelEditStreamName()
                    }}
                  />
                  <button
                    onClick={handleSaveEditStreamName}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditStreamName}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {selectedStream.name}
                  </h1>
                  <button
                    onClick={handleEditStreamName}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit Name
                  </button>
                </>
              )}
            </div>
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
                    <li key={index} className="bg-gray-50 p-3 rounded-md text-black flex items-center justify-between">
                      {editingNoteIndex === index ? (
                        <div className="flex-1 flex items-center space-x-2">
                          <span className="font-mono text-gray-600">{note.timestamp}</span>
                          <input
                            type="text"
                            value={editingNoteText}
                            onChange={(e) => setEditingNoteText(e.target.value)}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-black"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit()
                              if (e.key === 'Escape') handleCancelEdit()
                            }}
                          />
                          <button
                            onClick={handleSaveEdit}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <span><span className="font-mono">{note.timestamp}</span> - {note.text}</span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditNote(index, note.text)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNote(index)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
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