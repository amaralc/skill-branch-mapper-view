
import React from 'react';
import { Tag, SkillPath } from '@/types/skill';
import { GraduationCap } from 'lucide-react';
import { getLevelTitle } from '@/utils/filterHelpers';

interface TagIllustratedNodeProps {
  tag: Tag;
  skillPath: SkillPath;
  imageSrc: string;
}

// Level description mapping
const levelDescriptions: Record<string, string> = {
  "Estagiário": "Atua em escopo fechado e tarefas de baixa complexidade, com supervisão constante e apoio para lidar com baixa ambiguidade. Impacta seu time.",
  "Assistente": "Executa tarefas simples e estruturadas em escopo reduzido, com orientação frequente e foco em ganhar autonomia. Impacta seu time.",
  "Júnior": "Atua com orientação em escopo fechado, baixa ambiguidade e complexidade moderada. Apoia colegas iniciantes. Impacta seu time.",
  "Pleno": "Atua com autonomia em escopo definido, lidando com ambiguidade moderada e complexidade crescente. Apoia e orienta colegas juniores. Impacta seu time.",
  "Sênior": "Resolve problemas de alta complexidade em escopo aberto e ambíguo. Desenvolve autonomia técnica do time. Impacta múltiplos times no setor.",
  "Staff": "Atua em escopos amplos e abertos, definindo padrões e decisões técnicas para múltiplos times. Desenvolve líderes técnicos. Amplifica impacto técnico no setor.",
  "Coordenador": "Mesmo escopo que Staff, com foco adicional em coordenação de pessoas e processos. Amplifica impacto técnico e organizacional no setor.",
  "Principal": "Lidera técnica e estrategicamente múltiplos times e domínios. Define padrões e práticas com impacto sistêmico em toda a organização.",
  "Gerente": "Mesmo escopo que Principal, com foco em direção técnica e organizacional, fortalecendo estratégia e governança em toda a organização.",
  "Diretor": "Define estratégia técnica e organizacional de longo prazo, com impacto estratégico em múltiplos domínios ou organizações interconectadas."
};

const TagIllustratedNode: React.FC<TagIllustratedNodeProps> = ({ tag, skillPath, imageSrc }) => {
  // Extract the title from the level name (e.g., "L3-T - Pleno" -> "Pleno")
  const levelCode = tag.name;
  const levelDisplay = getLevelTitle(levelCode);
  const levelTitle = levelDisplay.split(' - ')[1] || levelCode;
  
  // Get the description based on the level title
  const description = levelDescriptions[levelTitle] || tag.description;
  
  return (
    <div className="flex items-center mb-6 ml-8">
      <div className="relative flex items-center">
        <img
          src={imageSrc}
          alt={levelTitle}
          className="w-16 h-16 rounded-xl object-cover shadow mr-4 border border-gray-300"
        />
        <span className="absolute top-0 left-0 bg-white rounded-br px-2 py-0.5 text-xs font-mono border text-gray-700 shadow border-gray-200 bg-white/60">
          {levelCode}
        </span>
      </div>
      <div className="flex-1 border rounded p-2 transition bg-gray-50 border-gray-300 text-gray-600">
        <div className="flex items-center">
          <GraduationCap
            className="text-gray-500 mr-2"
            size={18}
          />
          <span className="font-bold text-sm mr-2">{levelDisplay}</span>
        </div>
        <div className="text-xs mt-1">{tag.level}</div>
        {description && <div className="text-xs mt-1 text-gray-500">{description}</div>}
      </div>
    </div>
  );
};

export default TagIllustratedNode;
