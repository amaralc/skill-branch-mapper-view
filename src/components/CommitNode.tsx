
import React, { useState } from 'react';
import { Commit } from '@/data/skillData';
import { GitCommitHorizontal, BookOpen } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Checkbox } from "@/components/ui/checkbox"; // Assume-se que existe um Checkbox do shadcn/ui
// Se não existir, pode ser trocado por input type="checkbox"
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CommitNodeProps {
  commit: Commit;
  branchColor: string;
  isLast: boolean;
  onEvaluate: (evaluation: 'never' | 'sometimes' | 'always') => void;
  disabled?: boolean;
  lockReason?: string;
}

const evaluationValues = [
  { label: 'Nunca', value: 0, color: 'border-red-400 text-red-600' },
  { label: 'Às Vezes', value: 1, color: 'border-yellow-400 text-yellow-600' },
  { label: 'Sempre', value: 2, color: 'border-green-400 text-green-600' }
];

// Lista fake de referências do drawer
const references = [
  { id: 1, label: "Livro: Testes Automatizados Modernos (Cap. 3 e 4)" },
  { id: 2, label: "Artigo: Como Escrever Testes Úteis - Dev.to" },
  { id: 3, label: "Curso: Testes em Software na Prática - Udemy" },
  { id: 4, label: "Workshop: Revisão de Código Colaborativa" },
];

const CommitNode: React.FC<CommitNodeProps> = ({
  commit,
  branchColor,
  isLast,
  onEvaluate,
  disabled = false,
  lockReason
}) => {
  // O valor do slider depende da avaliação, default é "never" (0)
  const getValueFromEval = (evalValue: Commit['evaluation']) => {
    if (evalValue === 'sometimes') return 1;
    if (evalValue === 'always') return 2;
    // default para nunca avaliado OU null/undefined, sempre "nunca"
    return 0;
  };

  const getEvalFromValue = (sliderVal: number): 'never' | 'sometimes' | 'always' => {
    if (sliderVal === 0) return 'never';
    if (sliderVal === 1) return 'sometimes';
    return 'always';
  };

  // Sempre parte de "nunca" se commit.evaluation for null/undefined
  const sliderValue = [getValueFromEval(commit.evaluation)];

  const getCurrentLabel = () => {
    const value = sliderValue[0];
    const found = evaluationValues.find(ev => ev.value === value);
    return found ? found.label : '';
  };

  // Aplica classes da cor da avaliação, sempre!
  let borderTextClass = "";
  {
    const val = getValueFromEval(commit.evaluation);
    borderTextClass = evaluationValues.find(ev => ev.value === val)?.color ?? '';
  }

  const handleValueChange = ([val]: number[]) => {
    if (disabled) return;
    onEvaluate(getEvalFromValue(val));
  };

  // Estado local para checkboxes do drawer só para mostrar controles básicos
  const [checkedRefs, setCheckedRefs] = useState<{ [id: number]: boolean }>({});

  const handleCheckRef = (id: number) => {
    setCheckedRefs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={`flex items-center mb-2 ${isLast ? '' : 'pb-1'}`}>
      {/* Linha e círculo do commit */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
        style={{ backgroundColor: branchColor }}
      >
        <GitCommitHorizontal className="text-white" size={16} />
      </div>
      {/* Caixa do texto, altura reduzida */}
      <div
        className={`flex-1 flex items-center rounded border bg-white shadow-sm transition-shadow 
          ${borderTextClass}
          ${disabled ? 'opacity-50 pointer-events-auto' : ''}`}
        style={{ minHeight: "2.25rem", padding: "0.5rem 1rem" }}
      >
        <div className="flex flex-col flex-1 justify-center">
          <h4 className={`font-medium text-sm leading-tight ${borderTextClass.replace('border-', 'text-')}`}>
            {commit.message}
          </h4>
        </div>

        {/* Ícone do drawer (referências) - à esquerda do slider */}
        <div className="flex items-center mx-2">
          <Drawer>
            <DrawerTrigger asChild>
              <button
                className={`p-1 border-2 rounded text-gray-700 hover:text-blue-600 hover:border-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label="Ver referências sugeridas"
                type="button"
              >
                <BookOpen size={20} />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Referências para se aprimorar</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 pt-2">
                <div className="mb-2 text-sm text-gray-600">Considere estudar/utilizar:</div>
                <ul className="space-y-3">
                  {references.map(ref =>
                    <li key={ref.id} className="flex items-center gap-2">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={!!checkedRefs[ref.id]}
                        onChange={() => handleCheckRef(ref.id)}
                        className="accent-blue-500 w-4 h-4 rounded border border-gray-300"
                        id={`refcheck-${ref.id}`}
                      />
                      <label htmlFor={`refcheck-${ref.id}`} className="text-sm">{ref.label}</label>
                    </li>
                  )}
                </ul>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Inline slider alinhado à direita com tooltip */}
        <div className="flex flex-col items-end ml-3" style={{ minWidth: 112 }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-28">
                <Slider
                  min={0}
                  max={2}
                  step={1}
                  value={sliderValue}
                  onValueChange={handleValueChange}
                  className={`w-28 ${disabled ? 'cursor-not-allowed' : ''}`}
                  disabled={disabled}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              {disabled && lockReason
                ? <span className="block text-xs font-medium text-red-500">{lockReason}</span>
                : <span className="block text-xs font-medium">{getCurrentLabel()}</span>
              }
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CommitNode;
