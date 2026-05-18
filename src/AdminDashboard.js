import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import CSVImporter from './components/CSVImporter'; 
import WaybillRow from './components/WaybillRow';

const AdminDashboard = () => {
  const [shipments, setShipments] = useState([]);

  // Real-time listener for the dashboard
  useEffect(() => {
    const q = query(collection(db, "shipments"), orderBy("Date", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShipments(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>
      {/* Navy Navigation */}
      <header style={styles.header}>
        <div style={styles.logo}>MM COURIER <span style={{fontWeight:300}}>| ADMIN</span></div>
        <div style={styles.navLinks}>DASHBOARD | INVOICING | CUSTOMERS</div>
      </header>

      <main style={styles.main}>
        {/* Left Panel: CSV Ingestion */}
        <section style={styles.ingestionPanel}>
          <h2 style={styles.panelTitle}>DATA INGESTION</h2>
          <CSVImporter />
        </section>

        {/* Right Panel: Live Manifest */}
        <section style={styles.manifestPanel}>
          <h2 style={styles.panelTitle}>ACTIVE MANIFEST</h2>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Waybill</th>
                <th>Receiver</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Driver</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {shipments && shipments.length > 0 ? (
    shipments.map(s => <WaybillRow key={s.id} shipment={s} />)
  ) : (
    <tr>
      <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
        No active shipments. Please upload a CSV.
      </td>
    </tr>
  )}
</tbody>
              
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#F9F9F9', minHeight: '100vh', fontFamily: 'Arial, sans-serif' },
  header: { backgroundColor: '#001F3F', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px' },
  main: { display: 'grid', gridTemplateColumns: '350px 1fr', gap: '20px', padding: '20px' },
  ingestionPanel: { backgroundColor: 'white', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' },
  manifestPanel: { backgroundColor: 'white', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' },
  panelTitle: { color: '#001F3F', fontSize: '16px', borderBottom: '2px solid #001F3F', paddingBottom: '10px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  tableHeader: { textAlign: 'left', borderBottom: '1px solid #eee', color: '#666', fontSize: '13px' }
};

export default AdminDashboard;
