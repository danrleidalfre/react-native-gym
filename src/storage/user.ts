import { UserDTO } from "@dtos/UserDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "@storage/config";

export async function saveUser(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function getUser() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)
  const user: UserDTO = storage ? JSON.parse(storage) : {}
  return user
}

export async function removeUser() {
  await AsyncStorage.removeItem(USER_STORAGE)
}