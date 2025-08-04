// components/user/DeliveryAddressList.jsx
import React, { useState } from 'react';
import DeliveryAddressForm from './DeliveryAddressForm';
import { useTheme } from '../../context/ThemeContext';

const DeliveryAddressList = ({ addresses, onSave, onDelete }) => {
  const colors = useTheme();
  const [editing, setEditing] = useState(null);
  const [addingNew, setAddingNew] = useState(false);

  return (
    <div
      style={{
        padding: '2rem',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          color: colors.primary,
        }}
      >
        Your Delivery Addresses
      </h2>

      {addingNew ? (
        <div style={{ marginBottom: '2rem' }}>
          <DeliveryAddressForm
            onSave={(data) => {
              onSave(data);
              setAddingNew(false);
            }}
            onCancel={() => setAddingNew(false)}
          />
        </div>
      ) : (
        <button
          onClick={() => setAddingNew(true)}
          style={{
            backgroundColor: colors.primary,
            color: colors.background,
            padding: '10px 16px',
            border: 'none',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          + Add New Address
        </button>
      )}

      {addresses.length === 0 ? (
        <p style={{ color: '#666' }}>No addresses saved yet.</p>
      ) : (
        addresses.map((address) => (
          <div
            key={address.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              background: '#fafafa',
            }}
          >
            {editing && editing.id === address.id ? (
              <DeliveryAddressForm
                initialData={editing}
                onSave={(data) => {
                  onSave(data);
                  setEditing(null);
                }}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <>
                <p style={{ marginBottom: '0.5rem' }}>
                  {address.address_line}, {address.city}, {address.state} -{' '}
                  {address.postal_code}, {address.phone}, {address.name}
                </p>
                <p
                  style={{
                    color: address.is_primary ? colors.primary : '#999',
                    marginBottom: '0.75rem',
                  }}
                >
                  {address.is_primary ? 'Primary Address' : 'Secondary'}
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setEditing(address)}
                    style={{
                      backgroundColor: '#facc15',
                      color: '#000',
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(address.id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DeliveryAddressList;
