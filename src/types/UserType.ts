export type Role = 'user' | 'lead';

export type UserInfo = {
    roomId: string;
    userId: string;
    username: string;
    vote: string;
    role: Role;
}

export type UserMessage = {
  roomId: string;
  userId: string;
  username: string;
  vote: string;
  message: string;
  order: string;
}
export type UserMessageEmit = {
  roomId: string; 
  userId: string; 
  username: string;
  message: string;
}

export type UserList = {
  userId: string;
  username: string;
  role: Role;
  vote: string;
}[]

export type UserVote = {
  userId: string;
  roomId: string;
  vote: string;
}

