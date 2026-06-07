export interface User {
  id: string
  email: string
  username: string
  role: 'student' | 'teacher'
  avatar?: string
  createdAt: Date
}

export interface VocabularyWord {
  id: string
  word: string
  imageUrl: string
  category: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface VocabularyDeck {
  id: string
  name: string
  description: string
  category: string
  words: VocabularyWord[]
  cardCount: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
  isPublic: boolean
  previewImageUrl?: string
}

export interface DobbleCard {
  id: string
  imageIds: string[]
}

export interface GameRoom {
  id: string
  code: string
  deckId: string
  hostId: string
  players: GamePlayer[]
  currentMode: GameMode
  status: 'waiting' | 'playing' | 'finished'
  createdAt: Date
  maxPlayers: number
}

export interface GamePlayer {
  userId: string
  username: string
  avatar?: string
  score: number
  status: 'waiting' | 'playing' | 'finished'
  correctAnswers: number
  incorrectAnswers: number
}

export type GameMode = 'find-picture' | 'find-multiple-choice' | 'find-type-word'

export interface GameState {
  roomId: string
  roomCode: string
  deckId: string
  currentCardIndex: number
  currentCard?: DobbleCard
  nextCard?: DobbleCard
  players: GamePlayer[]
  gameMode: GameMode
  timeRemaining: number
  status: 'waiting' | 'playing' | 'finished'
  round: number
  maxRounds: number
}

export interface StatisticsData {
  userId: string
  totalGamesPlayed: number
  totalCorrectAnswers: number
  totalIncorrectAnswers: number
  accuracyPercentage: number
  averageResponseTime: number
  favoriteDecks: string[]
  wordsMastered: string[]
  lastPlayedAt: Date
  deckStatistics: {
    [deckId: string]: {
      gamesPlayed: number
      correctAnswers: number
      incorrectAnswers: number
      accuracy: number
    }
  }
}

export interface Classroom {
  id: string
  name: string
  code: string
  teacherId: string
  students: string[]
  decks: string[]
  createdAt: Date
  updatedAt: Date
}
