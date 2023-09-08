import type { UserInfo, UserList, UserMessage } from "@/types/UserType";

export type RoomId = string;

export type RoomData = {
  userList: UserList;
  messages: UserMessage[];
};

export type Room = Record<RoomId, RoomData>;

export type UserListSocket = {
  roomId: RoomId;
  userList: UserInfo[];
}

export type State = {
  connected: boolean,
  rooms: Room,
}