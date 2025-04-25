
import React from 'react';
import { Commit } from '@/data/skillData';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, CircleX, CircleMinus } from 'lucide-react';

interface EvaluationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commit: Commit | null;
  branchName: string;
  onEvaluate: (evaluation: 'never' | 'sometimes' | 'always') => void;
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({
  open,
  onOpenChange,
  commit,
  branchName,
  onEvaluate
}) => {
  if (!commit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Avaliar competência</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Branch: <span className="font-medium">{branchName}</span></p>
            <h3 className="font-bold mt-2">{commit.message}</h3>
            <p className="text-sm text-gray-600 mt-1">{commit.description}</p>
          </div>
          
          <div className="text-sm font-medium mb-2">Com que frequência você demonstra este comportamento?</div>
          
          <div className="grid grid-cols-3 gap-3 mt-4">
            <Button
              variant="outline"
              className={`flex flex-col py-4 ${commit.evaluation === 'never' ? 'border-red-500 bg-red-50' : ''}`}
              onClick={() => onEvaluate('never')}
            >
              <CircleX className="h-6 w-6 mb-2 text-red-500" />
              <span className="text-sm">Nunca</span>
              <span className="text-xs text-gray-500 mt-1">0 pontos</span>
            </Button>
            
            <Button
              variant="outline"
              className={`flex flex-col py-4 ${commit.evaluation === 'sometimes' ? 'border-yellow-500 bg-yellow-50' : ''}`}
              onClick={() => onEvaluate('sometimes')}
            >
              <CircleMinus className="h-6 w-6 mb-2 text-yellow-500" />
              <span className="text-sm">Às Vezes</span>
              <span className="text-xs text-gray-500 mt-1">1 ponto</span>
            </Button>
            
            <Button
              variant="outline"
              className={`flex flex-col py-4 ${commit.evaluation === 'always' ? 'border-green-500 bg-green-50' : ''}`}
              onClick={() => onEvaluate('always')}
            >
              <Check className="h-6 w-6 mb-2 text-green-500" />
              <span className="text-sm">Consistentemente</span>
              <span className="text-xs text-gray-500 mt-1">2 pontos</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EvaluationModal;
