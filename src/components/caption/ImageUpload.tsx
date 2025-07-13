import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  selectedImage,
  className = ""
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [selectedImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageSelect(imageFile);
    }
  }, [onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const clearImage = useCallback(() => {
    onImageSelect(null as any);
    setPreview(null);
  }, [onImageSelect]);

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 ${className}`}>
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Selected"
            className="w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="glass"
              size="sm"
              onClick={clearImage}
              className="gap-1"
            >
              <X className="h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer hover:shadow-elegant ${
            isDragOver 
              ? 'border-primary bg-primary/5 shadow-glow' 
              : 'border-border hover:border-primary/50'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full transition-colors ${
              isDragOver ? 'bg-primary/10' : 'bg-muted/50'
            }`}>
              {isDragOver ? (
                <Upload className="h-8 w-8 text-primary animate-scale-in" />
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">
                {isDragOver ? 'Drop your image here' : 'Upload an image'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to select an image file
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPG, PNG, WebP up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};