import useGeneralStore from "@/store/useGeneralStore";
import useRoomStore from "@/store/useRoomStore";

let setTimer: ReturnType<typeof setTimeout>;

const clearMessage = () => {
    if (setTimer) {
      clearTimeout(setTimer);
    }
    
    setTimer = setTimeout(() => {
      setMessageDefault();
    }, 3000);
};

export const setMessageShareRoom = () => {
  const generalStore = useGeneralStore();

  generalStore.setBannerMessage(
    'Copy the link and share it to invite more players'
  );

};

export const setMessageReveal = () => {
  const generalStore = useGeneralStore();

  generalStore.setBannerMessage(
    useRoomStore().isVoteClosed 
      ? 'Start a new game' 
      : 'Reveal all the cards and get the score'
    );
};

export const setMessageVote = () => {
  const generalStore = useGeneralStore();
  const roomStore = useRoomStore();

  if (generalStore.screenWidth > 768) {
    generalStore.setBannerMessage(
      useRoomStore().isVoteClosed 
      ? 'You can\'t choose your card for the moment' 
      : 'Choose your card and get ready to play'
    );
  } else {
    if (roomStore.isVoteClosed) {
      generalStore.setBannerMessage(
        'You can\'t choose your card for the moment' 
      );
      clearMessage();
    }
  }

};

export const setMessageOptions = () => {
  const generalStore = useGeneralStore();

  generalStore.setBannerMessage(
    'Access to options menu'
  );
  if (generalStore.screenWidth < 768) clearMessage();
};

export const setMessageCopySuccess = () => {
  const generalStore = useGeneralStore();

  generalStore.setBannerMessage(
    'The link has been successfuly copy to clipboard'
  );
  if (generalStore.screenWidth < 768) clearMessage();
};

export const setMessageDefault = () => {
  useGeneralStore().setBannerMessage(
    useRoomStore().isVoteClosed 
    ? 'Vote closed ! Waiting for new round...' 
    : 'Waiting for votes...'
  );
};
