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
    <div className="rounded-2xl bg-secondary/50 p-4 space-y-3">
      {/* Game Title */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-foreground">
          {playerWhite} - {playerBlack}
        </h2>
      </div>

      {/* Player Turn */}
      <div className={`flex items-center justify-center gap-3 py-3 px-4 rounded-xl ${
        playerTurn === 'w' 
          ? 'bg-white/10' 
          : 'bg-black/20'
      }`}>
        <div className={`w-6 h-6 rounded-full border-2 shadow-md ${
          playerTurn === 'w' 
            ? 'bg-white border-white/50' 
            : 'bg-gray-800 border-gray-600'
        }`} />
        <span className="text-base font-bold uppercase tracking-wide">
          {playerTurn === 'w' ? 'Trait aux Blancs' : 'Trait aux Noirs'}
        </span>
      </div>
    </div>
  );
}
