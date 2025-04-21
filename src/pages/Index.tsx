
import React, { useState } from 'react';
import { Branch, Commit, dataScientistPath } from '@/data/skillData';
import BranchView from '@/components/BranchView';
import EvaluationModal from '@/components/EvaluationModal';
import ProgressSummary from '@/components/ProgressSummary';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

const Index = () => {
  const [skillPath, setSkillPath] = useState(dataScientistPath);
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);
  const [selectedCommit, setSelectedCommit] = useState<{
    commit: Commit;
    branchId: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCommitClick = (branchId: string, commitId: string) => {
    const branch = skillPath.branches.find(b => b.id === branchId);
    if (!branch) return;
    
    const commit = branch.commits.find(c => c.id === commitId);
    if (!commit) return;
    
    setSelectedCommit({ commit, branchId });
    setModalOpen(true);
  };

  const handleEvaluate = (evaluation: 'never' | 'sometimes' | 'always') => {
    if (!selectedCommit) return;
    
    const updatedSkillPath = {
      ...skillPath,
      branches: skillPath.branches.map(branch => {
        if (branch.id === selectedCommit.branchId) {
          return {
            ...branch,
            commits: branch.commits.map(commit => {
              if (commit.id === selectedCommit.commit.id) {
                return { ...commit, evaluation };
              }
              return commit;
            }),
          };
        }
        return branch;
      }),
    };
    
    setSkillPath(updatedSkillPath);
    setModalOpen(false);
  };

  const getBranchName = (branchId: string): string => {
    const branch = skillPath.branches.find(b => b.id === branchId);
    return branch ? branch.name : '';
  };

  const renderTagsForCurrentBranch = () => {
    if (!currentBranchId) return null;
    
    const tagsForBranch = skillPath.tags.filter(tag => tag.branchId === currentBranchId);
    if (tagsForBranch.length === 0) return null;
    
    const branch = skillPath.branches.find(b => b.id === currentBranchId);
    if (!branch) return null;
    
    return (
      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2 flex items-center">
          <Tag className="mr-2" size={16} />
          Níveis nesta trilha
        </h3>
        <div className="pl-4 border-l-2 border-gray-300">
          {tagsForBranch.map(tag => (
            <div key={tag.id} className="mb-2 bg-gray-50 p-2 rounded border">
              <div className="flex items-center">
                <span className="font-bold text-sm">{tag.name}</span>
                <span className="ml-2 text-xs text-gray-600">({tag.level})</span>
              </div>
              <div className="text-xs mt-1 text-gray-500">
                Requer {tag.pointsRequired} pontos
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const resetEvaluations = () => {
    const updatedSkillPath = {
      ...skillPath,
      branches: skillPath.branches.map(branch => ({
        ...branch,
        commits: branch.commits.map(commit => ({
          ...commit,
          evaluation: null
        }))
      }))
    };
    
    setSkillPath(updatedSkillPath);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-mono font-bold">SKILL BRANCH MAPPER</h1>
          <p className="text-gray-400 text-sm">
            Trilhas de conhecimento organizadas por área
          </p>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar - Branch selector */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-lg font-bold mb-3">Trilhas de Competência</h2>
              <div className="space-y-2">
                {skillPath.branches.map(branch => (
                  <button
                    key={branch.id}
                    className={`w-full text-left px-3 py-2 rounded flex items-center text-sm
                      ${currentBranchId === branch.id 
                        ? 'bg-gray-100 border-l-4 font-medium' 
                        : 'hover:bg-gray-50'}`}
                    style={{ 
                      borderLeftColor: currentBranchId === branch.id ? branch.color : 'transparent',
                      borderLeftWidth: currentBranchId === branch.id ? '4px' : '0px'
                    }}
                    onClick={() => setCurrentBranchId(branch.id)}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: branch.color }}
                    ></div>
                    {branch.name}
                  </button>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mb-4"
              onClick={resetEvaluations}
            >
              Reiniciar Avaliação
            </Button>
            
            {renderTagsForCurrentBranch()}
          </div>
          
          {/* Main content - Branch commits */}
          <div className="md:col-span-2">
            <ProgressSummary skillPath={skillPath} />
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-bold mb-4">
                {currentBranchId 
                  ? `Branch: ${getBranchName(currentBranchId)}` 
                  : 'Selecione uma branch para visualizar os commits'}
              </h2>
              
              {currentBranchId ? (
                skillPath.branches
                  .filter(branch => branch.id === currentBranchId)
                  .map(branch => (
                    <BranchView
                      key={branch.id}
                      branch={branch}
                      onCommitClick={handleCommitClick}
                      isCurrentBranch={true}
                    />
                  ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Selecione uma branch no menu ao lado para visualizar os commits
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {selectedCommit && (
        <EvaluationModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          commit={selectedCommit.commit}
          branchName={getBranchName(selectedCommit.branchId)}
          onEvaluate={handleEvaluate}
        />
      )}
    </div>
  );
};

export default Index;
