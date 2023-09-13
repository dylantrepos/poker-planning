import type { Order, RoomId, UserId, UserName, Vote } from "./GenericType";

/**
 * Message
 */
export type Message = {
  roomId: RoomId;
  userId: UserId;
  username: UserName;
  vote: Vote;
  message: string;
  order: Order;
}
export type MessageEmit = {
  roomId: RoomId; 
  userId: UserId; 
  username: UserName;
  message: string;
}
