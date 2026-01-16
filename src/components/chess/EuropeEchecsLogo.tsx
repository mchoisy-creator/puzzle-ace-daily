import { motion } from 'framer-motion';

export function EuropeEchecsLogo() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3"
    >
      {/* Stylized Chess Pieces Logo */}
      <div className="relative w-12 h-12">
        {/* King piece silhouette */}
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(40, 45%, 70%)" />
              <stop offset="100%" stopColor="hsl(40, 45%, 50%)" />
            </linearGradient>
          </defs>
          {/* King piece */}
          <path
            d="M24 4 L24 8 L20 8 L20 10 L24 10 L24 14 L20 14 L20 18 L16 22 L16 36 L32 36 L32 22 L28 18 L28 14 L24 14 L24 10 L28 10 L28 8 L24 8 L24 4 Z"
            fill="url(#goldGradient)"
            stroke="hsl(40, 45%, 40%)"
            strokeWidth="1"
          />
          {/* Base */}
          <rect x="12" y="36" width="24" height="4" rx="1" fill="url(#goldGradient)" stroke="hsl(40, 45%, 40%)" strokeWidth="1"/>
          <rect x="10" y="40" width="28" height="4" rx="1" fill="url(#goldGradient)" stroke="hsl(40, 45%, 40%)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Text Logo */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tight text-primary">
          Europe-Échecs
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Puzzle du jour
        </span>
      </div>
    </motion.div>
  );
}
