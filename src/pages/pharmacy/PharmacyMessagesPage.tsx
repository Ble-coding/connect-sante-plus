
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MessageCircle, Send, Search, Plus, Eye } from 'lucide-react';

const PharmacyMessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      contact: "Dr. Leblanc",
      type: "doctor",
      lastMessage: "Merci pour la préparation rapide de l'ordonnance pour Mme Dupont",
      timestamp: "10:30",
      unread: 0,
      status: "online"
    },
    {
      id: 2,
      contact: "Marie Dupont",
      type: "patient",
      lastMessage: "Bonjour, mon traitement est-il disponible ?",
      timestamp: "09:45",
      unread: 2,
      status: "offline"
    },
    {
      id: 3,
      contact: "Dr. Durand",
      type: "doctor",
      lastMessage: "Pouvez-vous me confirmer la disponibilité de l'insuline ?",
      timestamp: "08:20",
      unread: 1,
      status: "online"
    },
    {
      id: 4,
      contact: "Jean Martin",
      type: "patient",
      lastMessage: "Merci pour les conseils sur la posologie",
      timestamp: "Hier",
      unread: 0,
      status: "offline"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. Leblanc",
      content: "Bonjour, j'ai prescrit un traitement à Mme Dupont. Pourriez-vous préparer son ordonnance ?",
      timestamp: "09:15",
      isOwn: false
    },
    {
      id: 2,
      sender: "Pharmacie",
      content: "Bonjour Docteur, bien reçu. L'ordonnance sera prête dans 30 minutes.",
      timestamp: "09:18",
      isOwn: true
    },
    {
      id: 3,
      sender: "Dr. Leblanc",
      content: "Parfait, merci pour votre réactivité !",
      timestamp: "10:30",
      isOwn: false
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Messages</h1>
            <p className="text-gray-600">Communication avec médecins et patients</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau message
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">En attente de réponse</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversations actives</CardTitle>
            <MessageCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Discussions en cours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages du jour</CardTitle>
            <MessageCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Reçus aujourd'hui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps de réponse</CardTitle>
            <MessageCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12min</div>
            <p className="text-xs text-muted-foreground">Moyenne</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Rechercher..." className="pl-10 w-32" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation === conv.id ? 'bg-pharma-primary/10' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{conv.contact}</span>
                      <Badge variant="outline" className="text-xs">
                        {conv.type === 'doctor' ? 'Médecin' : 'Patient'}
                      </Badge>
                      {conv.status === 'online' && (
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-red-500 text-white text-xs">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {selectedConversation ? 
                  conversations.find(c => c.id === selectedConversation)?.contact : 
                  'Sélectionnez une conversation'
                }
              </CardTitle>
              {selectedConversation && (
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Profil
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedConversation ? (
              <div className="space-y-4">
                <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${
                            message.isOwn
                              ? 'bg-pharma-primary text-white'
                              : 'bg-white border'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Sélectionnez une conversation pour commencer</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Messages Types</CardTitle>
          <CardDescription>Réponses prédéfinies pour gagner du temps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Réponses Médecins</h4>
              <div className="space-y-1">
                <p className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                  "L'ordonnance sera prête dans 30 minutes"
                </p>
                <p className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                  "Le médicament n'est pas disponible, substitut proposé"
                </p>
                <p className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                  "Ordonnance préparée et disponible"
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Réponses Patients</h4>
              <div className="space-y-1">
                <p className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                  "Votre traitement est disponible en pharmacie"
                </p>
                <p className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                  "Nous préparons votre commande"
                </p>
                <p className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                  "Merci de vous présenter avec votre ordonnance"
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyMessagesPage;
