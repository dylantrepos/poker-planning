import type { RoomData } from "./RoomType";

export type Role = 'user' | 'lead';
export type VoteState = boolean;
export type LeadId = string;
export type RoomId = string;
export type Room = Record<RoomId, RoomData>;
export type Order = string;
export type UserId = string;
export type UserName = string;
export type Connected = boolean;
export type Vote = 
  '' | '0' | '1/2' | '1' | '2' | 
  '3' | '5' | '8' | '13' | 
  '20' | '40' | '100' | '?' | 
  'infinity' | 'cafe';