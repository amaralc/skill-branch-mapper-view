import React, { useState } from 'react';
import { Branch, SkillPath, careerPaths } from '@/data/skillData';
import BranchView from '@/components/BranchView';
import ProgressSummary from '@/components/ProgressSummary';
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectLabel } from '@/components/ui/select';
import { useEvaluationState } from '@/hooks/useEvaluationState';
import ActionsDrawer from '@/components/ActionsDrawer';
import { emphasisOptions } from '@/types/emphasis';

const Index = () => {
  const careerOptions = careerPaths.map(path => ({
    id: path.id,
    label: path.name,
    value: path.id,
    skillPath: path
  }));

  const defaultCareer = careerOptions.find(path => path.label === "Engenharia de Software") || careerOptions[0];

  const [selectedCareerId, setSelectedCareerId] = useState(defaultCareer.id);
  const [selectedEmphasis, setSelectedEmphasis] = useState<string | null>(null);
  const { skillPath, evaluateCommit, resetAllEvaluations, isLoading } = useEvaluationState(defaultCareer.skillPath);
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);

  const handleCareerChange = (careerId: string) => {
    const found = careerOptions.find(x => x.id === careerId);
    setSelectedCareerId(careerId);
    setCurrentBranchId(null);
    setSelectedEmphasis(null);
  };

  const handleEmphasisChange = (emphasisId: string) => {
    setSelectedEmphasis(emphasisId);
    setCurrentBranchId(null);
  };

  const handleEvaluateCommit = (branchId: string, commitId: string, evaluation: 'never' | 'sometimes' | 'always') => {
    evaluateCommit(branchId, commitId, evaluation);
  };

  const handleExportEvaluation = () => {
    const evaluationData = {
      skillPath,
      timestamp: Date.now()
    };
    
    const blob = new Blob([JSON.stringify(evaluationData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluation-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportEvaluation = (importedSkillPath: SkillPath) => {
    resetAllEvaluations(importedSkillPath);
  };

  const getBranchName = (branchId: string): string => {
    const branch = skillPath.branches.find(b => b.id === branchId);
    return branch ? branch.name : '';
  };

  const baseTracks = ['quality', 'security', 'architecture', 'continuous-delivery'];
  
  const filteredBranches = skillPath.branches.filter(branch => {
    if (baseTracks.includes(branch.id)) {
      return true;
    }
    
    if (selectedEmphasis && branch.id === selectedEmphasis) {
      return true;
    }
    
    return false;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando avaliação...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-black text-white p-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-mono font-bold">SKILL BRANCH MAPPER</h1>
              <p className="text-gray-400 text-sm">
                Trilhas de conhecimento organizadas por área
              </p>
            </div>
            <ActionsDrawer 
              onExport={handleExportEvaluation}
              onImport={handleImportEvaluation}
              onReset={resetAllEvaluations}
              skillPath={skillPath}
            />
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto py-5 flex items-center gap-4 px-[16px]">
        <Select value={selectedCareerId} onValueChange={handleCareerChange}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Escolha a carreira" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Carreira</SelectLabel>
              {careerOptions.map(opt => (
                <SelectItem value={opt.id} key={opt.id}>{opt.label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={selectedEmphasis || ''} onValueChange={handleEmphasisChange}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Escolha a especialidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Especialidade</SelectLabel>
              {emphasisOptions.map(emphasis => (
                <SelectItem value={emphasis.id} key={emphasis.id}>
                  {emphasis.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <main className="max-w-[1200px] mx-auto py-0 px-0">
        {selectedCareerId ? (
          <>
            <ProgressSummary skillPath={skillPath} />

            <div className="flex flex-col">
              <div className="bg-white rounded-lg shadow p-4 mb-6 shadow-none border-none">
                <h2 className="text-lg font-bold mb-3">Trilhas de Competência</h2>
                <div className="space-y-2">
                  {filteredBranches.map(branch => (
                    <button
                      key={branch.id}
                      className={`w-full text-left px-3 py-2 rounded flex items-center text-sm
                        ${currentBranchId === branch.id ? 'bg-gray-100 border-l-4 font-medium' : 'hover:bg-gray-50'}`}
                      style={{
                        borderLeftColor: currentBranchId === branch.id ? branch.color : 'transparent',
                        borderLeftWidth: currentBranchId === branch.id ? '4px' : '0px'
                      }}
                      onClick={() => setCurrentBranchId(branch.id)}
                    >
                      <div className="w-3 h-3 rounded-full mr-2" style={{
                        backgroundColor: branch.color
                      }}></div>
                      {branch.name}
                      {branch.id === selectedEmphasis ? (
                        <span className="ml-2 text-xs text-gray-500">
                          (Especialidade)
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-bold mb-4">
                  {currentBranchId ? `Branch: ${getBranchName(currentBranchId)}` : 'Selecione uma branch para visualizar os commits'}
                </h2>

                {currentBranchId ? (
                  <BranchView
                    branch={skillPath.branches.find(branch => branch.id === currentBranchId)!}
                    onEvaluateCommit={handleEvaluateCommit}
                    isCurrentBranch={true}
                    skillPath={skillPath}
                  />
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Selecione uma branch no menu ao lado para visualizar os commits
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Selecione uma carreira para visualizar as trilhas de competência
          </div>
        )}
      </main>
    </>
  );
};

export default Index;
