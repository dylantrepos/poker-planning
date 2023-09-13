/**
 * COOKIE
*/

import type { User } from "@/types/UserType";


export const addCookie = (cname: string, cvalue: string, exdays: number = 7) => {
    const date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
export const getCookieString = (cname: string): string | null => {
  return document.cookie
  .split("; ")
  .find((row) => row.startsWith(`${cname}=`))
  ?.split("=")[1] ?? null;
}

export const getCookie = (): User => {
  return JSON.parse(getCookieString('poker-planning') || '{}')
}
  
export const removeCookie = (cname: string) => {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const getPokerPossibilities = (): string[] => {
  return ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', 'infinity', 'cafe'];
}