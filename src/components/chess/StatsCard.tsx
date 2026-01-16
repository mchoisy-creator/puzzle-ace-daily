import { motion } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';

interface StatsCardProps {
  streak: number;
  totalSolved: number;
}

export function StatsCard({ streak, totalSolved }: StatsCardProps) {
  return (
    <div className="flex items-center justify-center gap-6 py-3">
      {/* Streak */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2"
      >
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Flame className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold text-primary leading-none">{streak}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Série</div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="w-px h-10 bg-border/50" />

      {/* Total */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2"
      >
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold text-primary leading-none">{totalSolved}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Total</div>
        </div>
      </motion.div>
    </div>
  );
}
