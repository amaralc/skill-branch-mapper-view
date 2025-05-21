
import React, { useRef, useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Download, Upload, Menu } from 'lucide-react';
import { toast } from "sonner";
import { SkillPath } from '@/types/skill';
import CsvUploader from '@/components/CsvUploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEvaluation } from '@/utils/indexedDb';
import { useSearchParams } from 'react-router-dom';

interface ActionsDrawerProps {
  onExport: () => void;
  onImport: (importedData: any) => void;
  currentTimestamp: number;
}

const ActionsDrawer = ({ onExport, onImport, currentTimestamp }: ActionsDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();

  const handleImportClick = () => {
    fileInputRef.current?.click();
    // Close the drawer immediately when the file selector opens
    setIsOpen(false);
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedData = JSON.parse(text);
      
      // Check if it's a valid evaluation file (has skillPath)
      if (!importedData.skillPath) {
        throw new Error("Invalid evaluation file format");
      }
      
      // Check for timestamp and evaluation ID conflicts
      const evaluationId = searchParams.get('eval');
      
      if (evaluationId && importedData.id === evaluationId) {
        // If importing an evaluation with the same ID, compare timestamps
        if (importedData.timestamp <= currentTimestamp) {
          // Ask for confirmation if the imported evaluation is older
          if (!window.confirm('The evaluation you are importing is older than your current one. Do you want to override it anyway?')) {
            return;
          }
        }
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

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
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
          <Tabs defaultValue="import" className="pt-4">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="import">Import</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="import" className="space-y-4">
              <Button 
                variant="outline"
                className="w-full bg-white text-black border-black hover:bg-gray-100"
                onClick={handleImportClick}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import JSON Evaluation
              </Button>
              
              <div className="border-t border-gray-200 pt-4">
                <CsvUploader onImport={onImport} onClose={handleClose} />
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileImport}
                accept=".json"
                className="hidden"
              />
            </TabsContent>
            
            <TabsContent value="export" className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full bg-white text-black border-black hover:bg-gray-100"
                onClick={() => {
                  onExport();
                  setIsOpen(false);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Evaluation as JSON
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ActionsDrawer;
