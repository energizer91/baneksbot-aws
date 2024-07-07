import { Message } from "../types/telegram";
import { User } from "../types/db";

export async function performCommand(
  command: string[],
  message: Message,
  user: User,
) {
  switch (command[0]) {
    case "/start":
      console.log("/start", command, message, user);
      break;
    default:
      console.log("default", command, message, user);
  }
}
