export interface Letter {
    _id: string,
    senderUsername: string,
    title: string,
    text?: string,
    recipientUsername: string,
    createdAt: string,
    updatedAt: string,
}