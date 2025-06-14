
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Scan, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function PrescriptionScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      simulateOCRScan(file);
    }
  };

  const simulateOCRScan = async (file: File) => {
    setIsScanning(true);
    
    // Simulation du scan OCR (en réalité, on utiliserait une API comme Tesseract.js ou Google Vision)
    setTimeout(() => {
      const mockData = {
        doctor: "Dr. Marie Diallo",
        date: new Date().toLocaleDateString('fr-FR'),
        medications: [
          { name: "Paracétamol", dosage: "500mg", frequency: "3x/jour", duration: "7 jours" },
          { name: "Amoxicilline", dosage: "250mg", frequency: "2x/jour", duration: "10 jours" }
        ],
        patient: "Jean Dupont",
        confidence: 0.95
      };
      
      setScannedData(mockData);
      setIsScanning(false);
      
      toast({
        title: "Ordonnance scannée avec succès",
        description: "Les informations ont été extraites automatiquement",
      });
    }, 3000);
  };

  const confirmPrescription = () => {
    toast({
      title: "Ordonnance ajoutée",
      description: "L'ordonnance a été ajoutée à votre dossier médical",
    });
    setScannedData(null);
    setUploadedFile(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5" />
          Scanner une ordonnance
        </CardTitle>
        <CardDescription>
          Prenez une photo ou uploadez une image de votre ordonnance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!scannedData && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-6 w-6" />
                Upload depuis fichier
              </Button>
              
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => {
                  // En réalité, on ouvrirait la caméra
                  toast({
                    title: "Caméra",
                    description: "Fonctionnalité caméra en développement",
                  });
                }}
              >
                <Camera className="h-6 w-6" />
                Prendre une photo
              </Button>
            </div>
            
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            {uploadedFile && (
              <div className="text-sm text-muted-foreground">
                Fichier sélectionné: {uploadedFile.name}
              </div>
            )}
          </div>
        )}

        {isScanning && (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">
              Analyse de l'ordonnance en cours...
            </p>
          </div>
        )}

        {scannedData && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Scan terminé</span>
              <Badge variant="secondary">
                Confiance: {Math.round(scannedData.confidence * 100)}%
              </Badge>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Médecin</Label>
                  <p className="font-medium">{scannedData.doctor}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{scannedData.date}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Médicaments détectés</Label>
                <div className="space-y-2 mt-2">
                  {scannedData.medications.map((med: any, index: number) => (
                    <div key={index} className="bg-background p-3 rounded border">
                      <div className="font-medium">{med.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {med.dosage} • {med.frequency} • {med.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={confirmPrescription} className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Confirmer et ajouter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setScannedData(null);
                  setUploadedFile(null);
                }}
              >
                Annuler
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
