import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Lock, Unlock, Sparkles } from 'lucide-react';
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
      className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-500/10 to-transparent hover:from-purple-500/20 transition-all"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">💡</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400">
            Indices
          </h3>
          {hintsUsed > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full font-medium"
            >
              {hintsUsed}/{hints.length}
            </motion.span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-purple-400" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {hints.map((hint, idx) => {
                const isRevealed = idx < hintsUsed;
                const isNext = idx === hintsUsed;
                const pointCost = 15;

                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {isRevealed ? (
                      <div className="bg-gradient-to-r from-purple-500/20 to-transparent rounded-xl p-3 border-l-4 border-purple-400">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">✨</span>
                          <div>
                            <span className="text-xs font-bold text-purple-300 block mb-1">
                              Indice #{idx + 1}
                            </span>
                            <p className="text-sm text-foreground">{hint}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                        isNext && !isSolved 
                          ? 'bg-secondary/50 border border-dashed border-purple-400/50' 
                          : 'bg-secondary/20 opacity-60'
                      }`}>
                        <div className="flex items-center gap-2">
                          {isNext && !isSolved ? (
                            <Unlock className="w-4 h-4 text-purple-400" />
                          ) : (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-sm text-muted-foreground">
                            Indice #{idx + 1}
                          </span>
                          {isNext && !isSolved && (
                            <span className="text-xs text-orange-400">
                              (-{pointCost} pts)
                            </span>
                          )}
                        </div>
                        {isNext && !isSolved && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 hover:text-purple-100 rounded-full px-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              onUseHint();
                            }}
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            Révéler
                          </Button>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Info footer */}
              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
                <span>💰</span>
                <span>Chaque indice coûte 15 points</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
