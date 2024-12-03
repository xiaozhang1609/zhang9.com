import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Trophy, Star, Timer, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

// Types
type Cell = number | null
type Board = Cell[][]
type Direction = 'up' | 'down' | 'left' | 'right'

interface GameState {
  board: Board
  score: number
  bestScore: number
  gameTime: number
  moves: number
  gameOver: boolean
}

// Constants
const GRID_SIZE = 4
const CELL_COUNT = GRID_SIZE * GRID_SIZE
const CELL_GAP = 12
const CELL_GAP_UNIT = `${CELL_GAP/4}px`
const NEW_CELL_PROBABILITY = 0.9

const DIRECTION_VECTORS: Record<Direction, [number, number]> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
}

const initialState: GameState = {
  board: Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)),
  score: 0,
  bestScore: 0,
  gameTime: 0,
  moves: 0,
  gameOver: false,
}

// Style constants
const CELL_COLORS: Record<number, string> = {
  2: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 text-blue-800 dark:text-blue-100",
  4: "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 text-green-800 dark:text-green-100",
  8: "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-800 dark:to-yellow-700 text-yellow-800 dark:text-yellow-100",
  16: "bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 text-orange-800 dark:text-orange-100",
  32: "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-800 dark:to-red-700 text-red-800 dark:text-red-100",
  64: "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 text-purple-800 dark:text-purple-100",
  128: "bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-800 dark:to-indigo-700 text-indigo-800 dark:text-indigo-100",
  256: "bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-800 dark:to-pink-700 text-pink-800 dark:text-pink-100",
  512: "bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-700 text-teal-800 dark:text-teal-100",
  1024: "bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-800 dark:to-cyan-700 text-cyan-800 dark:text-cyan-100",
  2048: "bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-700 text-amber-800 dark:text-amber-100",
}

// Components
interface GameStatProps {
  icon: React.ElementType
  label: string
  value: number | string
  color: string
}

const GameStat: React.FC<GameStatProps> = React.memo(({ icon: Icon, label, value, color }) => (
  <div className={`bg-gradient-to-br from-${color}-50/50 to-${color}-100/50 dark:from-${color}-900/20 dark:to-${color}-800/20 p-4 rounded-xl backdrop-blur-sm shadow-sm`}>
    <div className={`text-${color}-500 dark:text-${color}-400 mb-2 flex items-center gap-2`}>
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
  </div>
))

interface GameCellProps {
  value: Cell
  index: number
}

const GameCell: React.FC<GameCellProps> = React.memo(({ value, index }) => {
  const cellStyle = useMemo(() => {
    const baseStyle = "w-full h-full flex items-center justify-center rounded-xl font-bold text-2xl md:text-3xl transition-all duration-200 shadow-sm backdrop-blur-sm"
    if (!value) return `${baseStyle} bg-gray-100/50 dark:bg-gray-800/50`
    return `${baseStyle} ${CELL_COLORS[value] || "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200"}`
  }, [value])

  const position = useMemo(() => ({
    width: `calc(25% - ${CELL_GAP_UNIT})`,
    height: `calc(25% - ${CELL_GAP_UNIT})`,
    left: `calc(${index % 4} * (25% + ${CELL_GAP_UNIT}))`,
    top: `calc(${Math.floor(index / 4)} * (25% + ${CELL_GAP_UNIT}))`,
    position: 'absolute' as const,
  }), [index])

  if (!value) return null

  return (
    <motion.div
      key={`${index}-${value}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.15 }}
      className={cellStyle}
      style={position}
    >
      {value}
    </motion.div>
  )
})

// Utility functions
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Main component
export default function Game2048() {
  const [state, setState] = useState<GameState>(initialState)

  const addNewCell = useCallback((board: Board): Board => {
    const emptyCells = board.flatMap((row, i) => 
      row.map((cell, j) => cell === null ? [i, j] : null).filter(Boolean)
    ) as [number, number][]
    
    if (emptyCells.length === 0) return board

    const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    const newBoard = board.map(row => [...row])
    newBoard[i][j] = Math.random() < NEW_CELL_PROBABILITY ? 2 : 4
    return newBoard
  }, [])

  const initGame = useCallback(() => {
    let newBoard = addNewCell(initialState.board)
    newBoard = addNewCell(newBoard)
    setState({ ...initialState, board: newBoard })
  }, [addNewCell])

  const move = useCallback((direction: Direction) => {
    if (state.gameOver) return

    setState(prevState => {
      let newBoard = prevState.board.map(row => [...row])
      let moved = false
      let newScore = prevState.score

      const [di, dj] = DIRECTION_VECTORS[direction]
      const moveCell = (i: number, j: number) => {
        if (newBoard[i][j] === null) return

        let ni = i + di, nj = j + dj
        while (ni >= 0 && ni < GRID_SIZE && nj >= 0 && nj < GRID_SIZE) {
          if (newBoard[ni][nj] === null) {
            newBoard[ni][nj] = newBoard[ni - di][nj - dj]
            newBoard[ni - di][nj - dj] = null
            moved = true
            ni += di
            nj += dj
          } else if (newBoard[ni][nj] === newBoard[ni - di][nj - dj]) {
            newBoard[ni][nj] *= 2
            newScore += newBoard[ni][nj] as number
            newBoard[ni - di][nj - dj] = null
            moved = true
            break
          } else {
            break
          }
        }
      }

      const range = Array.from({ length: GRID_SIZE }, (_, i) => i)
      if (direction === 'up' || direction === 'down') {
        const rows = direction === 'up' ? range : range.reverse()
        for (const i of rows) {
          for (let j = 0; j < GRID_SIZE; j++) {
            moveCell(i, j)
          }
        }
      } else {
        const cols = direction === 'left' ? range : range.reverse()
        for (let i = 0; i < GRID_SIZE; i++) {
          for (const j of cols) {
            moveCell(i, j)
          }
        }
      }

      if (!moved) return prevState

      newBoard = addNewCell(newBoard)
      const newBestScore = Math.max(prevState.bestScore, newScore)
      const gameOver = newBoard.every(row => row.every(cell => cell !== null))

      return {
        ...prevState,
        board: newBoard,
        score: newScore,
        bestScore: newBestScore,
        moves: prevState.moves + 1,
        gameOver,
      }
    })
  }, [state.gameOver, addNewCell])

  useEffect(() => {
    initGame()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        const direction = e.key.replace('Arrow', '').toLowerCase() as Direction
        move(direction)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [initGame, move])

  useEffect(() => {
    if (!state.gameOver) {
      const timer = setInterval(() => {
        setState(prevState => ({ ...prevState, gameTime: prevState.gameTime + 1 }))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [state.gameOver])

  const stats = useMemo(() => [
    { icon: Trophy, label: "Score", value: state.score, color: "blue" },
    { icon: Star, label: "Best Score", value: state.bestScore, color: "purple" },
    { icon: Timer, label: "Time", value: formatTime(state.gameTime), color: "green" },
    { icon: Gamepad2, label: "Moves", value: state.moves, color: "orange" },
  ], [state.score, state.bestScore, state.gameTime, state.moves])

  const handleGameOver = useCallback(() => {
    // 处理游戏结束逻辑
    alert(`Game Over! Your final score is ${state.score}.`)
  }, [state.score])

  useEffect(() => {
    if (state.gameOver) {
      handleGameOver()
    }
  }, [state.gameOver, handleGameOver])

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative card backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 p-4 rounded-2xl shadow-xl">
        {/* 头部区域 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-lg backdrop-blur-sm">
              <Gamepad2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              2048
            </h1>
          </div>
          <button 
            onClick={initGame} 
            className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-colors shadow-md flex items-center gap-1.5 text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>
        </div>

        {/* 状态栏 */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`bg-${stat.color}-50/50 dark:bg-${stat.color}-900/20 p-2 rounded-lg text-center`}
            >
              <div className={`text-${stat.color}-500 dark:text-${stat.color}-400 text-xs mb-0.5`}>
                {stat.label}
              </div>
              <div className="text-base font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* 游戏区域 */}
        <motion.div 
          className="aspect-square w-full bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 border border-gray-200/50 dark:border-gray-700/50"
          initial={false}
          animate={{ scale: state.gameOver ? 0.95 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative w-full h-full grid grid-cols-4 gap-2">
            {Array.from({ length: CELL_COUNT }).map((_, i) => (
              <div
                key={`bg-${i}`}
                className="bg-gray-200/80 dark:bg-gray-700/80 rounded-lg"
              />
            ))}
            
            <AnimatePresence>
              {state.board.flat().map((cell, i) => (
                <GameCell key={`${i}-${cell}`} value={cell} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 控制按钮 */}
        <div className="mt-3">
          <div className="grid grid-cols-3 gap-2 max-w-[160px] mx-auto">
            <div />
            <button 
              onClick={() => move('up')} 
              className="aspect-square p-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <div />
            <button 
              onClick={() => move('left')} 
              className="aspect-square p-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div />
            <button 
              onClick={() => move('right')} 
              className="aspect-square p-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div />
            <button 
              onClick={() => move('down')} 
              className="aspect-square p-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <div />
          </div>
        </div>

        {/* Game Over 弹窗 */}
        {state.gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-3">Game Over!</h2>
              <p className="mb-4">Final Score: {state.score}</p>
              <p className="mb-4">Best Score: {state.bestScore}</p>
              <p className="mb-4">Time: {formatTime(state.gameTime)}</p>
              <p className="mb-4">Moves: {state.moves}</p>
              <button
                onClick={initGame}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-colors shadow-md text-sm font-medium"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
