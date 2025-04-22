
import React, { useRef } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Download, Upload } from 'lucide-react';
import { toast } from "sonner";
import { SkillPath } from '@/data/skillData';

interface ActionsDrawerProps {
  onExport: () => void;
  onImport: (importedData: { skillPath: SkillPath; timestamp: number }) => void;
}

const ActionsDrawer = ({ onExport, onImport }: ActionsDrawerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedData = JSON.parse(text);
      
      if (!importedData.skillPath || !importedData.timestamp) {
        throw new Error("Invalid evaluation file format");
      }

      onImport(importedData);
      toast.success("Evaluation imported successfully");
    } catch (error) {
      toast.error("Failed to import evaluation file");
    }

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="text-white border-white hover:text-white">
          Ações
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-6">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex flex-col gap-4 pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onExport}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Avaliação
            </Button>
            <Button 
              variant="outline"
              className="w-full"
              onClick={handleImportClick}
            >
              <Upload className="w-4 h-4 mr-2" />
              Importar Avaliação
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileImport}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ActionsDrawer;
