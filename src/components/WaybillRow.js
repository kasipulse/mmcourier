import React from 'react';

const WaybillRow = ({ shipment }) => {
  // Logic for status colors (matching your MM Courier brand)
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return '#28a745';
      case 'out for delivery': return '#007bff';
      case 'exception': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <tr style={{ borderBottom: '1px solid #eee', fontSize: '13px' }}>
      <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>{shipment.Waybill || shipment.id}</td>
      <td style={{ padding: '12px 8px' }}>{shipment.Receiver || 'N/A'}</td>
      <td style={{ padding: '12px 8px' }}>{shipment.DestPlace || 'N/A'}</td>
      <td style={{ padding: '12px 8px' }}>
        <span style={{ 
          color: 'white', 
          backgroundColor: getStatusColor(shipment.status),
          padding: '2px 8px',
          borderRadius: '10px',
          fontSize: '11px'
        }}>
          {shipment.status || 'Imported'}
        </span>
      </td>
      <td style={{ padding: '12px 8px' }}>{shipment.assignedDriver || 'None'}</td>
      <td style={{ padding: '12px 8px' }}>
        <button style={{ backgroundColor: '#001F3F', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer' }}>
          EDIT
        </button>
      </td>
    </tr>
  );
};

export default WaybillRow;
