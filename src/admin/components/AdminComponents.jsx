import './AdminComponents.css';

// Form Input
export const FormInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  ...props 
}) => (
  <div className="form-group">
    <label className="form-label">
      {label}
      {required && <span className="required">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`form-input ${error ? 'error' : ''}`}
      required={required}
      {...props}
    />
    {error && <span className="form-error">{error}</span>}
  </div>
);

// Form Textarea
export const FormTextarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  rows = 4,
  required = false,
  error,
  ...props 
}) => (
  <div className="form-group">
    <label className="form-label">
      {label}
      {required && <span className="required">*</span>}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`form-textarea ${error ? 'error' : ''}`}
      required={required}
      {...props}
    />
    {error && <span className="form-error">{error}</span>}
  </div>
);

// Form Select
export const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  required = false,
  error,
  ...props 
}) => (
  <div className="form-group">
    <label className="form-label">
      {label}
      {required && <span className="required">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`form-select ${error ? 'error' : ''}`}
      required={required}
      {...props}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="form-error">{error}</span>}
  </div>
);

// Button
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`btn btn-${variant} btn-${size} ${loading ? 'loading' : ''}`}
    {...props}
  >
    {loading && <span className="btn-spinner"></span>}
    {children}
  </button>
);

// Card
export const Card = ({ children, title, actions, className = '' }) => (
  <div className={`admin-card ${className}`}>
    {(title || actions) && (
      <div className="card-header">
        {title && <h3 className="card-title">{title}</h3>}
        {actions && <div className="card-actions">{actions}</div>}
      </div>
    )}
    <div className="card-body">{children}</div>
  </div>
);

// Alert
export const Alert = ({ type = 'info', message, onClose }) => (
  <div className={`alert alert-${type}`}>
    <span className="alert-icon">
      {type === 'success' && '✓'}
      {type === 'error' && '✕'}
      {type === 'warning' && '⚠'}
      {type === 'info' && 'ℹ'}
    </span>
    <span className="alert-message">{message}</span>
    {onClose && (
      <button className="alert-close" onClick={onClose}>×</button>
    )}
  </div>
);

// Modal
export const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal modal-${size}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

// Table
export const Table = ({ columns, data, onEdit, onDelete, loading }) => (
  <div className="table-container">
    {loading ? (
      <div className="table-loading">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    ) : data.length === 0 ? (
      <div className="table-empty">
        <p>No data found</p>
      </div>
    ) : (
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="actions-cell">
                  {onEdit && (
                    <button 
                      className="action-btn edit" 
                      onClick={() => onEdit(row)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      className="action-btn delete" 
                      onClick={() => onDelete(row)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

// Confirm Dialog
export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
    <p className="confirm-message">{message}</p>
    <div className="confirm-actions">
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="danger" onClick={onConfirm}>Delete</Button>
    </div>
  </Modal>
);
