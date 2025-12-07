import { Button, Flex, Layout, theme } from 'antd'
import { useState } from 'react'
import NavLeft from '../../components/navLeft/navLeft'
import MyBreadCrumb from '../../components/breadCrumb/breadCrumb'
import MyHeader from '../../components/header/header'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout
function Home() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <div className="home">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <NavLeft />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer, display: 'flex' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div style={{ width: '100%', textAlign: 'right', flex: 1, paddingRight: '24px' }}>
              <MyHeader />
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <MyBreadCrumb />
            <div style={{ padding: 24, minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </div>
  )
}
export default Home
