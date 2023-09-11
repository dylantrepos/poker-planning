import type { LeadEmit, User } from "@/types/UserType";
import { Socket as SocketType } from "socket.io-client";
import type { LeadId, VoteState } from "./GenericType";
import type { Message, MessageEmit } from "./MessageType";
import type { VoteEmit, VoteInfo } from "./VoteType";

export interface ServerToClientEvents {
  'userList:update': (userList: User[]) => void;
  'message:received': (message: Message) => void;
  'vote:received': (voteInfo: VoteInfo) => void;
  'vote:close': (voteState: VoteState) => void;
  'vote:open': (voteState: VoteState) => void;
  'lead:update': (leadId: LeadId) => void;
}

export interface ClientToServerEvents {
  'room:join': (userInfo: User) => void;
  'message:create': (message: MessageEmit) => void;
  'vote:create': (vote: VoteInfo) => void;
  'vote:close': (voteState: VoteEmit) => void;
  'vote:open': (voteState: VoteEmit) => void;
  'lead:update': (leadInfo: LeadEmit) => void;
}

export type Socket = SocketType<ClientToServerEvents, ServerToClientEvents>

