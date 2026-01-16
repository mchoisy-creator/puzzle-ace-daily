import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, Sparkles } from 'lucide-react';
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
    <div className="rounded-xl bg-card/80 border border-border/50 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-purple-500/10 to-transparent hover:from-purple-500/20 transition-all"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">💡</span>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Indices</span>
          {hintsUsed > 0 && (
            <span className="text-[10px] bg-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded-full">
              {hintsUsed}/{hints.length}
            </span>
          )}
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-purple-400" />
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
            <div className="px-3 pb-3 space-y-1.5">
              {hints.map((hint, idx) => {
                const isRevealed = idx < hintsUsed;
                const isNext = idx === hintsUsed;

                return (
                  <div key={idx}>
                    {isRevealed ? (
                      <div className="bg-purple-500/20 rounded-lg p-2 border-l-2 border-purple-400">
                        <p className="text-xs text-foreground">✨ {hint}</p>
                      </div>
                    ) : (
                      <div className={`flex items-center justify-between p-2 rounded-lg ${
                        isNext && !isSolved ? 'bg-secondary/50 border border-dashed border-purple-400/50' : 'bg-secondary/20 opacity-50'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <Lock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Indice {idx + 1}</span>
                          {isNext && !isSolved && <span className="text-[10px] text-orange-400">-15pts</span>}
                        </div>
                        {isNext && !isSolved && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-[10px] bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 rounded-full px-2"
                            onClick={(e) => { e.stopPropagation(); onUseHint(); }}
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            Révéler
                          </Button>
                        )}
                      </div>
                    )}
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
