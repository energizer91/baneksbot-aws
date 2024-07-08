import { SQS } from "aws-sdk";
import Telegram from "./telegram";
import { isValidMethod, Method } from "../types/methods";

const sqs = new SQS();

class WebhookTelegram extends Telegram {
  protected async sendRequest<R = any, D = unknown>(
    method: Method,
    data: D,
  ): Promise<R> {
    if (!method) {
      throw new Error("Method not found");
    }

    if (!isValidMethod(method)) {
      throw new Error("Method not implemented");
    }

    const params = {
      QueueUrl: this.url,
      MessageBody: JSON.stringify(data),
    };

    const result = await sqs.sendMessage(params).promise();

    return result as R;
  }
}

export default WebhookTelegram;
