"use client";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockMessages } from "@/data/mockMessages";
import { Message } from "@/types/message";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react"

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export default function ChatModal({
  isOpen,
  onClose,
  userName,
}: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.25, ease: "easeIn" } },
  }

  type MessageLike = Partial<Message> & {
    createdAt?: string | number | Date;
    date?: string | number | Date;   
    time?: string | number | Date;
  }

  function parseMessageDate(msg: MessageLike): Date {

    const raw =
      msg?.timestamp ?? msg?.createdAt ?? msg?.date ?? msg?.time ?? null;


    if (raw instanceof Date) return raw;


    if (typeof raw === "number") {
      const ms = raw < 1e12 ? raw * 1000 : raw;
      return new Date(ms);
    }


    if (typeof raw === "string") {
  
      const timeOnly = /^\s*\d{1,2}:\d{2}\s*(AM|PM)?\s*$/i;
      if (timeOnly.test(raw)) {
        const now = new Date();
        const m = raw.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)!;
        let hours = parseInt(m[1], 10);
        const minutes = parseInt(m[2], 10);
        const ampm = m[3]?.toUpperCase();

        if (ampm) {
          if (ampm === "PM" && hours < 12) hours += 12;
          if (ampm === "AM" && hours === 12) hours = 0;
        }

        const d = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes,
          0,
          0
        );
        return d;
      }

  
      const d = new Date(raw);
      if (!isNaN(d.getTime())) return d;
    }


    return new Date();
  }

  function formatChatDate(date: Date) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Hoy";
    if (date.toDateString() === yesterday.toDateString()) return "Ayer";

    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function isSameDay(a: Date, b: Date) {
    return a.toDateString() === b.toDateString();
  }

  const handleSend = (newMessage: string) => {

    const now = Date.now();
    const formattedTime = new Date(now).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        sender: "me",
        text: newMessage,
        timestamp: now,
        time: formattedTime,
      },
    ]);
    const userMsg = newMessage;
    setNewMessage("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Interesante, cuentame más.";
      if (userMsg.toLowerCase().includes("hola"))
        reply = "Hola!! Qué bueno  verte por aqui ✋";
      if (userMsg.toLowerCase().includes("como estas"))
        reply = "Muy bien!!, y tu??";
      if (userMsg.toLowerCase().includes("como estás"))
        reply = "Todo bien!!, y tu??";
      if (userMsg.toLowerCase().includes("estoy bien"))
        reply = "Qué bueno eso es excelente!!";
      if (userMsg.toLowerCase().includes("javascript"))
        reply = "Me encanta JavaScript, quieres hacer un proyecto juntos";
      if (userMsg.toLowerCase().includes("gracias")) reply = "De nada!!";
      if (userMsg.toLowerCase().includes("adios"))
        reply = "Hasta luego ✋, seguimos en contacto.";
      if (userMsg.toLowerCase().includes("adiós"))
        reply = "Hasta luego ✋, seguimos en contacto.";

      const replyTime = Date.now();
      const formattedReplyTime = new Date(replyTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          sender: "them",
          text: reply,
          timestamp: replyTime,
          time: formattedReplyTime,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
        {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-md w-full p-0 bg-transparent shadow-none">
            <motion.div
              className="fixed inset-0 bg-black/40 flex items-center justify-center"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white rounded-2xl shadow-lg w-full max-w-md"
              >
                <DialogHeader className="p-4 border-b">
                  <DialogTitle className="text-lg font-semibold">
                    Chat con {userName}
                  </DialogTitle>
                  <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition hover:opacity-100 focus:outline-none">
                    <X className="h-5 w-5" />
                  </DialogClose>
                </DialogHeader>
              
                <div className="flex flex-col gap-2 p-4 h-80 overflow-y-auto bg-gray-50">
                  <AnimatePresence>
                    {messages.map((msg, i) => {
                      const currentDate = parseMessageDate(msg);
                      const prevDate = i > 0 ? parseMessageDate(messages[i - 1]) : null;
                      const showDate = !prevDate || !isSameDay(currentDate, prevDate);

                      return (
                        <motion.div 
                          key={i}
                          initial={{
                            opacity: 0,
                            x: msg.sender === "me" ? 40 : -40,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {showDate && (
                            <div className="flex text-center my-4">
                              <div className="flex-1 border-t border-gray-300">
                                <span className="px-3 text-sm text-gray-500">
                                  {formatChatDate(currentDate)}
                                </span>
                                <div className="flex-1 border-t border-gray-300"></div>
                              </div>
                            </div>
                          )}

                          <div
                            className={`flex ${
                              msg.sender === "me" ? "justify-end" : "justify-start"
                            } mb-2`}
                          >
                            <div
                              className={`rounded-2xl px-4 py-2 max-w-xs ${
                                msg.sender === "me"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-800"
                              }`}
                            >
                              <p>{msg.text}</p>
                              <span
                                className={`text-xs mt-1 w-full ${
                                  msg.sender === "me"
                                    ? "text-gray-200 text-right"
                                    : "text-left"
                                }`}
                              >
                                {msg.time ?? "12:45 PM"}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} 
                        className="text-gray-500 text-xs italic self-start"
                      >
                        {userName} está escribiendo...
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                <div className="flex items-center gap-2 p-4 border-t">
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newMessage.trim() !== "") {
                        handleSend(newMessage);
                        setNewMessage("");
                      }
                    }}
                
                  />

                  <Button
                    onClick={() => {
                      if (newMessage.trim() !== "") {
                        handleSend(newMessage);
                        setNewMessage("");
                      }
                    }}
                
                  >
                    Enviar
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
        )}
      </AnimatePresence>
  );
}
