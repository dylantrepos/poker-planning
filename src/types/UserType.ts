export type UserInfo = {
    roomId: string;
    userId: string;
    username: string;
}

export type UserMessage = UserInfo & {
    message: string;
    order: string;
}

export type UserMessageEmit = Omit<UserMessage, 'order'>

export type UsersInRoom = Omit<UserInfo, 'roomId'>[];
