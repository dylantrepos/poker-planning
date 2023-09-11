/**
 * User
 */
import type { LeadId, Role, RoomId, UserId, UserName } from "./GenericType";

export type User = {
    roomId: RoomId;
    userId: UserId;
    username: UserName;
    vote: string;
    role: Role;
}

export type UserList = {
  userId: string;
  username: string;
  role: Role;
  vote: string;
}[]

export type LeadEmit = {
  roomId: RoomId;
  leadId: LeadId;
}
