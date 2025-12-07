import { create } from 'zustand'
interface AuthState {
  stateToken: string | null
  setToken: (token: string) => void
  clearToken: () => void
}
export const authStore = create<AuthState>((set) => ({
  stateToken: sessionStorage.getItem('token') || null,
  setToken: (token: string) => {
    sessionStorage.setItem('token', token)
    set({
      stateToken: token,
    })
  },
  clearToken: () => {
    sessionStorage.removeItem('token')
    set({
      stateToken: null,
    })
  },
}))
