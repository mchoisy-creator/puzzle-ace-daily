import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
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
      transition={{ delay: 0.2 }}
    >
      <Button 
        onClick={openAnalysis}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 rounded-xl"
      >
        Activer l'analyse
      </Button>
    </motion.div>
  );
}
