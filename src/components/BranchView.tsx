
import React from 'react';
import { Branch, SkillPath, Tag } from '@/data/skillData';
import CommitNode from './CommitNode';
import TagIllustratedNode from './TagIllustratedNode';
import { dataScientistPath, calculatePoints } from '@/data/skillData';

// Lista de imagens placeholder para as tags
const images = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=160&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=160&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=160&q=80",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=160&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=160&q=80",
  "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=160&q=80",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=160&q=80",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=160&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=160&q=80"
];

interface BranchViewProps {
  branch: Branch;
  onEvaluateCommit: (branchId: string, commitId: string, evaluation: 'never' | 'sometimes' | 'always') => void;
  isCurrentBranch: boolean;
}

interface CommitLock {
  index: number;
  locked: boolean;
}

// Auxiliar: retorna os índices de início/fim dos níveis (tags) da branch
function getTagLevelsForBranch(branchId: string): { start: number, end: number, tag: Tag }[] {
  const tags = dataScientistPath.tags.filter(tag => tag.branchId === branchId);
  if (tags.length === 0) return [];
  // Ordena por commitIndex crescente
  const sortedTags = [...tags].sort((a, b) => a.commitIndex - b.commitIndex);
  const levels: { start: number, end: number, tag: Tag }[] = [];
  let prevEnd = -1;
  for (let i = 0; i < sortedTags.length; i++) {
    const start = prevEnd + 1;
    const end = sortedTags[i].commitIndex;
    levels.push({ start, end, tag: sortedTags[i] });
    prevEnd = end;
  }
  // Adiciona um último nível (caso haja commits depois da última tag) -- neste design, opcional
  return levels;
}

// Verifica se todos os commits do nível estão em avaliação máxima
function isLevelCompleted(commits: Branch['commits'], start: number, end: number): boolean {
  for (let i = start; i <= end; i++) {
    if (commits[i] && commits[i].evaluation !== 'always') {
      return false;
    }
  }
  return true;
}

// Mapeia cada commit para sua situação de bloqueio (locked = true se não pode avaliar)
function getCommitLocks(commits: Branch['commits'], tagLevels: { start: number, end: number, tag: Tag }[]) {
  const locks: CommitLock[] = [];
  // Se não há tags, tudo liberado
  if (tagLevels.length === 0) {
    return commits.map((_, idx) => ({ index: idx, locked: false }));
  }
  // Para cada nível, bloqueia se anterior não completo
  let prevLevelComplete = true;
  for (let lvl = 0; lvl < tagLevels.length; lvl++) {
    const { start, end } = tagLevels[lvl];
    // Se não é o primeiro nível, depende do anterior estar completo
    if (lvl > 0) {
      prevLevelComplete = isLevelCompleted(commits, tagLevels[lvl - 1].start, tagLevels[lvl - 1].end);
    }
    for (let i = start; i <= end; i++) {
      locks[i] = { index: i, locked: !prevLevelComplete };
    }
  }
  // Libera qualquer commit que NÃO está coberto por tags (entre níveis? incomum, mas segurança)
  for (let i = 0; i < commits.length; i++) {
    if (typeof locks[i] === 'undefined') {
      locks[i] = { index: i, locked: false };
    }
  }
  return locks;
}

const BranchView: React.FC<BranchViewProps> = ({ branch, onEvaluateCommit, isCurrentBranch }) => {
  // Pegando todas as tags desta branch
  const tagsForBranch = dataScientistPath.tags.filter(
    tag => tag.branchId === branch.id
  );
  
  // Obter "níveis" de commits conforme as tags
  const tagLevels = getTagLevelsForBranch(branch.id);

  // Calcular bloqueios de cada commit
  const commitLocks = getCommitLocks(branch.commits, tagLevels);

  // Renderiza commits e intercala os componentes TagIllustratedNode quando necessário
  const items: React.ReactNode[] = [];
  branch.commits.forEach((commit, idx) => {
    // Checa se esse commit está bloqueado
    const lock = commitLocks[idx]?.locked ?? false;
    items.push(
      <CommitNode
        key={commit.id}
        commit={commit}
        branchColor={branch.color}
        isLast={idx === branch.commits.length - 1}
        onEvaluate={evaluation => !lock && onEvaluateCommit(branch.id, commit.id, evaluation)}
        // Passa disabled e uma tooltip opcional se bloqueado
        disabled={lock}
        lockReason={
          lock ? "Para avaliar este item, conclua todos os anteriores deste nível com 'Sempre'." : undefined
        }
      />
    );
    // Verificar se após esse commit existe uma tag nesta branch para este índice
    tagsForBranch.forEach((tag, tagIdx) => {
      if (tag.commitIndex === idx) {
        // alterna imagens pelo índice da tag
        const img = images[tagIdx % images.length];
        items.push(
          <TagIllustratedNode
            key={`tag-${tag.id}`}
            tag={tag}
            branch={branch}
            skillPath={dataScientistPath}
            imageSrc={img}
          />
        );
      }
    });
  });

  return (
    <div className={`mb-8 ${isCurrentBranch ? 'opacity-100' : 'opacity-60'}`}>
      <div className="flex items-center mb-2">
        <div 
          className="px-3 py-1 rounded text-white font-mono text-sm font-bold inline-flex items-center mr-2" 
          style={{ backgroundColor: branch.color }}
        >
          {branch.name}
        </div>
      </div>
      <div className="relative">
        {/* Linha vertical da branch */}
        <div 
          className="absolute left-4 top-4 h-[calc(100%-8px)] w-1 z-0" 
          style={{ backgroundColor: branch.color }}
        ></div>
        {/* Commits e tags ilustradas */}
        <div className="relative z-10">
          {items}
        </div>
      </div>
    </div>
  );
};

export default BranchView;
