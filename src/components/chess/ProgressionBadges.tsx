import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, Unlock, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProgressionBadgesProps {
  streak: number;
  totalSolved: number;
}

interface Badge {
  id: string;
  emoji: string;
  name: string;
  unlocked: boolean;
}

interface Level {
  name: string;
  emoji: string;
  minTotal: number;
  color: string;
}

const LEVELS: Level[] = [
  { name: 'Débutant', emoji: '🌱', minTotal: 0, color: 'text-green-400' },
  { name: 'Apprenti', emoji: '📚', minTotal: 10, color: 'text-blue-400' },
  { name: 'Intermédiaire', emoji: '⚔️', minTotal: 50, color: 'text-purple-400' },
  { name: 'Avancé', emoji: '🎯', minTotal: 100, color: 'text-orange-400' },
  { name: 'Expert', emoji: '👑', minTotal: 250, color: 'text-yellow-400' },
  { name: 'Maître', emoji: '🏆', minTotal: 500, color: 'text-primary' },
  { name: 'Grand Maître', emoji: '💎', minTotal: 1000, color: 'text-cyan-300' },
];

function getCurrentLevel(totalSolved: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalSolved >= LEVELS[i].minTotal) return LEVELS[i];
  }
  return LEVELS[0];
}

function getNextLevel(totalSolved: number): Level | null {
  for (const level of LEVELS) {
    if (totalSolved < level.minTotal) return level;
  }
  return null;
}

function getBadges(streak: number, totalSolved: number): Badge[] {
  return [
    { id: 'first', emoji: '🎉', name: 'Premier Pas', unlocked: totalSolved >= 1 },
    { id: 's3', emoji: '🔥', name: 'En Feu', unlocked: streak >= 3 },
    { id: 's7', emoji: '⚡', name: 'Inarrêtable', unlocked: streak >= 7 },
    { id: 's30', emoji: '🌟', name: 'Légende', unlocked: streak >= 30 },
    { id: 't10', emoji: '🎯', name: 'Déterminé', unlocked: totalSolved >= 10 },
    { id: 't50', emoji: '💪', name: 'Persévérant', unlocked: totalSolved >= 50 },
    { id: 't100', emoji: '🏅', name: 'Centurion', unlocked: totalSolved >= 100 },
    { id: 't500', emoji: '👑', name: 'Roi', unlocked: totalSolved >= 500 },
  ];
}

export function ProgressionBadges({ streak, totalSolved }: ProgressionBadgesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentLevel = getCurrentLevel(totalSolved);
  const nextLevel = getNextLevel(totalSolved);
  const badges = getBadges(streak, totalSolved);
  const unlockedCount = badges.filter(b => b.unlocked).length;

  const progressToNext = nextLevel 
    ? ((totalSolved - currentLevel.minTotal) / (nextLevel.minTotal - currentLevel.minTotal)) * 100
    : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden"
    >
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-amber-500/10 to-transparent hover:from-amber-500/20 transition-all"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{currentLevel.emoji}</span>
          <div className="text-left">
            <span className={`text-sm font-bold ${currentLevel.color}`}>{currentLevel.name}</span>
            {nextLevel && (
              <div className="flex items-center gap-1">
                <div className="w-16 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{nextLevel.emoji}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
            {unlockedCount}/{badges.length} 🏆
          </span>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 space-y-2">
              {/* Progress info */}
              {nextLevel && (
                <div className="text-xs text-center text-muted-foreground">
                  {totalSolved} / {nextLevel.minTotal} puzzles → {nextLevel.emoji} {nextLevel.name}
                </div>
              )}
              
              {/* Badges Grid */}
              <div className="grid grid-cols-8 gap-1">
                {badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.15 }}
                    className={`aspect-square rounded-lg flex items-center justify-center text-base cursor-pointer transition-all ${
                      badge.unlocked 
                        ? 'bg-primary/20 border border-primary/30' 
                        : 'bg-secondary/30 opacity-40 grayscale'
                    }`}
                    title={badge.name}
                  >
                    {badge.emoji}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
