import { motion } from 'framer-motion';
import { Flame, CheckCircle } from 'lucide-react';

interface StatsCardProps {
  streak: number;
  totalSolved: number;
}

export function StatsCard({ streak, totalSolved }: StatsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card-chess"
    >
      <div className="grid grid-cols-2 gap-6">
        {/* Streak */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-8 h-8 text-fire" />
            <span className="stat-number">{streak}</span>
          </div>
          <span className="stat-label">puzzles d'affilée</span>
        </div>

        {/* Total Solved */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-8 h-8 text-success" />
            <span className="text-4xl font-bold text-foreground">
              {totalSolved.toLocaleString()}
            </span>
          </div>
          <span className="stat-label">puzzles réussis</span>
        </div>
      </div>
    </motion.div>
  );
}
