import { motion } from 'framer-motion';
import { SkipBack, Rewind, FastForward, SkipForward, History } from 'lucide-react';
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500/10 to-transparent border-b border-border/30">
        <History className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">
          Historique
        </h3>
        {moves.length > 0 && (
          <span className="ml-auto text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
            {moves.length} coup{moves.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Move List */}
      <div className="max-h-28 overflow-y-auto p-3">
        {movePairs.length > 0 ? (
          <div className="space-y-1.5">
            {movePairs.map((pair, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="grid grid-cols-[32px_1fr_1fr] gap-2 text-sm font-mono items-center"
              >
                <span className="text-xs text-muted-foreground bg-secondary/50 rounded px-1.5 py-0.5 text-center">
                  {pair.number}.
                </span>
                <span className={`px-2 py-1 rounded-lg transition-all ${
                  idx * 2 < currentMoveIndex 
                    ? 'bg-primary/20 text-primary font-semibold' 
                    : 'text-foreground/80'
                }`}>
                  {pair.white || '...'}
                </span>
                <span className={`px-2 py-1 rounded-lg transition-all ${
                  idx * 2 + 1 < currentMoveIndex 
                    ? 'bg-primary/20 text-primary font-semibold' 
                    : 'text-foreground/80'
                }`}>
                  {pair.black || ''}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <span className="text-3xl mb-2 block">🎯</span>
            <p className="text-sm text-muted-foreground">
              Jouez votre premier coup !
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-1 p-3 bg-secondary/20 border-t border-border/30">
        {[
          { icon: SkipBack, label: "Début" },
          { icon: Rewind, label: "Précédent" },
          { icon: FastForward, label: "Suivant" },
          { icon: SkipForward, label: "Fin" },
        ].map((item, idx) => (
          <Button 
            key={idx}
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
          >
            <item.icon className="w-4 h-4" />
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
