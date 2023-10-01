import type { LeadId, RoomId, UserId, UserName, VoteState } from "./GenericType";
import type { Message } from "./MessageType";
import type { User, UserList } from "./UserType";
import type { VoteResults } from "./VoteType";


export type State = {
  leadId: LeadId;
  roomId: RoomId;
  userId: UserId;
  userName: UserName;
  messages: Message[];
  roomExists: boolean;
  userList: UserList;
  userListOrdered: {
    xxs: User[][],
    sm: User[][],
    lg: User[][]
  };
  voteClose: VoteState; 
  voteResults: VoteResults;
  votes: Record<string, string>;
}