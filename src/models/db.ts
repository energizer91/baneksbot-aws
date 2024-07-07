import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { User } from "../types/db";

const dynamodb = new DocumentClient();

const USERS_TABLE = process.env.USERS_TABLE!;
const RECORDS_TABLE = process.env.RECORDS_TABLE!;

export async function getUser(id: number) {
  const params = {
    TableName: USERS_TABLE,
    Key: { id },
  };
  const result = await dynamodb.get(params).promise();

  return (result.Item as User) || null;
}

export async function createUser(user: Partial<User>) {
  if (!user.id) {
    throw new Error("User id not set");
  }

  const params = {
    TableName: USERS_TABLE,
    Item: user,
  };

  await dynamodb.put(params).promise();

  return formatUser(user);
}

export async function updateUser(
  id: number,
  updatedUser: Partial<Omit<User, "user_id">>,
) {
  const user = await getUser(id);

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  const newUser = { ...user, ...updatedUser };

  const params = {
    TableName: USERS_TABLE,
    Key: { ...user, ...updatedUser },
  };

  await dynamodb.update(params).promise();

  return formatUser(newUser);
}

export async function deleteUser(userId: number) {
  const params = {
    TableName: USERS_TABLE,
    Key: { id: userId },
  };

  await dynamodb.delete(params).promise();
}

export async function getOrCreateUser(user: Partial<User> | void) {
  if (!user) {
    return createUser({ id: 0 });
  }

  const existingUser = await getUser(user.id!);

  if (!existingUser) {
    return createUser(user);
  }

  return existingUser;
}

export function formatUser(user: Partial<User>): User {
  return {
    approver: false,
    subscribed: false,
    deleted_subscribe: false,
    disable_commands: false,
    feedback_mode: false,
    force_attachments: false,
    suggest_mode: false,
    admin: false,
    editor: false,
    keyboard: false,
    banned: false,
    client: "",
    pin: "",
    date: new Date().getTime(),
    scheduleCount: 0,
    scheduleTimes: [],
    ...user,
  } as User;
}
