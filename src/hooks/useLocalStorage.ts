import { useState, useEffect } from 'react'
import type { Note, Stream } from '@/types/stream'

const getInitialState = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') {
    return defaultValue
  }
  try {
    const savedItem = localStorage.getItem(key)
    if (savedItem) {
      const parsed = JSON.parse(savedItem)
      // Basic validation for archivedStreams
      if (key === 'livestream-archivedStreams') {
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (item) =>
              typeof item === 'object' &&
              item !== null &&
              typeof item.name === 'string' &&
              Array.isArray(item.notes) &&
              typeof item.totalSeconds === 'number' &&
              typeof item.date === 'string'
          )
        ) {
          return parsed
        } else {
          console.warn(
            'Invalid archived streams data format, resetting to empty array'
          )
          localStorage.removeItem('livestream-archivedStreams')
          return defaultValue
        }
      }
      return parsed
    }
  } catch (error) {
    console.error(`Error parsing saved ${key}:`, error)
    localStorage.removeItem(key)
  }
  return defaultValue
}

export const useLocalStorage = () => {
  const [streamName, setStreamName] = useState<string>(() =>
    getInitialState('livestream-streamName', '')
  )
  const [notes, setNotes] = useState<Note[]>(() =>
    getInitialState('livestream-notes', [])
  )
  const [seconds, setSeconds] = useState<number>(() =>
    getInitialState('livestream-seconds', 0)
  )
  const [archivedStreams, setArchivedStreams] = useState<Stream[]>(() =>
    getInitialState('livestream-archivedStreams', [])
  )
  const [selectedStream, setSelectedStream] = useState<Stream | null>(() =>
    getInitialState('livestream-selectedStream', null)
  )

  useEffect(() => {
    localStorage.setItem('livestream-streamName', JSON.stringify(streamName))
    localStorage.setItem('livestream-notes', JSON.stringify(notes))
    localStorage.setItem('livestream-seconds', JSON.stringify(seconds))
    localStorage.setItem(
      'livestream-archivedStreams',
      JSON.stringify(archivedStreams)
    )
    localStorage.setItem(
      'livestream-selectedStream',
      JSON.stringify(selectedStream)
    )
  }, [streamName, notes, seconds, archivedStreams, selectedStream])

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