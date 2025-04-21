
import React from 'react';
import { Commit } from '@/data/skillData';
import { GitCommitHorizontal } from 'lucide-react';

interface CommitNodeProps {
  commit: Commit;
  branchColor: string;
  onClick: () => void;
  isLast: boolean;
}

const CommitNode: React.FC<CommitNodeProps> = ({ 
  commit, 
  branchColor, 
  onClick,
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

  const getEvaluationText = () => {
    switch(commit.evaluation) {
      case 'never':
        return '0 - Nunca';
      case 'sometimes':
        return '1 - Às vezes';
      case 'always':
        return '2 - Sempre';
      default:
        return 'Não avaliado';
    }
  };

  return (
    <div className={`flex items-center mb-4 ${isLast ? '' : 'pb-2'}`}>
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center mr-3 cursor-pointer"
        style={{ backgroundColor: branchColor }}
        onClick={onClick}
      >
        <GitCommitHorizontal className="text-white" size={16} />
      </div>
      
      <div 
        className={`flex-1 rounded border ${getEvaluationStyle()} cursor-pointer hover:shadow transition-shadow`}
        onClick={onClick}
        style={{ height: '3rem', padding: '0.75rem 1rem' }} // Half the original height with adjusted padding
      >
        <div className="flex justify-between items-center h-full">
          <div>
            <h4 className="font-medium text-sm">{commit.message}</h4>
          </div>
          <div className="text-xs font-medium">
            {getEvaluationText()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitNode;

