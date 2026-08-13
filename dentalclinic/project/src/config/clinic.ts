/**
 * ============================================================
 *  CLINIC CONFIGURATION — EDIT THIS FILE
 * ============================================================
 *  Replace every placeholder below with your clinic's real
 *  information. Everything on the website reads from here.
 * ============================================================
 */

export const clinic = {
  /** Full clinic name shown across the site */
  CLINIC_NAME: 'Lumière Dental Clinic',

  /**
   * WhatsApp number in international format, digits only,
   * including country code. Replace with the clinic's number.
   * Example: 91XXXXXXXXXX
   */
  CLINIC_WHATSAPP_NUMBER: '91XXXXXXXXXX',

  /** Phone number for "Call Now" buttons (tel: link) */
  CLINIC_PHONE: '+91XXXXXXXXXX',

  /** General contact email */
  CLINIC_EMAIL: 'hello@lumieredental.example',

  /** Full street address */
  CLINIC_ADDRESS: '204, Sapphire Plaza, MG Road, Indiranagar',

  /** City — used throughout for local SEO */
  CLINIC_CITY: 'Bengaluru',

  /** State / region */
  CLINIC_STATE: 'Karnataka',

  /** PIN / ZIP code */
  CLINIC_PINCODE: '560038',

  /** Google Maps embed src URL */
  CLINIC_GOOGLE_MAPS_EMBED:
    'https://www.google.com/maps?q=MG+Road+Bengaluru&output=embed',

  /** Google Maps link for "Get Directions" */
  CLINIC_GOOGLE_MAPS_URL: 'https://maps.google.com/?q=MG+Road+Bengaluru',

  /** Google Reviews listing URL */
  CLINIC_GOOGLE_REVIEWS_URL: 'https://www.google.com/search?q=Lumiere+Dental+Clinic+reviews',

  /** Social media */
  CLINIC_INSTAGRAM_URL: 'https://instagram.com/lumieredental',
  CLINIC_FACEBOOK_URL: 'https://facebook.com/lumieredental',
  CLINIC_TWITTER_URL: 'https://twitter.com/lumieredental',

  /** Opening hours */
  CLINIC_HOURS: {
    weekdays: '10:00 AM – 8:00 PM',
    sunday: 'Closed',
  },

  /** Emergency contact line */
  CLINIC_EMERGENCY_PHONE: '+91XXXXXXXXXX',
} as const;

export type ClinicInfo = typeof clinic;
