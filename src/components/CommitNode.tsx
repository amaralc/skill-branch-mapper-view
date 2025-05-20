
import React, { useState } from 'react';
import { Commit } from '@/data/skillData';
import { Clock, MessageSquare } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface CommitNodeProps {
  commit: Commit;
  branchColor: string;
  isLast: boolean;
  onEvaluate: (evaluation: 'never' | 'sometimes' | 'always') => void;
  dimmed?: boolean;
}

const evaluationValues = [
  { label: 'Nunca', value: 0, color: 'border-red-400 text-red-600' },
  { label: 'Às Vezes', value: 1, color: 'border-yellow-400 text-yellow-600' },
  { label: 'Consistentemente', value: 2, color: 'border-green-400 text-green-600' }
];

const CommitNode: React.FC<CommitNodeProps> = ({
  commit,
  branchColor,
  isLast,
  onEvaluate,
  dimmed = false
}) => {
  const getValueFromEval = (evalValue: Commit['evaluation']) => {
    if (evalValue === 'sometimes') return 1;
    if (evalValue === 'always') return 2;
    return 0;
  };

  const getEvalFromValue = (sliderVal: number): 'never' | 'sometimes' | 'always' => {
    if (sliderVal === 0) return 'never';
    if (sliderVal === 1) return 'sometimes';
    return 'always';
  };

  const sliderValue = [getValueFromEval(commit.evaluation)];

  const getCurrentLabel = () => {
    const value = sliderValue[0];
    const found = evaluationValues.find(ev => ev.value === value);
    return found ? found.label : '';
  };

  let borderTextClass = "";
  {
    const val = getValueFromEval(commit.evaluation);
    borderTextClass = evaluationValues.find(ev => ev.value === val)?.color ?? '';
  }

  const handleValueChange = ([val]: number[]) => {
    onEvaluate(getEvalFromValue(val));
  };

  const [comment, setComment] = useState(commit.comment || '');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSaveComment = () => {
    // This would typically update the comment in the parent component
    // For now, we just store it locally and close the drawer
    if (commit.onUpdateComment) {
      commit.onUpdateComment(comment);
    }
    setDrawerOpen(false);
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return '';
    return format(new Date(timestamp), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  return (
    <div className={`flex items-center mb-2 ${isLast ? '' : 'pb-1'}`}>
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-mono"
        style={{ 
          backgroundColor: branchColor,
          opacity: dimmed ? 0.5 : 1
        }}
      >
        <span className="text-white">
          {commit.metadata?.baseBehavior || ''}
        </span>
      </div>
      <div
        className={`flex-1 flex items-center rounded border bg-white shadow-sm transition-shadow 
          ${borderTextClass}
          ${dimmed ? 'opacity-60' : ''}`}
        style={{ minHeight: "2.25rem", padding: "0.5rem 1rem" }}
      >
        <div className="flex flex-col flex-1 justify-center">
          <h4 className={`font-medium text-sm leading-tight ${borderTextClass.replace('border-', 'text-')}`}>
            {commit.behaviorDescription}
          </h4>
          {commit.updatedAt && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock size={12} className="mr-1" />
              <span>Avaliado em {formatDate(commit.updatedAt)}</span>
            </div>
          )}
          {comment && (
            <div className="text-xs text-gray-600 italic mt-1">
              "{comment.length > 50 ? `${comment.substring(0, 50)}...` : comment}"
            </div>
          )}
        </div>

        <div className="flex items-center mx-2">
          <Drawer 
            open={drawerOpen} 
            onOpenChange={setDrawerOpen}
            shouldScaleBackground={false}
          >
            <DrawerTrigger asChild>
              <button
                className={`p-1 rounded text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label="Adicionar comentário"
                type="button"
              >
                <MessageSquare size={20} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-white">
              <DrawerHeader>
                <DrawerTitle>Comentários do avaliador</DrawerTitle>
                <DrawerDescription className="text-gray-600">
                  Adicione suas observações sobre esta competência
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pt-0">
                <Textarea
                  placeholder="Digite seu comentário sobre o comportamento do avaliado..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              <DrawerFooter>
                <Button onClick={handleSaveComment}>Salvar comentário</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="flex flex-col items-end ml-3" style={{ minWidth: 56 }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-14">
                <Slider
                  min={0}
                  max={2}
                  step={1}
                  value={sliderValue}
                  onValueChange={handleValueChange}
                  className="w-14"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <span className="block text-xs font-medium">{getCurrentLabel()}</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CommitNode;
