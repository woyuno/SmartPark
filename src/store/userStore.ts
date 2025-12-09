import { create } from 'zustand'
interface UserState {
  userDataStore: {}
  setUserDataStore: (user: any) => void
}
export const userStore = create<UserState>((set) => ({
  userDataStore: {},
  setUserDataStore: (user) => {
    set({userDataStore:user})
  },
}))
