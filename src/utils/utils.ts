/**
 * COOKIE
*/

import { state } from "@/utils/state";

import type { UserCookie } from "@/types/UserType";
import type { VoteResults } from "@/types/VoteType";


export const addCookie = (cname: string, cvalue: string, exdays: number = 7) => {
    const date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
export const getCookieString = (cname: string): string | null => 
  document.cookie
  .split("; ")
  .find((row) => row.startsWith(`${cname}=`))
  ?.split("=")[1] ?? null;

export const getCookie = (): UserCookie => JSON.parse(getCookieString('poker-planning') || '{}');
  
export const removeCookie = (cname: string) => {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

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

  for (const user of Object.values(state.userList)) {
    const vote = state.votes[user.userId];

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
      }
    }
  }

  state.voteResults = results;

}