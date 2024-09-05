import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode, useState } from "react";

export type AuthContextProps = {
  user: UserDTO
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({
    id: '1',
    name: 'Danrlei',
    email: 'danrlei@dalfre.com',
    avatar: 'https://github.com/danrleidalfre.png'
  })

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}