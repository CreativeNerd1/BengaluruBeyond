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
  Image,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  CarOutlined
} from '@ant-design/icons';
import { carsApi } from '../../services/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const result = await carsApi.getAll();
      if (result.success) {
        setCars(result.data || []);
      }
    } catch (error) {
      message.error('Failed to load cars');
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
      form.setFieldsValue({ ac: true, available: true, transmission: 'Automatic', fuel: 'Petrol' });
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
      const carData = {
        ...values,
        features: values.features?.split('\n').filter(f => f.trim()) || [],
      };

      let result;
      if (editingItem) {
        result = await carsApi.update(editingItem.id, carData);
      } else {
        result = await carsApi.create(carData);
      }

      if (result.success) {
        message.success(`Car ${editingItem ? 'updated' : 'added'} successfully!`);
        handleCloseModal();
        fetchCars();
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
      const result = await carsApi.delete(item.id);
      if (result.success) {
        message.success('Car deleted successfully!');
        fetchCars();
      }
    } catch (error) {
      message.error('Failed to delete car');
    }
  };

  const columns = [
    {
      title: 'Car',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {record.imageUrl ? (
            <Image
              src={record.imageUrl}
              alt={text}
              width={60}
              height={40}
              style={{ objectFit: 'cover', borderRadius: 4 }}
            />
          ) : (
            <div style={{ width: 60, height: 40, background: '#f0f0f0', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CarOutlined style={{ fontSize: 20, color: '#999' }} />
            </div>
          )}
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.type}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Seats',
      dataIndex: 'seatingCapacity',
      key: 'seatingCapacity',
      width: 80,
      render: (seats) => `${seats} seats`,
    },
    {
      title: 'Price/KM',
      dataIndex: 'pricePerKm',
      key: 'pricePerKm',
      width: 100,
      render: (price) => <Text strong>₹{price || 0}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      width: 100,
      render: (isAvailable) => (
        <Tag color={isAvailable ? 'green' : 'red'}>
          {isAvailable ? 'Available' : 'Unavailable'}
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
            title="Delete this car?"
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
          <Title level={3} style={{ marginBottom: 4 }}>Cars</Title>
          <Text type="secondary">Manage your car fleet</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          Add Car
        </Button>
      </div>

      <Card>
        <Table columns={columns} dataSource={cars} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title={editingItem ? 'Edit Car' : 'Add New Car'}
        open={modalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Car Name" rules={[{ required: true }]}>
                <Input placeholder="e.g., Toyota Innova Crysta" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type" label="Car Type" rules={[{ required: true }]}>
                <Select placeholder="Select type">
                  <Select.Option value="4 Seater">4 Seater</Select.Option>
                  <Select.Option value="5 Seater">5 Seater</Select.Option>
                  <Select.Option value="7 Seater">7 Seater</Select.Option>
                  <Select.Option value="12 Seater">12 Seater</Select.Option>
                  <Select.Option value="Bus">Bus</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="image" label="Image URL">
            <Input placeholder="https://example.com/car-image.jpg" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="seatingCapacity" label="Seating Capacity" rules={[{ required: true }]}>
                <Select placeholder="Select capacity">
                  <Select.Option value={4}>4 Seater</Select.Option>
                  <Select.Option value={5}>5 Seater</Select.Option>
                  <Select.Option value={7}>7 Seater</Select.Option>
                  <Select.Option value={12}>12 Seater</Select.Option>
                  <Select.Option value={20}>20 Seater (Mini Bus)</Select.Option>
                  <Select.Option value={35}>35 Seater (Bus)</Select.Option>
                  <Select.Option value={50}>50 Seater (Bus)</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="transmission" label="Transmission">
                <Select>
                  <Select.Option value="Manual">Manual</Select.Option>
                  <Select.Option value="Automatic">Automatic</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="fuel" label="Fuel Type">
                <Select>
                  <Select.Option value="Petrol">Petrol</Select.Option>
                  <Select.Option value="Diesel">Diesel</Select.Option>
                  <Select.Option value="CNG">CNG</Select.Option>
                  <Select.Option value="Electric">Electric</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="pricePerKm" label="Price per KM (₹)" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="pricePerDay" label="Price per Day (₹)">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="ac" label="Air Conditioned" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="available" label="Available" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <Space>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={saving}>
                {editingItem ? 'Update' : 'Add Car'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Cars;
