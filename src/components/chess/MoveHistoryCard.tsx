import { motion } from 'framer-motion';
import { SkipBack, Rewind, FastForward, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MoveHistoryCardProps {
  moves: string[];
  currentMoveIndex: number;
}

export function MoveHistoryCard({ moves, currentMoveIndex }: MoveHistoryCardProps) {
  // Group moves into pairs (white, black)
  const movePairs: { number: number; white?: string; black?: string }[] = [];
  
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1],
    });
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card-chess"
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
        Liste des Coups
      </h3>

      {/* Move List */}
      <div className="max-h-32 overflow-y-auto mb-4 bg-secondary/30 rounded-lg p-2">
        {movePairs.length > 0 ? (
          <div className="space-y-1">
            {movePairs.map((pair, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-[40px_1fr_1fr] gap-2 text-sm font-mono"
              >
                <span className="text-muted-foreground">{pair.number}.</span>
                <span className={idx * 2 < currentMoveIndex ? 'move-highlight' : 'text-foreground'}>
                  {pair.white || '...'}
                </span>
                <span className={idx * 2 + 1 < currentMoveIndex ? 'move-highlight' : 'text-foreground'}>
                  {pair.black || ''}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Aucun coup joué
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <SkipBack className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Rewind className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <FastForward className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
