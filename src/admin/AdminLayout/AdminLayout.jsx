import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Layout, 
  Menu, 
  Button, 
  Avatar, 
  Dropdown, 
  theme,
  Typography,
  Space,
  Breadcrumb
} from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  CarOutlined,
  UserOutlined,
  StarOutlined,
  CompassOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  GlobalOutlined,
  LinkOutlined,
  LockOutlined,
  CustomerServiceOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { useAdmin } from '../../context/AdminContext';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/admin/site-settings',
      icon: <SettingOutlined />,
      label: 'Site Settings',
    },
    {
      key: 'content',
      icon: <CompassOutlined />,
      label: 'Content',
      children: [
        {
          key: '/admin/services',
          icon: <CustomerServiceOutlined />,
          label: 'Services',
        },
        {
          key: '/admin/trip-packages',
          icon: <CompassOutlined />,
          label: 'Trip Packages',
        },
        {
          key: '/admin/testimonials',
          icon: <StarOutlined />,
          label: 'Testimonials',
        },
      ],
    },
    {
      key: '/admin/inquiries',
      icon: <MessageOutlined />,
      label: 'Inquiries',
    },
    {
      key: '/admin/cars',
      icon: <CarOutlined />,
      label: 'Cars',
    },
    {
      key: '/admin/navigation',
      icon: <LinkOutlined />,
      label: 'Navigation',
    },
    {
      key: '/admin/settings',
      icon: <LockOutlined />,
      label: 'Admin Settings',
    },
  ];

  const userMenuItems = [
    {
      key: 'website',
      icon: <GlobalOutlined />,
      label: 'View Website',
      onClick: () => window.open('/', '_blank'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ];

  const getBreadcrumbItems = () => {
    const pathMap = {
      '/admin/dashboard': 'Dashboard',
      '/admin/site-settings': 'Site Settings',
      '/admin/services': 'Services',
      '/admin/trip-packages': 'Trip Packages',
      '/admin/testimonials': 'Testimonials',
      '/admin/cars': 'Cars',
      '/admin/navigation': 'Navigation',
      '/admin/settings': 'Admin Settings',
    };
    
    return [
      { title: 'Admin' },
      { title: pathMap[location.pathname] || 'Dashboard' },
    ];
  };

  const handleMenuClick = ({ key }) => {
    if (key.startsWith('/admin')) {
      navigate(key);
    }
  };

  const getSelectedKeys = () => [location.pathname];

  const getOpenKeys = () => {
    if (location.pathname.includes('services') || 
        location.pathname.includes('trip-packages') || 
        location.pathname.includes('testimonials')) {
      return ['content'];
    }
    return [];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
        }}
        width={250}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? 0 : '0 24px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <CarOutlined style={{ fontSize: 24, color: '#1890ff' }} />
          {!collapsed && (
            <Title level={5} style={{ margin: 0, marginLeft: 12, whiteSpace: 'nowrap' }}>
              VrudhiCabs
            </Title>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={getSelectedKeys()}
          defaultOpenKeys={getOpenKeys()}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'all 0.2s' }}>
        <Header 
          style={{ 
            padding: '0 24px', 
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 16 }}
            />
            <Breadcrumb items={getBreadcrumbItems()} />
          </Space>
          
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar 
                style={{ backgroundColor: '#1890ff' }} 
                icon={<UserOutlined />} 
              />
              <Text strong>{user?.username || 'Admin'}</Text>
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: 24,
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
