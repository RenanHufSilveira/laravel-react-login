import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'

const { Header, Content, Footer } = Layout

// Mapeamento rota → chave do menu
const ROUTE_TO_KEY = {
  '/dashboard':     'Dashboard',
  '/configuration': 'Configuration',
  '/profile':       'Profile',
}

export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate          = useNavigate()
  const location          = useLocation()
  const currentYear       = new Date().getFullYear()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const selectedKey = ROUTE_TO_KEY[location.pathname] ?? 'Dashboard'

  // Itens do lado esquerdo
  const leftItems = [
    { key: 'Dashboard',     label: 'Dashboard' },
    { key: 'Configuration', label: 'Configuration' },
  ]

  // Itens do lado direito — nome do usuário e sair dentro do mesmo Menu
  const rightItems = [
    {
      key:   'Profile',
      icon:  <UserOutlined />,
      label: user?.name,
    },
    {
      key:   'Logout',
      icon:  <LogoutOutlined />,
      label: 'Sair',
    },
  ]

  function handleMenuClick({ key }) {
    if (key === 'Logout') {
      logout()
      return
    }
    navigate(`/${key.toLowerCase()}`)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
        {/* Menu esquerdo — navegação principal */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={leftItems}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />

        {/* Menu direito — perfil e logout, mesmo componente para hover/seleção consistentes */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={rightItems}
          onClick={handleMenuClick}
          style={{ minWidth: 0 }}
        />
      </Header>

      <div style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: selectedKey }]}
        />
        <Layout
          style={{
            padding: '24px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </div>

      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{currentYear} Created by Ant UED
      </Footer>
    </Layout>
  )
}
