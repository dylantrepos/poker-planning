import type { Role, UserInfo, UserList, UserMessage, UserVote } from "@/types/UserType";

export type RoomId = string;

export type RoomData = {
  userList: UserList;
  messages: UserMessage[];
  votes: UserVote[];
};

export type Room = Record<RoomId, RoomData>;

export type UserListSocket = {
  roomId: RoomId;
  userList: UserInfo[];
}

export type VoteListSocket = {
  userId: string;
  roomId: string;
  vote: string;
}

export type State = {
  connected: boolean;
  roomId: string;
  roomExists: boolean;
  userId: string;
  username: string;
  role: Role;
  rooms: Room;
}