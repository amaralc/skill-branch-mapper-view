
import React from 'react';
import { Commit } from '@/data/skillData';
import { GitCommitHorizontal } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface CommitNodeProps {
  commit: Commit;
  branchColor: string;
  isLast: boolean;
  onEvaluate: (evaluation: 'never' | 'sometimes' | 'always') => void;
}

const evaluationValues = [
  { label: 'Nunca', value: 0, color: 'bg-red-400' },
  { label: 'Às Vezes', value: 1, color: 'bg-yellow-400' },
  { label: 'Sempre', value: 2, color: 'bg-green-400' }
];

const CommitNode: React.FC<CommitNodeProps> = ({ 
  commit, 
  branchColor, 
  isLast,
  onEvaluate
}) => {
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
        className={`flex-1 flex items-center rounded border bg-white border-gray-300 text-gray-700 shadow-sm transition-shadow`}
        style={{ minHeight: "2.25rem", padding: "0.5rem 1rem" }}  // altura reduzida (~36px)
      >
        <div className="flex flex-col flex-1 justify-center">
          <h4 className="font-medium text-sm leading-tight">{commit.message}</h4>
        </div>
        {/* Inline slider */}
        <div className="flex flex-col items-end ml-3" style={{ minWidth: 130 }}>
          <Slider
            min={0}
            max={2}
            step={1}
            value={sliderValue}
            onValueChange={([val]) => onEvaluate(getEvalFromValue(val))}
            className="w-28"
          />
          <div className="flex justify-between w-full mt-1 text-xs">
            {evaluationValues.map(ev => (
              <span
                key={ev.label}
                className={`text-center ${getValueFromEval(commit.evaluation) === ev.value ? ev.color + ' text-white font-bold px-1 rounded' : 'text-gray-500'}`}
                style={{ width: 32 }}
              >
                {ev.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitNode;
