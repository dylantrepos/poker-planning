import type { RoomId, UserId, UserName, Vote } from "./GenericType";

/**
 * Vote
 */
export type VoteInfo = {
  roomId: RoomId;
  userId: UserId;
  vote: Vote;
}

export type VoteEmit = {
  roomId: RoomId;
  userId: UserId;
}


export type VoteStateEmit = {
  close: boolean
}

export type VoteResultsInfo = {
  users: UserName[],
  vote: number,
}

export type VoteResults = Record<string, VoteResultsInfo>