import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';

interface ProgressionBadgesProps {
  streak: number;
  totalSolved: number;
}

interface Level {
  name: string;
  minTotal: number;
}

const LEVELS: Level[] = [
  { name: 'Débutant', minTotal: 0 },
  { name: 'Apprenti', minTotal: 10 },
  { name: 'Intermédiaire', minTotal: 50 },
  { name: 'Avancé', minTotal: 100 },
  { name: 'Expert', minTotal: 250 },
  { name: 'Maître', minTotal: 500 },
  { name: 'Grand Maître', minTotal: 1000 },
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

function getBadges(streak: number, totalSolved: number) {
  return [
    { id: 'first', icon: '🎯', name: 'Premier Pas', unlocked: totalSolved >= 1 },
    { id: 's3', icon: '🔥', name: 'En Feu', unlocked: streak >= 3 },
    { id: 's7', icon: '⚡', name: 'Inarrêtable', unlocked: streak >= 7 },
    { id: 't10', icon: '💪', name: 'Déterminé', unlocked: totalSolved >= 10 },
    { id: 't50', icon: '🏅', name: 'Persévérant', unlocked: totalSolved >= 50 },
    { id: 't100', icon: '👑', name: 'Centurion', unlocked: totalSolved >= 100 },
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
    <div className="rounded-2xl bg-secondary/50 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-secondary/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Star className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-foreground">{currentLevel.name}</div>
            {nextLevel && (
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{totalSolved}/{nextLevel.minTotal}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{unlockedCount}/{badges.length}</span>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      {/* Badges Grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 grid grid-cols-6 gap-2">
              {badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.1 }}
                  className={`aspect-square rounded-xl flex items-center justify-center text-lg transition-all ${
                    badge.unlocked 
                      ? 'bg-primary/20' 
                      : 'bg-secondary opacity-40 grayscale'
                  }`}
                  title={badge.name}
                >
                  {badge.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
