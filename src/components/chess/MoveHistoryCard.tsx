import { motion } from 'framer-motion';
import { SkipBack, Rewind, FastForward, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MoveHistoryCardProps {
  moves: string[];
  currentMoveIndex: number;
}

export function MoveHistoryCard({ moves, currentMoveIndex }: MoveHistoryCardProps) {
  const movePairs: { number: number; white?: string; black?: string }[] = [];
  
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1],
    });
  }

  return (
    <div className="rounded-xl bg-secondary/30 border border-border/30 p-2">
      {movePairs.length > 0 ? (
        <div className="flex flex-wrap gap-1 items-center">
          {movePairs.map((pair, idx) => (
            <div key={idx} className="flex items-center gap-1 text-xs font-mono">
              <span className="text-muted-foreground">{pair.number}.</span>
              <span className={idx * 2 < currentMoveIndex ? 'text-primary font-semibold' : 'text-foreground/80'}>
                {pair.white}
              </span>
              {pair.black && (
                <span className={idx * 2 + 1 < currentMoveIndex ? 'text-primary font-semibold' : 'text-foreground/80'}>
                  {pair.black}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center py-1">
          🎯 Jouez votre premier coup !
        </p>
      )}
    </div>
  );
}
