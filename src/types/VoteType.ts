import type { RoomId, UserId, UserName } from "./GenericType";

/**
 * Vote
 */
export type Vote = 
  '' | '0' | '1/2' | '1' | '2' | 
  '3' | '5' | '8' | '13' | 
  '20' | '40' | '100' | '?' | 
  'infinity' | 'cafe';

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