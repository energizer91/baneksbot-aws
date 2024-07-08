import { Handler } from "aws-lambda";
import { Update } from "./types/telegram";
import { getOrCreateUser } from "./models/db";
import { performCommand, performMessage } from "./models/bot";
import WebhookTelegram from "./models/webhookTelegram";

const { TELEGRAM_BOT_NAME, MESSAGE_QUEUE_NAME } = process.env;

let telegram: WebhookTelegram;

async function processWebhook(update: Update) {
  console.log("Getting update", update);
  const { message, inline_query, callback_query } = update;
  const user = await getOrCreateUser(
    message?.from || inline_query?.from || callback_query?.from,
  );
  const chat = await getOrCreateUser(message?.chat);

  if (message) {
    if (message.text) {
      const { text } = message;

      if (text && text.startsWith("/")) {
        const command = text.split(" ");
        const firstPart = command[0];

        if (firstPart) {
          const botName = firstPart.split("@");

          if (
            botName.length === 1 ||
            (botName.length === 2 && botName[1] === TELEGRAM_BOT_NAME)
          ) {
            if (
              telegram.isGroup(message) &&
              chat.disable_commands &&
              !user.admin
            ) {
              return;
            }

            return performCommand(
              [botName[0], ...command.slice(1)],
              message,
              user,
              telegram,
            );
          }
        }
      }

      return performMessage(message.text, message, user, telegram);
    }
  }
}

export const handler: Handler = async (event, context) => {
  if (!telegram) {
    const invokedFunctionArn = context.invokedFunctionArn;
    const [arn, aws, lambda, region, accountId] = invokedFunctionArn.split(":");
    const queueUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${MESSAGE_QUEUE_NAME}`;

    telegram = new WebhookTelegram(queueUrl);
  }

  try {
    const body = JSON.parse(event.body) as Update;

    await processWebhook(body);
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: 200,
    body: "OK",
  };
};
