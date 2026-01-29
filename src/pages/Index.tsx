// Chess Puzzle Page
import { motion } from 'framer-motion';
import { EuropeEchecsLogo } from '@/components/chess/EuropeEchecsLogo';
import { ChessBoardPanel } from '@/components/chess/ChessBoardPanel';
import { StatsCard } from '@/components/chess/StatsCard';
import { PuzzleInfoCard } from '@/components/chess/PuzzleInfoCard';
import { MoveHistoryCard } from '@/components/chess/MoveHistoryCard';
import { HintsCard } from '@/components/chess/HintsCard';
import { ActionButtons } from '@/components/chess/ActionButtons';
import { AnalysisButton } from '@/components/chess/AnalysisButton';
import { PositionActionsMenu } from '@/components/chess/PositionActionsMenu';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { useToast } from '@/hooks/use-toast';

const PUZZLE = {
  id: "puzzle-2026-01-16",
  fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
  solution: ["h5f7"],
  playerWhite: "Carlsen",
  playerBlack: "Caruana", 
  year: "2026",
  hints: [
    "Cherchez une attaque directe sur le roi noir.",
    "La case f7 n'est protégée que par le roi...",
    "La dame peut capturer le pion f7 avec échec et mat : Dxf7#"
  ]
};

const Index = () => {
  const [game, setGame] = useState(() => new Chess(PUZZLE.fen));
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('europe-echecs-stats');
      if (stored) {
        const stats = JSON.parse(stored);
        setStreak(stats.streak || 0);
        setTotalSolved(stats.totalSolved || 0);
      }
    } catch {}
  }, []);

  const makeMove = useCallback((from: string, to: string): boolean => {
    if (isSolved || showSolution) return false;

    const expectedMove = PUZZLE.solution[currentMoveIndex];
    const attemptedMove = from + to;

    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({ from, to, promotion: 'q' });
      if (!move) return false;

      if (attemptedMove === expectedMove) {
        setGame(gameCopy);
        setMoveHistory(prev => [...prev, move.san]);
        
        if (currentMoveIndex + 1 >= PUZZLE.solution.length) {
          setIsSolved(true);
          const newStreak = streak + 1;
          const newTotal = totalSolved + 1;
          setStreak(newStreak);
          setTotalSolved(newTotal);
          localStorage.setItem('europe-echecs-stats', JSON.stringify({ streak: newStreak, totalSolved: newTotal }));
          toast({ title: "🎉 Puzzle Résolu !", description: `+${100 - hintsUsed * 15} points | Série : ${newStreak}` });
        } else {
          setCurrentMoveIndex(prev => prev + 1);
        }
        return true;
      } else {
        setIsFailed(true);
        setTimeout(() => setIsFailed(false), 500);
        return false;
      }
    } catch {
      return false;
    }
  }, [game, currentMoveIndex, isSolved, showSolution, streak, totalSolved, hintsUsed, toast]);

  const restart = () => {
    setGame(new Chess(PUZZLE.fen));
    setCurrentMoveIndex(0);
    setMoveHistory([]);
    setHintsUsed(0);
    setIsFailed(false);
    setShowSolution(false);
  };

  const useHint = () => {
    if (hintsUsed < PUZZLE.hints.length) setHintsUsed(prev => prev + 1);
  };

  const revealSolution = () => {
    const solvedGame = new Chess(PUZZLE.fen);
    const history: string[] = [];
    for (const m of PUZZLE.solution) {
      const move = solvedGame.move({ from: m.slice(0,2), to: m.slice(2,4), promotion: 'q' });
      if (move) history.push(move.san);
    }
    setGame(solvedGame);
    setMoveHistory(history);
    setShowSolution(true);
  };

  const playerTurn = PUZZLE.fen.split(' ')[1] as 'w' | 'b';

  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm shrink-0">
        <div className="container mx-auto px-3 py-1.5">
          <EuropeEchecsLogo />
        </div>
      </header>

      <main className="container mx-auto px-3 py-2 flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 max-w-6xl mx-auto h-full">
          <div className="lg:col-span-3 flex flex-col h-full">
            <div ref={boardRef} className="flex-1 min-h-0">
              <ChessBoardPanel fen={game.fen()} onMove={makeMove} currentMoveIndex={currentMoveIndex} totalMoves={PUZZLE.solution.length} isSolved={isSolved} isFailed={isFailed} onRestart={restart} onHint={useHint} onShowSolution={revealSolution} showSolution={showSolution} playerTurn={playerTurn} />
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-2 h-full overflow-hidden">
            <StatsCard streak={streak} totalSolved={totalSolved} />
            <PuzzleInfoCard playerWhite={PUZZLE.playerWhite} playerBlack={PUZZLE.playerBlack} year={PUZZLE.year} playerTurn={playerTurn} />
            
            {/* Action Buttons */}
            <ActionButtons
              onShowSolution={revealSolution}
              onHint={useHint}
              onRestart={restart}
              isSolved={isSolved}
              showSolution={showSolution}
              hintsUsed={hintsUsed}
              totalHints={PUZZLE.hints.length}
            />
            
            {/* Hints (only shown when hints are used) */}
            <HintsCard hints={PUZZLE.hints} hintsUsed={hintsUsed} onUseHint={useHint} />
            
            <MoveHistoryCard moves={moveHistory} currentMoveIndex={currentMoveIndex} />
            
            {(isSolved || showSolution) && (
              <>
                <AnalysisButton fen={game.fen()} />
              </>
            )}
            
            {/* FEN, PGN, Screenshot buttons at bottom */}
            <div className="mt-auto shrink-0">
              <PositionActionsMenu fen={game.fen()} boardRef={boardRef} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
