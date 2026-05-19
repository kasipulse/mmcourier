import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, where, doc, updateDoc } from 'firebase/firestore';

const DriverApp = () => {
  const [myShipments, setMyShipments] = useState([]);
  const driverName = "Driver A"; // Matches your Admin dropdown options

  useEffect(() => {
    const q = query(collection(db, "shipments"), where("assignedDriver", "==", driverName));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMyShipments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const markDelivered = async (id) => {
    await updateDoc(doc(db, "shipments", id), { status: "Delivered" });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#001F3F' }}>My Deliveries ({driverName})</h2>
      {myShipments.length > 0 ? myShipments.map(s => (
        <div key={s.id} style={styles.card}>
          <h3>Waybill: {s.Waybill}</h3>
          <p>Destination: {s.DestPlace}</p>
          <button onClick={() => markDelivered(s.id)} style={styles.btn}>MARK DELIVERED</button>
        </div>
      )) : <p>No deliveries assigned yet.</p>}
    </div>
  );
};

const styles = {
  card: { border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '10px' },
  btn: { backgroundColor: '#28a745', color: 'white', padding: '15px', width: '100%', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default DriverApp;
