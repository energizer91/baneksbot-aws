import { Message } from "../types/telegram";
import { User } from "../types/db";
import Telegram from "./telegram";

export async function performCommand(
  command: string[],
  message: Message,
  user: User,
  telegram: Telegram,
) {
  console.log("Command", command, message, user);
  switch (command[0]) {
    case "/ping":
      return telegram.sendText(message.chat.id, "pong");
    case "/start":
      return telegram.sendText(message.chat.id, "privet");
    default:
      return [];
  }
}

export async function performMessage(
  text: string,
  message: Message,
  user: User,
  telegram: Telegram,
) {
  console.log("Getting message", text, "from", user, "with data", message);
  return telegram.sendText(message.chat.id, "sam takoy");
}
