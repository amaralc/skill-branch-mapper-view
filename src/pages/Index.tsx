
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
import { Upload, FileText, AlertCircle } from 'lucide-react';
import CsvUploader from '@/components/CsvUploader';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const evalParam = searchParams.get('eval');
  
  const defaultCareer = careerPaths.find(path => path.id === "software") || careerPaths[0];
  const [selectedCareerId, setSelectedCareerId] = useState(defaultCareer.id);
  const [selectedEmphasis, setSelectedEmphasis] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>('T'); // Default to Technical track
  const [showCsvImport, setShowCsvImport] = useState(false);
  const [hasValidEvaluation, setHasValidEvaluation] = useState(false);
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [importedData, setImportedData] = useState<any>(null);
  
  const jsonFileInputRef = useRef<HTMLInputElement>(null);

  const { 
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
  } = useEvaluationState(defaultCareer);

  // Check if we have a valid evaluation when component mounts
  useEffect(() => {
    const checkEvaluation = async () => {
      if (evalParam) {
        const exists = await evaluationExists(evalParam);
        setHasValidEvaluation(exists);
      } else {
        setHasValidEvaluation(false);
      }
    };
    
    checkEvaluation();
  }, [evalParam]);

  // Load saved evaluation metadata when component mounts or evaluation changes
  useEffect(() => {
    if (evaluationMeta.careerId) {
      console.log("Setting career ID from evaluationMeta:", evaluationMeta.careerId);
      setSelectedCareerId(evaluationMeta.careerId);
    }
    
    if (evaluationMeta.selectedLevel !== undefined) {
      console.log("Setting level from evaluationMeta:", evaluationMeta.selectedLevel);
      setSelectedLevel(evaluationMeta.selectedLevel);
    }
    
    if (evaluationMeta.selectedTrack !== undefined) {
      console.log("Setting track from evaluationMeta:", evaluationMeta.selectedTrack);
      setSelectedTrack(evaluationMeta.selectedTrack);
    }

    if (evaluationMeta.specialties) {
      console.log("Setting emphasis from evaluationMeta:", evaluationMeta.specialties);
      setSelectedEmphasis(evaluationMeta.specialties);
    }
  }, [evaluationMeta]);

  // Handle functions for career, emphasis, level, and track changes
  const handleCareerChange = (careerId: string) => {
    setSelectedCareerId(careerId);
    
    if (hasValidEvaluation) {
      // Only update career in the evaluation metadata if an evaluation exists
      updateEvaluationMeta({ 
        careerId,
        selectedTrack: 'T' // Always set default track when career changes
      });
    }
  };

  const handleEmphasisChange = (emphasisIds: string[]) => {
    setSelectedEmphasis(emphasisIds);
    
    if (hasValidEvaluation) {
      // Save the emphasis selection to IndexedDB only if an evaluation exists
      updateEvaluationMeta({ specialties: emphasisIds });
    }
  };

  const handleLevelChange = (level: string) => {
    const newLevel = level === "" ? null : level;
    setSelectedLevel(newLevel);
    
    if (hasValidEvaluation) {
      // Save the level selection to IndexedDB only if an evaluation exists
      updateEvaluationMeta({ selectedLevel: newLevel });
    }
  };

  const handleTrackChange = (track: string) => {
    const newTrack = track === "" ? null : track;
    setSelectedTrack(newTrack);
    
    if (hasValidEvaluation) {
      // Save the track selection to IndexedDB only if an evaluation exists
      updateEvaluationMeta({ selectedTrack: newTrack });
    }
  };

  const handleExportEvaluation = () => {
    const evaluationData = {
      skillPath,
      timestamp: Date.now(),
      id: searchParams.get('eval'),
      careerId: selectedCareerId,
      selectedLevel,
      selectedTrack,
      specialties: selectedEmphasis
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

  const handleConfirmOverride = async () => {
    if (!importedData) return;
    
    try {
      console.log("Confirming override with imported data:", importedData);
      
      // Continue with handling the import
      // If this is an existing evaluation with the same ID, we'll override both
      // the data and the URL timestamp
      const currentEvalId = searchParams.get('eval');
      
      if (currentEvalId && importedData.id && currentEvalId === importedData.id) {
        console.log("Updating existing evaluation with same ID");
        
        // Update URL with the imported timestamp
        const params = new URLSearchParams(searchParams);
        params.set('eval', importedData.id);
        params.set('timestamp', importedData.timestamp.toString());
        setSearchParams(params);
        
        // Reset evaluation with the imported data
        resetAllEvaluations(importedData.skillPath);
        
        // Update all metadata at once
        updateEvaluationMeta({
          careerId: importedData.careerId,
          selectedLevel: importedData.selectedLevel, 
          selectedTrack: importedData.selectedTrack,
          specialties: importedData.specialties
        });
        
        setHasValidEvaluation(true);
        toast.success("Avaliação atualizada com sucesso");
      } else {
        console.log("Creating new evaluation from imported data");
        // Create new evaluation
        await createNewEvaluation(importedData.skillPath, {
          careerId: importedData.careerId,
          selectedLevel: importedData.selectedLevel,
          selectedTrack: importedData.selectedTrack,
          specialties: importedData.specialties
        });
        setHasValidEvaluation(true);
        toast.success("Avaliação importada com sucesso");
      }
    } catch (error) {
      console.error("Error handling override:", error);
      toast.error("Erro ao importar avaliação");
    } finally {
      setImportedData(null);
      setShowOverrideDialog(false);
    }
  };

  const handleCancelOverride = () => {
    console.log("Override cancelled by user");
    setImportedData(null);
    setShowOverrideDialog(false);
  };

  const handleImportEvaluation = async (data: any) => {
    try {
      console.log("Handling evaluation import:", data);
      
      // Check if we're importing an evaluation with the same ID as the current one
      const currentEvalId = searchParams.get('eval');
      
      if (currentEvalId && data.id && currentEvalId === data.id) {
        console.log("Same ID detected, showing confirmation dialog", {
          currentId: currentEvalId,
          importedId: data.id
        });
        // Store the data temporarily and show confirmation dialog
        setImportedData(data);
        setShowOverrideDialog(true);
        return;
      }
      
      // Check if it's the new format with metadata
      if (data.careerId) {
        setSelectedCareerId(data.careerId);
        setSelectedLevel(data.selectedLevel);
        setSelectedTrack(data.selectedTrack);
        
        // Set specialties if available
        if (data.specialties && Array.isArray(data.specialties)) {
          setSelectedEmphasis(data.specialties);
        }
        
        // If we're importing an evaluation with an ID and timestamp
        if (data.id) {
          // Use the existing ID from the imported data
          const params = new URLSearchParams(searchParams);
          params.set('eval', data.id);
          params.set('timestamp', data.timestamp.toString());
          setSearchParams(params);
          
          // Reset evaluation with the imported data
          resetAllEvaluations(data.skillPath);
          
          // Update all metadata at once
          updateEvaluationMeta({
            careerId: data.careerId,
            selectedLevel: data.selectedLevel, 
            selectedTrack: data.selectedTrack,
            specialties: data.specialties
          });
        } else {
          // Create a new evaluation if there's no ID in the imported data
          await createNewEvaluation(data.skillPath, {
            careerId: data.careerId,
            selectedLevel: data.selectedLevel,
            selectedTrack: data.selectedTrack,
            specialties: data.specialties
          });
        }
      } else {
        // Handle legacy format (just skillPath)
        resetAllEvaluations(data);
      }
      
      // Hide the import dialogs
      setShowCsvImport(false);
      setHasValidEvaluation(true);
    } catch (error) {
      console.error("Erro ao importar avaliação:", error);
      toast.error("Erro ao importar avaliação");
    }
  };

  // Function to trigger file input click
  const handleJsonButtonClick = () => {
    if (jsonFileInputRef.current) {
      jsonFileInputRef.current.click();
    }
  };

  // Handle file selection for JSON import
  const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          
          if (data.skillPath) {
            console.log("JSON file parsed successfully:", { 
              hasId: !!data.id,
              currentEvalId: searchParams.get('eval')
            });
            
            // Check if we're importing an evaluation with the same ID as the current one
            const currentEvalId = searchParams.get('eval');
            
            if (currentEvalId && data.id && currentEvalId === data.id) {
              console.log("Same ID detected in file selection, showing dialog");
              // Store the data temporarily and show confirmation dialog
              setImportedData(data);
              setShowOverrideDialog(true);
              return;
            }
            
            // If no conflict, proceed with import
            await createNewEvaluation(data.skillPath, {
              careerId: data.careerId,
              selectedLevel: data.selectedLevel,
              selectedTrack: data.selectedTrack,
              specialties: data.specialties
            });
            setHasValidEvaluation(true);
            toast.success("Avaliação carregada com sucesso");
          } else {
            // Handle legacy format or invalid data
            toast.error("Formato de avaliação inválido");
          }
        } catch (error) {
          console.error("JSON parse error:", error);
          toast.error("Erro ao carregar o arquivo JSON");
        }
      };
      reader.readAsText(file);
    } finally {
      // Clear the input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  // Handle CSV import - This is the only way to start a new evaluation
  const handleCsvImport = async (importedSkillPath: SkillPath) => {
    try {
      // Create a new evaluation with default values
      await createNewEvaluation(importedSkillPath, {
        careerId: defaultCareer.id,
        selectedTrack: 'T'
      });
      
      // Hide CSV import dialog and mark evaluation as valid
      setShowCsvImport(false);
      setHasValidEvaluation(true);
      toast.success("CSV importado com sucesso");
    } catch (error) {
      console.error("Error importing CSV:", error);
      toast.error("Erro ao importar CSV");
    }
  };

  // Define which branches are base competencies - now this is just for filtering, not hardcoded data
  const baseTracks = ['ACCOUNTABILITY', 'ADAPTABILITY', 'COMMUNICATION', 'CONTINUOUS-DEVELOPMENT', 
                      'EMOTIONAL-INTELLIGENCE', 'RESULTS-ORIENTATION', 'QUALITY', 'SECURITY', 
                      'ARCHITECTURE', 'CONTINUOUS-DELIVERY'];
  
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

  // Show a message when no data is available
  const showNoDataMessage = !isLoading && (!skillPath.branches || skillPath.branches.length === 0) && hasValidEvaluation;

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
            {hasValidEvaluation && (
              <ActionsDrawer 
                onExport={handleExportEvaluation}
                onImport={handleImportEvaluation}
                currentTimestamp={timestamp}
              />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto py-5 px-[16px]">
        {!hasValidEvaluation ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-8">Bem-vindo ao Skill Branch Mapper</h2>
            <div className="flex flex-col gap-6 w-full max-w-md">
              {showCsvImport ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Importar CSV de Comportamentos</h3>
                  <CsvUploader onImport={handleCsvImport} onClose={() => setShowCsvImport(false)} />
                  <div className="flex justify-end gap-2 mt-4">
                    {/* ... keep existing code (for buttons) */}
                  </div>
                </div>
              ) : (
                <>
                  <Alert className="bg-blue-50 border-blue-300">
                    <AlertCircle className="h-4 w-4 text-blue-800" />
                    <AlertTitle className="text-blue-800">Informação</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      Todos os comportamentos avaliados devem ser importados via CSV ou de uma avaliação prévia.
                      Não existem comportamentos pré-definidos.
                    </AlertDescription>
                  </Alert>
                
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Importar CSV de Comportamentos</h3>
                    <p className="text-gray-600 mb-4">
                      Importe um arquivo CSV contendo os comportamentos desejados para avaliação.
                    </p>
                    <Button
                      onClick={() => setShowCsvImport(true)}
                      className="w-full flex gap-2 items-center justify-center bg-black hover:bg-gray-800 text-white"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Importar CSV</span>
                    </Button>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Importar Avaliação Existente</h3>
                    <p className="text-gray-600 mb-4">
                      Carregue uma avaliação salva anteriormente no formato JSON.
                    </p>
                    <Button
                      onClick={handleJsonButtonClick}
                      className="w-full flex gap-2 items-center justify-center"
                      variant="outline"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Importar JSON</span>
                    </Button>
                    <input
                      ref={jsonFileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleFileSelection}
                      className="hidden"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            {showNoDataMessage ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <Alert className="bg-amber-50 border-amber-300 mb-4 max-w-3xl">
                  <AlertCircle className="h-5 w-5 text-amber-800" />
                  <AlertTitle className="text-amber-800 text-lg">Nenhum comportamento encontrado</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    Não existem comportamentos para avaliação nesta trilha. Importe um arquivo CSV com os comportamentos desejados.
                  </AlertDescription>
                </Alert>
                <Button
                  onClick={() => setShowCsvImport(true)}
                  className="flex gap-2 items-center justify-center bg-black hover:bg-gray-800 text-white"
                >
                  <Upload className="w-4 h-4" />
                  <span>Importar CSV de Comportamentos</span>
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <div className="mb-4">
                      <CareerSelector 
                        selectedCareerId={selectedCareerId}
                        onChange={handleCareerChange}
                      />
                    </div>
                    <div className="mb-4">
                      <EmphasisSelector
                        selectedSpecialties={selectedEmphasis}
                        onChange={handleEmphasisChange}
                      />
                    </div>
                    <div className="mb-4">
                      <LevelTrackSelector
                        branches={skillPath.branches || []} 
                        selectedLevel={selectedLevel}
                        selectedTrack={selectedTrack}
                        onLevelChange={handleLevelChange}
                        onTrackChange={handleTrackChange}
                      />
                    </div>
                    <div className="mb-4">
                      <ProgressSummary
                        skillPath={skillPath}
                        selectedTrack={selectedTrack}
                        selectedLevel={selectedLevel}
                        selectedSpecialties={selectedEmphasis}
                      />
                    </div>
                  </div>
                </div>
                
                <SkillBranches
                  branches={filteredBranches}
                  skillPath={skillPath}
                  onEvaluateCommit={evaluateCommit}
                  onUpdateComment={updateComment}
                  selectedLevel={selectedLevel}
                  selectedTrack={selectedTrack}
                />
              </>
            )}
          </>
        )}
      </main>

      {/* Override confirmation dialog */}
      <AlertDialog open={showOverrideDialog} onOpenChange={setShowOverrideDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Substituir avaliação atual?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está importando uma avaliação com o mesmo ID da atual. 
              Isso substituirá todos os dados da avaliação atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelOverride}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmOverride}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Index;
