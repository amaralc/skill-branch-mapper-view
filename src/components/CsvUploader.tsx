
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
      const text = await readFileAsText(file);
      const parsedData = parseCsv(text);
  
      if (!parsedData || parsedData.length === 0) {
        throw new Error('Não foi possível interpretar o arquivo CSV');
      }
  
      const skillPath = convertCsvToSkillPath(parsedData);
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
  
  // Helper function to read file with proper encoding detection
  const readFileAsText = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    
    // Try different encodings until one works without mojibake
    const encodings = ['utf-8', 'windows-1252', 'iso-8859-1', 'latin1'];
    
    // First pass - try to detect encoding
    let bestEncoding = 'utf-8'; // Default
    let bestScore = 0;
    
    for (const encoding of encodings) {
      try {
        const decoder = new TextDecoder(encoding);
        const text = decoder.decode(arrayBuffer);
        
        // Calculate a "quality score" for this encoding
        // Fewer replacement characters and question marks means better encoding match
        const replacementChar = '\uFFFD'; // Unicode replacement character
        const badChars = (text.match(/[�\uFFFD]/g) || []).length;
        const score = text.length - (badChars * 10); // Heavily penalize bad characters
        
        if (score > bestScore) {
          bestScore = score;
          bestEncoding = encoding;
        }
      } catch (e) {
        console.log(`Error testing encoding ${encoding}:`, e);
        continue;
      }
    }

    console.log(`Using best detected encoding: ${bestEncoding}`);
    const decoder = new TextDecoder(bestEncoding);
    return decoder.decode(arrayBuffer);
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
          career, behaviorDifferentiator, baseBehavior, level, track, groupCompetence, groupCompetenceId, groupCompetenceLevelId, id, description, size.
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
