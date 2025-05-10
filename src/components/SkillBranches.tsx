
import React from 'react';
import { Branch, SkillPath } from '@/types/skill';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import BranchView from '@/components/BranchView';

interface SkillBranchesProps {
  branches: Branch[];
  skillPath: SkillPath;
  onEvaluateCommit: (branchId: string, commitId: string, evaluation: 'never' | 'sometimes' | 'always') => void;
  selectedLevel: string | null;
  selectedTrack: string | null;
}

const SkillBranches: React.FC<SkillBranchesProps> = ({
  branches,
  skillPath,
  onEvaluateCommit,
  selectedLevel,
  selectedTrack
}) => {
  // Filter branches to only include those with commits
  const branchesWithCommits = branches.filter(branch => {
    // If filtering by track, only include branches with commits for that track
    if (selectedTrack) {
      const hasCommitsForTrack = branch.commits.some(commit => 
        !commit.metadata?.track || commit.metadata.track === selectedTrack
      );
      return branch.commits.length > 0 && hasCommitsForTrack;
    }
    return branch.commits.length > 0;
  });
  
  // Verificar se há branches disponíveis para evitar erro
  if (branchesWithCommits.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        Nenhuma competência disponível para os critérios selecionados.
      </div>
    );
  }
  
  return (
    <Tabs defaultValue={branchesWithCommits[0]?.id} className="w-full">
      <ScrollArea className="w-full pb-4" orientation="horizontal">
        <TabsList className="w-full justify-start mb-4 bg-transparent gap-2 inline-flex">
          {branchesWithCommits.map(branch => (
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
                {!['ACCOUNTABILITY', 'ADAPTABILITY', 'COMMUNICATION', 'CONTINUOUS-DEVELOPMENT', 'EMOTIONAL-INTELLIGENCE', 'RESULTS-ORIENTATION', 'QUALITY', 'SECURITY', 'ARCHITECTURE', 'CONTINUOUS-DELIVERY'].includes(branch.id) && (
                  <span className="ml-1 text-xs text-gray-500">
                    (Especialidade)
                  </span>
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>

      {branchesWithCommits.map(branch => (
        <TabsContent key={branch.id} value={branch.id}>
          <BranchView
            branch={branch}
            onEvaluateCommit={onEvaluateCommit}
            isCurrentBranch={true}
            skillPath={skillPath}
            selectedLevel={selectedLevel}
            selectedTrack={selectedTrack}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SkillBranches;
