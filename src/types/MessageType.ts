import type { Order, RoomId, UserId, UserName, Vote } from "./GenericType";

/**
 * Message
 */
export type Message = {
  message: string;
  order: Order;
  roomId: RoomId;
  userId: UserId;
  userName: UserName;
  vote: Vote;
}
export type MessageEmit = {
  message: string;
  roomId: RoomId; 
  userId: UserId; 
  userName: UserName;
}
