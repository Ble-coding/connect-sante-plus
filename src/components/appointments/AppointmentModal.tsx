
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Video } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@/lib/api/services';
import { userService } from '@/lib/api/services';

interface AppointmentModalProps {
  trigger: React.ReactNode;
  appointment?: any;
  onSave?: () => void;
}

export function AppointmentModal({ trigger, appointment, onSave }: AppointmentModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Charger la liste des médecins
  const { data: doctorsData } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => userService.getDoctors(),
    enabled: open,
  });

  const doctors = doctorsData?.data?.results || doctorsData?.data || [];

  // Préparer les données du formulaire
  const [formData, setFormData] = useState({
    doctor_id: appointment?.doctor?.id || '',
    date: appointment ? new Date(appointment.date).toISOString().slice(0, 16) : '',
    duration: appointment?.duration || 30,
    reason: appointment?.reason || '',
    consultation_type: appointment?.consultation?.consultation_type === 'teleconsultation' ? 'teleconsultation' : 'in_person',
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        doctor_id: appointment.doctor?.id || '',
        date: new Date(appointment.date).toISOString().slice(0, 16),
        duration: appointment.duration || 30,
        reason: appointment.reason || '',
        consultation_type: appointment.consultation?.consultation_type === 'teleconsultation' ? 'teleconsultation' : 'in_person',
      });
    } else if (!open) {
      setFormData({
        doctor_id: '',
        date: '',
        duration: 30,
        reason: '',
        consultation_type: 'in_person',
      });
    }
  }, [appointment, open]);

  // Mutation pour créer/modifier un rendez-vous
  const createMutation = useMutation({
    mutationFn: (data: any) => appointmentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Rendez-vous créé",
        description: "Votre rendez-vous a été créé avec succès.",
      });
      onSave?.();
      setOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Impossible de créer le rendez-vous.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => appointmentService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Rendez-vous modifié",
        description: "Votre rendez-vous a été modifié avec succès.",
      });
      onSave?.();
      setOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Impossible de modifier le rendez-vous.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctor_id || !formData.date || !formData.reason) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const appointmentData = {
      doctor_id: parseInt(formData.doctor_id),
      date: new Date(formData.date).toISOString(),
      duration: formData.duration,
      reason: formData.reason,
    };

    if (appointment) {
      updateMutation.mutate({ id: appointment.id, data: appointmentData });
    } else {
      createMutation.mutate(appointmentData);
    }
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
              <Label htmlFor="doctor_id">Médecin *</Label>
              <Select
                value={formData.doctor_id.toString()}
                onValueChange={(value) => setFormData(prev => ({ ...prev, doctor_id: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un médecin" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor: any) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      Dr. {doctor.first_name} {doctor.last_name}
                      {doctor.doctor_profile?.specialization && ` - ${doctor.doctor_profile.specialization}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date et heure *</Label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Durée (minutes) *</Label>
              <Input
                id="duration"
                type="number"
                min="15"
                max="120"
                step="15"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consultation_type">Type de consultation *</Label>
              <Select
                value={formData.consultation_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, consultation_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_person">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Consultation en cabinet
                    </div>
                  </SelectItem>
                  <SelectItem value="teleconsultation">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Téléconsultation
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Raison de la consultation *</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              placeholder="Décrivez la raison de votre consultation, symptômes..."
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending 
                ? 'Enregistrement...' 
                : appointment 
                  ? 'Modifier' 
                  : 'Créer le rendez-vous'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

