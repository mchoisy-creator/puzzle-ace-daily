interface MoveHistoryCardProps {
  moves: string[];
  currentMoveIndex: number;
}

export function MoveHistoryCard({ moves, currentMoveIndex }: MoveHistoryCardProps) {
  const movePairs: { number: number; white?: string; black?: string }[] = [];
  
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1],
    });
  }

  if (movePairs.length === 0) {
    return (
      <div className="rounded-xl bg-secondary/30 p-3 text-center">
        <p className="text-sm text-muted-foreground">
          Jouez votre premier coup !
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-secondary/30 p-2">
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {movePairs.map((pair, idx) => (
          <div key={idx} className="flex items-center gap-1 text-sm font-mono">
            <span className="text-muted-foreground text-xs">{pair.number}.</span>
            <span className="text-foreground font-medium">{pair.white}</span>
            {pair.black && (
              <span className="text-foreground font-medium">{pair.black}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
