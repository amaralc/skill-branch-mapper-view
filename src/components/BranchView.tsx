
import React from 'react';
import { Branch } from '@/data/skillData';
import CommitNode from './CommitNode';

interface BranchViewProps {
  branch: Branch;
  onEvaluateCommit: (branchId: string, commitId: string, evaluation: 'never' | 'sometimes' | 'always') => void;
  isCurrentBranch: boolean;
}

const BranchView: React.FC<BranchViewProps> = ({ branch, onEvaluateCommit, isCurrentBranch }) => {
  return (
    <div className={`mb-8 ${isCurrentBranch ? 'opacity-100' : 'opacity-60'}`}>
      <div className="flex items-center mb-2">
        <div 
          className="px-3 py-1 rounded text-white font-mono text-sm font-bold inline-flex items-center mr-2" 
          style={{ backgroundColor: branch.color }}
        >
          {branch.name}
        </div>
      </div>
      
      <div className="relative">
        {/* Branch line */}
        <div 
          className="absolute left-4 top-4 h-[calc(100%-8px)] w-1 z-0" 
          style={{ backgroundColor: branch.color }}
        ></div>
        
        {/* Commits */}
        <div className="relative z-10">
          {branch.commits.map((commit, index) => (
            <CommitNode 
              key={commit.id}
              commit={commit}
              branchColor={branch.color}
              isLast={index === branch.commits.length - 1}
              onEvaluate={(evaluation) => onEvaluateCommit(branch.id, commit.id, evaluation)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchView;
