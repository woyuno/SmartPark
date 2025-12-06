import { useEffect } from "react";
import { authStore } from "../store/store";
import { useNavigate } from "react-router-dom";
interface Iprops {
  allowed: boolean;
  redirectTo: string;
  children: React.ReactNode;
}

function RequireAuth({ allowed, redirectTo, children }: Iprops) {
  const { stateToken } = authStore((state) => state);
  const isLogin = stateToken ? true : false;
  const navigate = useNavigate();
  useEffect(() => {
    if (allowed !== isLogin) {
      navigate(redirectTo);
    }
  }, [allowed, isLogin, redirectTo]);
  console.log(children);
  return allowed === isLogin ? <>{children}</> : null;
}
export default RequireAuth;
