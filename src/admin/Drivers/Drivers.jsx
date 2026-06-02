import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  InputNumber,
  Select,
  Switch,
  Space, 
  Typography, 
  Card,
  Popconfirm,
  message,
  Tag,
  Avatar,
  Rate,
  Row,
  Col,
  Tabs,
  DatePicker,
  Tooltip,
  Badge
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  BankOutlined,
  SendOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { driversApi } from '../../services/api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [resending, setResending] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const result = await driversApi.getAll();
      if (result.success) {
        setDrivers(result.data || []);
      }
    } catch (error) {
      message.error('Failed to load drivers');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      form.setFieldsValue({
        ...item,
        languages: item.languages || '',
        licenseExpiry: item.licenseExpiry ? dayjs(item.licenseExpiry) : null,
        dateOfBirth: item.dateOfBirth ? dayjs(item.dateOfBirth) : null,
      });
    } else {
      setEditingItem(null);
      form.resetFields();
      form.setFieldsValue({ status: 'Available', isActive: true });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const driverData = {
        ...values,
        licenseExpiry: values.licenseExpiry?.toISOString(),
        dateOfBirth: values.dateOfBirth?.toISOString(),
      };

      let result;
      if (editingItem) {
        result = await driversApi.update(editingItem.id, driverData);
      } else {
        result = await driversApi.create(driverData);
      }

      if (result.success) {
        message.success(result.message || `Driver ${editingItem ? 'updated' : 'added'} successfully!`);
        handleCloseModal();
        fetchDrivers();
      } else {
        message.error(result.error || 'Operation failed');
      }
    } catch (error) {
      message.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const result = await driversApi.delete(item.id);
      if (result.success) {
        message.success('Driver removed successfully!');
        fetchDrivers();
      }
    } catch (error) {
      message.error('Failed to delete driver');
    }
  };

  const handleResendVerification = async (driver) => {
    setResending(driver.id);
    try {
      const result = await driversApi.resendVerification(driver.id);
      if (result.success) {
        message.success('Verification email sent!');
      } else {
        message.error(result.error || 'Failed to send email');
      }
    } catch (error) {
      message.error('Failed to send verification email');
    } finally {
      setResending(null);
    }
  };

  const getRegistrationStatus = (driver) => {
    if (driver.isRegistered) {
      return <Tag icon={<CheckCircleOutlined />} color="success">Registered</Tag>;
    }
    if (driver.email) {
      return <Tag icon={<ClockCircleOutlined />} color="warning">Pending Registration</Tag>;
    }
    return <Tag color="default">No Email</Tag>;
  };

  const columns = [
    {
      title: 'Driver',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Badge dot={record.status === 'Available'} color="green" offset={[-5, 35]}>
            <Avatar src={record.imageUrl} icon={<UserOutlined />} size={45} />
          </Badge>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.experienceYears || 0} yrs • {record.totalTrips || 0} trips
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div><PhoneOutlined /> {record.phone}</div>
          {record.email && <div style={{ fontSize: 12, color: '#888' }}><MailOutlined /> {record.email}</div>}
        </div>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 140,
      render: (rating) => <Rate disabled defaultValue={rating} allowHalf style={{ fontSize: 14 }} />,
    },
    {
      title: 'Registration',
      key: 'registration',
      width: 150,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          {getRegistrationStatus(record)}
          {!record.isRegistered && record.email && (
            <Button 
              type="link" 
              size="small" 
              icon={<SendOutlined />}
              loading={resending === record.id}
              onClick={() => handleResendVerification(record)}
              style={{ padding: 0 }}
            >
              Resend Email
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (status) => {
        const colors = {
          'Available': 'green',
          'On Trip': 'blue',
          'Off Duty': 'default'
        };
        return <Tag color={colors[status] || 'default'}>{status}</Tag>;
      },
    },
    {
      title: 'Verified',
      dataIndex: 'isVerified',
      key: 'isVerified',
      width: 80,
      render: (verified) => verified ? 
        <Tag icon={<SafetyCertificateOutlined />} color="green">Yes</Tag> : 
        <Tag color="default">No</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleOpenModal(record)} />
          </Tooltip>
          <Popconfirm
            title="Remove this driver?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record)}
            okText="Remove"
            okType="danger"
          >
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const formItems = {
    basic: (
      <>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Name is required' }]}>
              <Input prefix={<UserOutlined />} placeholder="e.g., Ramesh Kumar" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Phone is required' }]}>
              <Input prefix={<PhoneOutlined />} placeholder="+91 9876543210" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          name="email" 
          label="Email Address" 
          rules={[
            { type: 'email', message: 'Please enter a valid email' },
            { required: !editingItem, message: 'Email is required for new drivers' }
          ]}
          extra={!editingItem && "A verification email will be sent to this address for driver registration"}
        >
          <Input prefix={<MailOutlined />} placeholder="driver@example.com" disabled={!!editingItem} />
        </Form.Item>

        <Form.Item name="imageUrl" label="Photo URL">
          <Input placeholder="https://example.com/driver-photo.jpg" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="experienceYears" label="Experience (Years)">
              <InputNumber min={0} max={50} style={{ width: '100%' }} placeholder="5" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="status" label="Status">
              <Select>
                <Select.Option value="Available">Available</Select.Option>
                <Select.Option value="On Trip">On Trip</Select.Option>
                <Select.Option value="Off Duty">Off Duty</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="languages" label="Languages">
              <Input placeholder="English, Kannada, Hindi" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="address" label="Address">
          <TextArea rows={2} placeholder="Full residential address" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="isVerified" label="Verified Driver" valuePropName="checked">
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="isActive" label="Active" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
        </Row>
      </>
    ),
    license: (
      <>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="licenseNumber" label="License Number">
              <Input placeholder="KA01-20XX-XXXXXXX" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="licenseExpiry" label="License Expiry">
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="aadharNumber" label="Aadhar Number">
              <Input placeholder="XXXX-XXXX-XXXX" maxLength={14} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="panNumber" label="PAN Number">
              <Input placeholder="XXXXX0000X" maxLength={10} style={{ textTransform: 'uppercase' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="bloodGroup" label="Blood Group">
              <Select placeholder="Select blood group">
                <Select.Option value="A+">A+</Select.Option>
                <Select.Option value="A-">A-</Select.Option>
                <Select.Option value="B+">B+</Select.Option>
                <Select.Option value="B-">B-</Select.Option>
                <Select.Option value="O+">O+</Select.Option>
                <Select.Option value="O-">O-</Select.Option>
                <Select.Option value="AB+">AB+</Select.Option>
                <Select.Option value="AB-">AB-</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </>
    ),
    emergency: (
      <>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="emergencyContact" label="Emergency Contact Name">
              <Input placeholder="Family member or friend name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="emergencyPhone" label="Emergency Contact Phone">
              <Input prefix={<PhoneOutlined />} placeholder="+91 9876543210" />
            </Form.Item>
          </Col>
        </Row>
      </>
    ),
    banking: (
      <>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="bankName" label="Bank Name">
              <Input prefix={<BankOutlined />} placeholder="e.g., State Bank of India" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="bankIFSC" label="IFSC Code">
              <Input placeholder="SBIN0001234" maxLength={11} style={{ textTransform: 'uppercase' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="bankAccountNumber" label="Account Number">
          <Input placeholder="Account number for salary credit" />
        </Form.Item>
      </>
    ),
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>Drivers</Title>
          <Text type="secondary">Manage driver team with authentication & documents</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          Add Driver
        </Button>
      </div>

      <Card>
        <Table 
          columns={columns} 
          dataSource={drivers} 
          rowKey="id" 
          loading={loading} 
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1000 }}
        />
      </Card>

      <Modal
        title={editingItem ? `Edit Driver - ${editingItem.name}` : 'Add New Driver'}
        open={modalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
          <Tabs
            defaultActiveKey="basic"
            items={[
              { key: 'basic', label: 'Basic Info', children: formItems.basic },
              { key: 'license', label: 'ID & License', children: formItems.license },
              { key: 'emergency', label: 'Emergency Contact', children: formItems.emergency },
              { key: 'banking', label: 'Bank Details', children: formItems.banking },
            ]}
          />

          <div style={{ textAlign: 'right', marginTop: 16, borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
            <Space>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={saving}>
                {editingItem ? 'Update Driver' : 'Add Driver & Send Invite'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Drivers;
