import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Alert, Spin } from 'antd';
import { LockOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { driverAuthApi } from '../../services/api';
import '../DriverAuth.css';

const { Title, Text, Paragraph } = Typography;

const DriverRegister = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [driverInfo, setDriverInfo] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid verification link. Please check your email for the correct link.');
      setLoading(false);
      return;
    }

    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const result = await driverAuthApi.verifyToken(token);
      if (result.success) {
        setDriverInfo(result.data);
      } else {
        setError(result.message || 'Invalid or expired verification link.');
      }
    } catch (err) {
      setError('Failed to verify link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      const result = await driverAuthApi.register(token, values.password, values.confirmPassword);
      
      if (result.success) {
        // Store the token
        localStorage.setItem('driver_token', result.data.token);
        localStorage.setItem('driver_info', JSON.stringify(result.data));
        
        setSuccess(true);
        message.success('Registration successful!');
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/driver/dashboard');
        }, 2000);
      } else {
        message.error(result.message || 'Registration failed');
      }
    } catch (err) {
      message.error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="driver-auth-container">
        <Card className="driver-auth-card">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <Paragraph style={{ marginTop: 16 }}>Verifying your link...</Paragraph>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="driver-auth-container">
        <Card className="driver-auth-card">
          <Alert
            type="error"
            message="Verification Failed"
            description={error}
            showIcon
            style={{ marginBottom: 24 }}
          />
          <Button type="primary" block onClick={() => navigate('/driver/login')}>
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="driver-auth-container">
        <Card className="driver-auth-card">
          <div style={{ textAlign: 'center' }}>
            <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 24 }} />
            <Title level={3}>Registration Successful!</Title>
            <Paragraph>Welcome to BengaluruBeyond Driver Portal</Paragraph>
            <Paragraph type="secondary">Redirecting to your dashboard...</Paragraph>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="driver-auth-container">
      <Card className="driver-auth-card">
        <div className="driver-auth-header">
          <div className="driver-logo">🚗</div>
          <Title level={2}>Complete Your Registration</Title>
          <Text type="secondary">Set up your password to access the driver portal</Text>
        </div>

        {driverInfo && (
          <Alert
            type="info"
            message={`Welcome, ${driverInfo.driverName}!`}
            description={`Email: ${driverInfo.email}`}
            icon={<UserOutlined />}
            style={{ marginBottom: 24 }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="password"
            label="Create Password"
            rules={[
              { required: true, message: 'Please enter a password' },
              { min: 8, message: 'Password must be at least 8 characters' },
              { 
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must include uppercase, lowercase, and number'
              }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Create a strong password" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Confirm your password" 
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              loading={submitting}
            >
              Complete Registration
            </Button>
          </Form.Item>
        </Form>

        <div className="driver-auth-footer">
          <Text type="secondary">
            Already registered?{' '}
            <a onClick={() => navigate('/driver/login')}>Login here</a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default DriverRegister;
