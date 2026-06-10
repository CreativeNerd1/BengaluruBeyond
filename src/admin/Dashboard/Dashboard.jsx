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
  Avatar,
  Tag,
  Badge,
  Empty
} from 'antd';
import {
  CarOutlined,
  CompassOutlined,
  StarOutlined,
  CustomerServiceOutlined,
  PlusOutlined,
  SettingOutlined,
  RightOutlined,
  RocketOutlined,
  MessageOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { 
  dashboardApi,
  inquiriesApi,
  servicesApi, 
  tripPackagesApi, 
  testimonialsApi, 
  carsApi
} from '../../services/api';

const { Title, Text, Paragraph } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch from backend first
        const [dashboardStats, inquiries] = await Promise.all([
          dashboardApi.getStats(),
          inquiriesApi.getRecent(5),
        ]);

        if (dashboardStats.success) {
          setStats(dashboardStats.data);
        } else {
          // Fallback to counting from individual APIs
          const [services, packages, testimonials, cars] = await Promise.all([
            servicesApi.getAll(),
            tripPackagesApi.getAll(),
            testimonialsApi.getAll(),
            carsApi.getAll(),
          ]);
          setStats({
            totalPackages: packages.data?.length || 0,
            activePackages: packages.data?.filter(p => p.isActive)?.length || 0,
            totalCars: cars.data?.length || 0,
            availableCars: cars.data?.filter(c => c.isAvailable)?.length || 0,
            totalTestimonials: testimonials.data?.length || 0,
            averageRating: 4.8,
            totalInquiries: 0,
            newInquiries: 0,
          });
        }

        if (inquiries.success) {
          setRecentInquiries(inquiries.data || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = stats ? [
    { title: 'Trip Packages', value: stats.totalPackages, subtitle: `${stats.activePackages} active`, icon: <CompassOutlined />, color: '#fa8c16', link: '/admin/trip-packages' },
    { title: 'Inquiries', value: stats.totalInquiries, subtitle: stats.newInquiries > 0 ? <Badge status="processing" text={`${stats.newInquiries} new`} /> : 'No new', icon: <MessageOutlined />, color: '#eb2f96', link: '/admin/inquiries' },
    { title: 'Cars', value: stats.totalCars, subtitle: `${stats.availableCars} available`, icon: <CarOutlined />, color: '#52c41a', link: '/admin/cars' },
    { title: 'Reviews', value: stats.totalTestimonials, subtitle: `★ ${stats.averageRating} avg`, icon: <StarOutlined />, color: '#722ed1', link: '/admin/testimonials' },
  ] : [];

  const quickActions = [
    { title: 'View Inquiries', icon: <MessageOutlined />, link: '/admin/inquiries', badge: stats?.newInquiries },
    { title: 'Add Trip Package', icon: <CompassOutlined />, link: '/admin/trip-packages' },
    { title: 'Manage Fleet', icon: <CarOutlined />, link: '/admin/cars' },
    { title: 'Site Settings', icon: <SettingOutlined />, link: '/admin/site-settings' },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  const getSourceColor = (source) => {
    const colors = {
      'Contact': 'cyan',
      'TripPackage': 'purple',
      'CabService': 'geekblue',
    };
    return colors[source] || 'default';
  };

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
        <Title level={3} style={{ marginBottom: 4 }}>Dashboard</Title>
        <Text type="secondary">Overview of your VrudhiCabs business</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statCards.map((stat) => (
          <Col xs={12} sm={8} lg={4.8} key={stat.title}>
            <Card 
              hoverable 
              size="small"
              onClick={() => navigate(stat.link)}
              style={{ borderTop: `3px solid ${stat.color}` }}
            >
              <Statistic 
                title={<span style={{ fontSize: 12 }}>{stat.title}</span>}
                value={stat.value}
                prefix={<span style={{ color: stat.color, marginRight: 4 }}>{stat.icon}</span>}
                valueStyle={{ fontSize: 24 }}
              />
              <div style={{ marginTop: 4, fontSize: 12, color: '#666' }}>{stat.subtitle}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        {/* Recent Inquiries */}
        <Col xs={24} lg={14}>
          <Card 
            title={<><MessageOutlined /> Recent Inquiries</>}
            extra={
              <Button type="link" onClick={() => navigate('/admin/inquiries')}>
                View All →
              </Button>
            }
          >
            {recentInquiries.length > 0 ? (
              <List
                dataSource={recentInquiries}
                renderItem={(item) => (
                  <List.Item
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/admin/inquiries')}
                    extra={
                      <div style={{ textAlign: 'right' }}>
                        <Tag color={item.status === 'New' ? 'blue' : 'default'}>{item.status}</Tag>
                        <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: getSourceColor(item.source) === 'purple' ? '#722ed1' : '#1890ff' }} />}
                      title={
                        <Space>
                          {item.name}
                          <Tag color={getSourceColor(item.source)} style={{ fontSize: 10 }}>
                            {item.source}
                          </Tag>
                        </Space>
                      }
                      description={
                        <div>
                          <PhoneOutlined /> {item.phone}
                          {item.referenceName && (
                            <span style={{ marginLeft: 8, color: '#666' }}>• {item.referenceName}</span>
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty 
                description="No inquiries yet"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col xs={24} lg={10}>
          <Card title={<><RocketOutlined /> Quick Actions</>}>
            <List
              dataSource={quickActions}
              renderItem={(item) => (
                <List.Item
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(item.link)}
                  extra={<RightOutlined style={{ color: '#bfbfbf' }} />}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge count={item.badge} size="small">
                        <Avatar icon={item.icon} style={{ backgroundColor: '#1890ff' }} />
                      </Badge>
                    }
                    title={item.title}
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Getting Started Tips */}
          <Card title="Getting Started" style={{ marginTop: 16 }}>
            <Timeline
              items={[
                {
                  color: 'blue',
                  children: (
                    <div>
                      <Text strong>Configure Site Info</Text>
                      <br />
                      <Button type="link" size="small" style={{ padding: 0 }} onClick={() => navigate('/admin/site-settings')}>
                        Site Settings →
                      </Button>
                    </div>
                  ),
                },
                {
                  color: 'orange',
                  children: (
                    <div>
                      <Text strong>Add Trip Packages</Text>
                      <br />
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
                      <Text strong>Manage Fleet</Text>
                      <br />
                      <Button type="link" size="small" style={{ padding: 0 }} onClick={() => navigate('/admin/cars')}>
                        Manage Cars →
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
