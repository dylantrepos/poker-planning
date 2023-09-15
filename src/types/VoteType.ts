import type { RoomId, UserId, UserName, Vote } from "./GenericType";

/**
 * Vote
 */
export type VoteInfo = {
  userId: UserId;
  roomId: RoomId;
  vote: Vote;
}

export type VoteEmit = {
  userId: UserId;
  roomId: RoomId;
}


export type VoteStateEmit = {
  close: boolean
}

export type VoteResultsInfo = {
  vote: number,
  users: UserName[],
}

export type VoteResults = Record<string, VoteResultsInfo>