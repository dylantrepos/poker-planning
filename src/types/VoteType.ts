import type { RoomId, UserId, Vote } from "./GenericType";

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