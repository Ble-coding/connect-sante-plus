
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Plus, Edit, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Insurance {
  id: string;
  name: string;
  type: 'primary' | 'secondary';
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  expiryDate: string;
  coverage: number;
  status: 'active' | 'pending' | 'expired';
}

export function InsuranceManager() {
  // Charger les assurances depuis localStorage
  const loadInsurances = (): Insurance[] => {
    const saved = localStorage.getItem('pharmaconnect_insurances');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: '1',
        name: 'Assurance Maladie',
        type: 'primary',
        provider: 'CPAM',
        policyNumber: '1234567890123',
        expiryDate: '2025-12-31',
        coverage: 70,
        status: 'active'
      },
      {
        id: '2',
        name: 'Mutuelle Santé',
        type: 'secondary',
        provider: 'Harmonie Mutuelle',
        policyNumber: 'HM987654321',
        groupNumber: 'GRP001',
        expiryDate: '2024-12-31',
        coverage: 30,
        status: 'active'
      }
    ];
  };

  const [insurances, setInsurances] = useState<Insurance[]>(loadInsurances());

  const [isAdding, setIsAdding] = useState(false);
  const [newInsurance, setNewInsurance] = useState({
    name: '',
    type: 'secondary' as 'primary' | 'secondary',
    provider: '',
    policyNumber: '',
    groupNumber: '',
    expiryDate: '',
    coverage: 0
  });

  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addInsurance = () => {
    if (!newInsurance.name || !newInsurance.provider || !newInsurance.policyNumber) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const insurance: Insurance = {
      id: Date.now().toString(),
      ...newInsurance,
      status: 'pending'
    };

    const updated = [...insurances, insurance];
    setInsurances(updated);
    localStorage.setItem('pharmaconnect_insurances', JSON.stringify(updated));
    
    setNewInsurance({
      name: '',
      type: 'secondary',
      provider: '',
      policyNumber: '',
      groupNumber: '',
      expiryDate: '',
      coverage: 0
    });
    setIsAdding(false);

    toast({
      title: "Assurance ajoutée",
      description: "Votre assurance a été ajoutée et est en cours de vérification",
    });
  };

  const calculateTotalCoverage = () => {
    return insurances
      .filter(ins => ins.status === 'active')
      .reduce((total, ins) => total + ins.coverage, 0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Mes assurances santé
              </CardTitle>
              <CardDescription>
                Gérez vos assurances maladie et mutuelles
              </CardDescription>
            </div>
            <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Résumé de couverture */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Couverture totale</p>
                <p className="text-2xl font-bold text-primary">
                  {calculateTotalCoverage()}%
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Liste des assurances */}
          <div className="space-y-3">
            {insurances.map((insurance) => (
              <div key={insurance.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{insurance.name}</h3>
                      <Badge variant={insurance.type === 'primary' ? 'default' : 'secondary'}>
                        {insurance.type === 'primary' ? 'Principale' : 'Complémentaire'}
                      </Badge>
                      <Badge className={getStatusColor(insurance.status)}>
                        {insurance.status === 'active' ? 'Active' : 
                         insurance.status === 'pending' ? 'En attente' : 'Expirée'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insurance.provider}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">N° Police</Label>
                    <p className="font-medium">{insurance.policyNumber}</p>
                  </div>
                  {insurance.groupNumber && (
                    <div>
                      <Label className="text-muted-foreground">N° Groupe</Label>
                      <p className="font-medium">{insurance.groupNumber}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-muted-foreground">Expire le</Label>
                    <p className="font-medium">{insurance.expiryDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Couverture</Label>
                    <p className="font-medium">{insurance.coverage}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire d'ajout */}
          {isAdding && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium mb-4">Ajouter une assurance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceName">Nom de l'assurance *</Label>
                  <Input
                    id="insuranceName"
                    value={newInsurance.name}
                    onChange={(e) => setNewInsurance(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="ex: Mutuelle XYZ"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insuranceType">Type</Label>
                  <Select 
                    value={newInsurance.type} 
                    onValueChange={(value) => setNewInsurance(prev => ({ ...prev, type: value as 'primary' | 'secondary' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Principale</SelectItem>
                      <SelectItem value="secondary">Complémentaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provider">Organisme *</Label>
                  <Input
                    id="provider"
                    value={newInsurance.provider}
                    onChange={(e) => setNewInsurance(prev => ({ ...prev, provider: e.target.value }))}
                    placeholder="ex: CPAM, Harmonie Mutuelle"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Numéro de police *</Label>
                  <Input
                    id="policyNumber"
                    value={newInsurance.policyNumber}
                    onChange={(e) => setNewInsurance(prev => ({ ...prev, policyNumber: e.target.value }))}
                    placeholder="Numéro de votre contrat"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupNumber">Numéro de groupe</Label>
                  <Input
                    id="groupNumber"
                    value={newInsurance.groupNumber}
                    onChange={(e) => setNewInsurance(prev => ({ ...prev, groupNumber: e.target.value }))}
                    placeholder="Si applicable"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Date d'expiration</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newInsurance.expiryDate}
                    onChange={(e) => setNewInsurance(prev => ({ ...prev, expiryDate: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverage">Taux de couverture (%)</Label>
                  <Input
                    id="coverage"
                    type="number"
                    min="0"
                    max="100"
                    value={newInsurance.coverage}
                    onChange={(e) => setNewInsurance(prev => ({ ...prev, coverage: parseInt(e.target.value) || 0 }))}
                    placeholder="ex: 70"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={addInsurance}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAdding(false)}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
