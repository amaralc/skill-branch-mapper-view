
import React, { useState } from 'react';
import { Commit } from '@/data/skillData';
import { BookOpen } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
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
  { label: 'Consistentemente', value: 2, color: 'border-green-400 text-green-600' }
];

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
  const getValueFromEval = (evalValue: Commit['evaluation']) => {
    if (evalValue === 'sometimes') return 1;
    if (evalValue === 'always') return 2;
    return 0;
  };

  const getEvalFromValue = (sliderVal: number): 'never' | 'sometimes' | 'always' => {
    if (sliderVal === 0) return 'never';
    if (sliderVal === 1) return 'sometimes';
    return 'always';
  };

  const sliderValue = [getValueFromEval(commit.evaluation)];

  const getCurrentLabel = () => {
    const value = sliderValue[0];
    const found = evaluationValues.find(ev => ev.value === value);
    return found ? found.label : '';
  };

  let borderTextClass = "";
  {
    const val = getValueFromEval(commit.evaluation);
    borderTextClass = evaluationValues.find(ev => ev.value === val)?.color ?? '';
  }

  const handleValueChange = ([val]: number[]) => {
    if (disabled) return;
    onEvaluate(getEvalFromValue(val));
  };

  const [checkedRefs, setCheckedRefs] = useState<{ [id: number]: boolean }>({});

  const handleCheckRef = (id: number) => {
    setCheckedRefs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={`flex items-center mb-2 ${isLast ? '' : 'pb-1'}`}>
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-mono"
        style={{ backgroundColor: branchColor }}
      >
        <span className="text-white">
          {commit.metadata?.baseBehavior || ''}
        </span>
      </div>
      <div
        className={`flex-1 flex items-center rounded border bg-white shadow-sm transition-shadow 
          ${borderTextClass}
          ${disabled ? 'opacity-50 pointer-events-auto' : ''}`}
        style={{ minHeight: "2.25rem", padding: "0.5rem 1rem" }}
      >
        <div className="flex flex-col flex-1 justify-center">
          <h4 className={`font-medium text-sm leading-tight ${borderTextClass.replace('border-', 'text-')}`}>
            {commit.behaviorDescription}
          </h4>
        </div>

        <div className="flex items-center mx-2">
          <Drawer shouldScaleBackground={false}>
            <DrawerTrigger asChild>
              <button
                className={`p-1 rounded text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label="Ver referências sugeridas"
                type="button"
              >
                <BookOpen size={20} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-white">
              <DrawerHeader>
                <DrawerTitle>Referências para se aprimorar</DrawerTitle>
                <DrawerDescription className="text-gray-600">
                  Material de estudo para desenvolver esta competência
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pt-0">
                <ul className="space-y-3">
                  {references.map(ref =>
                    <li key={ref.id} className="flex items-center gap-2">
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

        <div className="flex flex-col items-end ml-3" style={{ minWidth: 56 }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-14">
                <Slider
                  min={0}
                  max={2}
                  step={1}
                  value={sliderValue}
                  onValueChange={handleValueChange}
                  className={`w-14 ${disabled ? 'cursor-not-allowed' : ''}`}
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
