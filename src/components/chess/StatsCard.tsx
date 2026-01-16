import { motion } from 'framer-motion';

interface StatsCardProps {
  streak: number;
  totalSolved: number;
}

export function StatsCard({ streak, totalSolved }: StatsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      className="grid grid-cols-2 gap-3"
    >
      {/* Streak Card */}
      <motion.div 
        whileHover={{ scale: 1.02, y: -2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-red-500/10 to-transparent border border-orange-500/30 p-4"
      >
        <div className="absolute -top-4 -right-4 text-6xl opacity-20">🔥</div>
        <div className="relative">
          <div className="text-4xl font-black text-orange-400 mb-1">
            {streak}
          </div>
          <div className="text-xs font-medium text-orange-300/80 uppercase tracking-wider">
            Série en cours
          </div>
          {streak >= 5 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -left-1 text-lg"
            >
              ⚡
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Total Solved Card */}
      <motion.div 
        whileHover={{ scale: 1.02, y: -2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-transparent border border-emerald-500/30 p-4"
      >
        <div className="absolute -top-4 -right-4 text-6xl opacity-20">🏆</div>
        <div className="relative">
          <div className="text-4xl font-black text-emerald-400 mb-1">
            {totalSolved.toLocaleString()}
          </div>
          <div className="text-xs font-medium text-emerald-300/80 uppercase tracking-wider">
            Total réussis
          </div>
          {totalSolved >= 100 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -left-1 text-lg"
            >
              ⭐
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
