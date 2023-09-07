export type UserInfo = {
    roomId: string;
    userId: string;
    username: string;
}

export type UserMessage = UserInfo & {
    message: string;
}
