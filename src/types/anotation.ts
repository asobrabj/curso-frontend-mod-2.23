interface IAnotation {
  id: number | null
  name: string
  date: string
  time: string
  category?: string
  priority?: string
  description?: string
  concluded: boolean
}

export default IAnotation
