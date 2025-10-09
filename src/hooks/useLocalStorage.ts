import { useState, useEffect } from 'react'
import type { Note, Stream } from '@/types/stream'

export const useLocalStorage = () => {
  const [streamName, setStreamName] = useState('')
  const [notes, setNotes] = useState<Note[]>([])
  const [seconds, setSeconds] = useState(0)
  const [archivedStreams, setArchivedStreams] = useState<Stream[]>([])
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null)

  // Load data from local storage on mount
  useEffect(() => {
    const savedStreamName = localStorage.getItem('livestream-streamName')
    const savedNotes = localStorage.getItem('livestream-notes')
    const savedSeconds = localStorage.getItem('livestream-seconds')
    const savedArchivedStreams = localStorage.getItem('livestream-archivedStreams')
    const savedSelectedStream = localStorage.getItem('livestream-selectedStream')

    if (savedStreamName) {
      setStreamName(savedStreamName)
    }
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (error) {
        setNotes([])
        alert('Error parsing saved notes. Data has been reset.')
        console.error('Error parsing saved notes:', error)
      }
    }
    if (savedSeconds) {
      setSeconds(parseInt(savedSeconds, 10) || 0)
    }
    if (savedArchivedStreams) {
      try {
        const parsed = JSON.parse(savedArchivedStreams)
        if (Array.isArray(parsed)) {
          setArchivedStreams(parsed)
        } else {
          setArchivedStreams([])
          alert('Saved archived streams data is invalid. Data has been reset.')
        }
      } catch (error) {
        setArchivedStreams([])
        alert('Error parsing saved archived streams. Data has been reset.')
        console.error('Error parsing saved archived streams:', error)
      }
    }
    if (savedSelectedStream) {
      try {
        setSelectedStream(JSON.parse(savedSelectedStream))
      } catch (error) {
        setSelectedStream(null)
        alert('Error parsing saved selected stream. Data has been reset.')
        console.error('Error parsing saved selected stream:', error)
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

  useEffect(() => {
    localStorage.setItem('livestream-seconds', seconds.toString())
  }, [seconds])

  useEffect(() => {
    if (selectedStream) {
      localStorage.setItem('livestream-selectedStream', JSON.stringify(selectedStream))
    } else {
      localStorage.removeItem('livestream-selectedStream')
    }
  }, [selectedStream])

  return {
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
  }
}