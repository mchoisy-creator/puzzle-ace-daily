import { motion } from 'framer-motion';
import { Download, Camera, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, RefObject } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PositionActionsMenuProps {
  fen: string;
  boardRef: RefObject<HTMLDivElement>;
}

export function PositionActionsMenu({ fen, boardRef }: PositionActionsMenuProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyFen = async () => {
    try {
      await navigator.clipboard.writeText(fen);
      setCopied(true);
      toast({ title: "FEN copié !", description: "La position a été copiée dans le presse-papiers." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Erreur", description: "Impossible de copier le FEN.", variant: "destructive" });
    }
  };

  const downloadPgn = () => {
    const pgn = `[Event "Europe-Échecs Puzzle du Jour"]
[Site "europe-echecs.com"]
[Date "${new Date().toISOString().split('T')[0]}"]
[FEN "${fen}"]

*`;
    const blob = new Blob([pgn], { type: 'application/x-chess-pgn' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `puzzle-${new Date().toISOString().split('T')[0]}.pgn`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "PGN téléchargé !", description: "Le fichier a été enregistré." });
  };

  const takeScreenshot = async () => {
    if (!boardRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(boardRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `puzzle-${new Date().toISOString().split('T')[0]}.png`;
          a.click();
          URL.revokeObjectURL(url);
          toast({ title: "Screenshot enregistré !", description: "L'image a été téléchargée." });
        }
      }, 'image/png');
    } catch {
      toast({ title: "Erreur", description: "Impossible de capturer l'échiquier.", variant: "destructive" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center gap-1 p-2 bg-card rounded-lg"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={copyFen}
        className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-7 text-xs px-2"
      >
        {copied ? <Check className="w-3 h-3 mr-1 text-success" /> : <Copy className="w-3 h-3 mr-1" />}
        FEN
      </Button>
      
      <div className="w-px h-5 bg-border" />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={downloadPgn}
        className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-7 text-xs px-2"
      >
        <Download className="w-3 h-3 mr-1" />
        PGN
      </Button>
      
      <div className="w-px h-5 bg-border" />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={takeScreenshot}
        className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-7 text-xs px-2"
      >
        <Camera className="w-3 h-3 mr-1" />
        Screenshot
      </Button>
    </motion.div>
  );
}
