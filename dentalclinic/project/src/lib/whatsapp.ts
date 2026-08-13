import { clinic } from '@/config/clinic';

export interface BookingDetails {
  name?: string;
  phone?: string;
  treatment?: string;
  date?: string;
  time?: string;
  patientType?: string;
  message?: string;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function buildWhatsAppMessage(d: BookingDetails): string {
  const lines = [
    'Hello, I would like to book a dental appointment.',
    '',
    d.name ? `Name: ${d.name}` : '',
    d.phone ? `Phone: ${d.phone}` : '',
    d.treatment ? `Treatment: ${d.treatment}` : '',
    d.date ? `Preferred Date: ${formatDate(d.date)}` : '',
    d.time ? `Preferred Time: ${d.time}` : '',
    d.patientType ? `Patient Type: ${d.patientType}` : '',
  ];

  if (d.message && d.message.trim()) {
    lines.push('', 'Additional Message:', d.message.trim());
  }

  lines.push('', 'Please confirm my appointment.');

  return lines.filter((l) => l !== '').join('\n');
}

export function openWhatsApp(details: BookingDetails = {}) {
  const message = buildWhatsAppMessage(details);
  const url = `https://wa.me/${clinic.CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function callClinic() {
  window.location.href = `tel:${clinic.CLINIC_PHONE}`;
}

export function getDirections() {
  window.open(clinic.CLINIC_GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer');
}
