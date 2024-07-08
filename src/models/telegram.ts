import { Message, SendMessageParams } from "../types/telegram";
import { Method } from "../types/methods";

abstract class Telegram {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  protected abstract sendRequest<R = any, D = unknown>(
    method: Method,
    data: D,
  ): Promise<R>;

  public async sendMessage(params: SendMessageParams) {
    if (!params.chat_id) {
      throw new Error("Chat id not set");
    }

    if (!params.text) {
      throw new Error("Message text is empty");
    }

    if (params.text.length > 4096) {
      const messages = [];

      let messageCursor = 0;
      let messagePart = "";

      do {
        messagePart = params.text.slice(messageCursor, messageCursor + 4096);

        if (messagePart) {
          messages.push(messagePart);
        }

        messageCursor += 4096;
      } while (messagePart);

      return this.sendMessages(
        messages.map((text) => ({ ...params, text })),
      ).then((m) => m[0]);
    }

    return this.sendRequest<Message, SendMessageParams>("sendMessage", params);
  }

  public async sendMessages(params: SendMessageParams[]): Promise<Message[]> {
    return Promise.all(params.map(this.sendMessage));
  }

  public isSameChat(message: Message) {
    return (
      message &&
      message.chat &&
      message.from &&
      message.chat.id === message.from.id
    );
  }

  public isGroup(message: Message) {
    return !this.isSameChat(message);
  }
}

export default Telegram;
