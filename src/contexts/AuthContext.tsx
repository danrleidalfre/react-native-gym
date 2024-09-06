import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { getToken, removeToken, saveToken } from "@storage/token";
import { getUser, removeUser, saveUser } from "@storage/user";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextProps = {
  user: UserDTO
  isLoadingUserStorage: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
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
      setIsLoadingUserStorage(true)

      const { data } = await api.post('/sessions', { email, password })
      const { user, token } = data

      if (user && token) {
        saveUser(user)
        saveToken(token)
        updateUserAndToken(user, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true)
      setUser({} as UserDTO)
      await removeUser()
      await removeToken()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function loadUser() {
    try {
      setIsLoadingUserStorage(true)

      const userLogged = await getUser()
      const token = await getToken()

      if (userLogged && token) {
        updateUserAndToken(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  function updateUserAndToken(user: UserDTO, token: string) {
    setUser(user)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isLoadingUserStorage,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}