interface PuzzleInfoCardProps {
  playerWhite: string;
  playerBlack: string;
  year: string;
  playerTurn: 'w' | 'b';
}

export function PuzzleInfoCard({
  playerWhite,
  playerBlack,
  year,
  playerTurn,
}: PuzzleInfoCardProps) {
  return (
    <div className="rounded-xl bg-secondary/50 p-2.5 space-y-2">
      {/* Game Title */}
      <div className="text-center">
        <h2 className="text-base font-bold text-foreground">
          {playerWhite} - {playerBlack}
        </h2>
      </div>

      {/* Player Turn */}
      <div className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg ${
        playerTurn === 'w' 
          ? 'bg-white/10' 
          : 'bg-black/20'
      }`}>
        <div className={`w-5 h-5 rounded-full border-2 shadow-md ${
          playerTurn === 'w' 
            ? 'bg-white border-white/50' 
            : 'bg-gray-800 border-gray-600'
        }`} />
        <span className="text-sm font-bold uppercase tracking-wide">
          {playerTurn === 'w' ? 'Trait aux Blancs' : 'Trait aux Noirs'}
        </span>
      </div>
    </div>
  );
}
