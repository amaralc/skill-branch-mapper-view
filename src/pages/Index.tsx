import React, { useState } from 'react';
import { Branch, SkillPath, careerPaths } from '@/data/skillData';
import BranchView from '@/components/BranchView';
import ProgressSummary from '@/components/ProgressSummary';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectLabel } from '@/components/ui/select';
import { useEvaluationState } from '@/hooks/useEvaluationState';
import ActionsDrawer from '@/components/ActionsDrawer';
import { emphasisOptions } from '@/types/emphasis';
import SeniorityLevelsSheet from '@/components/SeniorityLevelsSheet';

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

      <main className="max-w-[1200px] mx-auto py-0 px-4">
        {selectedCareerId ? (
          <>
            <ProgressSummary skillPath={skillPath} />
            
            <div className="flex gap-4 mb-6">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => resetAllEvaluations()}
              >
                Reiniciar Avaliação
              </Button>
              <SeniorityLevelsSheet skillPath={skillPath} />
            </div>

            <div className="flex flex-col">
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-lg font-bold mb-3">Trilhas de Competência</h2>
                
                <Tabs defaultValue={filteredBranches[0]?.id} className="w-full">
                  <ScrollArea className="w-full pb-4">
                    <TabsList className="w-full justify-start mb-4 bg-transparent gap-2 inline-flex">
                      {filteredBranches.map(branch => (
                        <TabsTrigger
                          key={branch.id}
                          value={branch.id}
                          className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-4 shrink-0"
                        >
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: branch.color }}
                            />
                            <span>{branch.name}</span>
                            {branch.id === selectedEmphasis && (
                              <span className="ml-1 text-xs text-gray-500">
                                (Especialidade)
                              </span>
                            )}
                          </div>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </ScrollArea>

                  {filteredBranches.map(branch => (
                    <TabsContent key={branch.id} value={branch.id}>
                      <BranchView
                        branch={branch}
                        onEvaluateCommit={handleEvaluateCommit}
                        isCurrentBranch={true}
                        skillPath={skillPath}
                      />
                    </TabsContent>
                  ))}
                </Tabs>
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
