export type Role = 'user' | 'lead';

export type UserInfo = {
    roomId: string;
    userId: string;
    username: string;
    vote: string;
}

export type UserMessage = UserInfo & {
  message: string;
  order: string;
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

export type UserMessageEmit = Omit<UserMessage, 'order'>
