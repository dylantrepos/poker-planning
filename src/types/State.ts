import type { LeadId, RoomId, UserId, UserName, Vote, VoteState } from "./GenericType";
import type { Message } from "./MessageType";
import type { UserList } from "./UserType";


export type State = {
  connected: boolean;
  roomId: RoomId;
  roomExists: boolean;
  userId: UserId;
  username: UserName;
  vote: Vote;
  voteClose: VoteState; 
  leadId: LeadId;
  userList: UserList;
  messages: Message[];
  votes: Record<string, string>;
}