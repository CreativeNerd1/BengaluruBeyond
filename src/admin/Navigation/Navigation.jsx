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
  List,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { navLinksApi } from '../../services/api';

const { Title, Text } = Typography;

const Navigation = () => {
  const [navLinks, setNavLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchNavLinks();
  }, []);

  const fetchNavLinks = async () => {
    setLoading(true);
    try {
      const result = await navLinksApi.getAll();
      if (result.success) {
        setNavLinks(result.data || []);
      }
    } catch (error) {
      message.error('Failed to load navigation links');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setDropdownItems(item.dropdownItems || []);
      form.setFieldsValue(item);
    } else {
      setEditingItem(null);
      setDropdownItems([]);
      form.resetFields();
      form.setFieldsValue({ visible: true, order: navLinks.length });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    setDropdownItems([]);
    form.resetFields();
  };

  const handleAddDropdownItem = () => {
    Modal.confirm({
      title: 'Add Dropdown Item',
      content: (
        <Form id="dropdown-form" layout="vertical">
          <Form.Item label="Label" name="label" rules={[{ required: true }]}>
            <Input id="dropdown-label" placeholder="Menu item label" />
          </Form.Item>
          <Form.Item label="Path" name="path" rules={[{ required: true }]}>
            <Input id="dropdown-path" placeholder="/path" />
          </Form.Item>
        </Form>
      ),
      onOk: () => {
        const label = document.getElementById('dropdown-label')?.value;
        const path = document.getElementById('dropdown-path')?.value;
        if (label && path) {
          setDropdownItems([...dropdownItems, { label, path }]);
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const navData = {
        ...values,
        dropdownItems: values.isDropdown ? dropdownItems : [],
      };

      let result;
      if (editingItem) {
        result = await navLinksApi.update(editingItem.id, navData);
      } else {
        result = await navLinksApi.create(navData);
      }

      if (result.success) {
        message.success(`Navigation link ${editingItem ? 'updated' : 'added'} successfully!`);
        handleCloseModal();
        fetchNavLinks();
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
      const result = await navLinksApi.delete(item.id);
      if (result.success) {
        message.success('Navigation link deleted!');
        fetchNavLinks();
      }
    } catch (error) {
      message.error('Failed to delete');
    }
  };

  const columns = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      render: (text, record) => (
        <Space>
          {record.icon && <span style={{ fontSize: 18 }}>{record.icon}</span>}
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
      width: 150,
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      sorter: (a, b) => (a.order || 0) - (b.order || 0),
    },
    {
      title: 'Type',
      dataIndex: 'isDropdown',
      key: 'isDropdown',
      width: 150,
      render: (isDropdown, record) => isDropdown ? (
        <Tag color="blue">Dropdown ({record.dropdownItems?.length || 0})</Tag>
      ) : (
        <Tag>Link</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'visible',
      key: 'visible',
      width: 100,
      render: (visible) => (
        <Tag color={visible ? 'green' : 'red'}>
          {visible ? 'Visible' : 'Hidden'}
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
            title="Delete this link?"
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

  const isDropdown = Form.useWatch('isDropdown', form);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>Navigation</Title>
          <Text type="secondary">Manage website navigation menu</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          Add Nav Link
        </Button>
      </div>

      <Card>
        <Table 
          columns={columns} 
          dataSource={navLinks.sort((a, b) => (a.order || 0) - (b.order || 0))} 
          rowKey="id" 
          loading={loading} 
          pagination={{ pageSize: 10 }} 
        />
      </Card>

      <Modal
        title={editingItem ? 'Edit Navigation Link' : 'Add Navigation Link'}
        open={modalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="label" label="Label" rules={[{ required: true }]}>
                <Input placeholder="e.g., Services" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="path" label="Path">
                <Input placeholder="e.g., /services" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="icon" label="Icon (Emoji)">
                <Input placeholder="🏠" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="order" label="Order">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="isDropdown" label="Has Dropdown" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="visible" label="Visible" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          {isDropdown && (
            <Form.Item label="Dropdown Items">
              <Card size="small">
                <List
                  size="small"
                  dataSource={dropdownItems}
                  renderItem={(item, index) => (
                    <List.Item
                      extra={
                        <Button 
                          type="text" 
                          danger 
                          size="small"
                          onClick={() => setDropdownItems(dropdownItems.filter((_, i) => i !== index))}
                        >
                          Remove
                        </Button>
                      }
                    >
                      {item.label} → {item.path}
                    </List.Item>
                  )}
                  locale={{ emptyText: 'No dropdown items' }}
                />
                <Button type="dashed" block icon={<PlusOutlined />} onClick={handleAddDropdownItem} style={{ marginTop: 8 }}>
                  Add Item
                </Button>
              </Card>
            </Form.Item>
          )}

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

export default Navigation;
