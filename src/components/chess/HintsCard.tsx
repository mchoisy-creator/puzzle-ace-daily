import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb, Lock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HintsCardProps {
  hints: string[];
  hintsUsed: number;
  onUseHint: () => void;
  onShowSolution: () => void;
  isSolved: boolean;
  showSolution: boolean;
}

export function HintsCard({ hints, hintsUsed, onUseHint, onShowSolution, isSolved, showSolution }: HintsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const canShowSolution = !isSolved && !showSolution;

  return (
    <div className="rounded-2xl bg-secondary/50 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-secondary/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-bold text-foreground">Indices & Solution</span>
          {hintsUsed > 0 && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
              {hintsUsed}/{hints.length}
            </span>
          )}
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
            <div className="px-3 pb-3 space-y-2">
              {hints.map((hint, idx) => {
                const isRevealed = idx < hintsUsed;
                const isNext = idx === hintsUsed;

                return (
                  <div key={idx}>
                    {isRevealed ? (
                      <div className="bg-primary/10 rounded-xl p-2.5 border-l-4 border-primary">
                        <p className="text-sm text-foreground">{hint}</p>
                      </div>
                    ) : (
                      <div className={`flex items-center justify-between p-2.5 rounded-xl ${
                        isNext && !isSolved && !showSolution ? 'bg-secondary/80' : 'bg-secondary/40 opacity-50'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Indice {idx + 1}</span>
                        </div>
                        {isNext && !isSolved && !showSolution && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs bg-primary/20 text-primary hover:bg-primary/30 rounded-full px-3"
                            onClick={(e) => { e.stopPropagation(); onUseHint(); }}
                          >
                            -15 pts
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Solution button */}
              {canShowSolution && (
                <Button
                  variant="outline"
                  className="w-full mt-2 btn-outline-gold"
                  onClick={(e) => { e.stopPropagation(); onShowSolution(); }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Voir la solution
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
