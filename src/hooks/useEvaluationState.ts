
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SkillPath } from '@/types/skill';
import { saveEvaluation, getEvaluation, generateEvaluationId } from '@/utils/indexedDb';

export interface EvaluationState {
  skillPath: SkillPath;
  careerId?: string;
  selectedLevel?: string | null;
  selectedTrack?: string | null;
  specialties?: string[];
}

export function useEvaluationState(initialSkillPath: SkillPath) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [skillPath, setSkillPath] = useState<SkillPath>(initialSkillPath);
  const [isLoading, setIsLoading] = useState(true);
  const [evaluationMeta, setEvaluationMeta] = useState<{
    careerId?: string;
    selectedLevel?: string | null;
    selectedTrack?: string | null;
    specialties?: string[];
  }>({});

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
        setEvaluationMeta({
          careerId: savedEvaluation.careerId,
          selectedLevel: savedEvaluation.selectedLevel,
          selectedTrack: savedEvaluation.selectedTrack,
          specialties: savedEvaluation.specialties
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const evaluationExists = async (evaluationId: string): Promise<boolean> => {
    try {
      const savedEvaluation = await getEvaluation(evaluationId);
      return !!savedEvaluation;
    } catch (error) {
      console.error("Error checking if evaluation exists:", error);
      return false;
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
      careerId: evaluationMeta.careerId,
      selectedLevel: evaluationMeta.selectedLevel,
      selectedTrack: evaluationMeta.selectedTrack,
      specialties: evaluationMeta.specialties
    });

    if (!searchParams.get('eval')) {
      setSearchParams({ eval: evaluationId });
    }
  };

  const updateEvaluationMeta = async (meta: {
    careerId?: string;
    selectedLevel?: string | null;
    selectedTrack?: string | null;
    specialties?: string[];
  }) => {
    const evaluationId = searchParams.get('eval') || generateEvaluationId();
    const updatedMeta = { ...evaluationMeta, ...meta };
    
    setEvaluationMeta(updatedMeta);
    
    await saveEvaluation({
      id: evaluationId,
      timestamp: Date.now(),
      skillPath,
      ...updatedMeta
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
      ...evaluationMeta
    });

    if (!searchParams.get('eval')) {
      setSearchParams({ eval: evaluationId });
    }
  };

  return {
    skillPath,
    evaluateCommit,
    resetAllEvaluations,
    updateEvaluationMeta,
    evaluationMeta,
    isLoading,
    evaluationExists
  };
}
