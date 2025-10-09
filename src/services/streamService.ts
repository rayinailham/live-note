import type { Note, Stream } from '@/types/stream'

export const streamService = {
  saveStream: (
    streamName: string,
    notes: Note[],
    seconds: number,
    archivedStreams: Stream[],
    setArchivedStreams: (streams: Stream[]) => void,
    setStreamName: (name: string) => void,
    setNotes: (notes: Note[]) => void,
    setSeconds: (seconds: number) => void,
    handleStopTimer: () => void
  ) => {
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
    handleStopTimer()
  },

  exportNotes: (notes: Note[]) => {
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
  },

  exportSelectedStream: (selectedStream: Stream | null) => {
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
  },

  addNote: (
    currentNote: string,
    setCurrentNote: (note: string) => void,
    notes: Note[],
    setNotes: (notes: Note[]) => void,
    seconds: number,
    isRunning: boolean,
    formatTime: (seconds: number) => string
  ) => {
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
  },

  editNote: (
    index: number,
    text: string,
    selectedStream: Stream | null,
    archivedStreams: Stream[],
    setArchivedStreams: (streams: Stream[]) => void,
    setSelectedStream: (stream: Stream | null) => void
  ) => {
    if (!selectedStream) return
    const updatedNotes = [...selectedStream.notes]
    updatedNotes[index] = {
      ...updatedNotes[index],
      text: text.trim()
    }
    const updatedStream = { ...selectedStream, notes: updatedNotes }
    const updatedArchivedStreams = archivedStreams.map(stream =>
      stream.name === selectedStream.name ? updatedStream : stream
    )
    setArchivedStreams(updatedArchivedStreams)
    setSelectedStream(updatedStream)
  },

  deleteNote: (
    index: number,
    selectedStream: Stream | null,
    archivedStreams: Stream[],
    setArchivedStreams: (streams: Stream[]) => void,
    setSelectedStream: (stream: Stream | null) => void
  ) => {
    if (!selectedStream) return
    if (!confirm('Are you sure you want to delete this note?')) return
    const updatedNotes = selectedStream.notes.filter((_, i) => i !== index)
    const updatedStream = { ...selectedStream, notes: updatedNotes }
    const updatedArchivedStreams = archivedStreams.map(stream =>
      stream.name === selectedStream.name ? updatedStream : stream
    )
    setArchivedStreams(updatedArchivedStreams)
    setSelectedStream(updatedStream)
  },

  editStreamName: (
    newName: string,
    selectedStream: Stream | null,
    archivedStreams: Stream[],
    setArchivedStreams: (streams: Stream[]) => void,
    setSelectedStream: (stream: Stream | null) => void
  ) => {
    if (!selectedStream || !newName.trim()) {
      alert('Stream name cannot be empty.')
      return
    }
    if (archivedStreams.some(stream => stream.name !== selectedStream.name && stream.name === newName.trim())) {
      alert('A stream with this name already exists. Please choose a different name.')
      return
    }
    const updatedStream = { ...selectedStream, name: newName.trim() }
    const updatedArchivedStreams = archivedStreams.map(stream =>
      stream.name === selectedStream.name ? updatedStream : stream
    )
    setArchivedStreams(updatedArchivedStreams)
    setSelectedStream(updatedStream)
  },

  deleteStream: (
    archivedStreams: Stream[],
    setArchivedStreams: (streams: Stream[]) => void,
    index: number
  ) => {
    if (!confirm('Are you sure you want to delete this stream?')) return
    const updatedStreams = archivedStreams.filter((_, i) => i !== index)
    setArchivedStreams(updatedStreams)
  },
}