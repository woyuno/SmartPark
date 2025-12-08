import { useEffect } from 'react'
import { authStore } from '../store/store'
import { useNavigate } from 'react-router-dom'
interface Iprops {
  allowed: boolean
  redirectTo: string
  children: React.ReactNode
}

function RequireAuth({ allowed, redirectTo, children }: Iprops) {
  const { tokenStore } = authStore((state) => state)
  const isLogin = tokenStore ? true : false
  const navigate = useNavigate()
  useEffect(() => {
    if (allowed !== isLogin) {
      navigate(redirectTo)
    }
  }, [allowed, isLogin, redirectTo])
  return allowed === isLogin ? <>{children}</> : null
}
export default RequireAuth
