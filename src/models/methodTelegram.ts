import Telegram from "./telegram";
import { isValidMethod, Method } from "../types/methods";

class MethodTelegram extends Telegram {
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

    const res = await fetch(`${this.url}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status >= 300) {
      throw new Error(
        `Method ${method} failed with status code ${res.status} and text ${res.statusText}`,
      );
    }

    return <R>await res.json();
  }
}

export default MethodTelegram;
