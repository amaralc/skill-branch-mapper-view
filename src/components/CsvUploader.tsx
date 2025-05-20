
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
      const decoder = new TextDecoder('iso-8859-1'); // You can also try 'iso-8859-1' if needed
      const text = decoder.decode(arrayBuffer);
  
      console.log('Raw CSV text sample:', text.substring(0, 200));
      const csvData = parseCsv(text);
  
      if (!csvData || csvData.length === 0) {
        throw new Error('The CSV file appears to be empty or invalid');
      }
  
      const skillPath = convertCsvToSkillPath(csvData);
      onImport(skillPath);
  
      toast.success('CSV imported successfully');
      if (onClose) onClose();
    } catch (error) {
      console.error('CSV import error:', error);
      toast.error('Failed to process CSV file. Please check the format and try again.');
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
        <Label htmlFor="csv-file">Import Career Path from CSV</Label>
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
          Upload a CSV file with career path data. The file should have the expected format with columns:
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
        Select CSV File
      </Button>
    </div>
  );
};

export default CsvUploader;
