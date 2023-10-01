/**
 * COOKIE
*/

import useRoomStore from "@/store/useRoomStore";
import useUserStore from "@/store/useUserStore";
import type { User, UserCookie } from "@/types/UserType";
import type { VoteResults } from "@/types/VoteType";


export const addCookie = (cname: string, cvalue: string, exdays: number = 7) => {
    const date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
  
export const getCookieString = (cname: string): string | null => 
  document.cookie
  .split("; ")
  .find((row) => row.startsWith(`${cname}=`))
  ?.split("=")[1] ?? null;

export const getCookie = (): UserCookie => JSON.parse(getCookieString('poker-planning') || '{}');
  
export const removeCookie = (cname: string) => {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const getPokerPossibilities = (): string[] => [
    '0', '1/2', '1', '2', '3', '5', '8', '13', 
    '20', '40', '100', '?', 'infinity', 'cafe'
];

export const getColorPalette = (): string[] => [
    '#00A6FB', '#F08700', '#00A6A6', '#A96DA3', '#EB4511', '#DE4D86', 
    '#3C3C3C', '#087E8B', '#FF5A5F', '#FF7F11', '#62929E', '#DC136C',
];


export const updateVoteResults = (): void => {
  const results: VoteResults = {};
  const roomStore = useRoomStore();

  for (const user of Object.values(roomStore.userList)) {
    const vote = roomStore.votes[user.userId];

    // Skip if vote is empty
    if (!vote || vote === '') break; 
    
    if (results[vote]) {
      results[vote].vote++;
      results[vote].users.push(user.userName);
    }
    else { 
      results[vote] = {
        vote: 1,
        users: [user.userName]
      };
    }
  }

  roomStore.setVoteResults(results);

};

export const orderUserList = (): User[] => {
    const roomStore = useRoomStore();
    const userStore = useUserStore();

    const userListSorted = Object.values(roomStore.userList).sort();
         
    const leadIndex = userListSorted.findIndex(user => user.userId === roomStore.leadId);
    const leadElt = userListSorted.find(user => user.userId === roomStore.leadId);
    userListSorted.splice(leadIndex, 1);
        
    if (leadElt) userListSorted.unshift(leadElt);

    const userIndex = userListSorted.findIndex(user => user.userId === userStore.userId);
    const userElt = userListSorted.find(user => user.userId === userStore.userId);
    userListSorted.splice(userIndex, 1);

    if (userElt) userListSorted.unshift(userElt);

    return userListSorted;
};

const usernameToElipsis = (): User[] => {
  const userList = orderUserList();

  userList.forEach((user) => {
     if (user.userName.length > 12) {
        if (!user.userName.includes(' ')) {
           user.userName = `${user.userName.slice(0, 12)}...`;
        } else {
           user.userName = `${user.userName.slice(0, window.innerWidth >= 767 ? 24 : 14)}...`;
        }
     } 
  });
  
  return userList;
};

export const setUserPosition = () => {
  const userList = [...usernameToElipsis(), ...fakeData];
  // const userList = fakeData;
  const userListXxs: User[][] = [[], [], [], []];
  const userListSm: User[][] = [[], [], [], []];
  const userListLg: User[][] = [[], [], [], []];


  // Xxs
  userList.forEach((user, i) => {
    if (([2]).includes(i + 1)) {
       userListXxs[0].push(user);
    }
    else if (([1]).includes(i + 1)) {
       userListXxs[3].push(user);
    }
    else {
       if ((i + 1) % 2 === 0) userListXxs[2].push(user);
       else userListXxs[1].push(user);
    }
 });

  // Sm
  userList.forEach((user, i) => {
    if (([2, 6, 10]).includes(i + 1)) {
       userListSm[0].push(user);
    }
    else if (([1, 5, 9]).includes(i + 1)) {
       userListSm[3].push(user);
    }
    else {
       if ((i + 1) % 2 === 0) userListSm[2].push(user);
       else userListSm[1].push(user);
    }
 });

  // Lg
  userList.forEach((user, i) => {
     if (([3, 7, 11]).includes(i + 1)) {
      userListLg[1].push(user);
     }
     else if (([4, 8, 12]).includes(i + 1)) {
        userListLg[2].push(user);
     }
     else {
        if ((i + 1) % 2 === 0) userListLg[0].push(user);
        else userListLg[3].push(user);
     }
  });

  return {
    xxs: userListXxs,
    sm: userListSm,
    lg: userListLg
  };
};


export const fakeData = [
  {
    userName: 'Alice',
    userId: 'gergerg',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Paul',
    userId: 'xcvxcv',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Jonathan',
    userId: 'zxczxc',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Ava',
    userId: 'bnmbnm',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Evelyn',
    userId: 'mnbmnb',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Benjaminrezrzrzrez ezrzrz ',
    userId: 'rtyrty',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Liam',
    userId: 'qweqwe',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Elizabeth',
    userId: 'uoiuoi',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Matthew efzzefezf...',
    userId: 'zxczxc',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Alexander',
    userId: 'hjghjg',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Michael',
    userId: 'vbmvbm',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Charlotte',
    userId: 'yutyut',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Lucas',
    userId: 'wewewe',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Daniel',
    userId: 'tyytyy',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  },
  {
    userName: 'Sophia',
    userId: 'poiopi',
    connected: true,
    roomId: 'PGkaLuiX6Y_fyL9oAANb'
  }
];

