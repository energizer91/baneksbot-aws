export enum ParseMode {
  Markdown = "Markdown",
  HTML = "HTML",
}

export enum PollType {
  Regular = "regular",
  Quiz = "quiz",
}

export enum MessageEntityType {
  Mention = "mention",
  Hashtag = "hashtag",
  Cashtag = "cashtag",
  BotCommand = "bot_command",
  Email = "email",
  PhoneNumber = "phone_number",
  Bold = "bold",
  Italic = "italic",
  Underline = "underline",
  Strikethrough = "strikethrough",
  Code = "code",
  Pre = "pre",
  TextLink = "text_link",
  TextMention = "text_mention",
}

export type UserId = number | string;

type ResponseParameters = {
  migrate_to_chat_id?: number;
  retry_after?: number;
};

export type TelegramSuccessfulResponse<T> = {
  ok: true;
  result: T;
};

export type TelegramErrorResponse = {
  ok: false;
  error_code: number;
  description: string;
  parameters?: ResponseParameters;
};

export type TelegramResponse<T> =
  | TelegramSuccessfulResponse<T>
  | TelegramErrorResponse;

export type WebhookInfo = {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
  last_error_date?: number;
  last_error_message?: string;
  max_connections?: number;
  allowed_updates?: string[];
};

export type BotCommand = {
  command: string;
  description: string;
};

export type User = {
  id: number;
  is_bot: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  title?: string;
};

export type Chat = {
  id: number;
  type: string;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo?: ChatPhoto;
  description?: string;
  invite_link?: string;
  pinned_message?: Message;
  slow_mode_delay?: number;
  sticker_set_name?: string;
  can_set_sticker_set?: boolean;
};

/**
 * Describes incoming Telegram message
 */
export type Message = {
  message_id: number;
  from?: User;
  chat: Chat;
  forward_from?: User;
  forward_from_chat?: Chat;
  forward_from_message_id?: number;
  forward_signature?: string;
  forward_date?: number;
  reply_to_message?: Message;
  via_bot?: boolean;
  edit_date?: number;
  media_group_id?: string;
  author_signature?: string;
  text?: string;
  entities?: MessageEntity[];
  caption_entries?: MessageEntity[];
  audio?: Audio;
  document?: Document;
  animation?: Animation;
  game?: Game;
  photo?: PhotoSize[];
  sticker?: Sticker;
  video?: Video;
  voice?: Voice;
  video_note?: VideoNote;
  caption?: string;
  contact?: Contact;
  location?: Location;
  venue?: Venue;
  new_chat_members?: User[];
  left_chat_member?: User;
  new_chat_title?: string;
  new_chat_photo: PhotoSize[];
  delete_chat_photo?: true;
  group_chat_created?: true;
  supergroup_chat_created?: true;
  channel_chat_created?: true;
  migrate_to_chat_id?: number;
  pinned_message?: Message;
  invoice?: Invoice;
  successful_payment?: SuccessfulPayment;
  connected_website?: string;
  passport_data?: PassportData;
};

type MessageEntity = {
  type: MessageEntityType;
  offset: number;
  length: number;
  url?: string;
  user?: User;
};

type PhotoSize = {
  file_id: string;
  width: number;
  height: number;
  file_size?: number;
};

type Audio = {
  file_id: string;
  duration: number;
  performer?: string;
  title?: string;
  mime_type?: string;
  file_size?: number;
  thumb?: PhotoSize;
};

type Document = {
  file_id: string;
  thumb?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
};

type Video = {
  file_id: string;
  width: number;
  height: number;
  duration: number;
  thumb?: PhotoSize;
  mime_type?: string;
  file_size?: number;
};

type Animation = {
  file_id: string;
  width: number;
  height: number;
  duration: number;
  thumb?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
};

type Voice = {
  file_id: string;
  duration: number;
  mime_type?: string;
  file_size?: number;
};

type VideoNote = {
  file_id: string;
  length: number;
  duration: number;
  thumb?: PhotoSize;
  file_size?: number;
};

type Contact = {
  phone_number: string;
  first_name: string;
  last_name?: string;
  user_id?: number;
  vcard?: string;
};

type Location = {
  longitude: number;
  latitude: number;
};

type Venue = {
  location: Location;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
};

type UserProfilePhotos = {
  total_count: string;
  photos: PhotoSize[][];
};

type File = {
  file_id: string;
  file_size?: number;
  file_path?: string;
};

export type ReplyKeyboardMarkup = {
  keyboard: KeyboardButton[][];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  selective?: boolean;
};

export type KeyboardButton = {
  text: string;
  request_contact?: boolean;
  request_location?: boolean;
};

export type ReplyKeyboardRemove = {
  remove_keyboard: true;
  selective?: true;
};

export type InlineKeyboard = InlineKeyboardButton[][];

export type InlineKeyboardMarkup = {
  inline_keyboard: InlineKeyboard;
};

export type InlineKeyboardButton = {
  text: string;
  url?: string;
  callback_data?: string;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  callback_game?: CallbackGame;
  pay?: boolean;
};

export type ReplyParameters = {
  message_id: number;
  chat_id?: number | string;
  allow_sending_without_reply?: boolean;
  quote?: string;
  quote_parse_mode?: ParseMode;
  quote_entities?: MessageEntity[];
  quote_position?: number;
};

export type CallbackQuery = {
  id: string;
  from: User;
  message?: Message;
  inline_message_id?: string;
  chat_instance: string;
  data?: string;
  game_short_name?: string;
};

export type ForceReply = {
  force_reply: true;
  selective?: true;
};

type ChatPhoto = {
  small_file_id: string;
  big_file_id: string;
};

type ChatMember = {
  user: User;
  status:
    | "creator"
    | "administrator"
    | "member"
    | "restricted"
    | "left"
    | "kicked";
  until_date?: number;
  can_be_edited?: boolean;
  can_change_info?: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_delete_messages?: boolean;
  can_invite_users?: boolean;
  can_restrict_members?: boolean;
  can_pin_messages?: boolean;
  can_promote_members?: boolean;
  can_send_messages?: boolean;
  can_send_media_messages?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
};

interface InputMedia {
  type: string;
  media: string;
  caption?: string;
  parse_mode?: ParseMode;
}

export interface InputMediaPhoto extends InputMedia {
  type: "photo";
}

interface InputMediaVideo extends InputMedia {
  type: "video";
  thumb?: InputFile | string;
  width?: number;
  height?: number;
  duration?: number;
  supports_streaming?: boolean;
}

interface InputMediaAnimation extends InputMedia {
  type: "animation";
  thumb?: InputFile | string;
  width?: number;
  height?: number;
  duration?: number;
}

interface InputMediaAudio extends InputMedia {
  type: "audio";
  thumb?: InputFile | string;
  duration?: number;
  performer?: string;
  title?: string;
}

interface InputMediaDocument extends InputMedia {
  type: "document";
  thumb?: InputFile | string;
}

type InputFile = ReadableStream;

type Game = {
  title: string;
  description: string;
  photo: PhotoSize[];
  text?: string;
  text_entities?: MessageEntity[];
  animation?: Animation;
};

type CallbackGame = void;

type Sticker = {
  file_id: string;
  width: number;
  height: number;
  thumb?: PhotoSize;
  emoji?: string;
  set_name?: string;
  mask_position?: MaskPosition;
  file_size?: number;
};

type StickerSet = {
  name: string;
  title: string;
  contains_masks: boolean;
  stickers: Sticker[];
};

type MaskPosition = {
  point: "forehead" | "eyes" | "mouth" | "chin";
  x_shift: number;
  y_shift: number;
  scale: number;
};

type PassportData = {
  data: EncryptedPassportElement[];
  credentials: EncryptedCredentials;
};

type PassportFile = {
  file_id: string;
  file_size: number;
  file_date: number;
};

type EncryptedPassportElement = {
  type:
    | "personal_details"
    | "passport"
    | "driving_licence"
    | "identity_card"
    | "internal_passport"
    | "address"
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration"
    | "phone_number"
    | "email";
  data?: string;
  phone_number?: string;
  email?: string;
  files?: PassportFile[];
  front_side?: PassportFile;
  reverse_side?: PassportFile;
  selfie?: PassportFile;
  translation?: PassportFile[];
  hash?: string;
};

type EncryptedCredentials = {
  data: string;
  hash: string;
  secret: string;
};

export type MediaGroup = InputMediaPhoto[] | InputMediaVideo[];

export type PreCheckoutQuery = {
  id: string;
  from: User;
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: OrderInfo;
};

type OrderInfo = {
  name?: string;
  phone_number?: string;
  email?: string;
};

export type ReplyMarkup =
  | InlineKeyboardMarkup
  | ReplyKeyboardMarkup
  | ReplyKeyboardRemove
  | ForceReply;

export type SuccessfulPayment = {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  order_info?: OrderInfo;
  telegram_payment_charge_id: string;
  provider_payment_charge_id: string;
};

export type InlineQuery = {
  id: string;
  from: User;
  location?: Location;
  query: string;
  offset?: string;
};

interface InlineQueryResult {
  type: string;
  id: string;
  input_message_content: InputMessageContent;
  title?: string;
  caption?: string;
  parse_mode?: ParseMode;
  reply_markup?: ReplyMarkup;
}

export interface InlineQueryResultArticle extends InlineQueryResult {
  type: "article";
  url?: string;
  hide_url?: string;
  description?: string;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
}

interface InlineQueryResultPhoto extends InlineQueryResult {
  type: "photo";
  description?: string;
  photo_url: string;
  thumb_url: string;
  photo_width?: number;
  photo_height?: number;
}

interface InlineQueryResultGif extends InlineQueryResult {
  gif_url: string;
  gif_width?: number;
  gif_height?: number;
  gif_duration?: number;
  thumb_url: string;
}

type InputMessageContent = {
  message_text: string;
  parse_mode?: ParseMode;
  disable_web_page_preview?: boolean;
};

type Invoice = {
  title: string;
  description?: string;
  start_parameter: string;
  currency: string;
  total_amount: string;
  payload: string;
  prices?: string;
};

type AnswerCallbackQuery = {
  text: string;
  show_alert?: boolean;
  url?: string;
};

export type Update = {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  channel_post?: Message;
  edited_channel_post?: Message;
  inline_query?: InlineQuery;
  callback_query?: CallbackQuery;
  pre_checkout_query?: PreCheckoutQuery;
  poll?: Poll;
  poll_answer?: PollAnswer;
};

export type CommonParams = OtherParams & {
  parse_mode?: ParseMode;
  reply_markup?: ReplyMarkup;
  disable_notification?: boolean;
  reply_parameters?: ReplyParameters;
};

export type SendMessageParams = CommonParams & {
  chat_id: UserId;
  text: string;
};

export type SendMediaParams = CommonParams & {
  chat_id: UserId;
  caption?: string;
};

export type OtherParams = {
  disableComments?: boolean;
  forcePlaceholder?: boolean;
  native?: boolean;
  language?: string;
  needApprove?: boolean;
  analysis?: boolean;
  admin?: boolean;
  editor?: boolean;
  keyboard?: boolean;
  suggest?: boolean;
  buttons?: InlineKeyboardMarkup;
  forceAttachments?: boolean;
  disableAttachments?: boolean;
  disableButtons?: boolean;
  disableStandardButtons?: boolean;
};

type InvoiceParams = {
  title: string;
  description: string;
  payload: string;
  start_parameter: string;
  currency: string;
  prices: string;
  provider_data?: string;
  photo_url?: string;
  photo_size?: number;
  photo_width?: number;
  photo_height?: number;
  need_name?: boolean;
  need_phone_number?: boolean;
  need_email?: boolean;
  need_shipping_address?: boolean;
  send_phone_number_to_provider?: boolean;
  send_email_to_provider?: boolean;
  is_flexible?: boolean;
  disable_notification?: boolean;
  reply_to_message_id?: number;
  reply_markup?: string;
};

export type PollParams = {
  is_anonymous?: boolean;
  type?: PollType;
  allow_multiple_answers?: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_parse_mode?: ParseMode;
  open_period?: number;
  close_date?: number;
  is_closed?: boolean;
};

export type LabeledPrice = {
  label: string;
  amount: number;
};

export enum ChatAction {
  typing = "typing",
  uploadPhoto = "upload_photo",
  uploadVideo = "upload_video",
  uploadAudio = "upload_audio",
  uploadDocument = "upload_document",
}

export type AdminRights = {
  can_change_info?: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_delete_messages?: boolean;
  can_invite_users?: boolean;
  can_restrict_members?: boolean;
  can_pin_messages?: boolean;
  can_promote_members?: boolean;
};

export type PollOption = {
  text: string;
  voter_count: number;
};

export type PollAnswer = {
  poll_id: string;
  user: User;
  option_ids: number[];
};

export type BasePoll = {
  id: string;
  question: string;
  options: PollOption[];
  total_voter_count: number;
  is_closed: boolean;
  is_anonymous: boolean;
  type: PollType;
  open_period?: number;
  close_date?: number;
};

export type RegularPoll = {
  type: PollType.Regular;
  allow_multiple_answers: boolean;
};

export type QuizPoll = {
  type: PollType.Quiz;
  correct_option_id?: number;
  explanation?: string;
  explanation_entities?: MessageEntity[];
};

export type Poll = BasePoll & RegularPoll & QuizPoll;
