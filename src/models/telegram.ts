import { Message } from "../types/telegram";

export function isSameChat(message: Message) {
  return (
    message &&
    message.chat &&
    message.from &&
    message.chat.id === message.from.id
  );
}

export function isGroup(message: Message) {
  return !isSameChat(message);
}
