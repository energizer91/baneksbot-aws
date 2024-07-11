import { CommonParams, Message, SendMessageParams } from "../types/telegram";
import { Method } from "../types/methods";

const MAX_MESSAGE_LENGTH = 4096;

abstract class Telegram {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  protected abstract sendRequest<R = any, D = unknown>(
    method: Method,
    data: D,
  ): Promise<R>;

  public async sendMessage(message: SendMessageParams) {
    if (!message.chat_id) {
      throw new Error("Chat id not set");
    }

    if (!message.text) {
      throw new Error("Message text is empty");
    }

    return this.sendRequest<Message, SendMessageParams>("sendMessage", message);
  }

  public getSeparatedMessages(text: string): string[] {
    if (!text) return [];

    const messages = [];

    let messageCursor = 0;
    let messagePart = "";

    do {
      messagePart = text.slice(
        messageCursor,
        messageCursor + MAX_MESSAGE_LENGTH,
      );

      if (messagePart) {
        messages.push(messagePart);
      }

      messageCursor += MAX_MESSAGE_LENGTH;
    } while (messagePart);

    return messages;
  }

  public async sendText(
    chat_id: number,
    text: string,
    params?: CommonParams,
  ): Promise<Message | Message[]> {
    if (text.length > MAX_MESSAGE_LENGTH) {
      const texts = this.getSeparatedMessages(text);

      return Promise.all(
        texts.map((t) => this.sendText(chat_id, t, params) as Promise<Message>),
      );
    }

    return this.sendMessage({ ...params, text, chat_id });
  }

  public isSameChat(message: Message) {
    return message.chat?.id === message.from?.id;
  }

  public isGroup(message: Message) {
    return !this.isSameChat(message);
  }
}

export default Telegram;
