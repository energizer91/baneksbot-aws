import { Message } from "../types/telegram";
import { User } from "../types/db";
import WebhookTelegram from "./webhookTelegram";

export async function performCommand(
  command: string[],
  message: Message,
  user: User,
  telegram: WebhookTelegram,
) {
  console.log("Command", command, message, user);
  switch (command[0]) {
    case "/ping":
      await telegram.sendMessage({ chat_id: message.chat.id, text: "pong" });
      break;
    case "/start":
      await telegram.sendMessage({ chat_id: message.chat.id, text: "privet" });
      break;
    default:
  }
}

export async function performMessage(
  text: string,
  message: Message,
  user: User,
  telegram: WebhookTelegram,
) {
  console.log("Getting message", text, "from", user, "with data", message);
  return telegram.sendMessage({ chat_id: message.chat.id, text: "sam takoy" });
}
