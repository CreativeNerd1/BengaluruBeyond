import { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Space,
  Divider,
  message,
  Upload,
  Avatar,
  Row,
  Col,
  Alert,
  Popconfirm
} from 'antd';
import { 
  SaveOutlined, 
  UploadOutlined, 
  DownloadOutlined,
  DeleteOutlined,
  UserOutlined,
  LockOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useAdmin } from '../../context/AdminContext';

const { Title, Text, Paragraph } = Typography;

const Settings = () => {
  const { user } = useAdmin();
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const handleChangePassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('New passwords do not match');
      return;
    }

    if (values.newPassword.length < 6) {
      message.error('Password must be at least 6 characters');
      return;
    }

    const storedCredentials = JSON.parse(localStorage.getItem('admin_credentials') || '{}');
    const currentPassword = storedCredentials.password || 'admin123';
    
    if (values.currentPassword !== currentPassword) {
      message.error('Current password is incorrect');
      return;
    }

    setSaving(true);
    try {
      localStorage.setItem('admin_credentials', JSON.stringify({
        ...storedCredentials,
        username: storedCredentials.username || 'admin',
        password: values.newPassword,
      }));
      message.success('Password changed successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('bb_')) {
        data[key] = JSON.parse(localStorage.getItem(key) || 'null');
      }
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bengaluru-beyond-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    message.success('Data exported successfully!');
  };

  const handleImportData = (info) => {
    const file = info.file;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result);
        Object.entries(data).forEach(([key, value]) => {
          if (key.startsWith('bb_')) {
            localStorage.setItem(key, JSON.stringify(value));
          }
        });
        message.success('Data imported successfully! Refresh to see changes.');
      } catch (error) {
        message.error('Invalid backup file');
      }
    };
    reader.readAsText(file);
    return false;
  };

  const handleClearData = () => {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('bb_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    message.success('Site data cleared. Refresh the page to reinitialize defaults.');
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 4 }}>Admin Settings</Title>
        <Text type="secondary">Manage your admin account and system settings</Text>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Space size="large">
          <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div>
            <Title level={4} style={{ margin: 0 }}>{user?.username || 'Admin'}</Title>
            <Text type="secondary">Administrator</Text>
          </div>
        </Space>
      </Card>

      <Card title={<Space><LockOutlined /> Change Password</Space>} style={{ marginBottom: 24 }}>
        <Form form={form} layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Please enter current password' }]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: 'Please enter new password' }]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[{ required: true, message: 'Please confirm password' }]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving}>
            Change Password
          </Button>
        </Form>
      </Card>

      <Card title="Data Management" style={{ marginBottom: 24 }}>
        <Paragraph type="secondary">
          Export your site data for backup or import from a previous backup.
        </Paragraph>
        <Space wrap>
          <Button icon={<DownloadOutlined />} onClick={handleExportData}>
            Export Data
          </Button>
          <Upload
            accept=".json"
            showUploadList={false}
            beforeUpload={handleImportData}
          >
            <Button icon={<UploadOutlined />}>Import Data</Button>
          </Upload>
        </Space>
      </Card>

      <Card 
        title={<Space><ExclamationCircleOutlined style={{ color: '#ff4d4f' }} /> Danger Zone</Space>}
        style={{ borderColor: '#ffccc7' }}
      >
        <Alert
          message="Clear All Data"
          description="This will reset all site data to defaults. This action cannot be undone."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Popconfirm
          title="Clear all site data?"
          description="This will reset everything to defaults. This cannot be undone."
          onConfirm={handleClearData}
          okText="Yes, Clear All"
          okType="danger"
          cancelText="Cancel"
        >
          <Button danger icon={<DeleteOutlined />}>
            Clear All Data
          </Button>
        </Popconfirm>
      </Card>
    </div>
  );
};

export default Settings;
