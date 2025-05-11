import React, { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import CsvUploader from '@/components/CsvUploader';
import { SkillPath, Emphasis } from '@/types/skill';

interface ActionsDrawerProps {
  onExport: () => void;
  onImport: (skillPath: SkillPath) => void;
  onSpecialtiesExtracted?: (specialties: Emphasis[]) => void;
}

const ActionsDrawer: React.FC<ActionsDrawerProps> = ({ onExport, onImport, onSpecialtiesExtracted }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger>
        <Button variant="outline">
          <Menu className="w-4 h-4 mr-2" />
          Ações
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Ações</DrawerTitle>
          <DrawerDescription>
            Importe, exporte ou reinicie sua avaliação.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex flex-col gap-4">
          <CsvUploader onImport={onImport} onClose={handleCloseDrawer} onSpecialtiesExtracted={onSpecialtiesExtracted} />
          <Button variant="outline" onClick={onExport}>
            Exportar Avaliação
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ActionsDrawer;
