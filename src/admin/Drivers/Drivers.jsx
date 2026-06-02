import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  InputNumber,
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
  Col
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  UserOutlined
} from '@ant-design/icons';
import { driversApi } from '../../services/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
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
        languages: Array.isArray(item.languages) ? item.languages.join(', ') : '',
        specializations: Array.isArray(item.specializations) ? item.specializations.join(', ') : '',
      });
    } else {
      setEditingItem(null);
      form.resetFields();
      form.setFieldsValue({ available: true, rating: 5 });
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
        languages: values.languages?.split(',').map(l => l.trim()).filter(l => l) || [],
        specializations: values.specializations?.split(',').map(s => s.trim()).filter(s => s) || [],
      };

      let result;
      if (editingItem) {
        result = await driversApi.update(editingItem.id, driverData);
      } else {
        result = await driversApi.create(driverData);
      }

      if (result.success) {
        message.success(`Driver ${editingItem ? 'updated' : 'added'} successfully!`);
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

  const columns = [
    {
      title: 'Driver',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.photo} icon={<UserOutlined />} size={40} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.experience || 0} years exp</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 150,
      render: (rating) => <Rate disabled defaultValue={rating} allowHalf style={{ fontSize: 14 }} />,
    },
    {
      title: 'Trips',
      dataIndex: 'trips',
      key: 'trips',
      width: 100,
      render: (trips) => `${trips || 0}+`,
    },
    {
      title: 'Status',
      dataIndex: 'available',
      key: 'available',
      width: 100,
      render: (available) => (
        <Tag color={available ? 'green' : 'red'}>
          {available ? 'Available' : 'Unavailable'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => handleOpenModal(record)} />
          <Popconfirm
            title="Remove this driver?"
            onConfirm={() => handleDelete(record)}
            okText="Remove"
            okType="danger"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>Drivers</Title>
          <Text type="secondary">Manage your driver team</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          Add Driver
        </Button>
      </div>

      <Card>
        <Table columns={columns} dataSource={drivers} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title={editingItem ? 'Edit Driver' : 'Add New Driver'}
        open={modalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                <Input placeholder="e.g., Ramesh Kumar" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Phone Number">
                <Input placeholder="+91 9876543210" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="photo" label="Photo URL">
            <Input placeholder="https://example.com/driver-photo.jpg" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="experience" label="Years of Experience" rules={[{ required: true }]}>
                <InputNumber min={0} max={50} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="license" label="License Number">
                <Input placeholder="KA01-20XX-XXXXX" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="rating" label="Rating">
                <Rate allowHalf />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="trips" label="Trips Completed">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="languages" label="Languages (comma-separated)">
            <Input placeholder="English, Hindi, Kannada" />
          </Form.Item>

          <Form.Item name="specializations" label="Specializations (comma-separated)">
            <Input placeholder="Hill Station Routes, Airport Transfers" />
          </Form.Item>

          <Form.Item name="bio" label="Bio">
            <TextArea rows={3} placeholder="Brief description..." />
          </Form.Item>

          <Form.Item name="available" label="Available" valuePropName="checked">
            <Switch />
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <Space>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={saving}>
                {editingItem ? 'Update' : 'Add Driver'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Drivers;
