import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const DeliveryAddressForm = ({ initialData = {}, onSave, onCancel }) => {
  const colors = useTheme();

  const [formData, setFormData] = useState({
    address_line: '',
    city: '',
    state: '',
    postal_code: '',
    phone: '',
    name: '',
    is_primary: false,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => {
        const merged = { ...prev, ...initialData };
        const prevString = JSON.stringify(prev);
        const newString = JSON.stringify(merged);
        return prevString !== newString ? merged : prev;
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      style={{
        background: '#fff',
        padding: '1.75rem',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '500px',
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          marginBottom: '1.25rem',
          color: colors.primary,
          fontWeight: '600',
          fontSize: '1.25rem',
        }}
      >
        {initialData && initialData.id ? 'Edit Address' : 'Add New Address'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            name="address_line"
            placeholder="Address"
            value={formData.address_line}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            name="postal_code"
            placeholder="Postal Code"
            value={formData.postal_code}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            name="is_primary"
            checked={formData.is_primary}
            onChange={handleChange}
            style={{ marginRight: '8px' }}
          />
          Set as primary address
        </label>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              backgroundColor: colors.primary,
              color: colors.background,
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Save
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                backgroundColor: '#999',
                color: '#fff',
                padding: '10px',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DeliveryAddressForm;
