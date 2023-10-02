import type { User } from "@/types/UserType";
import { socket } from "./sockets";
import type { MessageEmit } from "@/types/MessageType";
import type { Vote } from "@/types/GenericType";
import useRoomStore from "@/store/useRoomStore";
import useUserStore from "@/store/useUserStore";


/**
 **
 * ROOM EVENTS
 **
 */

// JOIN ROOM
export const emitJoinRoom = async (userInfo: User): Promise<void> => {
  const { initRoom } = useRoomStore();
  
  const { userId, roomId, userName } = userInfo;
  
  initRoom(roomId, userId, userName);

  socket.emit('room:join', userInfo);
};


/**
 ** 
 * MESSAGE EVENTS
 ** 
 */

// SEND MESSAGE
export const emitMessage = (message: string): void => {  
  const { roomId } = useRoomStore();
  const { userId, userName } = useUserStore();

  const messageData: MessageEmit = {
    message,
    roomId, 
    userId, 
    userName,
};

  socket.emit('message:create', messageData);
};


/**
 ** 
 * VOTE EVENTS
 ** 
 */

// EMIT VOTE
export const emitVote = (voteValue: Vote): void => {
  const { roomId } = useRoomStore();
  const { userId } = useUserStore();

  const vote = {
    roomId,
    userId,
    vote: voteValue
  };
  
  socket.emit('vote:create', vote);
};

// CLOSE VOTE
export const emitCloseVote = (): void => {
  const { roomId } = useRoomStore();
  socket.emit('vote:close', roomId);
};

// OPEN VOTE
export const emitOpenVote = (): void => {
  const { roomId } = useRoomStore();
  socket.emit('vote:open', roomId);
};


/**
 ** 
 * LEAD EVENTS
 ** 
 */

// EMIT NEW LEAD
export const emitLead = (leadId: string): void => {
  const { roomId, setLeadId } = useRoomStore();
  
  setLeadId(leadId);

  socket.emit('lead:update', {
    leadId,
    roomId,
  });
};