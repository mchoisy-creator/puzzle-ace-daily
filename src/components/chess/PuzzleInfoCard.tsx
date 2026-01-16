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
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="rounded-2xl bg-secondary/50 overflow-hidden">
      {/* Date Navigation */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-secondary/80">
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-primary/20">
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </Button>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground capitalize">{formattedDate}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-primary/20">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Player Turn */}
        <div className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl ${
          playerTurn === 'w' 
            ? 'bg-white/10' 
            : 'bg-black/20'
        }`}>
          <div className={`w-5 h-5 rounded-full border-2 ${
            playerTurn === 'w' 
              ? 'bg-white border-white/50' 
              : 'bg-gray-800 border-gray-600'
          }`} />
          <span className="text-sm font-bold uppercase tracking-wide">
            {playerTurn === 'w' ? 'Trait aux Blancs' : 'Trait aux Noirs'}
          </span>
        </div>

        {/* Description */}
        <div className="bg-primary/10 rounded-xl p-3 border-l-4 border-primary">
          <p className="text-sm text-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
