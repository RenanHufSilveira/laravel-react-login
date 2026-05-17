import { useAuth } from '../context/AuthContext'
import { Descriptions, Avatar, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Title } = Typography

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <Avatar size={64} icon={<UserOutlined />} />
        <Title level={3} style={{ margin: 0 }}>{user?.name}</Title>
      </div>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="Nome">{user?.name}</Descriptions.Item>
        <Descriptions.Item label="E-mail">{user?.email}</Descriptions.Item>
        <Descriptions.Item label="Conta criada em">
          {user?.created_at
            ? new Date(user.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit', month: 'long', year: 'numeric',
              })
            : '—'}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}
