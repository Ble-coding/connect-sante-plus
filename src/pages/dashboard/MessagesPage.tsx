
import React, { useState, useMemo } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Search, User, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageService } from '@/lib/api/services';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: number;
  sender: {
    id: number;
    first_name: string;
    last_name: string;
    user_type: string;
  };
  recipient: {
    id: number;
    first_name: string;
    last_name: string;
    user_type: string;
  };
  content: string;
  created_at: string;
  is_read: boolean;
}

export function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Charger les messages reçus et envoyés
  const { data: receivedData } = useQuery({
    queryKey: ['messages', 'received'],
    queryFn: () => messageService.getReceived(),
  });

  const { data: sentData } = useQuery({
    queryKey: ['messages', 'sent'],
    queryFn: () => messageService.getSent(),
  });

  const receivedMessages = receivedData?.data?.results || receivedData?.data || [];
  const sentMessages = sentData?.data?.results || sentData?.data || [];

  // Créer des conversations à partir des messages
  const conversations = useMemo(() => {
    const conversationMap = new Map<number, any>();
    
    // Traiter les messages reçus
    receivedMessages.forEach((msg: Message) => {
      const senderId = msg.sender.id;
      if (!conversationMap.has(senderId)) {
        conversationMap.set(senderId, {
          id: senderId,
          user: msg.sender,
          lastMessage: msg.content,
          timestamp: msg.created_at,
          unread: msg.is_read ? 0 : 1,
        });
      } else {
        const conv = conversationMap.get(senderId);
        if (new Date(msg.created_at) > new Date(conv.timestamp)) {
          conv.lastMessage = msg.content;
          conv.timestamp = msg.created_at;
        }
        if (!msg.is_read) conv.unread++;
      }
    });

    // Traiter les messages envoyés
    sentMessages.forEach((msg: Message) => {
      const recipientId = msg.recipient.id;
      if (!conversationMap.has(recipientId)) {
        conversationMap.set(recipientId, {
          id: recipientId,
          user: msg.recipient,
          lastMessage: msg.content,
          timestamp: msg.created_at,
          unread: 0,
        });
      } else {
        const conv = conversationMap.get(recipientId);
        if (new Date(msg.created_at) > new Date(conv.timestamp)) {
          conv.lastMessage = msg.content;
          conv.timestamp = msg.created_at;
        }
      }
    });

    return Array.from(conversationMap.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [receivedMessages, sentMessages]);

  // Obtenir les messages de la conversation sélectionnée
  const conversationMessages = useMemo(() => {
    if (!selectedRecipient) return [];
    
    const allMessages = [
      ...receivedMessages.filter((msg: Message) => msg.sender.id === selectedRecipient),
      ...sentMessages.filter((msg: Message) => msg.recipient.id === selectedRecipient),
    ];
    
    return allMessages.sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }, [selectedRecipient, receivedMessages, sentMessages]);

  const sendMutation = useMutation({
    mutationFn: (data: any) => messageService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setNewMessage('');
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Impossible d'envoyer le message.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedRecipient) return;
    
    sendMutation.mutate({
      recipient: selectedRecipient,
      content: newMessage.trim(),
    });
  };

  const formatUserName = (user: any) => {
    if (!user) return 'Utilisateur';
    if (user.user_type === 'doctor') {
      return `Dr. ${user.first_name} ${user.last_name}`;
    }
    return `${user.first_name} ${user.last_name}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 7) {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    } else if (days > 0) {
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      return "À l'instant";
    }
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // Filtrer les conversations selon la recherche
  const filteredConversations = conversations.filter(conv => {
    const userName = formatUserName(conv.user);
    const search = searchTerm.toLowerCase();
    return (
      userName.toLowerCase().includes(search) ||
      conv.user.user_type.toLowerCase().includes(search)
    );
  });

  const selectedConversationData = conversations.find(c => c.id === selectedRecipient);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Messages</h1>
        </div>
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
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <p>Aucune conversation</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/40 transition-colors ${
                    selectedRecipient === conversation.id ? 'bg-muted/60' : ''
                  }`}
                  onClick={() => setSelectedRecipient(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {conversation.user.first_name[0]}{conversation.user.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{formatUserName(conversation.user)}</h4>
                        <div className="flex items-center gap-2">
                          {conversation.unread > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{formatTime(conversation.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate capitalize">{conversation.user.user_type}</p>
                      <p className="text-sm truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {selectedRecipient && selectedConversationData ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b bg-background">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {selectedConversationData.user.first_name[0]}{selectedConversationData.user.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{formatUserName(selectedConversationData.user)}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{selectedConversationData.user.user_type}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationMessages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p>Aucun message dans cette conversation</p>
                  </div>
                ) : (
                  conversationMessages.map((message: Message) => {
                    const isFromCurrentUser = sentMessages.some((m: Message) => m.id === message.id);
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${isFromCurrentUser ? 'order-1' : 'order-2'}`}>
                          <div className={`p-3 rounded-lg ${
                            isFromCurrentUser
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-foreground'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                            isFromCurrentUser ? 'justify-end' : 'justify-start'
                          }`}>
                            <Clock className="h-3 w-3" />
                            {formatMessageTime(message.created_at)}
                          </div>
                        </div>
                        {!isFromCurrentUser && (
                          <Avatar className="h-8 w-8 order-1 mr-2">
                            <AvatarFallback className="text-xs">
                              {message.sender.first_name[0]}{message.sender.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    );
                  })
                )}
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
                      disabled={sendMutation.isPending}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      size="icon" 
                      onClick={handleSendMessage}
                      disabled={sendMutation.isPending || !newMessage.trim()}
                    >
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
