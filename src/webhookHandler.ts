import { Handler } from "aws-lambda";
import { Update } from "./types/telegram";
import { getOrCreateUser } from "./models/db";
import { performCommand, performMessage } from "./models/bot";
import WebhookTelegram from "./models/webhookTelegram";

const { TELEGRAM_BOT_NAME, AWS_LAMBDA_FUNCTION_NAME } = process.env;

let telegram: WebhookTelegram;

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

export const handler: Handler<Update> = async (event, context) => {
  if (!telegram) {
    const invokedFunctionArn = context.invokedFunctionArn;
    const [arn, aws, lambda, region, accountId] = invokedFunctionArn.split(":");
    const queueName = `${AWS_LAMBDA_FUNCTION_NAME}-MessageQueue`;
    const queueUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;

    telegram = new WebhookTelegram(queueUrl);
  }

  processWebhook(event).catch(console.error);

  return {
    statusCode: 200,
    body: "OK",
  };
};
