
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SkillPath } from '@/data/skillData';
import ProgressSummary from '@/components/ProgressSummary';
import { Button } from '@/components/ui/button';
import { useEvaluationState } from '@/hooks/useEvaluationState';
import ActionsDrawer from '@/components/ActionsDrawer';
import SeniorityLevelsSheet from '@/components/SeniorityLevelsSheet';
import CareerSelector from '@/components/CareerSelector';
import EmphasisSelector from '@/components/EmphasisSelector';
import LevelTrackSelector from '@/components/LevelTrackSelector';
import SkillBranches from '@/components/SkillBranches';
import { careerPaths } from '@/data/skillData';
import { toast } from "sonner";
import { Upload, FileText } from 'lucide-react';
import CsvUploader from '@/components/CsvUploader';

const Index = () => {
  const [searchParams] = useSearchParams();
  const hasEvalParam = searchParams.has('eval');
  
  const defaultCareer = careerPaths.find(path => path.id === "software") || careerPaths[0];
  const [selectedCareerId, setSelectedCareerId] = useState(defaultCareer.id);
  const [selectedEmphasis, setSelectedEmphasis] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>('T'); // Default to Technical track
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [showCsvImport, setShowCsvImport] = useState(false);
  
  const { 
    skillPath, 
    evaluateCommit, 
    resetAllEvaluations, 
    updateEvaluationMeta, 
    evaluationMeta, 
    isLoading 
  } = useEvaluationState(defaultCareer);

  // Load saved evaluation metadata when component mounts or evaluation changes
  useEffect(() => {
    if (evaluationMeta.careerId) {
      console.log("Setting career ID from evaluationMeta:", evaluationMeta.careerId);
      setSelectedCareerId(evaluationMeta.careerId);
      
      // Find the career to get its specialties
      const career = careerPaths.find(path => path.id === evaluationMeta.careerId);
      if (career && career.specialties) {
        console.log("Setting emphases from career:", career.specialties);
        setSelectedEmphasis(career.specialties);
      }
    }
    
    if (evaluationMeta.selectedLevel !== undefined) {
      console.log("Setting level from evaluationMeta:", evaluationMeta.selectedLevel);
      setSelectedLevel(evaluationMeta.selectedLevel);
    }
    
    if (evaluationMeta.selectedTrack !== undefined) {
      console.log("Setting track from evaluationMeta:", evaluationMeta.selectedTrack);
      setSelectedTrack(evaluationMeta.selectedTrack);
    }
  }, [evaluationMeta]);

  // Handle functions for career, emphasis, level, and track changes
  const handleCareerChange = (careerId: string) => {
    setSelectedCareerId(careerId);
    setSelectedEmphasis([]);
    updateEvaluationMeta({ careerId });
  };

  const handleEmphasisChange = (emphasisIds: string[]) => {
    setSelectedEmphasis(emphasisIds);
  };

  const handleLevelChange = (level: string) => {
    const newLevel = level === "" ? null : level;
    setSelectedLevel(newLevel);
    updateEvaluationMeta({ selectedLevel: newLevel });
  };

  const handleTrackChange = (track: string) => {
    const newTrack = track === "" ? null : track;
    setSelectedTrack(newTrack);
    updateEvaluationMeta({ selectedTrack: newTrack });
  };

  const handleExportEvaluation = () => {
    const evaluationData = {
      skillPath,
      timestamp: Date.now(),
      careerId: selectedCareerId,
      selectedLevel,
      selectedTrack
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

  const handleImportEvaluation = (importedData: any) => {
    // Check if it's the new format with metadata
    if (importedData.careerId) {
      setSelectedCareerId(importedData.careerId);
      setSelectedLevel(importedData.selectedLevel);
      setSelectedTrack(importedData.selectedTrack);
      
      // Reset evaluation with the imported data
      resetAllEvaluations(importedData.skillPath);
    } else {
      // Handle legacy format (just skillPath)
      resetAllEvaluations(importedData);
    }
    
    // Hide the import dialogs
    setShowJsonImport(false);
    setShowCsvImport(false);
  };

  // Define which branches are base competencies
  const baseTracks = ['ACCOUNTABILITY', 'ADAPTABILITY', 'COMMUNICATION', 'CONTINUOUS-DEVELOPMENT', 'EMOTIONAL-INTELLIGENCE', 'RESULTS-ORIENTATION', 'QUALITY', 'SECURITY', 'ARCHITECTURE', 'CONTINUOUS-DELIVERY'];
  
  const filteredBranches = skillPath?.branches?.filter(branch => {
    // Always include base branches
    if (baseTracks.includes(branch.id)) {
      return true;
    }
    
    // Include specialty branches only if they're in the selectedEmphasis array
    if (selectedEmphasis.length > 0) {
      const branchLowerCase = branch.id.toLowerCase();
      return selectedEmphasis.some(emphasis => emphasis.toLowerCase() === branchLowerCase);
    }
    
    return false;
  }) || [];

  // Loading state
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
            {hasEvalParam && (
              <ActionsDrawer 
                onExport={handleExportEvaluation}
                onImport={handleImportEvaluation}
              />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto py-5 px-[16px]">
        {!hasEvalParam ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-8">Bem-vindo ao Skill Branch Mapper</h2>
            <div className="flex flex-col gap-6 w-full max-w-md">
              {showJsonImport ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Importar Avaliação</h3>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept=".json"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          try {
                            const data = JSON.parse(e.target?.result as string);
                            handleImportEvaluation(data);
                            toast.success("Avaliação carregada com sucesso");
                          } catch (error) {
                            toast.error("Erro ao carregar o arquivo JSON");
                          }
                        };
                        reader.readAsText(file);
                      }}
                      className="w-full border rounded p-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowJsonImport(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              ) : showCsvImport ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Importar CSV de Comportamentos</h3>
                  <CsvUploader onImport={handleImportEvaluation} onClose={() => setShowCsvImport(false)} />
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowCsvImport(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    size="lg"
                    onClick={() => setShowJsonImport(true)}
                    className="py-8 text-lg"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Carregar Avaliação em JSON
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setShowCsvImport(true)}
                    className="py-8 text-lg"
                    variant="outline"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Carregar CSV de comportamentos
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <CareerSelector
              selectedCareerId={selectedCareerId}
              onCareerChange={handleCareerChange}
            />
            <div>
              <label className="block text-sm font-medium mb-1">Carreira</label>
              <EmphasisSelector
                selectedEmphasis={selectedEmphasis}
                onEmphasisChange={handleEmphasisChange}
              />
            </div>
            
            {selectedCareerId && selectedEmphasis.length > 0 && (
              <LevelTrackSelector 
                branches={filteredBranches}
                selectedLevel={selectedLevel}
                selectedTrack={selectedTrack}
                onLevelChange={handleLevelChange}
                onTrackChange={handleTrackChange}
              />
            )}

            {selectedCareerId && selectedEmphasis.length > 0 ? (
              <>
                <ProgressSummary skillPath={skillPath} selectedTrack={selectedTrack} />
                
                <div className="flex flex-col gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => resetAllEvaluations()}
                  >
                    Reiniciar Avaliação
                  </Button>
                </div>

                <div className="flex flex-col">
                  <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <h2 className="text-lg font-bold mb-3">Trilhas de Competência</h2>
                    <SkillBranches
                      branches={filteredBranches}
                      skillPath={skillPath}
                      onEvaluateCommit={evaluateCommit}
                      selectedLevel={selectedLevel}
                      selectedTrack={selectedTrack}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {selectedCareerId ? 
                  'Selecione uma carreira para visualizar as trilhas de competência' :
                  'Selecione uma carreira para começar'}
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Index;
