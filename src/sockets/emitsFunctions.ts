import { socket } from "./sockets";

import useRoomStore from "@/store/useRoomStore";
import useUserStore from "@/store/useUserStore";

import type { User } from "@/types/UserType";
import type { Vote } from "@/types/GenericType";
import { getCookieSettings } from "@/utils/utils";
import useGeneralStore from "@/store/useGeneralStore";

// JOIN ROOM
export const emitJoinRoom = async (userInfo: Omit<User, 'connected'>): Promise<void> => {
  const { initRoom } = useRoomStore();
  const generalStore = useGeneralStore();
  
  const { userId, roomId, userName } = userInfo;
  
  initRoom(roomId, userId, userName);

  const params = getCookieSettings();

  generalStore.setTableBackground(params?.tableBackground);
  generalStore.setCardBackground(params?.cardBackground);

  socket.emit('room:join', userInfo);
};

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
