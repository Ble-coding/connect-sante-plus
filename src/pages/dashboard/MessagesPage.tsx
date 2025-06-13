
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Paperclip, Search, Plus, User, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: "Dr. Marie Diallo",
      specialty: "Médecin généraliste",
      lastMessage: "Merci pour les résultats. Tout semble normal.",
      timestamp: "Il y a 2h",
      unread: 0,
      online: true
    },
    {
      id: 2,
      name: "Dr. Ahmed Kone",
      specialty: "Cardiologue",
      lastMessage: "Votre prochain RDV est confirmé pour le 20 juin.",
      timestamp: "Hier",
      unread: 1,
      online: false
    },
    {
      id: 3,
      name: "Pharmacie du Centre",
      specialty: "Pharmacie",
      lastMessage: "Vos médicaments sont prêts pour retrait.",
      timestamp: "Il y a 3 jours",
      unread: 0,
      online: true
    },
    {
      id: 4,
      name: "Dr. Sophie Martin",
      specialty: "Dermatologue",
      lastMessage: "N'hésitez pas si vous avez des questions.",
      timestamp: "Il y a 1 semaine",
      unread: 2,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. Marie Diallo",
      content: "Bonjour Jean, j'ai bien reçu vos résultats d'analyses. Tout semble être dans les normes.",
      timestamp: "14:30",
      isDoctor: true
    },
    {
      id: 2,
      sender: "Vous",
      content: "Merci docteur ! Est-ce que je dois continuer le traitement comme prévu ?",
      timestamp: "14:45",
      isDoctor: false
    },
    {
      id: 3,
      sender: "Dr. Marie Diallo",
      content: "Oui, continuez exactement comme prescrit. Le paracétamol peut être arrêté dès que vous vous sentez mieux.",
      timestamp: "14:50",
      isDoctor: true
    },
    {
      id: 4,
      sender: "Dr. Marie Diallo",
      content: "Pour l'amoxicilline, il est important de terminer tout le traitement même si vous vous sentez mieux.",
      timestamp: "14:51",
      isDoctor: true
    },
    {
      id: 5,
      sender: "Vous",
      content: "D'accord, je note. Merci pour vos conseils !",
      timestamp: "15:00",
      isDoctor: false
    },
    {
      id: 6,
      sender: "Dr. Marie Diallo",
      content: "Merci pour les résultats. Tout semble normal.",
      timestamp: "16:30",
      isDoctor: true
    }
  ];

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

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

      <div className="flex-1 flex">
        {/* Conversations List */}
        <div className="w-80 border-r bg-muted/20">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une conversation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-muted/40 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-muted/60' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {conversation.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{conversation.name}</h4>
                      <div className="flex items-center gap-2">
                        {conversation.unread > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.specialty}</p>
                    <p className="text-sm truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b bg-background">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {selectedConversationData?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversationData?.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedConversationData?.specialty}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    {selectedConversationData?.online && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        En ligne
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isDoctor ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${message.isDoctor ? 'order-2' : 'order-1'}`}>
                      <div className={`p-3 rounded-lg ${
                        message.isDoctor 
                          ? 'bg-muted text-foreground' 
                          : 'bg-primary text-primary-foreground'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                        message.isDoctor ? 'justify-start' : 'justify-end'
                      }`}>
                        <Clock className="h-3 w-3" />
                        {message.timestamp}
                      </div>
                    </div>
                    {message.isDoctor && (
                      <Avatar className="h-8 w-8 order-1 mr-2">
                        <AvatarFallback className="text-xs">
                          {message.sender.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="resize-none"
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Sélectionnez une conversation</h3>
                <p className="text-muted-foreground">
                  Choisissez une conversation pour commencer à discuter
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}
