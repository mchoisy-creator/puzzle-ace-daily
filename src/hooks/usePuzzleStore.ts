import { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';

interface PuzzleData {
  id: string;
  date: string;
  fen: string;
  solution: string[];
  description: string;
  playerWhite?: string;
  playerBlack?: string;
  event?: string;
  hints: string[];
}

interface PuzzleState {
  currentPuzzle: PuzzleData | null;
  game: Chess | null;
  currentMoveIndex: number;
  isPlayerTurn: boolean;
  hintsUsed: number;
  isSolved: boolean;
  isFailed: boolean;
  streak: number;
  totalSolved: number;
  moveHistory: string[];
  showSolution: boolean;
}

const DAILY_PUZZLES: PuzzleData[] = [
  {
    id: "puzzle-2026-01-16",
    date: "2026-01-16",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
    solution: ["h5f7"],
    description: "Le célèbre mat du berger ! Une attaque fulgurante sur f7, le talon d'Achille des Noirs. Ce mat classique illustre l'importance de protéger les cases faibles autour du roi.",
    playerWhite: "Amateur",
    playerBlack: "Amateur",
    event: "Partie d'apprentissage",
    hints: [
      "Cherchez une attaque directe sur le roi noir.",
      "La case f7 n'est protégée que par le roi...",
      "La dame peut capturer le pion f7 avec échec et mat : Dxf7#"
    ]
  },
  {
    id: "puzzle-2026-01-15",
    date: "2026-01-15",
    fen: "r2qkbnr/ppp2ppp/2np4/4N3/2B1P3/2N5/PPPP1PPP/R1BQK2R w KQkq - 0 6",
    solution: ["e5f7", "e8f7", "d1f3"],
    description: "Une combinaison tactique classique impliquant un sacrifice sur f7 suivi d'une fourchette royale. Cette séquence met en évidence la vulnérabilité du roi non roqué.",
    playerWhite: "Paul Morphy",
    playerBlack: "Duc de Brunswick",
    event: "Paris 1858",
    hints: [
      "Le cavalier peut attaquer une case critique...",
      "Après le sacrifice, cherchez une attaque double.",
      "Cxf7+! puis après Rxf7, Df3+ gagne la dame."
    ]
  }
];

const STORAGE_KEY = 'europe-echecs-puzzle-stats';

interface StoredStats {
  streak: number;
  totalSolved: number;
  lastSolvedDate: string | null;
  solvedPuzzles: string[];
}

function getStoredStats(): StoredStats {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error('Error reading from localStorage');
  }
  return { streak: 0, totalSolved: 0, lastSolvedDate: null, solvedPuzzles: [] };
}

function saveStats(stats: StoredStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    console.error('Error saving to localStorage');
  }
}

export function usePuzzleStore() {
  const [state, setState] = useState<PuzzleState>({
    currentPuzzle: null,
    game: null,
    currentMoveIndex: 0,
    isPlayerTurn: true,
    hintsUsed: 0,
    isSolved: false,
    isFailed: false,
    streak: 0,
    totalSolved: 0,
    moveHistory: [],
    showSolution: false,
  });

  // Load puzzle and stats on mount
  useEffect(() => {
    const stats = getStoredStats();
    const today = new Date().toISOString().split('T')[0];
    
    // Check if streak should be reset (missed a day)
    let currentStreak = stats.streak;
    if (stats.lastSolvedDate) {
      const lastDate = new Date(stats.lastSolvedDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        currentStreak = 0;
      }
    }

    // Find today's puzzle or use the first one
    const todayPuzzle = DAILY_PUZZLES.find(p => p.date === today) || DAILY_PUZZLES[0];
    const game = new Chess(todayPuzzle.fen);

    setState(prev => ({
      ...prev,
      currentPuzzle: todayPuzzle,
      game,
      streak: currentStreak,
      totalSolved: stats.totalSolved,
      isSolved: stats.solvedPuzzles.includes(todayPuzzle.id),
    }));
  }, []);

  const makeMove = useCallback((from: string, to: string): boolean => {
    if (!state.game || !state.currentPuzzle || state.isSolved || state.showSolution) {
      return false;
    }

    const expectedMove = state.currentPuzzle.solution[state.currentMoveIndex];
    const attemptedMove = from + to;

    // Try to make the move
    try {
      const move = state.game.move({ from, to, promotion: 'q' });
      if (!move) return false;

      // Check if it's the correct move
      if (attemptedMove === expectedMove) {
        const newMoveIndex = state.currentMoveIndex + 1;
        const newHistory = [...state.moveHistory, move.san];
        
        // Check if puzzle is complete
        if (newMoveIndex >= state.currentPuzzle.solution.length) {
          // Puzzle solved!
          const stats = getStoredStats();
          const today = new Date().toISOString().split('T')[0];
          const newStreak = stats.streak + 1;
          const newTotal = stats.totalSolved + 1;
          
          saveStats({
            streak: newStreak,
            totalSolved: newTotal,
            lastSolvedDate: today,
            solvedPuzzles: [...stats.solvedPuzzles, state.currentPuzzle.id],
          });

          setState(prev => ({
            ...prev,
            currentMoveIndex: newMoveIndex,
            moveHistory: newHistory,
            isSolved: true,
            streak: newStreak,
            totalSolved: newTotal,
          }));
        } else {
          setState(prev => ({
            ...prev,
            currentMoveIndex: newMoveIndex,
            moveHistory: newHistory,
          }));
        }
        return true;
      } else {
        // Wrong move - undo it
        state.game.undo();
        setState(prev => ({ ...prev, isFailed: true }));
        setTimeout(() => setState(prev => ({ ...prev, isFailed: false })), 500);
        return false;
      }
    } catch {
      return false;
    }
  }, [state.game, state.currentPuzzle, state.currentMoveIndex, state.moveHistory, state.isSolved, state.showSolution]);

  const useHint = useCallback(() => {
    if (state.hintsUsed < (state.currentPuzzle?.hints.length || 0)) {
      setState(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
    }
  }, [state.hintsUsed, state.currentPuzzle]);

  const revealSolution = useCallback(() => {
    if (!state.game || !state.currentPuzzle) return;

    // Play all remaining solution moves
    const game = new Chess(state.currentPuzzle.fen);
    const fullHistory: string[] = [];
    
    for (const moveStr of state.currentPuzzle.solution) {
      const from = moveStr.slice(0, 2);
      const to = moveStr.slice(2, 4);
      const move = game.move({ from, to, promotion: 'q' });
      if (move) fullHistory.push(move.san);
    }

    setState(prev => ({
      ...prev,
      game,
      showSolution: true,
      moveHistory: fullHistory,
      currentMoveIndex: state.currentPuzzle!.solution.length,
    }));
  }, [state.game, state.currentPuzzle]);

  const restart = useCallback(() => {
    if (!state.currentPuzzle) return;
    
    const game = new Chess(state.currentPuzzle.fen);
    setState(prev => ({
      ...prev,
      game,
      currentMoveIndex: 0,
      moveHistory: [],
      hintsUsed: 0,
      isFailed: false,
      showSolution: false,
    }));
  }, [state.currentPuzzle]);

  const calculateScore = useCallback(() => {
    const baseScore = 100;
    const hintPenalty = state.hintsUsed * 15;
    return Math.max(50, baseScore - hintPenalty);
  }, [state.hintsUsed]);

  return {
    ...state,
    makeMove,
    useHint,
    revealSolution,
    restart,
    calculateScore,
  };
}
