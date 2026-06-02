import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Alert, 
  Space,
  Divider 
} from 'antd';
import { UserOutlined, LockOutlined, CarOutlined } from '@ant-design/icons';
import { useAdmin } from '../../context/AdminContext';

const { Title, Text, Paragraph } = Typography;

const AdminLogin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setError('');
    setLoading(true);

    try {
      const result = await login(values.username, values.password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 24,
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: 420,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          borderRadius: 16,
        }}
        bordered={false}
      >
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <div>
            <CarOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            <Title level={2} style={{ margin: '16px 0 4px' }}>BengaluruBeyond</Title>
            <Text type="secondary">Admin Panel</Text>
          </div>

          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              closable 
              onClose={() => setError('')}
            />
          )}

          <Form
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            style={{ textAlign: 'left' }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Username" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Password" 
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
                style={{ height: 48 }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider style={{ margin: '12px 0' }}>Demo Access</Divider>
          
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            <Text code>admin</Text> / <Text code>admin123</Text>
          </Paragraph>
        </Space>
      </Card>
    </div>
  );
};

export default AdminLogin;
