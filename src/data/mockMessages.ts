import { Message } from "@/types/message";

export const mockMessages: Message[] = [
  // Hace 3 días
  {
    id: "1",
    text: "Hola, ¿cómo vas?",
    sender: "them",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 1000).getTime(),
    time: "09:00",
  },
  {
    id: "2",
    text: "Bien, ¿y tú?",
    sender: "me",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2000).getTime(),
    time: "09:05",
  },

  // Ayer
  {
    id: "3",
    text: "¿Listo para el proyecto?",
    sender: "them",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 3000).getTime(),
    time: "14:20",
  },
  {
    id: "4",
    text: "Sí, avanzamos duro mañana.",
    sender: "me",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 4000).getTime(),
    time: "14:25",
  },

  // Hoy
  {
    id: "5",
    text: "Buenos días 🚀",
    sender: "me",
    timestamp: Date.now() - 10000,
    time: "08:10",
  },
  {
    id: "6",
    text: "¡Buenos días! Vamos con todo 🔥",
    sender: "them",
    timestamp: Date.now() - 5000,
    time: "08:12",
  },
];