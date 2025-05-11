
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SkillPath } from '@/types/skill';
import { saveEvaluation, getEvaluation, generateEvaluationId } from '@/utils/indexedDb';

export function useEvaluationState(initialSkillPath: SkillPath) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [skillPath, setSkillPath] = useState<SkillPath>(initialSkillPath);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const evaluationId = searchParams.get('eval');
    if (evaluationId) {
      loadEvaluation(evaluationId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadEvaluation = async (evaluationId: string) => {
    try {
      const savedEvaluation = await getEvaluation(evaluationId);
      if (savedEvaluation) {
        setSkillPath(savedEvaluation.skillPath);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateCommit = async (branchId: string, commitId: string, evaluation: 'never' | 'sometimes' | 'always') => {
    const evaluationId = searchParams.get('eval') || generateEvaluationId();
    const currentTimestamp = Date.now();
    
    const updatedSkillPath = {
      ...skillPath,
      branches: skillPath.branches.map(branch => {
        if (branch.id === branchId) {
          return {
            ...branch,
            commits: branch.commits.map(commit => {
              if (commit.id === commitId) {
                return { 
                  ...commit, 
                  evaluation,
                  updatedAt: currentTimestamp 
                };
              }
              return commit;
            }),
          };
        }
        return branch;
      }),
    };

    setSkillPath(updatedSkillPath);
    
    await saveEvaluation({
      id: evaluationId,
      timestamp: currentTimestamp,
      skillPath: updatedSkillPath,
    });

    if (!searchParams.get('eval')) {
      setSearchParams({ eval: evaluationId });
    }
  };

  const resetAllEvaluations = async (newSkillPath?: SkillPath) => {
    const evaluationId = searchParams.get('eval') || generateEvaluationId();
    
    const updatedSkillPath = newSkillPath || {
      ...skillPath,
      branches: skillPath.branches.map(branch => ({
        ...branch,
        commits: branch.commits.map(commit => ({
          ...commit,
          evaluation: null,
          updatedAt: null
        }))
      }))
    };

    setSkillPath(updatedSkillPath);
    
    await saveEvaluation({
      id: evaluationId,
      timestamp: Date.now(),
      skillPath: updatedSkillPath,
    });

    if (!searchParams.get('eval')) {
      setSearchParams({ eval: evaluationId });
    }
  };

  return {
    skillPath,
    evaluateCommit,
    resetAllEvaluations,
    isLoading
  };
}
