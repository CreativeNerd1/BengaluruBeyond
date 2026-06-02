import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Switch,
  Space, 
  Typography, 
  Card,
  Popconfirm,
  message,
  Tag,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined
} from '@ant-design/icons';
import { servicesApi } from '../../services/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const result = await servicesApi.getAll();
      if (result.success) {
        setServices(result.data || []);
      }
    } catch (error) {
      message.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      form.setFieldsValue({
        ...item,
        features: Array.isArray(item.features) ? item.features.join('\n') : '',
      });
    } else {
      setEditingItem(null);
      form.resetFields();
      form.setFieldsValue({ active: true });
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
      const serviceData = {
        ...values,
        features: values.features?.split('\n').filter(f => f.trim()) || [],
      };

      let result;
      if (editingItem) {
        result = await servicesApi.update(editingItem.id, serviceData);
      } else {
        result = await servicesApi.create(serviceData);
      }

      if (result.success) {
        message.success(`Service ${editingItem ? 'updated' : 'created'} successfully!`);
        handleCloseModal();
        fetchServices();
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
      const result = await servicesApi.delete(item.id);
      if (result.success) {
        message.success('Service deleted successfully!');
        fetchServices();
      }
    } catch (error) {
      message.error('Failed to delete service');
    }
  };

  const columns = [
    {
      title: 'Service',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <span style={{ fontSize: 24 }}>{record.icon}</span>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.slug}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      width: 100,
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'Active' : 'Inactive'}
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
            title="Delete this service?"
            onConfirm={() => handleDelete(record)}
            okText="Delete"
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
          <Title level={3} style={{ marginBottom: 4 }}>Services</Title>
          <Text type="secondary">Manage your service offerings</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          Add Service
        </Button>
      </div>

      <Card>
        <Table columns={columns} dataSource={services} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title={editingItem ? 'Edit Service' : 'Add New Service'}
        open={modalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Service Name" rules={[{ required: true }]}>
                <Input placeholder="e.g., Local Cabs" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="slug" label="URL Slug" rules={[{ required: true }]}>
                <Input placeholder="e.g., local-cabs" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="icon" label="Icon (Emoji)">
                <Input placeholder="🚕" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="link" label="Link">
                <Input placeholder="/local-cabs" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="image" label="Image URL">
            <Input placeholder="https://example.com/service-image.jpg" />
          </Form.Item>

          <Form.Item name="shortDescription" label="Short Description">
            <TextArea rows={2} placeholder="Brief description for cards..." />
          </Form.Item>

          <Form.Item name="description" label="Full Description">
            <TextArea rows={4} placeholder="Detailed service description..." />
          </Form.Item>

          <Form.Item name="features" label="Features (one per line)">
            <TextArea rows={4} placeholder="24/7 Availability&#10;Professional Drivers&#10;Clean Vehicles" />
          </Form.Item>

          <Form.Item name="active" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <Space>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={saving}>
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;
