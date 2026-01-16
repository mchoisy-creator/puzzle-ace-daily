import { motion } from 'framer-motion';

interface ProgressionBadgesProps {
  streak: number;
  totalSolved: number;
}

interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

interface Level {
  name: string;
  emoji: string;
  minTotal: number;
  color: string;
  bgGradient: string;
}

const LEVELS: Level[] = [
  { name: 'Débutant', emoji: '🌱', minTotal: 0, color: 'text-green-400', bgGradient: 'from-green-500/20 to-emerald-500/10' },
  { name: 'Apprenti', emoji: '📚', minTotal: 10, color: 'text-blue-400', bgGradient: 'from-blue-500/20 to-cyan-500/10' },
  { name: 'Intermédiaire', emoji: '⚔️', minTotal: 50, color: 'text-purple-400', bgGradient: 'from-purple-500/20 to-violet-500/10' },
  { name: 'Avancé', emoji: '🎯', minTotal: 100, color: 'text-orange-400', bgGradient: 'from-orange-500/20 to-amber-500/10' },
  { name: 'Expert', emoji: '👑', minTotal: 250, color: 'text-yellow-400', bgGradient: 'from-yellow-500/20 to-amber-500/10' },
  { name: 'Maître', emoji: '🏆', minTotal: 500, color: 'text-primary', bgGradient: 'from-primary/30 to-yellow-500/20' },
  { name: 'Grand Maître', emoji: '💎', minTotal: 1000, color: 'text-cyan-300', bgGradient: 'from-cyan-400/30 to-blue-500/20' },
];

function getCurrentLevel(totalSolved: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalSolved >= LEVELS[i].minTotal) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

function getNextLevel(totalSolved: number): Level | null {
  for (const level of LEVELS) {
    if (totalSolved < level.minTotal) {
      return level;
    }
  }
  return null;
}

function getBadges(streak: number, totalSolved: number): Badge[] {
  return [
    {
      id: 'first_win',
      emoji: '🎉',
      name: 'Premier Pas',
      description: 'Résoudre votre premier puzzle',
      unlocked: totalSolved >= 1,
    },
    {
      id: 'streak_3',
      emoji: '🔥',
      name: 'En Feu',
      description: 'Série de 3 puzzles',
      unlocked: streak >= 3,
      progress: Math.min(streak, 3),
      target: 3,
    },
    {
      id: 'streak_7',
      emoji: '⚡',
      name: 'Inarrêtable',
      description: 'Série de 7 puzzles',
      unlocked: streak >= 7,
      progress: Math.min(streak, 7),
      target: 7,
    },
    {
      id: 'streak_30',
      emoji: '🌟',
      name: 'Légende',
      description: 'Série de 30 puzzles',
      unlocked: streak >= 30,
      progress: Math.min(streak, 30),
      target: 30,
    },
    {
      id: 'total_10',
      emoji: '🎯',
      name: 'Déterminé',
      description: '10 puzzles résolus',
      unlocked: totalSolved >= 10,
      progress: Math.min(totalSolved, 10),
      target: 10,
    },
    {
      id: 'total_50',
      emoji: '💪',
      name: 'Persévérant',
      description: '50 puzzles résolus',
      unlocked: totalSolved >= 50,
      progress: Math.min(totalSolved, 50),
      target: 50,
    },
    {
      id: 'total_100',
      emoji: '🏅',
      name: 'Centurion',
      description: '100 puzzles résolus',
      unlocked: totalSolved >= 100,
      progress: Math.min(totalSolved, 100),
      target: 100,
    },
    {
      id: 'total_500',
      emoji: '👑',
      name: 'Roi des Puzzles',
      description: '500 puzzles résolus',
      unlocked: totalSolved >= 500,
      progress: Math.min(totalSolved, 500),
      target: 500,
    },
  ];
}

export function ProgressionBadges({ streak, totalSolved }: ProgressionBadgesProps) {
  const currentLevel = getCurrentLevel(totalSolved);
  const nextLevel = getNextLevel(totalSolved);
  const badges = getBadges(streak, totalSolved);
  const unlockedBadges = badges.filter(b => b.unlocked);
  const nextBadge = badges.find(b => !b.unlocked);

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
      {/* Current Level Header */}
      <div className={`bg-gradient-to-r ${currentLevel.bgGradient} px-4 py-3 border-b border-border/30`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.span 
              className="text-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentLevel.emoji}
            </motion.span>
            <div>
              <h3 className={`font-bold ${currentLevel.color}`}>{currentLevel.name}</h3>
              <p className="text-xs text-muted-foreground">Niveau actuel</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-foreground">{unlockedBadges.length}/{badges.length}</div>
            <div className="text-xs text-muted-foreground">badges</div>
          </div>
        </div>

        {/* Progress to next level */}
        {nextLevel && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Prochain niveau</span>
              <span className={nextLevel.color}>{nextLevel.emoji} {nextLevel.name}</span>
            </div>
            <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="text-xs text-muted-foreground text-center mt-1">
              {totalSolved} / {nextLevel.minTotal} puzzles
            </div>
          </div>
        )}
      </div>

      {/* Badges Grid */}
      <div className="p-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          🏆 Vos Badges
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {badges.slice(0, 8).map((badge, idx) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className={`relative aspect-square rounded-xl flex flex-col items-center justify-center p-1 transition-all cursor-pointer ${
                badge.unlocked 
                  ? 'bg-gradient-to-br from-primary/20 to-yellow-500/10 border border-primary/30' 
                  : 'bg-secondary/30 border border-border/30 opacity-50'
              }`}
              title={`${badge.name}: ${badge.description}`}
            >
              <span className={`text-xl ${badge.unlocked ? '' : 'grayscale'}`}>
                {badge.emoji}
              </span>
              {badge.unlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-[8px]">✓</span>
                </motion.div>
              )}
              {!badge.unlocked && badge.progress !== undefined && (
                <div className="absolute bottom-1 left-1 right-1 h-1 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary/50 rounded-full"
                    style={{ width: `${(badge.progress / (badge.target || 1)) * 100}%` }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Next Badge Hint */}
        {nextBadge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 p-2 bg-secondary/30 rounded-lg flex items-center gap-2"
          >
            <span className="text-lg grayscale opacity-50">{nextBadge.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{nextBadge.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{nextBadge.description}</p>
            </div>
            {nextBadge.progress !== undefined && (
              <div className="text-xs text-primary font-semibold">
                {nextBadge.progress}/{nextBadge.target}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
