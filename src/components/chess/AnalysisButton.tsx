import { motion } from 'framer-motion';
import { BarChart3, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnalysisButtonProps {
  fen: string;
}

export function AnalysisButton({ fen }: AnalysisButtonProps) {
  const openAnalysis = () => {
    const encodedFen = encodeURIComponent(fen);
    window.open(`https://lichess.org/analysis?fen=${encodedFen}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Button 
        onClick={openAnalysis}
        className="w-full h-12 bg-gradient-to-r from-primary via-primary to-yellow-400 hover:from-primary/90 hover:to-yellow-500 text-primary-foreground font-bold text-sm rounded-xl shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02]"
      >
        <BarChart3 className="w-5 h-5 mr-2" />
        🔬 Analyser avec Lichess
        <ExternalLink className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
}
