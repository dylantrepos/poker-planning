/**
 * User
 */
import type { Connected, LeadId, RoomId, UserId, UserName, Vote } from "./GenericType";

export type User = {
    roomId: RoomId;
    userId: UserId;
    username: UserName;
    vote: Vote;
    connected: Connected;
}

export type UserList = Record<UserId, User>;

export type LeadEmit = {
  roomId: RoomId;
  leadId: LeadId;
}
