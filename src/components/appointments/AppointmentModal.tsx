
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Video, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AppointmentModalProps {
  trigger: React.ReactNode;
  appointment?: {
    id: number;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    type: string;
    location: string;
    status: string;
  };
  onSave?: (appointment: any) => void;
}

export function AppointmentModal({ trigger, appointment, onSave }: AppointmentModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    doctor: appointment?.doctor || '',
    specialty: appointment?.specialty || '',
    date: appointment?.date || '',
    time: appointment?.time || '',
    type: appointment?.type || 'Consultation',
    location: appointment?.location || '',
    notes: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (appointment) {
      setFormData({
        doctor: appointment.doctor,
        specialty: appointment.specialty,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        location: appointment.location,
        notes: ''
      });
    } else if (!open) {
      // Réinitialiser le formulaire quand le modal se ferme et qu'on crée un nouveau rendez-vous
      setFormData({
        doctor: '',
        specialty: '',
        date: '',
        time: '',
        type: 'Consultation',
        location: '',
        notes: ''
      });
    }
  }, [appointment, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctor || !formData.date || !formData.time) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const newAppointment = {
      id: appointment?.id || Date.now(),
      ...formData,
      status: appointment?.status || 'en_attente'
    };

    // Charger les rendez-vous existants
    const saved = localStorage.getItem('pharmafriconnect_appointments');
    let appointments = saved ? JSON.parse(saved) : [];
    
    if (appointment) {
      // Modifier un rendez-vous existant
      appointments = appointments.map((apt: any) => 
        apt.id === appointment.id ? newAppointment : apt
      );
    } else {
      // Ajouter un nouveau rendez-vous
      appointments.push(newAppointment);
    }
    
    localStorage.setItem('pharmafriconnect_appointments', JSON.stringify(appointments));
    
    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new Event('appointments-updated'));
    
    toast({
      title: appointment ? "Rendez-vous modifié" : "Rendez-vous créé",
      description: "Votre rendez-vous a été enregistré avec succès.",
    });

    onSave?.(newAppointment);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {appointment ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
          </DialogTitle>
          <DialogDescription>
            {appointment ? 'Modifiez les informations de votre rendez-vous' : 'Planifiez un nouveau rendez-vous médical'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doctor">Médecin *</Label>
              <Input
                id="doctor"
                value={formData.doctor}
                onChange={(e) => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
                placeholder="Dr. Nom Prénom"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Spécialité</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                placeholder="Médecin généraliste"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Heure *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type de consultation *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consultation">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Consultation en cabinet
                    </div>
                  </SelectItem>
                  <SelectItem value="Téléconsultation">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Téléconsultation
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                {formData.type === 'Téléconsultation' ? 'Lien de connexion' : 'Lieu *'}
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder={formData.type === 'Téléconsultation' ? 'Lien Zoom/Teams' : 'Adresse du cabinet'}
                required={formData.type !== 'Téléconsultation'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Raison de la consultation, symptômes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {appointment ? 'Modifier' : 'Créer le rendez-vous'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

