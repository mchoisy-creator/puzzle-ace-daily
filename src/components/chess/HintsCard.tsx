import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HintsCardProps {
  hints: string[];
  hintsUsed: number;
  onUseHint: () => void;
  isSolved: boolean;
}

export function HintsCard({ hints, hintsUsed, onUseHint, isSolved }: HintsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card-chess"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
            Indices
          </h3>
          {hintsUsed > 0 && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
              {hintsUsed}/{hints.length} utilisés
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {/* Hints Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {hints.map((hint, idx) => {
                const isRevealed = idx < hintsUsed;
                const isNext = idx === hintsUsed;

                return (
                  <div key={idx}>
                    {isRevealed ? (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hint-card"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-bold text-primary bg-primary/20 px-2 py-0.5 rounded">
                            #{idx + 1}
                          </span>
                          <p className="text-sm text-foreground">{hint}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">
                          Indice {idx + 1} {isNext && !isSolved ? '(-15 pts)' : ''}
                        </span>
                        {isNext && !isSolved && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary-foreground hover:bg-primary ml-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              onUseHint();
                            }}
                          >
                            Révéler
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Points Info */}
              <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
                Chaque indice = -15 points sur votre score
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
