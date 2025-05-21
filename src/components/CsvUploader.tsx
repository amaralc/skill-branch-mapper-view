
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { parseCsv, convertCsvToSkillPath } from '@/utils/csvParser';
import { SkillPath } from '@/types/skill';
import { toast } from 'sonner';

interface CsvUploaderProps {
  onImport: (skillPath: SkillPath) => void;
  onClose?: () => void;
}

const CsvUploader: React.FC<CsvUploaderProps> = ({ onImport, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    setIsLoading(true);
  
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Try UTF-8 first, which is commonly used for Portuguese text files
      const decoder = new TextDecoder('utf-8'); 
      let text = decoder.decode(arrayBuffer);
      
      // Check if the text has encoding issues, and try different encodings if needed
      if (text.includes('�') || /Ã|Âµ|Ãµ|Ã³/.test(text)) {
        // Try other common encodings for Portuguese
        const encodings = ['latin1', 'iso-8859-1', 'windows-1252'];
        
        for (const encoding of encodings) {
          const altDecoder = new TextDecoder(encoding);
          const altText = altDecoder.decode(arrayBuffer);
          
          // If this encoding produces better results, use it
          if (!altText.includes('�') && !/Ã|Âµ|Ãµ|Ã³/.test(altText)) {
            text = altText;
            console.log(`Using ${encoding} encoding for CSV`);
            break;
          }
        }
      }
  
      console.log('Raw CSV text sample:', text.substring(0, 200));
      const csvData = parseCsv(text);
  
      if (!csvData || csvData.length === 0) {
        throw new Error('O arquivo CSV parece estar vazio ou inválido');
      }
  
      const skillPath = convertCsvToSkillPath(csvData);
      onImport(skillPath);
  
      toast.success('CSV importado com sucesso');
      if (onClose) onClose();
    } catch (error) {
      console.error('CSV import error:', error);
      toast.error('Falha ao processar arquivo CSV. Por favor, verifique o formato e tente novamente.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="csv-file">Importar Trilha de Carreira a partir de CSV</Label>
        <div className="flex gap-2">
          <Input
            ref={fileInputRef}
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={isLoading}
            className="flex-1"
          />
        </div>
        <p className="text-sm text-gray-500">
          Faça upload de um arquivo CSV com dados da trilha de carreira. O arquivo deve ter o formato esperado com colunas:
          career, baseBehavior, level, track, groupCompetence, groupCompetenceId, groupCompetenceLevelId, id, description, size.
        </p>
      </div>
      
      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      <Button
        variant="outline"
        className="w-full bg-white text-black border-black hover:bg-gray-100"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
      >
        <Upload className="w-4 h-4 mr-2" />
        Selecionar Arquivo CSV
      </Button>
    </div>
  );
};

export default CsvUploader;
