import { Handler } from "aws-lambda";
import { Update } from "./types/telegram";
import { getOrCreateUser } from "./models/db";
import { performCommand } from "./models/commands";
import { isGroup } from "./models/telegram";

const { BOT_NAME } = process.env;

async function processWebhook(update: Update) {
  const { message, inline_query, callback_query } = update;
  const user = await getOrCreateUser(
    message?.from || inline_query?.from || callback_query?.from,
  );
  const chat = await getOrCreateUser(message?.chat);

  if (message) {
    if (message.text) {
      const { text, from } = message;

      if (text && text.startsWith("/")) {
        const command = text.split(" ");
        const firstPart = command[0];

        if (firstPart) {
          const botName = firstPart.split("@");

          if (
            botName.length === 1 ||
            (botName.length === 2 && botName[1] === BOT_NAME)
          ) {
            if (isGroup(message) && chat.disable_commands && !user.admin) {
              return [];
            }

            await performCommand(
              [botName[0], ...command.slice(1)],
              message,
              user,
            );
          }
        }
      }
    }
  }
}

export const handler: Handler<Update> = async (event) => {
  processWebhook(event).catch(console.error);

  return {
    statusCode: 200,
    body: "OK",
  };
};
