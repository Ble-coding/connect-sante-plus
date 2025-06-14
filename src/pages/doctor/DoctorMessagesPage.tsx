
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Search, 
  Plus,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Star,
  Archive,
  Trash2
} from 'lucide-react';

export function DoctorMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      patient: "Jean Dupont",
      lastMessage: "Merci pour la consultation, je me sens mieux",
      timestamp: "2024-06-14 16:30",
      unread: 0,
      status: "lu",
      type: "consultation"
    },
    {
      id: 2,
      patient: "Marie Martin",
      lastMessage: "J'ai une question sur mon traitement",
      timestamp: "2024-06-14 14:20",
      unread: 2,
      status: "non_lu",
      type: "question"
    },
    {
      id: 3,
      patient: "Pierre Durand",
      lastMessage: "Les résultats sont disponibles",
      timestamp: "2024-06-14 10:15",
      unread: 1,
      status: "non_lu",
      type: "résultats"
    },
    {
      id: 4,
      patient: "Sophie Leroy",
      lastMessage: "Pouvons-nous reporter le rendez-vous ?",
      timestamp: "2024-06-13 18:45",
      unread: 0,
      status: "lu",
      type: "rendez_vous"
    },
    {
      id: 5,
      patient: "Antoine Bernard",
      lastMessage: "Prescription bien reçue, merci",
      timestamp: "2024-06-13 15:30",
      unread: 0,
      status: "lu",
      type: "prescription"
    }
  ];

  const messages = {
    1: [
      { id: 1, sender: "patient", content: "Bonjour Docteur, suite à notre consultation d'hier", timestamp: "2024-06-14 14:00", type: "text" },
      { id: 2, sender: "doctor", content: "Bonjour Jean, j'espère que vous allez bien", timestamp: "2024-06-14 14:05", type: "text" },
      { id: 3, sender: "patient", content: "Oui merci, je voulais vous dire que je me sens déjà mieux", timestamp: "2024-06-14 14:30", type: "text" },
      { id: 4, sender: "doctor", content: "Parfait ! Continuez le traitement comme convenu", timestamp: "2024-06-14 14:35", type: "text" },
      { id: 5, sender: "patient", content: "Merci pour la consultation, je me sens mieux", timestamp: "2024-06-14 16:30", type: "text" }
    ],
    2: [
      { id: 1, sender: "patient", content: "Bonjour Docteur", timestamp: "2024-06-14 14:00", type: "text" },
      { id: 2, sender: "patient", content: "J'ai une question sur mon traitement pour l'asthme", timestamp: "2024-06-14 14:01", type: "text" },
      { id: 3, sender: "patient", content: "Dois-je continuer à prendre les deux inhalateurs ?", timestamp: "2024-06-14 14:20", type: "text" }
    ],
    3: [
      { id: 1, sender: "patient", content: "Docteur, j'ai récupéré mes analyses", timestamp: "2024-06-14 10:00", type: "text" },
      { id: 2, sender: "patient", content: "Les résultats sont disponibles", timestamp: "2024-06-14 10:15", type: "text" }
    ]
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'question': return 'bg-yellow-100 text-yellow-800';
      case 'résultats': return 'bg-green-100 text-green-800';
      case 'rendez_vous': return 'bg-purple-100 text-purple-800';
      case 'prescription': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Simuler l'envoi d'un message
      setNewMessage('');
    }
  };

  const currentMessages = messages[selectedConversation] || [];
  const currentConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Messages</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau message
        </Button>
      </header>

      <div className="flex-1 p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Conversations</span>
                <Badge variant="secondary">
                  {conversations.filter(c => c.unread > 0).length} non lues
                </Badge>
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une conversation..."
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 cursor-pointer border-b hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-sm">{conversation.patient}</div>
                      <div className="flex items-center gap-2">
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="h-5 w-5 p-0 text-xs rounded-full">
                            {conversation.unread}
                          </Badge>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {new Date(conversation.timestamp).toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2 truncate">
                      {conversation.lastMessage}
                    </div>
                    <Badge variant="secondary" className={getTypeColor(conversation.type)}>
                      {conversation.type.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{currentConversation.patient}</CardTitle>
                      <CardDescription>
                        Dernière activité: {new Date(currentConversation.timestamp).toLocaleString('fr-FR')}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'doctor'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div className={`text-xs mt-1 ${
                          message.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                  <p>Sélectionnez une conversation pour commencer</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
