import { jsPDF } from 'jspdf';

export const generateInvoicePDF = (invoice: any, patientName: string) => {
  const doc = new jsPDF();
  
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229); // Indigo
  doc.text('MediNexus Hospital', 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('INVOICE', 20, 35);
  
  doc.setFontSize(12);
  doc.text(`Invoice ID: #${invoice.id.slice(-6).toUpperCase()}`, 20, 45);
  doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 20, 52);
  doc.text(`Status: ${invoice.status.toUpperCase()}`, 20, 59);
  
  doc.text(`Patient: ${patientName}`, 120, 45);
  
  doc.line(20, 65, 190, 65);
  
  doc.setFontSize(14);
  doc.text('Items', 20, 75);
  
  doc.setFontSize(12);
  let y = 85;
  if (Array.isArray(invoice.items)) {
    invoice.items.forEach((item: any, index: number) => {
      doc.text(`${index + 1}. ${item.description || 'Medical Service'}`, 20, y);
      doc.text(`Rs. ${(item.amount || invoice.amount / invoice.items.length).toFixed(2)}`, 170, y, { align: 'right' });
      y += 10;
    });
  } else {
    doc.text('1. General Medical Services', 20, y);
    doc.text(`Rs. ${invoice.amount.toFixed(2)}`, 170, y, { align: 'right' });
    y += 10;
  }
  
  doc.line(20, y, 190, y);
  y += 10;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', 120, y);
  doc.text(`Rs. ${invoice.amount.toFixed(2)}`, 170, y, { align: 'right' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for choosing MediNexus Hospital.', 105, 280, { align: 'center' });
  
  doc.save(`Invoice_${invoice.id.slice(-6).toUpperCase()}.pdf`);
};

export const generatePrescriptionPDF = (prescription: any, patientName: string) => {
  const doc = new jsPDF();
  
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229); // Indigo
  doc.text('MediNexus Hospital', 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('PRESCRIPTION', 20, 35);
  
  doc.setFontSize(12);
  doc.text(`Date: ${prescription.date || new Date().toLocaleDateString()}`, 20, 45);
  doc.text(`Patient: ${patientName}`, 20, 52);
  if (prescription.doctor_name) {
    doc.text(`Doctor: Dr. ${prescription.doctor_name}`, 20, 59);
  }
  
  doc.line(20, 65, 190, 65);
  
  doc.setFontSize(14);
  doc.text('Medication Details', 20, 75);
  
  doc.setFontSize(12);
  doc.text(`Medicine: ${prescription.medication}`, 20, 85);
  doc.text(`Dosage: ${prescription.dosage}`, 20, 95);
  doc.text(`Frequency: ${prescription.frequency}`, 20, 105);
  if (prescription.instructions) {
    doc.text(`Instructions: ${prescription.instructions}`, 20, 115);
  }
  
  doc.line(20, 130, 190, 130);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('This is a digitally generated prescription.', 105, 280, { align: 'center' });
  
  doc.save(`Prescription_${prescription.medication.replace(/\s+/g, '_')}.pdf`);
};

export const generateRecordPDF = (record: any, patientName: string) => {
  const doc = new jsPDF();
  
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229); // Indigo
  doc.text('MediNexus Hospital', 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('MEDICAL RECORD', 20, 35);
  
  doc.setFontSize(12);
  doc.text(`Date: ${record.date}`, 20, 45);
  doc.text(`Patient: ${patientName}`, 20, 52);
  doc.text(`Record Type: ${record.type}`, 20, 59);
  
  doc.line(20, 65, 190, 65);
  
  doc.setFontSize(14);
  doc.text(`Title: ${record.title}`, 20, 75);
  
  doc.setFontSize(12);
  doc.text(`Status: ${record.status}`, 20, 85);
  
  doc.text('Details:', 20, 100);
  doc.setFont('helvetica', 'normal');
  doc.text('This record has been reviewed by the medical staff and is part', 20, 110);
  doc.text('of the patient\'s permanent clinical history. For detailed analysis,', 20, 117);
  doc.text('please consult the attending physician.', 20, 124);
  
  doc.line(20, 140, 190, 140);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Confidential Medical Document', 105, 280, { align: 'center' });
  
  doc.save(`MedicalRecord_${record.title.replace(/\s+/g, '_')}.pdf`);
};
