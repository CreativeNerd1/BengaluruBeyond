import { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Spin, 
  message,
  InputNumber,
  Divider
} from 'antd';
import { 
  SaveOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
  EnvironmentOutlined,
  StarOutlined
} from '@ant-design/icons';
import { siteInfoApi } from '../../services/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

const SiteSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSiteInfo();
  }, []);

  const fetchSiteInfo = async () => {
    try {
      const result = await siteInfoApi.get();
      if (result.success && result.data) {
        form.setFieldsValue({
          ...result.data,
          ...result.data.socialLinks,
        });
      }
    } catch (error) {
      message.error('Failed to load site settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setSaving(true);

    try {
      const formData = {
        name: values.name,
        tagline: values.tagline,
        phone: values.phone,
        email: values.email,
        address: values.address,
        googleRating: values.googleRating,
        totalReviews: values.totalReviews,
        socialLinks: {
          facebook: values.facebook,
          instagram: values.instagram,
          twitter: values.twitter,
          youtube: values.youtube,
          whatsapp: values.whatsapp,
          googleMaps: values.googleMaps,
        },
      };

      const result = await siteInfoApi.update(formData);
      if (result.success) {
        message.success('Site settings saved successfully!');
      } else {
        message.error('Failed to save settings');
      }
    } catch (error) {
      message.error('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Spin size="large" tip="Loading settings..." />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 4 }}>Site Settings</Title>
        <Text type="secondary">Manage your website's basic information</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Card title="Basic Information" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Business Name"
                rules={[{ required: true, message: 'Please enter business name' }]}
              >
                <Input placeholder="e.g., VrudhiCabs" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="tagline" label="Tagline">
                <Input placeholder="e.g., Your Trusted Travel Partner" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="+91 6366244686" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="info@example.com" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="address" label="Address">
            <TextArea 
              rows={3} 
              placeholder="Enter your business address"
              prefix={<HomeOutlined />}
            />
          </Form.Item>
        </Card>

        <Card title="Google Reviews" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="googleRating" label="Google Rating">
                <InputNumber 
                  min={0} 
                  max={5} 
                  step={0.1}
                  placeholder="4.8"
                  style={{ width: '100%' }}
                  prefix={<StarOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="totalReviews" label="Total Reviews">
                <InputNumber 
                  min={0}
                  placeholder="500"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Social Media Links" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="whatsapp" label="WhatsApp">
                <Input 
                  prefix={<WhatsAppOutlined style={{ color: '#25D366' }} />} 
                  placeholder="https://wa.me/916366244686" 
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="googleMaps" label="Google Maps">
                <Input 
                  prefix={<EnvironmentOutlined style={{ color: '#EA4335' }} />} 
                  placeholder="https://maps.google.com/..." 
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="instagram" label="Instagram">
                <Input 
                  prefix={<InstagramOutlined style={{ color: '#E4405F' }} />} 
                  placeholder="https://instagram.com/..." 
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="youtube" label="YouTube">
                <Input 
                  prefix={<YoutubeOutlined style={{ color: '#FF0000' }} />} 
                  placeholder="https://youtube.com/..." 
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="facebook" label="Facebook">
                <Input 
                  prefix={<FacebookOutlined style={{ color: '#1877F2' }} />} 
                  placeholder="https://facebook.com/..." 
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="twitter" label="Twitter">
                <Input 
                  prefix={<TwitterOutlined style={{ color: '#1DA1F2' }} />} 
                  placeholder="https://twitter.com/..." 
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <div style={{ textAlign: 'right' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />}
            loading={saving}
            size="large"
          >
            Save Settings
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SiteSettings;
