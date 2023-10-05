import type { RoomData } from "./RoomType";

export type Connected = boolean;
export type MessageContent = string;
export type Order = string;
export type Room = Record<RoomId, RoomData>;
export type RoomId = string;
export type UserId = string;
export type UserName = string;
export type VoteState = boolean;
export type Vote = 
  '' | '0' | '1/2' | '1' | '2' | 
  '3' | '5' | '8' | '13' | 
  '20' | '40' | '100' | '?' | 
  'infinity' | 'cafe';