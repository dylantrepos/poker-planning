import type { MessageContent, Order, RoomId, UserId, UserName, Vote } from "./GenericType";

/**
 * Message
 */
export type Message = {
  message: MessageContent;
  order: Order;
  roomId: RoomId;
  userId: UserId;
  userName: UserName;
  vote: Vote;
}
export type MessageEmit = {
  message: MessageContent;
  roomId: RoomId; 
  userId: UserId; 
  userName: UserName;
}
