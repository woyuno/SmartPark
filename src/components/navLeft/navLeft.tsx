import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import getAntdIcon from './getAntdIcon'
import logo from '../../assets/logo.png'
import './navLeft.scss'
import { authStore } from '../../store/store'
import { useNavigate,useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

interface MenuItemFromData {
  key: string
  label: string
  icon: string
  children?: MenuItemFromData[]
}

function NavLeft() {
  const navigate = useNavigate()
  const location = useLocation()
  const { menuListStore } = authStore((state) => state)
  const [menuDate, setMenuData] = useState<MenuItem[]>([])
  useEffect(() => {
    configMenu()
  }, [menuListStore])
  async function configMenu() { 
    const mapedMenuItems = mapMenuItems(menuListStore)
    setMenuData(mapedMenuItems)
  }
  // 将返回的菜单数据转换成我们需要的格式
  function mapMenuItems(items: MenuItemFromData[]): any {
    return items.map((item: MenuItemFromData) => ({
      key: item.key,
      label: item.label,
      icon: getAntdIcon(item.icon),
      children: item.children ? mapMenuItems(item.children) : null,
    }))
  }
  function handleClick({key}:{key:string}){
    navigate(key)
  }

  return (
    <div className="navleft">
      <div className="logo">
        <img src={logo} alt="" width={18} />
        <h1>鹏远智慧园区</h1>
      </div>
      <Menu
        defaultSelectedKeys={['/dashboard']}
        mode="inline"
        theme="dark"
        items={menuDate}
        onClick={handleClick}
        selectedKeys={[location.pathname]}
      />
    </div>
  )
}
export default NavLeft
