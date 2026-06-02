import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { driverAuthApi } from '../../services/api';
import '../DriverAuth.css';

const { Title, Text, Paragraph } = Typography;

const DriverLogin = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('driver_token');
    if (token) {
      navigate('/driver/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const result = await driverAuthApi.login(values.email, values.password);
      
      if (result.success) {
        // Store the token and driver info
        localStorage.setItem('driver_token', result.data.token);
        localStorage.setItem('driver_info', JSON.stringify(result.data));
        
        message.success(`Welcome back, ${result.data.name}!`);
        navigate('/driver/dashboard');
      } else {
        message.error(result.message || 'Invalid email or password');
      }
    } catch (err) {
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="driver-auth-container">
      <Card className="driver-auth-card">
        <div className="driver-auth-header">
          <div className="driver-logo">🚗</div>
          <Title level={2}>Driver Portal</Title>
          <Text type="secondary">Login to manage your rides and earnings</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="on"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Your registered email" 
              size="large"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Your password" 
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a style={{ color: '#4fd1c5' }}>Forgot password?</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              loading={loading}
              style={{ background: 'linear-gradient(135deg, #4fd1c5, #38b2ac)', border: 'none' }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="driver-auth-footer">
          <Paragraph type="secondary" style={{ marginBottom: 8 }}>
            New driver? Contact admin to get registered.
          </Paragraph>
          <Text type="secondary">
            <a onClick={() => navigate('/')}>← Back to main website</a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default DriverLogin;
