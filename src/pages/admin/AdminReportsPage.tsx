
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Filter } from 'lucide-react';

export function AdminReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rapports et Exports</h1>
        <p className="text-muted-foreground">
          Génération et téléchargement de rapports détaillés
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Rapport d'activité mensuel
            </CardTitle>
            <CardDescription>
              Synthèse complète des activités de la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Télécharger (PDF)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Rapport financier
            </CardTitle>
            <CardDescription>
              Analyse des revenus et transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Télécharger (Excel)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
