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
    <div className="space-y-2">
      {/* Big Solution Button */}
      {canShowSolution ? (
        <Button
          onClick={onShowSolution}
          className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          <Eye className="w-5 h-5 mr-2" />
          Voir la solution
        </Button>
      ) : (
        <Button
          onClick={onRestart}
          className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Recommencer
        </Button>
      )}

      {/* Hint and Retry buttons side by side */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={onHint}
          disabled={!canUseHint}
          className="h-10 rounded-xl border-border bg-secondary/50 hover:bg-secondary/80 disabled:opacity-50"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          Indice {hintsUsed > 0 && `(${hintsUsed}/${totalHints})`}
        </Button>
        <Button
          variant="outline"
          onClick={onRestart}
          className="h-10 rounded-xl border-border bg-secondary/50 hover:bg-secondary/80"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Réessayer
        </Button>
      </div>
    </div>
  );
}
