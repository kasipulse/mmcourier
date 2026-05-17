import React from 'react';
import Papa from 'papaparse';
import { db } from '../firebaseConfig';
import { doc, setDoc, writeBatch } from 'firebase/firestore';

const CSVImporter = () => {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const batch = writeBatch(db);
        
        results.data.forEach((row) => {
          if (!row.Waybill) return;
          
          const docRef = doc(db, "shipments", row.Waybill.trim());
          batch.set(docRef, {
            ...row,
            status: "Imported",
            assignedDriver: null,
            baseCharge: parseFloat(row.ChargeMass) * 15, // Example default rate
            surcharges: [],
            updatedAt: new Date()
          });
        });

        await batch.commit();
        alert("Batch Upload Complete!");
      }
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px' }}>Upload Waybill CSV:</label>
      <input type="file" accept=".csv" onChange={handleUpload} style={{ width: '100%' }} />
      <p style={{ color: '#888', fontSize: '11px', marginTop: '10px' }}>
        * Ensure columns match: Waybill, Date, Accnum, Receiver, etc.
      </p>
    </div>
  );
};

export default CSVImporter;
