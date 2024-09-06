import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { getUser, saveUser } from "@storage/user";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  isLoadingUserStorage: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      const { user } = data

      saveUser(user)
      setUser(user)
    } catch (error) {
      throw error
    }
  }

  async function loadUser() {
    try {
      const userLogged = await getUser()

      if (userLogged) {
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      isLoadingUserStorage,
    }}>
      {children}
    </AuthContext.Provider>
  )
}