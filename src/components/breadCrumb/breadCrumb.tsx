import { useLocation } from 'react-router-dom'
import { authStore } from '../../store/authStore'
import { Breadcrumb } from 'antd'
interface MenuItem {
  key: string
  label: string
  children?: MenuItem[]
}

function findBreadCrumbPath(path: string, menuItems: MenuItem[]): string[] {
  const pathSegments: string[] = []
  function findPath(currentPath: string, items: MenuItem[]) {
    for (let item of items) {
      if (currentPath.startsWith(item.key)) {
        pathSegments.push(item.label)
        if (item.children) {
          findPath(currentPath, item.children)
        }
        break
      }
    }
    return pathSegments
  }
  return findPath(path, menuItems)
}

function MyBreadCrumb() {
  const location = useLocation()
  const { menuListStore } = authStore((state) => state)
  const breadList = findBreadCrumbPath(location.pathname, menuListStore).map((item) => ({ title: item }))
  return <Breadcrumb items={breadList} className="mt mb" />
}
export default MyBreadCrumb
