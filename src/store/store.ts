import { create } from 'zustand'
interface AuthState {
  tokenStore: string | null
  menuListStore: []
  setTokenStore: (token: string) => void
  clearTokenStore: () => void
  setMenuListStore: (menuList: []) => void
}
export const authStore = create<AuthState>((set) => ({
  tokenStore: sessionStorage.getItem('token') || null,
  menuListStore: [],
  setTokenStore: (token: string) => {
    sessionStorage.setItem('token', token)
    set({
      tokenStore: token,
    })
  },
  clearTokenStore: () => {
    sessionStorage.removeItem('token')
    set({
      tokenStore: null,
    })
  },
  setMenuListStore: (menuList: []) => {
    set({
      menuListStore: menuList,
    })
  },
}))
