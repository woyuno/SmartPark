import { Menu } from 'antd'
import { getMenu } from '../../api/users'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import getAntdIcon from './getAntdIcon'
import logo from '../../assets/logo.png'
import './navLeft.scss'

type MenuItem = Required<MenuProps>['items'][number]

interface MenuItemFromData {
  key: string
  label: string
  icon: string
  children?: MenuItemFromData[]
}

function NavLeft() {
  const [menuDate, setMenuData] = useState<MenuItem[]>([])
  useEffect(() => {
    configMenu()
  }, [])
  async function configMenu() {
    const { data } = await getMenu()
    const mapedMenuItems = mapMenuItems(data)
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
  return (
    <div className="navleft">
      <div className="logo">
        <img src={logo} alt="" width={18} />
        <h1>鹏远智慧园区</h1>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={menuDate}
      />
    </div>
  )
}
export default NavLeft
