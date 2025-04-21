
import React, { useState } from 'react';
import { Branch, Commit, dataScientistPath } from '@/data/skillData';
import BranchView from '@/components/BranchView';
import ProgressSummary from '@/components/ProgressSummary';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

const Index = () => {
  const [skillPath, setSkillPath] = useState(dataScientistPath);
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);
  const handleEvaluateCommit = (branchId: string, commitId: string, evaluation: 'never' | 'sometimes' | 'always') => {
    setSkillPath(prev => ({
      ...prev,
      branches: prev.branches.map(branch => {
        if (branch.id === branchId) {
          return {
            ...branch,
            commits: branch.commits.map(commit => commit.id === commitId ? {
              ...commit,
              evaluation
            } : commit)
          };
        }
        return branch;
      })
    }));
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
    return <div className="mb-6 my-[24px]">
        <h3 className="font-medium text-gray-700 mb-2 flex items-center">
          <Tag className="mr-2" size={16} />
          Níveis nesta trilha
        </h3>
        <div className="pl-4 border-l-2 border-gray-300">
          {tagsForBranch.map(tag => <div key={tag.id} className="mb-2 bg-gray-50 p-2 rounded border">
              <div className="flex items-center">
                <span className="font-bold text-sm">{tag.name}</span>
                <span className="ml-2 text-xs text-gray-600">({tag.level})</span>
              </div>
              <div className="text-xs mt-1 text-gray-500">
                Requer {tag.pointsRequired} pontos
              </div>
            </div>)}
        </div>
      </div>;
  };
  const resetEvaluations = () => {
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
  return <>
      <header className="bg-black text-white p-4">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-xl font-mono font-bold">SKILL BRANCH MAPPER</h1>
          <p className="text-gray-400 text-sm">
            Trilhas de conhecimento organizadas por área
          </p>
        </div>
      </header>
      
      <main className="max-w-[1200px] mx-auto py-0 px-0">
        <div className="flex flex-col">
          {/* ProgressSummary sticky with blur background */}
          <div className="sticky top-0 z-40 backdrop-blur-sm bg-white bg-opacity-70 border-b border-gray-200">
            <ProgressSummary skillPath={skillPath} />
          </div>

          {/* Card de Trilhas de Competência realocado */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-lg font-bold mb-3">Trilhas de Competência</h2>
            <div className="space-y-2">
              {skillPath.branches.map(branch => <button key={branch.id} className={`w-full text-left px-3 py-2 rounded flex items-center text-sm
                    ${currentBranchId === branch.id ? 'bg-gray-100 border-l-4 font-medium' : 'hover:bg-gray-50'}`} style={{
              borderLeftColor: currentBranchId === branch.id ? branch.color : 'transparent',
              borderLeftWidth: currentBranchId === branch.id ? '4px' : '0px'
            }} onClick={() => setCurrentBranchId(branch.id)}>
                <div className="w-3 h-3 rounded-full mr-2" style={{
              backgroundColor: branch.color
            }}></div>
                {branch.name}
              </button>)}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={resetEvaluations}>
              Reiniciar Avaliação
            </Button>
            {renderTagsForCurrentBranch()}
          </div>

          {/* Detalhes da branch sem scroll interno */}
          <div className="bg-white rounded-lg shadow p-4 flex-1 min-h-[480px] max-h-[80vh]">
            <h2 className="text-lg font-bold mb-4">
              {currentBranchId ? `Branch: ${getBranchName(currentBranchId)}` : 'Selecione uma branch para visualizar os commits'}
            </h2>
            
            {currentBranchId ? (
              <BranchView 
                branch={skillPath.branches.find(branch => branch.id === currentBranchId)!}
                onEvaluateCommit={handleEvaluateCommit}
                isCurrentBranch={true}
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                Selecione uma branch no menu ao lado para visualizar os commits
              </div>
            )}
          </div>
        </div>
      </main>
    </>;
};
export default Index;
