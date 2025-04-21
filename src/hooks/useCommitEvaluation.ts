
import { useState } from 'react';
import { Branch, Commit, SkillPath } from '@/data/skillData';

export function useCommitEvaluation(initialSkillPath: SkillPath) {
  const [skillPath, setSkillPath] = useState<SkillPath>(initialSkillPath);
  
  const evaluateCommit = (branchId: string, commitId: string, evaluation: 'never' | 'sometimes' | 'always') => {
    setSkillPath(prev => ({
      ...prev,
      branches: prev.branches.map(branch => {
        if (branch.id === branchId) {
          return {
            ...branch,
            commits: branch.commits.map(commit => {
              if (commit.id === commitId) {
                return { ...commit, evaluation };
              }
              return commit;
            }),
          };
        }
        return branch;
      }),
    }));
  };
  
  const resetAllEvaluations = () => {
    setSkillPath(prev => ({
      ...prev,
      branches: prev.branches.map(branch => ({
        ...branch,
        commits: branch.commits.map(commit => ({
          ...commit,
          evaluation: null
        }))
      }))
    }));
  };
  
  const getCommit = (branchId: string, commitId: string): Commit | null => {
    const branch = skillPath.branches.find(b => b.id === branchId);
    if (!branch) return null;
    
    return branch.commits.find(c => c.id === commitId) || null;
  };
  
  const getBranch = (branchId: string): Branch | null => {
    return skillPath.branches.find(b => b.id === branchId) || null;
  };
  
  return {
    skillPath,
    evaluateCommit,
    resetAllEvaluations,
    getCommit,
    getBranch
  };
}
