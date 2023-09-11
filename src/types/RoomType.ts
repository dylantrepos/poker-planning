import type { Message } from "./MessageType";
import type { User } from "./UserType";
import type { VoteInfo } from "./VoteType";

/**
 * Room
 */
export type RoomData = {
  userList: User[];
  messages: Message[];
  votes: VoteInfo[];
};

export type RoomExists = {
  exist: boolean;
}

