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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-chess"
    >
      <Button 
        onClick={openAnalysis}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
      >
        <BarChart3 className="w-5 h-5 mr-2" />
        Analyser avec Lichess
        <ExternalLink className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
}
