
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { SkillPath } from '@/types/skill';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface SeniorityLevelsSheetProps {
  skillPath: SkillPath;
}

const SeniorityLevelsSheet: React.FC<SeniorityLevelsSheetProps> = ({ skillPath }) => {
  if (!skillPath.tags || skillPath.tags.length === 0) return null;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          <GraduationCap className="mr-2" size={16} />
          Níveis de Senioridade
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="max-w-[600px] mx-auto p-4">
          <h3 className="font-medium text-gray-700 mb-4 flex items-center">
            <GraduationCap className="mr-2" size={16} />
            Níveis de Senioridade
          </h3>
          <div className="space-y-3">
            {skillPath.tags.map(tag => (
              <div key={tag.id} className="bg-gray-50 p-3 rounded border">
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
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SeniorityLevelsSheet;
