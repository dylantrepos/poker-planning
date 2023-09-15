import type { Message } from "./MessageType";
import type { User } from "./UserType";
import type { VoteInfo } from "./VoteType";

/**
 * Room
 */
export type RoomData = {
  messages: Message[];
  userList: User[];
  votes: VoteInfo[];
};

export type RoomExists = {
  exist: boolean;
}

