export type Role = 'user' | 'lead';

export type UserInfo = {
    roomId: string;
    userId: string;
    username: string;
    role: Role;
}

export type UserMessage = UserInfo & {
    message: string;
    order: string;
}

export type UserList = {
  userId: string;
  username: string;
  role: Role;
}[]

export type UserMessageEmit = Omit<UserMessage, 'order'>
