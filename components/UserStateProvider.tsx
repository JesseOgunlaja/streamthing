"use client";

import { Children, UserType } from "@/lib/types";
import { createContext, useContext } from "react";

interface PropsType {
  children: Children;
  user: UserType;
}

const UserContext = createContext({} as UserType);
export const useUser = () => useContext(UserContext);

const UserStateProvider = ({ children, user }: PropsType) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserStateProvider;
