import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Circle } from 'lucide-react';
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
  playerWhite,
  playerBlack,
  event,
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
      className="card-chess space-y-4"
    >
      {/* Date Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2 text-primary">
          <Calendar className="w-5 h-5" />
          <span className="font-medium capitalize">{formattedDate}</span>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Player Turn */}
      <div className="flex items-center justify-center gap-3 py-2 bg-secondary/50 rounded-lg">
        <Circle 
          className={`w-6 h-6 ${playerTurn === 'w' ? 'fill-white text-white' : 'fill-gray-900 text-gray-900'}`} 
        />
        <span className="uppercase font-bold tracking-wide">
          Trait aux {playerTurn === 'w' ? 'Blancs' : 'Noirs'}
        </span>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        {(playerWhite || playerBlack || event) && (
          <div className="text-xs text-muted-foreground/70 pt-2 border-t border-border">
            {playerWhite && playerBlack && (
              <p>{playerWhite} vs {playerBlack}</p>
            )}
            {event && <p className="italic">{event}</p>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
