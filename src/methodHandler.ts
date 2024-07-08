import { SQSHandler } from "aws-lambda";
import { SendMessageParams } from "./types/telegram";
import { QueueItem } from "./types/methods";
import MethodTelegram from "./models/methodTelegram";

const { TELEGRAM_BOT_TOKEN } = process.env;

const telegram = new MethodTelegram(
  `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`,
);

export const handler: SQSHandler = async (event) => {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("Telegram token not set");
  }

  for (const record of event.Records) {
    const body = JSON.parse(record.body) as QueueItem;
    const { method, data } = body;

    switch (method) {
      case "sendMessage":
        await telegram.sendMessage(data as SendMessageParams);
        break;
      default:
        console.error("Unknown method", method);
        break;
    }
  }
};
