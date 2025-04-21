
import React from 'react';
import { Commit } from '@/data/skillData';
import { GitCommitHorizontal } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface CommitNodeProps {
  commit: Commit;
  branchColor: string;
  onEvaluate: (evaluation: 'never' | 'sometimes' | 'always') => void;
  isLast: boolean;
}

const evaluationMarks = [
  { label: 'Nunca', value: 0, code: 'never' },
  { label: 'Às Vezes', value: 1, code: 'sometimes' },
  { label: 'Sempre', value: 2, code: 'always' }
];

const evaluationValueMap = {
  never: 0,
  sometimes: 1,
  always: 2,
};

const CommitNode: React.FC<CommitNodeProps> = ({ 
  commit, 
  branchColor, 
  onEvaluate,
  isLast
}) => {
  const getEvaluationStyle = () => {
    switch(commit.evaluation) {
      case 'never':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'sometimes':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'always':
        return 'bg-green-100 border-green-500 text-green-700';
      default:
        return 'bg-white border-gray-300 text-gray-700';
    }
  };

  // Calcula o valor do slider a partir do commit.evaluation
  const sliderValue = typeof commit.evaluation === 'string'
    ? [evaluationValueMap[commit.evaluation]]
    : [0];

  const handleSliderChange = (value: number[]) => {
    const newEvaluation = evaluationMarks[value[0]]?.code;
    if (
      newEvaluation &&
      newEvaluation !== commit.evaluation
    ) {
      onEvaluate(newEvaluation as 'never' | 'sometimes' | 'always');
    }
  };

  return (
    <div className={`flex items-center mb-4 ${isLast ? '' : 'pb-2'}`}>
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center mr-3 cursor-pointer"
        style={{ backgroundColor: branchColor }}
      >
        <GitCommitHorizontal className="text-white" size={16} />
      </div>
      
      <div 
        className={`flex-1 rounded border ${getEvaluationStyle()} hover:shadow transition-shadow`}
        style={{ height: '3rem', padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div className="flex justify-between items-center h-full">
          <div>
            <h4 className="font-medium text-sm">{commit.message}</h4>
          </div>
        </div>
        {/* Slider de avaliação */}
        <div className="mt-2 flex items-center space-x-4">
          <Slider
            min={0}
            max={2}
            step={1}
            value={sliderValue}
            onValueChange={handleSliderChange}
            className="w-32"
          />
          <span className="text-xs font-medium select-none" style={{ minWidth: 64 }}>
            {evaluationMarks[sliderValue[0]]?.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommitNode;
