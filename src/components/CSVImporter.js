import React, { useState } from 'react';
import Papa from 'papaparse';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CSVImporter = () => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    Papa.parse(file, {
      header: true, // Uses the first row of your CSV as keys
      skipEmptyLines: true,
      complete: async (results) => {
        const shipmentsRef = collection(db, "shipments");
        
        try {
          // Uploading rows to Firestore
          const uploadPromises = results.data.map(row => {
            return addDoc(shipmentsRef, {
              Waybill: row.Waybill || "N/A",
              Receiver: row.Receiver || "Unknown",
              DestPlace: row.DestPlace || "N/A",
              status: 'Imported',
              assignedDriver: 'Unassigned',
              createdAt: serverTimestamp(), // For better sorting
              Date: new Date().toLocaleDateString() // For display
            });
          });

          await Promise.all(uploadPromises);
          alert(`Success! ${results.data.length} waybills added to MM Courier.`);
        } catch (error) {
          console.error("Firebase Upload Error:", error);
          alert("Upload failed. Check your Firebase Security Rules.");
        }
        setUploading(false);
        e.target.value = null; // Reset the input
      }
    });
  };

  return (
    <div style={styles.container}>
      <p style={styles.label}>SELECT MANIFEST (.CSV)</p>
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileUpload} 
        disabled={uploading}
        style={styles.fileInput}
      />
      {uploading && <p style={styles.loadingText}>Processing waybills...</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    border: '2px dashed #001F3F',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  label: { fontWeight: 'bold', color: '#001F3F', fontSize: '14px', marginBottom: '10px' },
  fileInput: { fontSize: '13px' },
  loadingText: { color: '#007bff', marginTop: '10px', fontSize: '12px', fontWeight: 'bold' }
};

export default CSVImporter;
