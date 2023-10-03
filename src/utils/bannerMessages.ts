import useGeneralStore from "@/store/useGeneralStore";
import useRoomStore from "@/store/useRoomStore";

export const setMessageShareRoom = () => {
  useGeneralStore().setBannerMessage(
    'Copy the link and share it to invite more players'
  );
};

export const setMessageReveal = () => {
  useGeneralStore().setBannerMessage(
    useRoomStore().isVoteClosed 
      ? 'Start a new game' 
      : 'Reveal all the cards and get the score'
    );
};

export const setMessageVote = () => {
  useGeneralStore().setBannerMessage(
    useRoomStore().isVoteClosed 
    ? 'You can\'t Choose your card for the moment' 
    : 'Choose your card and get ready to play'
  );
};

export const setMessageLead = () => {
  useGeneralStore().setBannerMessage(
    'Give your lead status to another player'
  );
};

export const setMessageDefault = () => {
  useGeneralStore().setBannerMessage(
    useRoomStore().isVoteClosed 
    ? 'Vote closed ! Waiting for new game...' 
    : 'Waiting for votes...'
  );
};
