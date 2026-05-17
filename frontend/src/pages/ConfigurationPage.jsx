import React from 'react';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Sider } = Layout;
const siderItems = [
    { icon: UserOutlined, key: 'Users', label: 'Users', subitems: [{key:'subUsers', label:'Users'}] },
    { icon: LaptopOutlined, key: 'System', label: 'System', subitems: [{key:'subGeneral', label:'General'}, {key:'subNotifications', label:'Notifications'}] },
  ]

export default function ConfigurationPage() {
  const items = siderItems.map((item) => {
    return {
      key: item.key,
      icon: React.createElement(item.icon),
      label: item.label,
      children: item.subitems.map((subitem) => {
        return {
          key: subitem.key,
          label: subitem.label,
        };
      }),
    };
  });
  const {
    token: { colorBgContainer},
  } = theme.useToken();

  return (

    <div>
      <Sider style={{ background: colorBgContainer }} width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['subUsers']}
          defaultOpenKeys={['Users']}
          style={{ height: '100%' }}
          items={items}
        />
      </Sider>
      <h2>Configuration</h2>
      <p>Configurações do sistema.</p>
    </div>
  )
}
