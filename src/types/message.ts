export interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  timestamp: number;
  time: string;
};
