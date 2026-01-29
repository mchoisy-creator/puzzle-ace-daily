import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HintsCardProps {
  hints: string[];
  hintsUsed: number;
  onUseHint: () => void;
}

export function HintsCard({ hints, hintsUsed, onUseHint }: HintsCardProps) {
  const [isExpanded, setIsExpanded] = useState(hintsUsed > 0);

  // Only show if there are revealed hints
  if (hintsUsed === 0) return null;

  return (
    <div className="rounded-lg bg-secondary/50 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-secondary/80 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <Lightbulb className="w-3 h-3 text-primary" />
          </div>
          <span className="text-xs font-bold text-foreground">Indices</span>
          <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
            {hintsUsed}/{hints.length}
          </span>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-2.5 pb-2 space-y-1.5">
              {hints.map((hint, idx) => {
                const isRevealed = idx < hintsUsed;
                const isNext = idx === hintsUsed;

                if (!isRevealed && !isNext) return null;

                return (
                  <div key={idx}>
                    {isRevealed ? (
                      <div className="bg-primary/10 rounded-lg p-2 border-l-3 border-primary">
                        <p className="text-xs text-foreground">{hint}</p>
                      </div>
                    ) : isNext ? (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/80">
                        <div className="flex items-center gap-1.5">
                          <Lock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Indice {idx + 1}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[10px] bg-primary/20 text-primary hover:bg-primary/30 rounded-full px-2"
                          onClick={(e) => { e.stopPropagation(); onUseHint(); }}
                        >
                          Révéler
                        </Button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
