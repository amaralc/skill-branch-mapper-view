
import React, { useState } from 'react';
import { SkillPath } from '@/data/skillData';
import ProgressSummary from '@/components/ProgressSummary';
import { Button } from '@/components/ui/button';
import { useEvaluationState } from '@/hooks/useEvaluationState';
import ActionsDrawer from '@/components/ActionsDrawer';
import SeniorityLevelsSheet from '@/components/SeniorityLevelsSheet';
import CareerSelector from '@/components/CareerSelector';
import EmphasisSelector from '@/components/EmphasisSelector';
import SkillBranches from '@/components/SkillBranches';
import { careerPaths } from '@/data/skillData';

const Index = () => {
  const defaultCareer = careerPaths.find(path => path.id === "software") || careerPaths[0];
  const [selectedCareerId, setSelectedCareerId] = useState(defaultCareer.id);
  const [selectedEmphasis, setSelectedEmphasis] = useState<string | null>(null);
  const { skillPath, evaluateCommit, resetAllEvaluations, isLoading } = useEvaluationState(defaultCareer);

  const handleCareerChange = (careerId: string) => {
    setSelectedCareerId(careerId);
    setSelectedEmphasis(null);
  };

  const handleEmphasisChange = (emphasisId: string) => {
    setSelectedEmphasis(emphasisId);
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

  const baseTracks = ['ACCOUNTABILITY', 'adaptability', 'communication', 'continuous-development', 'emotional-intelligence', 'results-orientation', 'quality', 'security', 'architecture', 'continuous-delivery'];
  
  const filteredBranches = skillPath?.branches?.filter(branch => {
    if (baseTracks.includes(branch.id)) {
      return true;
    }
    
    if (selectedEmphasis && branch.id === selectedEmphasis) {
      return true;
    }
    
    return false;
  }) || [];

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
            />
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto py-5 px-[16px] flex flex-col gap-4">
        <CareerSelector
          selectedCareerId={selectedCareerId}
          onCareerChange={handleCareerChange}
        />
        <EmphasisSelector
          selectedEmphasis={selectedEmphasis}
          onEmphasisChange={handleEmphasisChange}
        />
      </div>

      <main className="max-w-[1200px] mx-auto py-0 px-4">
        {selectedCareerId && selectedEmphasis ? (
          <>
            <ProgressSummary skillPath={skillPath} />
            
            <div className="flex flex-col gap-4 mb-6">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => resetAllEvaluations()}
              >
                Reiniciar Avaliação
              </Button>
              <SeniorityLevelsSheet skillPath={skillPath} />
            </div>

            <div className="flex flex-col">
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-lg font-bold mb-3">Trilhas de Competência</h2>
                <SkillBranches
                  branches={filteredBranches}
                  skillPath={skillPath}
                  onEvaluateCommit={evaluateCommit}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Selecione uma carreira e uma especialidade para visualizar as trilhas de competência
          </div>
        )}
      </main>
    </>
  );
};

export default Index;
