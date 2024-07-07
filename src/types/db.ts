import { User as TelegramUser } from "./telegram";

export interface User extends TelegramUser {
  approver: boolean;
  subscribed: boolean;
  deleted_subscribe: boolean;
  disable_commands: boolean;
  feedback_mode: boolean;
  force_attachments: boolean;
  suggest_mode: boolean;
  admin: boolean;
  editor: boolean;
  keyboard: boolean;
  banned: boolean;
  client: string;
  pin: string;
  date: number;
  scheduleCount: number;
  scheduleTimes: number[];
}
