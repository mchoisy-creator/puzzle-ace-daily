import { motion } from 'framer-motion';
import { RotateCcw, Lightbulb, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChessBoardPanelProps {
  fen: string;
  onMove: (from: string, to: string) => boolean;
  currentMoveIndex: number;
  totalMoves: number;
  isSolved: boolean;
  isFailed: boolean;
  onRestart: () => void;
  onHint: () => void;
  onShowSolution: () => void;
  showSolution: boolean;
  playerTurn: 'w' | 'b';
  highlightSquare?: string | null;
}

// Simple visual chessboard rendering
function SimpleChessboard({ fen, playerTurn, highlightSquare }: { fen: string; playerTurn: 'w' | 'b'; highlightSquare?: string | null }) {
  const pieceSymbols: Record<string, string> = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
  };

  const position = fen.split(' ')[0];
  const rows = position.split('/');
  
  const board: (string | null)[][] = rows.map(row => {
    const squares: (string | null)[] = [];
    for (const char of row) {
      if (/\d/.test(char)) {
        for (let i = 0; i < parseInt(char); i++) squares.push(null);
      } else {
        squares.push(char);
      }
    }
    return squares;
  });

  if (playerTurn === 'b') board.reverse();

  // Convert highlight square (e.g. "h5") to row/col
  let highlightRow = -1, highlightCol = -1;
  if (highlightSquare) {
    highlightCol = highlightSquare.charCodeAt(0) - 97; // a=0, h=7
    highlightRow = 8 - parseInt(highlightSquare[1]); // 1=7, 8=0
    if (playerTurn === 'b') {
      highlightRow = 7 - highlightRow;
    }
  }

  return (
    <div className="grid grid-cols-8 border-2 border-border rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
      {board.flatMap((row, rowIdx) =>
        row.map((piece, colIdx) => {
          const isLight = (rowIdx + colIdx) % 2 === 0;
          const isHighlighted = rowIdx === highlightRow && colIdx === highlightCol;
          return (
            <div
              key={`${rowIdx}-${colIdx}`}
              className={`flex items-center justify-center text-3xl md:text-4xl lg:text-5xl relative ${isLight ? 'bg-board-light' : 'bg-board-dark'}`}
              style={{ aspectRatio: '1' }}
            >
              {isHighlighted && (
                <div className="absolute inset-0 bg-yellow-400/50 animate-pulse rounded-sm" />
              )}
              {piece && <span className={`relative z-10 ${piece === piece.toUpperCase() ? 'text-white drop-shadow-md' : 'text-gray-900 drop-shadow-md'}`}>{pieceSymbols[piece]}</span>}
            </div>
          );
        })
      )}
    </div>
  );
}

export function ChessBoardPanel({
  fen,
  currentMoveIndex,
  totalMoves,
  isSolved,
  isFailed,
  onRestart,
  onHint,
  onShowSolution,
  showSolution,
  playerTurn,
  highlightSquare,
}: ChessBoardPanelProps) {
  const progress = totalMoves > 0 ? (currentMoveIndex / totalMoves) * 100 : 0;

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-2 h-full">
      {/* Progress bar above the board */}
      <div className="bg-secondary/50 rounded-lg p-2 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Progression</span>
          <span className="text-xs font-medium text-primary">{currentMoveIndex} / {totalMoves}</span>
        </div>
        <div className="progress-bar h-1.5">
          <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      <motion.div className={`relative rounded-lg overflow-hidden shadow-card flex-1 min-h-0 ${isFailed ? 'animate-shake' : ''}`}>
        <SimpleChessboard fen={fen} playerTurn={playerTurn} highlightSquare={highlightSquare} />
        {isSolved && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-success/20 flex items-center justify-center pointer-events-none">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-success text-success-foreground px-4 py-2 rounded-full font-bold text-base">🎉 Puzzle Résolu !</motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
