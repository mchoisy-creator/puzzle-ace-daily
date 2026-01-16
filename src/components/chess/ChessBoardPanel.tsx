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
}

// Simple visual chessboard rendering
function SimpleChessboard({ fen, playerTurn }: { fen: string; playerTurn: 'w' | 'b' }) {
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

  return (
    <div className="grid grid-cols-8 border-2 border-border rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
      {board.flatMap((row, rowIdx) =>
        row.map((piece, colIdx) => {
          const isLight = (rowIdx + colIdx) % 2 === 0;
          return (
            <div
              key={`${rowIdx}-${colIdx}`}
              className={`flex items-center justify-center text-3xl md:text-4xl lg:text-5xl ${isLight ? 'bg-board-light' : 'bg-board-dark'}`}
              style={{ aspectRatio: '1' }}
            >
              {piece && <span className={piece === piece.toUpperCase() ? 'text-white drop-shadow-md' : 'text-gray-900 drop-shadow-md'}>{pieceSymbols[piece]}</span>}
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
}: ChessBoardPanelProps) {
  const progress = totalMoves > 0 ? (currentMoveIndex / totalMoves) * 100 : 0;

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
      {/* Progress bar above the board */}
      <div className="bg-secondary/50 rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progression</span>
          <span className="text-sm font-medium text-primary">{currentMoveIndex} / {totalMoves} coups</span>
        </div>
        <div className="progress-bar">
          <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      <motion.div className={`relative rounded-lg overflow-hidden shadow-card ${isFailed ? 'animate-shake' : ''}`}>
        <SimpleChessboard fen={fen} playerTurn={playerTurn} />
        {isSolved && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-success/20 flex items-center justify-center pointer-events-none">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-success text-success-foreground px-6 py-3 rounded-full font-bold text-xl">🎉 Puzzle Résolu !</motion.div>
          </motion.div>
        )}
      </motion.div>

      {(isSolved || showSolution) && (
        <div className="flex justify-center">
          <Button variant="outline" className="btn-outline-gold min-w-[140px]" onClick={onRestart}>
            <RotateCcw className="w-4 h-4 mr-2" />Recommencer
          </Button>
        </div>
      )}
    </motion.div>
  );
}
