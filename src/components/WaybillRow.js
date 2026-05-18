import React from 'react';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const WaybillRow = ({ shipment }) => {
  
  const handleUpdate = async (field, value) => {
    try {
      const docRef = doc(db, "shipments", shipment.id);
      await updateDoc(docRef, { [field]: value });
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

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
      <td style={styles.td}><strong>{shipment.Waybill}</strong></td>
      <td style={styles.td}>{shipment.Receiver}</td>
      <td style={styles.td}>{shipment.DestPlace}</td>
      
      {/* Interactive Status Dropdown */}
      <td style={styles.td}>
        <select 
          value={shipment.status || 'Imported'}
          onChange={(e) => handleUpdate('status', e.target.value)}
          style={{
            backgroundColor: getStatusColor(shipment.status),
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '2px 5px',
            fontSize: '11px'
          }}
        >
          <option value="Imported">Imported</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Exception">Exception</option>
        </select>
      </td>

      {/* Driver Assignment */}
      <td style={styles.td}>
        <select 
          value={shipment.assignedDriver || 'Unassigned'}
          onChange={(e) => handleUpdate('assignedDriver', e.target.value)}
          style={styles.select}
        >
          <option value="Unassigned">Unassigned</option>
          <option value="Driver 1">Driver 1</option>
          <option value="Driver 2">Driver 2</option>
          <option value="Owner/Operator">Owner/Operator</option>
        </select>
      </td>

      <td style={styles.td}>
        <button style={styles.btn}>DETAILS</button>
      </td>
    </tr>
  );
};

const styles = {
  td: { padding: '12px 8px' },
  select: { padding: '2px', fontSize: '12px', border: '1px solid #ccc' },
  btn: { backgroundColor: '#001F3F', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer', fontSize: '10px' }
};

export default WaybillRow;
