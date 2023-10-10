/**
 * User
 */
import type { Connected, RoomId, UserId, UserName, Vote } from "./GenericType";

export type User = {
  connected: Connected;
  roomId: RoomId;
  userId: UserId;
  userName: UserName;
}

export type UserCookie = User & {
  vote: Vote;
}

export type TableBackground = 'green' | 'red' |'blue';
export type CardBackground = 'stripe-purple' | 'black';

export type UserCookieSettings =  {
  tableBackground?: 'green' | 'red' |'blue';
  cardBackground?: 'stripe-purple' | 'black';
}

export type UserList = Record<UserId, User>;