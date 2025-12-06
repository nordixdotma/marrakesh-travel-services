"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, User, Search, Phone, Mail, Clock, MoreVertical, CheckCheck, Circle } from "lucide-react"

interface Message {
  id: number
  sender: "customer" | "agent"
  text: string
  time: string
  read: boolean
}

interface Conversation {
  id: number
  customer: string
  email: string
  phone: string
  lastMessage: string
  time: string
  unread: number
  status: "active" | "waiting" | "resolved"
  messages: Message[]
}

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversations: Conversation[] = [
    { 
      id: 1, 
      customer: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234 567 890",
      lastMessage: "Can I change my tour date?",
      time: "2 min ago",
      unread: 2,
      status: "active",
      messages: [
        { id: 1, sender: "customer", text: "Hello, I booked a desert tour for next week", time: "10:30 AM", read: true },
        { id: 2, sender: "agent", text: "Hello John! Yes, I can see your booking. How can I help you?", time: "10:32 AM", read: true },
        { id: 3, sender: "customer", text: "Can I change my tour date?", time: "10:35 AM", read: false },
        { id: 4, sender: "customer", text: "I need to move it to the following week if possible", time: "10:35 AM", read: false },
      ]
    },
    { 
      id: 2, 
      customer: "Marie Dubois",
      email: "marie.d@email.com",
      phone: "+33 6 12 34 56 78",
      lastMessage: "Thank you for the quick response!",
      time: "15 min ago",
      unread: 0,
      status: "resolved",
      messages: [
        { id: 1, sender: "customer", text: "Hi, what's included in the Essaouira day trip?", time: "9:00 AM", read: true },
        { id: 2, sender: "agent", text: "The trip includes transportation, guided tour, and lunch at a local restaurant.", time: "9:05 AM", read: true },
        { id: 3, sender: "customer", text: "Thank you for the quick response!", time: "9:10 AM", read: true },
      ]
    },
    { 
      id: 3, 
      customer: "Ahmed Hassan",
      email: "a.hassan@email.com",
      phone: "+971 50 123 4567",
      lastMessage: "Is there availability for tomorrow?",
      time: "1 hour ago",
      unread: 1,
      status: "waiting",
      messages: [
        { id: 1, sender: "customer", text: "Is there availability for tomorrow?", time: "8:30 AM", read: false },
      ]
    },
    { 
      id: 4, 
      customer: "Emma Wilson",
      email: "emma.w@email.com",
      phone: "+44 7700 900123",
      lastMessage: "Perfect, I'll book it now",
      time: "2 hours ago",
      unread: 0,
      status: "resolved",
      messages: [
        { id: 1, sender: "customer", text: "Do you offer private tours?", time: "7:00 AM", read: true },
        { id: 2, sender: "agent", text: "Yes! We offer private tours for all our excursions. The price varies depending on the group size.", time: "7:15 AM", read: true },
        { id: 3, sender: "customer", text: "Perfect, I'll book it now", time: "7:20 AM", read: true },
      ]
    },
  ]

  const selectedChat = conversations.find(c => c.id === selectedConversation)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // In a real app, this would send the message to the backend
    setNewMessage("")
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedConversation])

  const quickResponses = [
    "Thank you for contacting us!",
    "Let me check that for you.",
    "Your booking has been confirmed.",
    "I'll get back to you shortly.",
    "Is there anything else I can help with?",
  ]

  return (
    <div className="p-6 h-[calc(100vh-2rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Live Chat</h1>
          <p className="text-muted-foreground">Real-time customer support</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-sm">
            <Circle className="h-3 w-3 fill-green-500 text-green-500" />
            Online
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-5rem)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
            <div className="space-y-1">
              {conversations.map((conv) => (
                <div 
                  key={conv.id}
                  className={`p-4 cursor-pointer border-b transition-colors ${
                    selectedConversation === conv.id 
                      ? "bg-primary/10 border-l-4 border-l-primary" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{conv.customer}</p>
                          {conv.unread > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{conv.time}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        conv.status === "active" ? "bg-green-100 text-green-700" :
                        conv.status === "waiting" ? "bg-amber-100 text-amber-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {conv.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{selectedChat.customer}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                        Online
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                {selectedChat.messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === "agent" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === "agent" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center gap-1 mt-1 ${
                        message.sender === "agent" ? "justify-end" : ""
                      }`}>
                        <span className="text-xs opacity-70">{message.time}</span>
                        {message.sender === "agent" && (
                          <CheckCheck className="h-3 w-3 opacity-70" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Quick Responses */}
              <div className="px-4 pb-2">
                <div className="flex gap-2 flex-wrap">
                  {quickResponses.slice(0, 3).map((response, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => setNewMessage(response)}
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </Card>

        {/* Customer Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Customer Info</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedChat ? (
              <div className="space-y-4">
                <div className="text-center pb-4 border-b">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium">{selectedChat.customer}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedChat.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedChat.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Last seen: {selectedChat.time}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <p className="text-sm font-medium">Recent Bookings</p>
                  <div className="text-sm text-muted-foreground">
                    <p>• Desert Safari - Jan 20</p>
                    <p>• Essaouira Day Trip - Dec 15</p>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button variant="outline" className="w-full" size="sm">
                    View Full Profile
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    View Bookings
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to view customer info</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
