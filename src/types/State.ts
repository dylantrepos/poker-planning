import type { LeadId, RoomId, UserId, UserName, VoteState } from "./GenericType";
import type { Message } from "./MessageType";
import type { UserList } from "./UserType";
import type { VoteResults } from "./VoteType";


export type State = {
  connected: boolean;
  leadId: LeadId;
  messages: Message[];
  serverLive: boolean;
  roomId: RoomId;
  roomExists: boolean;
  userId: UserId;
  userList: UserList;
  userName: UserName;
  voteClose: VoteState; 
  voteResults: VoteResults;
  votes: Record<string, string>;
}