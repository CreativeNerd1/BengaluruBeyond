import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Typography, 
  message, 
  Tag, 
  Badge, 
  Avatar, 
  Switch,
  Modal,
  Statistic,
  Tabs,
  Empty,
  Rate,
  Spin,
  Popconfirm,
  Input
} from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined,
  CarOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  BellOutlined,
  ReloadOutlined,
  PlayCircleOutlined,
  StarOutlined
} from '@ant-design/icons';
import { driverAuthApi } from '../../services/api';
import '../DriverAuth.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [actionLoading, setActionLoading] = useState(null);
  const [rejectModal, setRejectModal] = useState({ visible: false, rideId: null });
  const [rejectReason, setRejectReason] = useState('');
  
  // Get driver info from localStorage
  const driverInfo = JSON.parse(localStorage.getItem('driver_info') || '{}');

  const fetchDashboard = useCallback(async () => {
    try {
      const result = await driverAuthApi.getDashboard();
      if (result.success) {
        setDashboard(result.data);
      } else if (result.message?.includes('Unauthorized') || result.message?.includes('401')) {
        handleLogout();
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPendingCount = useCallback(async () => {
    try {
      const result = await driverAuthApi.getPendingCount();
      if (result.success) {
        setPendingCount(result.data);
      }
    } catch (err) {
      console.error('Pending count fetch error:', err);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('driver_token');
    if (!token) {
      navigate('/driver/login');
      return;
    }
    
    fetchDashboard();
    fetchPendingCount();
    
    // Poll for new rides every 30 seconds
    const interval = setInterval(() => {
      fetchPendingCount();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [navigate, fetchDashboard, fetchPendingCount]);

  const handleLogout = () => {
    localStorage.removeItem('driver_token');
    localStorage.removeItem('driver_info');
    message.info('Logged out successfully');
    navigate('/driver/login');
  };

  const handleStatusChange = async (checked) => {
    const newStatus = checked ? 'Available' : 'Off Duty';
    try {
      const result = await driverAuthApi.updateStatus(newStatus);
      if (result.success) {
        message.success(`Status changed to ${newStatus}`);
        fetchDashboard();
      }
    } catch (err) {
      message.error('Failed to update status');
    }
  };

  const handleRideAction = async (rideId, action, reason = null) => {
    setActionLoading(rideId);
    try {
      const result = await driverAuthApi.rideAction(rideId, { 
        action, 
        rejectionReason: reason 
      });
      
      if (result.success) {
        message.success(result.message || `Ride ${action}ed successfully`);
        fetchDashboard();
        fetchPendingCount();
        setRejectModal({ visible: false, rideId: null });
        setRejectReason('');
      } else {
        message.error(result.message || 'Action failed');
      }
    } catch (err) {
      message.error('An error occurred');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'gold',
      'Accepted': 'blue',
      'InProgress': 'processing',
      'Completed': 'success',
      'Rejected': 'error',
      'Cancelled': 'default'
    };
    return colors[status] || 'default';
  };

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const RideCard = ({ ride, showActions = true }) => (
    <div className={`driver-ride-card ${ride.status.toLowerCase()}`}>
      <div className="driver-ride-header">
        <div className="driver-ride-customer">
          <h4>{ride.customerName}</h4>
          <Text type="secondary">
            <PhoneOutlined /> {ride.customerPhone}
          </Text>
        </div>
        <Tag color={getStatusColor(ride.status)}>{ride.status}</Tag>
      </div>
      
      <div className="driver-ride-details">
        <div className="driver-ride-detail-item">
          <EnvironmentOutlined />
          <div>
            <Text type="secondary">Pickup</Text>
            <div>{ride.pickupLocation || 'To be confirmed'}</div>
          </div>
        </div>
        
        {ride.dropLocation && (
          <div className="driver-ride-detail-item">
            <EnvironmentOutlined />
            <div>
              <Text type="secondary">Drop</Text>
              <div>{ride.dropLocation}</div>
            </div>
          </div>
        )}
        
        <div className="driver-ride-detail-item">
          <ClockCircleOutlined />
          <div>
            <Text type="secondary">Pickup Time</Text>
            <div>{formatDate(ride.scheduledPickupTime)}</div>
          </div>
        </div>
        
        {ride.tripType && (
          <div className="driver-ride-detail-item">
            <CarOutlined />
            <div>
              <Text type="secondary">Trip Type</Text>
              <div style={{ textTransform: 'capitalize' }}>{ride.tripType}</div>
            </div>
          </div>
        )}
        
        {ride.passengers && (
          <div className="driver-ride-detail-item">
            <UserOutlined />
            <div>
              <Text type="secondary">Passengers</Text>
              <div>{ride.passengers}</div>
            </div>
          </div>
        )}
        
        {ride.estimatedFare > 0 && (
          <div className="driver-ride-detail-item">
            <DollarOutlined />
            <div>
              <Text type="secondary">Est. Fare</Text>
              <div>₹{ride.estimatedFare?.toLocaleString()}</div>
            </div>
          </div>
        )}
      </div>
      
      {showActions && (
        <div className="driver-ride-actions">
          {ride.status === 'Pending' && (
            <>
              <Button 
                type="primary"
                icon={<CheckCircleOutlined />}
                loading={actionLoading === ride.id}
                onClick={() => handleRideAction(ride.id, 'Accept')}
              >
                Accept
              </Button>
              <Button 
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => setRejectModal({ visible: true, rideId: ride.id })}
              >
                Reject
              </Button>
            </>
          )}
          
          {ride.status === 'Accepted' && (
            <Button 
              type="primary"
              icon={<PlayCircleOutlined />}
              loading={actionLoading === ride.id}
              onClick={() => handleRideAction(ride.id, 'StartTrip')}
            >
              Start Trip
            </Button>
          )}
          
          {(ride.status === 'Accepted' || ride.status === 'InProgress') && (
            <Popconfirm
              title="Complete this ride?"
              description="Make sure the customer has reached their destination."
              onConfirm={() => handleRideAction(ride.id, 'Complete')}
            >
              <Button 
                type="primary"
                style={{ background: '#52c41a', borderColor: '#52c41a' }}
                icon={<CheckCircleOutlined />}
                loading={actionLoading === ride.id}
              >
                Complete Trip
              </Button>
            </Popconfirm>
          )}
          
          {ride.status === 'Completed' && ride.customerRating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StarOutlined style={{ color: '#faad14' }} />
              <Text>Customer rated: </Text>
              <Rate disabled value={ride.customerRating} style={{ fontSize: 14 }} />
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="driver-dashboard">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  const profile = dashboard?.profile;
  const stats = dashboard?.stats;

  return (
    <div className="driver-dashboard">
      {/* Header */}
      <div className="driver-header">
        <div className="driver-header-left">
          <span className="driver-header-logo">🚗</span>
          <div className="driver-header-title">
            <Title level={4} style={{ color: 'white', margin: 0 }}>BengaluruBeyond</Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Driver Portal</Text>
          </div>
        </div>
        
        <div className="driver-header-right">
          <Badge count={pendingCount} offset={[-5, 5]}>
            <Button 
              type="text" 
              icon={<BellOutlined style={{ color: 'white', fontSize: 20 }} />}
              onClick={fetchDashboard}
            />
          </Badge>
          
          <Switch
            checked={profile?.status === 'Available'}
            onChange={handleStatusChange}
            checkedChildren="Online"
            unCheckedChildren="Offline"
          />
          
          <Avatar src={profile?.imageUrl} icon={<UserOutlined />} />
          
          <Button 
            type="text" 
            icon={<LogoutOutlined style={{ color: 'white' }} />}
            onClick={handleLogout}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="driver-content">
        {/* Welcome Card */}
        <div className="driver-welcome">
          <div className="driver-welcome-info">
            <Title level={3} style={{ margin: 0 }}>
              Welcome, {profile?.name || driverInfo.name}! 👋
            </Title>
            <Text type="secondary">
              {profile?.status === 'Available' 
                ? "You're online and ready to accept rides" 
                : "You're currently offline"}
            </Text>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className={`status-badge ${profile?.status?.toLowerCase().replace(' ', '-')}`}>
              {profile?.status === 'Available' && '🟢'}
              {profile?.status === 'On Trip' && '🔵'}
              {profile?.status === 'Off Duty' && '⚪'}
              {' '}{profile?.status}
            </div>
            
            <Button 
              icon={<ReloadOutlined />} 
              onClick={() => { fetchDashboard(); fetchPendingCount(); }}
            >
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="driver-stats-grid">
          <Card className="driver-stat-card">
            <Statistic 
              title="Total Trips" 
              value={stats?.totalTrips || 0}
              prefix={<CarOutlined />}
            />
          </Card>
          
          <Card className="driver-stat-card">
            <Statistic 
              title="This Month Earnings" 
              value={stats?.thisMonthEarnings || 0}
              prefix="₹"
              precision={0}
            />
          </Card>
          
          <Card className="driver-stat-card">
            <Statistic 
              title="Rating" 
              value={profile?.rating || 5}
              precision={1}
              suffix="/ 5"
              prefix={<StarOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
          
          <Card className="driver-stat-card">
            <Statistic 
              title="Pending Rides" 
              value={stats?.pendingRides || 0}
              valueStyle={{ color: stats?.pendingRides > 0 ? '#faad14' : undefined }}
            />
          </Card>
        </div>
        
        {/* Rides Tabs */}
        <Card>
          <Tabs
            defaultActiveKey="pending"
            items={[
              {
                key: 'pending',
                label: (
                  <Badge count={dashboard?.pendingRides?.length || 0} offset={[10, 0]}>
                    <span>Pending Requests</span>
                  </Badge>
                ),
                children: (
                  <div className="driver-rides-section">
                    {dashboard?.pendingRides?.length > 0 ? (
                      dashboard.pendingRides.map(ride => (
                        <RideCard key={ride.id} ride={ride} />
                      ))
                    ) : (
                      <Empty 
                        description="No pending ride requests"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    )}
                  </div>
                )
              },
              {
                key: 'active',
                label: (
                  <Badge count={dashboard?.activeRides?.length || 0} offset={[10, 0]} color="blue">
                    <span>Active Rides</span>
                  </Badge>
                ),
                children: (
                  <div className="driver-rides-section">
                    {dashboard?.activeRides?.length > 0 ? (
                      dashboard.activeRides.map(ride => (
                        <RideCard key={ride.id} ride={ride} />
                      ))
                    ) : (
                      <Empty 
                        description="No active rides"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    )}
                  </div>
                )
              },
              {
                key: 'recent',
                label: 'Recent Trips',
                children: (
                  <div className="driver-rides-section">
                    {dashboard?.recentRides?.length > 0 ? (
                      dashboard.recentRides.map(ride => (
                        <RideCard key={ride.id} ride={ride} showActions={false} />
                      ))
                    ) : (
                      <Empty 
                        description="No completed trips yet"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    )}
                  </div>
                )
              }
            ]}
          />
        </Card>
      </div>
      
      {/* Reject Modal */}
      <Modal
        title="Reject Ride"
        open={rejectModal.visible}
        onCancel={() => { setRejectModal({ visible: false, rideId: null }); setRejectReason(''); }}
        onOk={() => handleRideAction(rejectModal.rideId, 'Reject', rejectReason)}
        okText="Reject Ride"
        okButtonProps={{ danger: true, loading: actionLoading === rejectModal.rideId }}
      >
        <Paragraph>Please provide a reason for rejecting this ride:</Paragraph>
        <TextArea
          rows={3}
          placeholder="e.g., Currently on another trip, Vehicle under maintenance, etc."
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default DriverDashboard;
