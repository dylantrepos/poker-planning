import type { Role, Message, RoomId, UserId, UserName, Vote, VoteState, LeadId, User } from "./UserType";

export type State = {
  connected: boolean;
  roomId: RoomId;
  roomExists: boolean;
  userId: UserId;
  username: UserName;
  role: Role;
  vote: Vote;
  voteClose: VoteState; 
  leadId: LeadId;
  userList: User[];
  messages: Message[];
  votes: Record<string, string>;
}