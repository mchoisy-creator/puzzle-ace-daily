import { RotateCcw, Lightbulb, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onShowSolution: () => void;
  onHint: () => void;
  onRestart: () => void;
  isSolved: boolean;
  showSolution: boolean;
  hintsUsed: number;
  totalHints: number;
}

export function ActionButtons({
  onShowSolution,
  onHint,
  onRestart,
  isSolved,
  showSolution,
  hintsUsed,
  totalHints,
}: ActionButtonsProps) {
  const canShowSolution = !isSolved && !showSolution;
  const canUseHint = hintsUsed < totalHints && !isSolved && !showSolution;

  return (
    <div className="space-y-1.5">
      {/* Big Solution Button */}
      {canShowSolution ? (
        <Button
          onClick={onShowSolution}
          className="w-full h-9 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
        >
          <Eye className="w-4 h-4 mr-1.5" />
          Voir la solution
        </Button>
      ) : (
        <Button
          onClick={onRestart}
          className="w-full h-9 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
        >
          <RotateCcw className="w-4 h-4 mr-1.5" />
          Recommencer
        </Button>
      )}

      {/* Hint and Retry buttons side by side */}
      <div className="grid grid-cols-2 gap-1.5">
        <Button
          variant="outline"
          onClick={onHint}
          disabled={!canUseHint}
          className="h-8 text-xs rounded-lg border-border bg-secondary/50 hover:bg-secondary/80 disabled:opacity-50"
        >
          <Lightbulb className="w-3.5 h-3.5 mr-1" />
          Indice {hintsUsed > 0 && `(${hintsUsed}/${totalHints})`}
        </Button>
        <Button
          variant="outline"
          onClick={onRestart}
          className="h-8 text-xs rounded-lg border-border bg-secondary/50 hover:bg-secondary/80"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          Réessayer
        </Button>
      </div>
    </div>
  );
}
