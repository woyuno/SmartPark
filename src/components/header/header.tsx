import { DownOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import { useState } from 'react'
import { authStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
const items: MenuProps['items'] = [
  {
    key: '1',
    label: <a target="_blank">个人中心</a>,
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: <a target="_blank">退出登录</a>,
    icon: <PoweroffOutlined />,
  },
]

function MyHeader() {
  const navigator = useNavigate()
  const { clearTokenStore } = authStore((state) => state)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      // 跳转到个人中心
      navigator('/personal')
    } else {
      // 退出登录
      clearTokenStore()
      sessionStorage.removeItem('username')
    }
  }
  return (
    <Dropdown menu={{ items, onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          欢迎您，{sessionStorage.getItem('username')}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}
export default MyHeader
