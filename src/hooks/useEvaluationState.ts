
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
  const [timestamp, setTimestamp] = useState<number>(Date.now());

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
        setTimestamp(savedEvaluation.timestamp);
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

  const updateComment = async (branchId: string, commitId: string, comment: string) => {
    const evaluationId = searchParams.get('eval');
    if (!evaluationId) {
      console.error("Cannot update comment without an active evaluation");
      return;
    }
    
    const currentTimestamp = Date.now();
    setTimestamp(currentTimestamp);
    
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
                  comment,
                  updatedAt: commit.updatedAt || currentTimestamp
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
    
    // Update URL timestamp parameter
    setSearchParams(prev => {
      prev.set('timestamp', currentTimestamp.toString());
      return prev;
    });
  };

  const evaluateCommit = async (branchId: string, commitId: string, evaluation: 'never' | 'sometimes' | 'always') => {
    const evaluationId = searchParams.get('eval');
    if (!evaluationId) {
      console.error("Cannot evaluate commit without an active evaluation");
      return;
    }
    
    const currentTimestamp = Date.now();
    setTimestamp(currentTimestamp);
    
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
                  updatedAt: currentTimestamp,
                  // Keep existing comment if it exists
                  comment: commit.comment || ''
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
    
    // Update URL timestamp parameter
    setSearchParams(prev => {
      prev.set('timestamp', currentTimestamp.toString());
      return prev;
    });
  };

  const createNewEvaluation = async (newSkillPath: SkillPath, metadata?: {
    careerId?: string;
    selectedLevel?: string | null;
    selectedTrack?: string | null;
    specialties?: string[];
  }) => {
    const evaluationId = generateEvaluationId();
    const currentTimestamp = Date.now();
    setTimestamp(currentTimestamp);
    const updatedMeta = { ...evaluationMeta, ...metadata };
    
    setSkillPath(newSkillPath);
    setEvaluationMeta(updatedMeta);
    
    await saveEvaluation({
      id: evaluationId,
      timestamp: currentTimestamp,
      skillPath: newSkillPath,
      ...updatedMeta
    });
    
    setSearchParams({ eval: evaluationId, timestamp: currentTimestamp.toString() });
    return evaluationId;
  };

  const updateEvaluationMeta = async (meta: {
    careerId?: string;
    selectedLevel?: string | null;
    selectedTrack?: string | null;
    specialties?: string[];
  }) => {
    const evaluationId = searchParams.get('eval');
    if (!evaluationId) {
      console.error("Cannot update metadata without an active evaluation");
      return;
    }
    
    const currentTimestamp = Date.now();
    setTimestamp(currentTimestamp);
    const updatedMeta = { ...evaluationMeta, ...meta };
    setEvaluationMeta(updatedMeta);
    
    await saveEvaluation({
      id: evaluationId,
      timestamp: currentTimestamp,
      skillPath,
      ...updatedMeta
    });
    
    // Update URL timestamp parameter
    setSearchParams(prev => {
      prev.set('timestamp', currentTimestamp.toString());
      return prev;
    });
  };

  const resetAllEvaluations = async (newSkillPath?: SkillPath) => {
    const evaluationId = searchParams.get('eval');
    if (!evaluationId) {
      console.error("Cannot reset evaluations without an active evaluation");
      return;
    }
    
    const currentTimestamp = Date.now();
    setTimestamp(currentTimestamp);
    
    // If we're resetting with a new skill path, use that
    // Otherwise, just reset the evaluations in the current skill path but preserve comments
    const updatedSkillPath = newSkillPath || {
      ...skillPath,
      branches: skillPath.branches.map(branch => ({
        ...branch,
        commits: branch.commits.map(commit => ({
          ...commit,
          evaluation: null,
          updatedAt: null,
          // Preserve existing comment
          comment: commit.comment || null
        }))
      }))
    };

    setSkillPath(updatedSkillPath);
    
    await saveEvaluation({
      id: evaluationId,
      timestamp: currentTimestamp,
      skillPath: updatedSkillPath,
      ...evaluationMeta
    });
    
    // Update URL timestamp parameter
    setSearchParams(prev => {
      prev.set('timestamp', currentTimestamp.toString());
      return prev;
    });
  };

  return {
    skillPath,
    evaluateCommit,
    updateComment,
    resetAllEvaluations,
    updateEvaluationMeta,
    evaluationMeta,
    isLoading,
    evaluationExists,
    createNewEvaluation,
    timestamp
  };
}
