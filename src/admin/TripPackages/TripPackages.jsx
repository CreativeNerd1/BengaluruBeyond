import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  InputNumber,
  Space, 
  Typography, 
  Card,
  Popconfirm,
  message,
  Tag,
  Image,
  Row,
  Col,
  Upload
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { tripPackagesApi } from '../../services/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

const TripPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const result = await tripPackagesApi.getAll();
      if (result.success) {
        setPackages(result.data || []);
      }
    } catch (error) {
      message.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      form.setFieldsValue({
        ...item,
        highlights: Array.isArray(item.highlights) ? item.highlights.join('\n') : '',
        includes: Array.isArray(item.includes) ? item.includes.join('\n') : '',
        excludes: Array.isArray(item.excludes) ? item.excludes.join('\n') : '',
        images: item.images?.join('\n') || '',
      });
    } else {
      setEditingItem(null);
      form.resetFields();
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
      const packageData = {
        ...values,
        basePrice: Number(values.basePrice),
        highlights: values.highlights?.split('\n').filter(h => h.trim()) || [],
        includes: values.includes?.split('\n').filter(i => i.trim()) || [],
        excludes: values.excludes?.split('\n').filter(e => e.trim()) || [],
        images: values.images?.split('\n').filter(i => i.trim()) || [],
      };

      let result;
      if (editingItem) {
        result = await tripPackagesApi.update(editingItem.id, packageData);
      } else {
        result = await tripPackagesApi.create(packageData);
      }

      if (result.success) {
        message.success(`Package ${editingItem ? 'updated' : 'created'} successfully!`);
        handleCloseModal();
        fetchPackages();
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
      const result = await tripPackagesApi.delete(item.id);
      if (result.success) {
        message.success('Package deleted successfully!');
        fetchPackages();
      }
    } catch (error) {
      message.error('Failed to delete package');
    }
  };

  const columns = [
    {
      title: 'Package',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          {record.imageUrl && (
            <Image
              src={record.imageUrl}
              alt={text}
              width={60}
              height={40}
              style={{ objectFit: 'cover', borderRadius: 4 }}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA"
            />
          )}
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.destination}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 150,
      render: (_, record) => (
        <Text>{record.duration} {record.durationType}</Text>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price) => (
        <Text strong style={{ color: '#52c41a' }}>₹{price?.toLocaleString() || 0}</Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleOpenModal(record)}
          />
          <Popconfirm
            title="Delete this package?"
            description="This action cannot be undone."
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
          <Title level={3} style={{ marginBottom: 4 }}>Trip Packages</Title>
          <Text type="secondary">Manage your trip packages and destinations</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          Add Package
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={packages}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingItem ? 'Edit Package' : 'Add New Package'}
        open={modalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Package Name"
                rules={[{ required: true, message: 'Please enter package name' }]}
              >
                <Input placeholder="e.g., Coorg Weekend Getaway" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="slug"
                label="URL Slug"
                rules={[{ required: true, message: 'Please enter slug' }]}
              >
                <Input placeholder="e.g., coorg-weekend" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="tagline" label="Tagline">
            <Input placeholder="e.g., Experience the Scotland of India" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Describe the package..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="duration" label="Duration">
                <Input placeholder="e.g., 2 Nights / 3 Days" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="basePrice" label="Base Price (₹)">
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="5999"
                  min={0}
                  formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/₹\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="images" label="Image URLs (one per line)">
            <TextArea rows={3} placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" />
          </Form.Item>

          <Form.Item name="highlights" label="Highlights (one per line)">
            <TextArea rows={4} placeholder="Coffee plantation tour&#10;River crossing&#10;Abbey Falls visit" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="includes" label="Includes (one per line)">
                <TextArea rows={4} placeholder="AC Cab&#10;Hotel stay&#10;Breakfast" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="excludes" label="Excludes (one per line)">
                <TextArea rows={4} placeholder="Entry tickets&#10;Personal expenses&#10;Tips" />
              </Form.Item>
            </Col>
          </Row>

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

export default TripPackages;
