
import React, { useState } from 'react';
import { Commit } from '@/data/skillData';
import { GitCommitHorizontal } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CommitNodeProps {
  commit: Commit;
  branchColor: string;
  isLast: boolean;
  onEvaluate: (evaluation: 'never' | 'sometimes' | 'always') => void;
  disabled?: boolean;
  lockReason?: string;
}

const evaluationValues = [
  { label: 'Nunca', value: 0, color: 'bg-red-400', bg: 'bg-[#ea384c]/20' },
  { label: 'Às Vezes', value: 1, color: 'bg-yellow-400', bg: 'bg-yellow-100' },
  { label: 'Sempre', value: 2, color: 'bg-green-400', bg: 'bg-green-100' }
];

const CommitNode: React.FC<CommitNodeProps> = ({ 
  commit, 
  branchColor, 
  isLast,
  onEvaluate,
  disabled = false,
  lockReason
}) => {
  // Novo estado para saber se foi avaliado pelo usuário localmente
  const [touched, setTouched] = useState(false);

  // Map de evaluation para slider value
  const getValueFromEval = (evalValue: Commit['evaluation']) => {
    if (evalValue === 'never') return 0;
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

  // Obtém label correspondente ao valor atual do slider
  const getCurrentLabel = () => {
    const value = sliderValue[0];
    const found = evaluationValues.find(ev => ev.value === value);
    return found ? found.label : '';
  };

  // Detecta se o commit já foi avaliado localmente ou globalmente
  const wasEvaluated = touched || commit.evaluation;

  // Define cor do fundo após avaliação
  let bgColor = "";
  if (wasEvaluated && commit.evaluation !== null && commit.evaluation !== undefined) {
    const val = getValueFromEval(commit.evaluation);
    bgColor = evaluationValues.find(ev => ev.value === val)?.bg ?? '';
  }

  // Handler para slider: registra toque local + chama onEvaluate do pai
  const handleValueChange = ([val]: number[]) => {
    if (disabled) return;
    setTouched(true);
    onEvaluate(getEvalFromValue(val));
  };

  return (
    <div className={`flex items-center mb-2 ${isLast ? '' : 'pb-1'}`}>
      {/* Linha e círculo do commit */}
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
        style={{ backgroundColor: branchColor }}
      >
        <GitCommitHorizontal className="text-white" size={16} />
      </div>
      {/* Caixa do texto, altura reduzida */}
      <div 
        className={`flex-1 flex items-center rounded transition-shadow
        ${bgColor} border bg-white border-gray-300 text-gray-700 shadow-sm
        ${disabled ? 'opacity-50 pointer-events-auto' : ''}`}
        style={{ minHeight: "2.25rem", padding: "0.5rem 1rem" }}  // altura reduzida (~36px)
      >
        <div className="flex flex-col flex-1 justify-center">
          <h4 className="font-medium text-sm leading-tight">{commit.message}</h4>
        </div>
        {/* Inline slider alinhado à direita com tooltip */}
        <div className="flex flex-col items-end ml-3" style={{ minWidth: 112 }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
                className="w-28"
              >
                <Slider
                  min={0}
                  max={2}
                  step={1}
                  value={sliderValue}
                  onValueChange={handleValueChange}
                  className={`w-28 ${disabled ? 'cursor-not-allowed' : ''}`}
                  disabled={disabled}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              {disabled && lockReason
                ? <span className="block text-xs font-medium text-red-500">{lockReason}</span>
                : <span className="block text-xs font-medium">{getCurrentLabel()}</span>
              }
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CommitNode;
