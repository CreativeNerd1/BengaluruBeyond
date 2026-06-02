import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Typography, 
  Button, 
  Space,
  Spin,
  Timeline,
  List,
  Avatar
} from 'antd';
import {
  CarOutlined,
  CompassOutlined,
  StarOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  PlusOutlined,
  SettingOutlined,
  RightOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { 
  servicesApi, 
  tripPackagesApi, 
  testimonialsApi, 
  carsApi, 
  driversApi 
} from '../../services/api';

const { Title, Text, Paragraph } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    services: 0,
    packages: 0,
    testimonials: 0,
    cars: 0,
    drivers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [services, packages, testimonials, cars, drivers] = await Promise.all([
          servicesApi.getAll(),
          tripPackagesApi.getAll(),
          testimonialsApi.getAll(),
          carsApi.getAll(),
          driversApi.getAll(),
        ]);

        setStats({
          services: services.data?.length || 0,
          packages: packages.data?.length || 0,
          testimonials: testimonials.data?.length || 0,
          cars: cars.data?.length || 0,
          drivers: drivers.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Services', value: stats.services, icon: <CustomerServiceOutlined />, color: '#1890ff', link: '/admin/services' },
    { title: 'Trip Packages', value: stats.packages, icon: <CompassOutlined />, color: '#fa8c16', link: '/admin/trip-packages' },
    { title: 'Testimonials', value: stats.testimonials, icon: <StarOutlined />, color: '#eb2f96', link: '/admin/testimonials' },
    { title: 'Cars', value: stats.cars, icon: <CarOutlined />, color: '#52c41a', link: '/admin/cars' },
    { title: 'Drivers', value: stats.drivers, icon: <TeamOutlined />, color: '#13c2c2', link: '/admin/drivers' },
  ];

  const quickActions = [
    { title: 'Add Trip Package', icon: <CompassOutlined />, link: '/admin/trip-packages' },
    { title: 'Add Car', icon: <CarOutlined />, link: '/admin/cars' },
    { title: 'Add Driver', icon: <TeamOutlined />, link: '/admin/drivers' },
    { title: 'Site Settings', icon: <SettingOutlined />, link: '/admin/site-settings' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Spin size="large" tip="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 4 }}>Welcome to Admin Dashboard</Title>
        <Text type="secondary">Manage your BengaluruBeyond website content</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statCards.map((stat) => (
          <Col xs={24} sm={12} lg={8} xl={4.8} key={stat.title}>
            <Card 
              hoverable 
              onClick={() => navigate(stat.link)}
              style={{ borderTop: `3px solid ${stat.color}` }}
            >
              <Statistic 
                title={stat.title}
                value={stat.value}
                prefix={<span style={{ color: stat.color, marginRight: 8 }}>{stat.icon}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        {/* Quick Actions */}
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" extra={<RocketOutlined />}>
            <List
              dataSource={quickActions}
              renderItem={(item) => (
                <List.Item
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(item.link)}
                  extra={<RightOutlined style={{ color: '#bfbfbf' }} />}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={item.icon} style={{ backgroundColor: '#1890ff' }} />}
                    title={item.title}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Getting Started */}
        <Col xs={24} lg={12}>
          <Card title="Getting Started">
            <Timeline
              items={[
                {
                  color: 'blue',
                  children: (
                    <div>
                      <Text strong>Configure Site Settings</Text>
                      <Paragraph type="secondary" style={{ marginBottom: 4 }}>
                        Update your business name, phone, email, and address.
                      </Paragraph>
                      <Button type="link" size="small" style={{ padding: 0 }} onClick={() => navigate('/admin/site-settings')}>
                        Go to Settings →
                      </Button>
                    </div>
                  ),
                },
                {
                  color: 'orange',
                  children: (
                    <div>
                      <Text strong>Manage Trip Packages</Text>
                      <Paragraph type="secondary" style={{ marginBottom: 4 }}>
                        Add, edit, or remove trip packages with images and pricing.
                      </Paragraph>
                      <Button type="link" size="small" style={{ padding: 0 }} onClick={() => navigate('/admin/trip-packages')}>
                        Manage Packages →
                      </Button>
                    </div>
                  ),
                },
                {
                  color: 'green',
                  children: (
                    <div>
                      <Text strong>Add Cars & Drivers</Text>
                      <Paragraph type="secondary" style={{ marginBottom: 4 }}>
                        List your fleet of vehicles and driver profiles.
                      </Paragraph>
                      <Button type="link" size="small" style={{ padding: 0 }} onClick={() => navigate('/admin/cars')}>
                        Manage Fleet →
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
