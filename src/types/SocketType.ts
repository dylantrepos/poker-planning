import type { Socket as SocketType } from "socket.io-client";
import type { User, UserList } from "@/types/UserType";
import type { RoomId } from "./GenericType";
import type { VoteInfo } from "./VoteType";

export interface ServerToClientEvents {
  'userList:update': (userList: UserList) => void;
  'vote:received': (voteInfo: VoteInfo) => void;
  'vote:close': () => void;
  'vote:open': () => void;
}

export interface ClientToServerEvents {
  'room:join': (userInfo: Omit<User, 'connected'>) => void;
  'vote:create': (vote: VoteInfo) => void;
  'vote:close': (roomId: RoomId) => void;
  'vote:open': (roomId: RoomId) => void;
}

export type Socket = SocketType<ClientToServerEvents, ServerToClientEvents>

