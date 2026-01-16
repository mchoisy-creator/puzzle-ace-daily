import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PuzzleInfoCardProps {
  date: string;
  description: string;
  playerWhite?: string;
  playerBlack?: string;
  event?: string;
  playerTurn: 'w' | 'b';
}

export function PuzzleInfoCard({
  date,
  description,
  playerTurn,
}: PuzzleInfoCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden"
    >
      {/* Date Header */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent px-3 py-2 border-b border-border/30">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary capitalize">{formattedDate}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Player Turn + Description */}
      <div className="p-3 space-y-2">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className={`flex items-center justify-center gap-2 py-2 rounded-xl ${
            playerTurn === 'w' 
              ? 'bg-gradient-to-r from-white/10 to-gray-200/5 border border-white/20' 
              : 'bg-gradient-to-r from-gray-800/50 to-gray-900/30 border border-gray-700/50'
          }`}
        >
          <div className={`w-6 h-6 rounded-full shadow-lg ${
            playerTurn === 'w' 
              ? 'bg-gradient-to-br from-white to-gray-200' 
              : 'bg-gradient-to-br from-gray-700 to-gray-900'
          }`} />
          <span className="uppercase font-bold tracking-wide text-xs">
            {playerTurn === 'w' ? 'Trait aux Blancs' : 'Trait aux Noirs'}
          </span>
        </motion.div>

        <div className="bg-secondary/30 rounded-lg p-2 border-l-3 border-primary/50">
          <p className="text-xs text-foreground/90 leading-relaxed">
            💡 {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
