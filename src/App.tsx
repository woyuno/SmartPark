import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import router from './router/router'
import { useEffect, useState } from 'react'
import { generateRoutes } from './utils/generateRoutes'
import { authStore } from './store/authStore'
import { getMenu } from './api/users'

function App() {
  const { tokenStore, setMenuListStore } = authStore((state) => state)
  const [allRouters, setAllRouters] = useState<any>()
  useEffect(() => {
    getMenu().then((res) => {
      const data = res.data
      if (res.data && res.data.length) {
        setMenuListStore(data)
        const dynamicRouters = generateRoutes(data)
        const myRoutes = [...router]
        myRoutes[0].children = dynamicRouters
        myRoutes[0].children[0].index = true
        setAllRouters(createBrowserRouter(myRoutes))
      } else {
        setAllRouters(createBrowserRouter(router))
      }
    })
  }, [tokenStore])
  if (allRouters) {
    return (
      <div className="App">
        <RouterProvider router={allRouters} />
      </div>
    )
  } else {
    return <div>等下</div>
  }
}

export default App
