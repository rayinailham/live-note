export type Note = {
  timestamp: string
  text: string
}

export type Stream = {
  name: string
  notes: Note[]
  totalSeconds: number
  date: string
}