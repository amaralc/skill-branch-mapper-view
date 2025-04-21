
import React, { useState } from 'react';
import { Branch, Commit, dataScientistPath } from '@/data/skillData';
import BranchView from '@/components/BranchView';
import ProgressSummary from '@/components/ProgressSummary';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectLabel } from '@/components/ui/select';

// Mock da trilha de Gestão de Produtos (substitua com dados reais depois)
const productManagementPath = {
  name: "Gestão de Produtos",
  branches: [
    {
      id: "prod1",
      name: "Fundamentos de Gestão de Produtos",
      color: "#f97316",
      commits: [
        {
          id: "pcommit1",
          name: "Entendimento do usuário",
          description: "Identificar e compreender as necessidades do usuário.",
          evaluation: null,
        },
        {
          id: "pcommit2",
          name: "Visão de Produto",
          description: "Definir a visão do produto e alinhar ao negócio.",
          evaluation: null,
        },
      ],
    },
    // Outras branches podem ser adicionadas
  ],
  tags: [
    {
      id: "nivel1",
      name: "Nível 1 - Júnior",
      level: "Júnior",
      pointsRequired: 2,
      description: "Conhecimento inicial sobre produto.",
    },
    {
      id: "nivel2",
      name: "Nível 2 - Pleno",
      level: "Pleno",
      pointsRequired: 4,
      description: "Experiência intermediária em gestão de produtos.",
    },
  ],
};

const careerOptions = [
  {
    id: 'data-scientist',
    label: 'Engenharia de Software',
    value: 'data-scientist',
    skillPath: dataScientistPath,
  },
  {
    id: 'product-management',
    label: 'Gestão de Produtos',
    value: 'product-management',
    skillPath: productManagementPath,
  },
  // Adicione mais opções aqui futuramente
];

const Index = () => {
  const [selectedCareerId, setSelectedCareerId] = useState(careerOptions[0].id);
  const [skillPath, setSkillPath] = useState(careerOptions[0].skillPath);
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);

  // Quando carreira mudar, redefinir a trilha e branch selecionada
  const handleCareerChange = (careerId: string) => {
    const found = careerOptions.find(x => x.id === careerId);
    setSelectedCareerId(careerId);
    setSkillPath(found ? found.skillPath : careerOptions[0].skillPath);
    setCurrentBranchId(null);
  };

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

  const renderTagsSection = () => {
    if (skillPath.tags.length === 0) return null;
    
    return <div className="mb-6 my-[24px]">
        <h3 className="font-medium text-gray-700 mb-2 flex items-center">
          <GraduationCap className="mr-2" size={16} />
          Níveis de Senioridade
        </h3>
        <div className="pl-4 border-l-2 border-gray-300">
          {skillPath.tags.map(tag => <div key={tag.id} className="mb-2 bg-gray-50 p-2 rounded border">
              <div className="flex items-center">
                <span className="font-bold text-sm">{tag.name}</span>
                <span className="ml-2 text-xs text-gray-600">({tag.level})</span>
              </div>
              <div className="text-xs mt-1 text-gray-500">
                Requer {tag.pointsRequired} pontos
              </div>
              {tag.description && (
                <div className="text-xs mt-1 text-gray-600">{tag.description}</div>
              )}
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

      {/* Seletor de carreira */}
      <div className="max-w-[1200px] mx-auto py-5 flex items-center gap-4">
        <div className="w-[220px] text-base font-medium">
          Selecione a carreira:
        </div>
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
      </div>

      <main className="max-w-[1200px] mx-auto py-0 px-0">
        <ProgressSummary skillPath={skillPath} />

        <div className="flex flex-col">
          <div className="bg-white rounded-lg shadow p-4 mb-6 shadow-none border-none">
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
            {renderTagsSection()}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold mb-4">
              {currentBranchId ? `Branch: ${getBranchName(currentBranchId)}` : 'Selecione uma branch para visualizar os commits'}
            </h2>
            
            {currentBranchId ? <BranchView branch={skillPath.branches.find(branch => branch.id === currentBranchId)!} onEvaluateCommit={handleEvaluateCommit} isCurrentBranch={true} /> : <div className="text-center py-12 text-gray-500">
                Selecione uma branch no menu ao lado para visualizar os commits
              </div>}
          </div>
        </div>
      </main>
    </>;
};
export default Index;
