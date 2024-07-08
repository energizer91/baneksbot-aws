export const methods = ["getMe", "sendMessage"] as const;
export type Method = (typeof methods)[number];

export interface QueueItem<D = unknown> {
  method: Method;
  data: D;
}

export function isValidMethod(method: any): method is Method {
  return methods.includes(method);
}
