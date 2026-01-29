import { motion } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';

interface StatsCardProps {
  streak: number;
  totalSolved: number;
}

export function StatsCard({ streak, totalSolved }: StatsCardProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      {/* Streak */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-1.5"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Flame className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="text-xl font-bold text-primary leading-none">{streak}</div>
          <div className="text-[9px] text-muted-foreground uppercase tracking-wide">Série</div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="w-px h-8 bg-border/50" />

      {/* Total */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-1.5"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Trophy className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="text-xl font-bold text-primary leading-none">{totalSolved}</div>
          <div className="text-[9px] text-muted-foreground uppercase tracking-wide">Total</div>
        </div>
      </motion.div>
    </div>
  );
}
