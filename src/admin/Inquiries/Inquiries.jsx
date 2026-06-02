import { useState, useEffect, useCallback } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select,
  Space, 
  Typography, 
  Card,
  Popconfirm,
  message,
  Tag,
  Row,
  Col,
  Statistic,
  Descriptions,
  Badge
} from 'antd';
import { 
  DeleteOutlined,
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { inquiriesApi } from '../../services/api';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const statusConfig = {
  'New': { color: 'blue', icon: <ClockCircleOutlined /> },
  'Contacted': { color: 'orange', icon: <SyncOutlined /> },
  'Converted': { color: 'green', icon: <CheckCircleOutlined /> },
  'Closed': { color: 'default', icon: <CloseCircleOutlined /> },
};

const sourceConfig = {
  'Contact': { color: 'cyan', label: 'Contact Page' },
  'TripPackage': { color: 'purple', label: 'Trip Package' },
  'CabService': { color: 'geekblue', label: 'Cab Service' },
  'WhatsApp': { color: 'green', label: 'WhatsApp' },
};

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({ status: null, source: null });
  const [form] = Form.useForm();

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.source) params.source = filters.source;
      
      const result = await inquiriesApi.getAll(params);
      if (result.success) {
        setInquiries(result.data || []);
      } else {
        message.error(result.error || 'Failed to load inquiries');
      }
    } catch {
      message.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchStats = useCallback(async () => {
    try {
      const result = await inquiriesApi.getStats();
      if (result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchInquiries();
      await fetchStats();
    };
    loadData();
  }, [fetchInquiries, fetchStats]);

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    setViewModalOpen(true);
  };

  const handleEdit = (inquiry) => {
    setSelectedInquiry(inquiry);
    form.setFieldsValue({
      status: inquiry.status,
      notes: inquiry.notes || '',
    });
    setEditModalOpen(true);
  };

  const handleUpdateStatus = async (values) => {
    setSaving(true);
    try {
      const result = await inquiriesApi.update(selectedInquiry.id, values);
      if (result.success) {
        message.success('Inquiry updated successfully!');
        setEditModalOpen(false);
        fetchInquiries();
        fetchStats();
      } else {
        message.error(result.error || 'Failed to update inquiry');
      }
    } catch {
      message.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (inquiry) => {
    try {
      const result = await inquiriesApi.delete(inquiry.id);
      if (result.success) {
        message.success('Inquiry deleted!');
        fetchInquiries();
        fetchStats();
      } else {
        message.error(result.error || 'Failed to delete');
      }
    } catch {
      message.error('Failed to delete inquiry');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const columns = [
    {
      title: 'Customer',
      key: 'customer',
      render: (_, record) => (
        <div>
          <Text strong><UserOutlined /> {record.name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            <PhoneOutlined /> {record.phone}
          </Text>
          {record.email && (
            <>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                <MailOutlined /> {record.email}
              </Text>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 140,
      render: (source, record) => (
        <div>
          <Tag color={sourceConfig[source]?.color || 'default'}>
            {sourceConfig[source]?.label || source}
          </Tag>
          {record.referenceName && (
            <div style={{ fontSize: 11, marginTop: 4, color: '#666' }}>
              {record.referenceName}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      width: 250,
      render: (msg) => msg || <Text type="secondary">No message</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag icon={statusConfig[status]?.icon} color={statusConfig[status]?.color}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date) => formatDate(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Button type="text" icon={<SyncOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Delete this inquiry?"
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
          <Title level={3} style={{ marginBottom: 4 }}>Inquiries</Title>
          <Text type="secondary">Manage customer inquiries and leads</Text>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card size="small">
              <Statistic title="Total" value={stats.total} valueStyle={{ color: '#1890ff' }} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card size="small">
              <Statistic 
                title="New" 
                value={stats.new} 
                valueStyle={{ color: '#faad14' }}
                prefix={<Badge status="processing" />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card size="small">
              <Statistic title="Contacted" value={stats.contacted} valueStyle={{ color: '#fa8c16' }} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card size="small">
              <Statistic title="Converted" value={stats.converted} valueStyle={{ color: '#52c41a' }} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card size="small">
              <Statistic title="Today" value={stats.today} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card size="small">
              <Statistic title="This Week" value={stats.thisWeek} />
            </Card>
          </Col>
        </Row>
      )}

      {/* Filters */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Space wrap>
          <Select
            placeholder="Filter by Status"
            allowClear
            style={{ width: 150 }}
            onChange={(value) => setFilters({ ...filters, status: value })}
          >
            <Option value="New">New</Option>
            <Option value="Contacted">Contacted</Option>
            <Option value="Converted">Converted</Option>
            <Option value="Closed">Closed</Option>
          </Select>
          <Select
            placeholder="Filter by Source"
            allowClear
            style={{ width: 150 }}
            onChange={(value) => setFilters({ ...filters, source: value })}
          >
            <Option value="Contact">Contact Page</Option>
            <Option value="TripPackage">Trip Package</Option>
            <Option value="CabService">Cab Service</Option>
          </Select>
          <Button onClick={() => { setFilters({ status: null, source: null }); }}>
            Clear Filters
          </Button>
        </Space>
      </Card>

      {/* Table */}
      <Card>
        <Table 
          columns={columns} 
          dataSource={inquiries} 
          rowKey="id" 
          loading={loading}
          pagination={{ pageSize: 15, showSizeChanger: true }}
        />
      </Card>

      {/* View Modal */}
      <Modal
        title="Inquiry Details"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="edit" type="primary" onClick={() => { setViewModalOpen(false); handleEdit(selectedInquiry); }}>
            Update Status
          </Button>,
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedInquiry && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Name">{selectedInquiry.name}</Descriptions.Item>
            <Descriptions.Item label="Phone">
              <a href={`tel:${selectedInquiry.phone}`}>{selectedInquiry.phone}</a>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedInquiry.email ? (
                <a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a>
              ) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Source">
              <Tag color={sourceConfig[selectedInquiry.source]?.color}>
                {sourceConfig[selectedInquiry.source]?.label || selectedInquiry.source}
              </Tag>
              {selectedInquiry.referenceName && ` - ${selectedInquiry.referenceName}`}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag icon={statusConfig[selectedInquiry.status]?.icon} color={statusConfig[selectedInquiry.status]?.color}>
                {selectedInquiry.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Message">
              <Paragraph style={{ marginBottom: 0 }}>
                {selectedInquiry.message || 'No message provided'}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Notes">
              <Paragraph style={{ marginBottom: 0 }}>
                {selectedInquiry.notes || 'No notes yet'}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Submitted">
              {formatDate(selectedInquiry.createdAt)}
            </Descriptions.Item>
            {selectedInquiry.updatedAt && (
              <Descriptions.Item label="Last Updated">
                {formatDate(selectedInquiry.updatedAt)}
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>

      {/* Edit Status Modal */}
      <Modal
        title="Update Inquiry Status"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
        width={500}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateStatus} style={{ marginTop: 16 }}>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="New">New</Option>
              <Option value="Contacted">Contacted</Option>
              <Option value="Converted">Converted</Option>
              <Option value="Closed">Closed</Option>
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="Notes">
            <TextArea rows={4} placeholder="Add any notes about this inquiry..." />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={saving}>
                Update
              </Button>
              <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Inquiries;
