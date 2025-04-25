
import React, { useRef } from 'react';
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Download, Upload, Menu, RotateCcw, GraduationCap } from 'lucide-react';
import { toast } from "sonner";
import { SkillPath } from '@/data/skillData';

interface ActionsDrawerProps {
  onExport: () => void;
  onImport: (importedData: SkillPath) => void;
  onReset: () => void;
  skillPath: SkillPath;
}

const ActionsDrawer = ({ onExport, onImport, onReset, skillPath }: ActionsDrawerProps) => {
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

      onImport(importedData.skillPath);
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
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10 focus:bg-white/10"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-6">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex flex-col gap-4 pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onReset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar Avaliação
            </Button>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Níveis de Senioridade
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="max-w-[600px] mx-auto p-4">
                  <DrawerTitle className="font-medium text-gray-700 mb-4 flex items-center">
                    <GraduationCap className="mr-2" size={16} />
                    Níveis de Senioridade
                  </DrawerTitle>
                  <div className="space-y-3">
                    {skillPath && skillPath.tags && skillPath.tags.map(tag => (
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
