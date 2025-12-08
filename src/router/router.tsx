import React from 'react'
import RequireAuth from '../utils/RequireAuth'
import { RouteObject } from 'react-router-dom'

const Home = React.lazy(() => import('../page/home/home'))
const Login = React.lazy(() => import('../page/login/login'))
const NotFound = React.lazy(() => import('../page/404/404'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RequireAuth allowed={true} redirectTo="/login">
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: '/login',
    element: (
      <RequireAuth allowed={false} redirectTo="/">
        <Login />
      </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
export default routes
