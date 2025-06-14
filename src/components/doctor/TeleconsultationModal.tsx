
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageCircle,
  FileText,
  Clock,
  User
} from 'lucide-react';

interface TeleconsultationModalProps {
  trigger: React.ReactNode;
  patient?: {
    name: string;
    age: number;
    reason: string;
    scheduledTime: string;
  };
}

export function TeleconsultationModal({ trigger, patient }: TeleconsultationModalProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  const startCall = () => {
    setIsCallActive(true);
    console.log('Démarrage de la téléconsultation avec', patient?.name);
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    console.log('Fin de la téléconsultation');
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    console.log('Vidéo:', !isVideoOn ? 'activée' : 'désactivée');
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    console.log('Audio:', !isAudioOn ? 'activé' : 'désactivé');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Téléconsultation
            {patient && ` - ${patient.name}`}
          </DialogTitle>
          <DialogDescription>
            {patient ? `Consultation programmée à ${patient.scheduledTime}` : 'Nouvelle téléconsultation'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {patient && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations patient</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.age} ans</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Motif :</p>
                    <p className="font-medium">{patient.reason}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Video Call Interface */}
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
                {isCallActive ? (
                  <div className="text-white text-center">
                    <Video className="h-12 w-12 mx-auto mb-2" />
                    <p>Téléconsultation en cours</p>
                    <p className="text-sm">Durée: {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}</p>
                  </div>
                ) : (
                  <div className="text-white text-center">
                    <VideoOff className="h-12 w-12 mx-auto mb-2" />
                    <p>En attente de connexion</p>
                  </div>
                )}

                {/* Call Status */}
                {isCallActive && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive" className="animate-pulse">
                      EN DIRECT
                    </Badge>
                  </div>
                )}
              </div>

              {/* Call Controls */}
              <div className="flex justify-center gap-4 mt-4">
                <Button
                  variant={isAudioOn ? "default" : "destructive"}
                  size="sm"
                  onClick={toggleAudio}
                  disabled={!isCallActive}
                >
                  {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant={isVideoOn ? "default" : "destructive"}
                  size="sm"
                  onClick={toggleVideo}
                  disabled={!isCallActive}
                >
                  {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>

                {!isCallActive ? (
                  <Button onClick={startCall} className="bg-green-600 hover:bg-green-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Démarrer l'appel
                  </Button>
                ) : (
                  <Button onClick={endCall} variant="destructive">
                    <PhoneOff className="h-4 w-4 mr-2" />
                    Raccrocher
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat avec le patient
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Prendre des notes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Programmer un suivi
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Outils consultation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Créer une ordonnance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Dossier médical
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Certificat médical
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
