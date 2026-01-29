interface PuzzleInfoCardProps {
  description: string;
  playerTurn: 'w' | 'b';
}

export function PuzzleInfoCard({
  description,
  playerTurn,
}: PuzzleInfoCardProps) {
  return (
    <div className="rounded-2xl bg-secondary/50 p-4 space-y-3">
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

      {/* Description */}
      <div className="bg-primary/10 rounded-xl p-4 border-l-4 border-primary">
        <p className="text-sm text-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
