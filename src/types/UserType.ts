/**
 * User
 */
import type { Connected, LeadId, RoomId, UserId, UserName, Vote } from "./GenericType";

export type User = {
  connected: Connected;
  roomId: RoomId;
  userId: UserId;
  userName: UserName;
}

export type UserCookie = User & {
  vote: Vote;
}

export type UserList = Record<UserId, User>;

export type LeadEmit = {
  leadId: LeadId;
  roomId: RoomId;
}
