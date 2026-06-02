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
  Avatar,
  Rate,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  UserOutlined,
  StarFilled
} from '@ant-design/icons';
import { testimonialsApi } from '../../services/api';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const result = await testimonialsApi.getAll();
      if (result.success) {
        setTestimonials(result.data || []);
      }
    } catch (error) {
      message.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      form.setFieldsValue(item);
    } else {
      setEditingItem(null);
      form.resetFields();
      form.setFieldsValue({ rating: 5, featured: false });
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
      let result;
      if (editingItem) {
        result = await testimonialsApi.update(editingItem.id, values);
      } else {
        result = await testimonialsApi.create(values);
      }

      if (result.success) {
        message.success(`Testimonial ${editingItem ? 'updated' : 'added'} successfully!`);
        handleCloseModal();
        fetchTestimonials();
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
      const result = await testimonialsApi.delete(item.id);
      if (result.success) {
        message.success('Testimonial deleted successfully!');
        fetchTestimonials();
      }
    } catch (error) {
      message.error('Failed to delete testimonial');
    }
  };

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text, record) => (
        <Space>
          <Avatar src={record.customerImage} icon={<UserOutlined />} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.location}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 150,
      render: (rating) => <Rate disabled defaultValue={rating} style={{ fontSize: 14 }} />,
    },
    {
      title: 'Review',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      width: 300,
    },
    {
      title: 'Verified',
      dataIndex: 'isVerified',
      key: 'isVerified',
      width: 100,
      render: (isVerified) => isVerified ? <StarFilled style={{ color: '#fadb14' }} /> : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => handleOpenModal(record)} />
          <Popconfirm
            title="Delete this testimonial?"
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
          <Title level={3} style={{ marginBottom: 4 }}>Testimonials</Title>
          <Text type="secondary">Manage customer reviews and testimonials</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          Add Testimonial
        </Button>
      </div>

      <Card>
        <Table columns={columns} dataSource={testimonials} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title={editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
        open={modalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Customer Name" rules={[{ required: true }]}>
                <Input placeholder="e.g., Priya Sharma" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="location" label="Location">
                <Input placeholder="e.g., Mumbai" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="avatar" label="Avatar URL">
            <Input placeholder="https://example.com/avatar.jpg" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="rating" label="Rating">
                <Rate />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="trip" label="Trip/Service">
                <Input placeholder="e.g., Coorg Trip" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="text" label="Review Text" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Customer's review..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="date" label="Date">
                <Input placeholder="e.g., March 2024" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="featured" label="Featured" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <Space>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={saving}>
                {editingItem ? 'Update' : 'Add'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Testimonials;
