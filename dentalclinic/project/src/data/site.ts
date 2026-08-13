export interface Testimonial {
  name: string;
  rating: number;
  review: string;
  image: string;
  treatment: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Rahul Sharma',
    rating: 5,
    review:
      'I was terrified of getting a root canal, but the entire process was completely painless. The doctor explained every step and made me feel at ease. Highly recommend Lumière Dental!',
    image: 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    treatment: 'Root Canal Treatment',
  },
  {
    name: 'Priya Nair',
    rating: 5,
    review:
      'My clear aligners gave me the smile I always wanted, and nobody at work even noticed I was wearing them! The clinic is spotless and the staff are incredibly warm.',
    image: 'https://images.pexels.com/photos/34930167/pexels-photo-34930167.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    treatment: 'Clear Aligners',
  },
  {
    name: 'Arjun Mehta',
    rating: 5,
    review:
      'Got my dental implant done here after years of hiding my gap. It feels exactly like my natural tooth. Worth every rupee. The technology they use is world-class.',
    image: 'https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    treatment: 'Dental Implants',
  },
  {
    name: 'Sneha Reddy',
    rating: 5,
    review:
      "My 6-year-old used to cry at the thought of a dentist. Now she actually looks forward to her check-ups! The kids' dentistry team is magical with children.",
    image: 'https://images.pexels.com/photos/16869444/pexels-photo-16869444.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    treatment: 'Kids Dentistry',
  },
  {
    name: 'Vikram Iyer',
    rating: 5,
    review:
      'Professional teeth whitening in a single session. My smile is visibly brighter and the results have lasted over a year. Transparent pricing with no hidden costs.',
    image: 'https://images.pexels.com/photos/35490803/pexels-photo-35490803.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    treatment: 'Teeth Whitening',
  },
  {
    name: 'Ananya Gupta',
    rating: 5,
    review:
      'The before-and-after of my smile restoration is unbelievable. I can finally smile confidently in photos again. Thank you to the entire Lumière team!',
    image: 'https://images.pexels.com/photos/35681211/pexels-photo-35681211.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    treatment: 'Crowns & Bridges',
  },
];

export interface GalleryImage {
  src: string;
  alt: string;
  category: 'Clinic' | 'Treatment Room' | 'Equipment' | 'Team' | 'Patient Care';
}

export const galleryImages: GalleryImage[] = [
  {
    src: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Bright and clean modern dental clinic room',
    category: 'Clinic',
  },
  {
    src: 'https://images.pexels.com/photos/5355863/pexels-photo-5355863.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Modern dental clinic with blue chairs',
    category: 'Treatment Room',
  },
  {
    src: 'https://images.pexels.com/photos/6629415/pexels-photo-6629415.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Close-up of advanced dental equipment',
    category: 'Equipment',
  },
  {
    src: 'https://images.pexels.com/photos/3952124/pexels-photo-3952124.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Dental team consulting with a patient',
    category: 'Team',
  },
  {
    src: 'https://images.pexels.com/photos/3845744/pexels-photo-3845744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Smiling patient during a dental check-up',
    category: 'Patient Care',
  },
  {
    src: 'https://images.pexels.com/photos/4269268/pexels-photo-4269268.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Stylish modern dentist office',
    category: 'Treatment Room',
  },
  {
    src: 'https://images.pexels.com/photos/6809648/pexels-photo-6809648.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Advanced dental equipment in clinic',
    category: 'Equipment',
  },
  {
    src: 'https://images.pexels.com/photos/5622280/pexels-photo-5622280.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Patient high-fiving dental professional after checkup',
    category: 'Patient Care',
  },
  {
    src: 'https://images.pexels.com/photos/6812453/pexels-photo-6812453.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Modern dental clinic interior with dental chair',
    category: 'Clinic',
  },
  {
    src: 'https://images.pexels.com/photos/4269940/pexels-photo-4269940.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Dentists preparing for a dental procedure',
    category: 'Team',
  },
  {
    src: 'https://images.pexels.com/photos/5355858/pexels-photo-5355858.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Blue dental chair and sterile equipment',
    category: 'Equipment',
  },
  {
    src: 'https://images.pexels.com/photos/8669945/pexels-photo-8669945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Woman smiling during a dental checkup',
    category: 'Patient Care',
  },
];

export interface BeforeAfter {
  title: string;
  before: string;
  after: string;
  description: string;
}

export const beforeAfterCases: BeforeAfter[] = [
  {
    title: 'Teeth Whitening',
    before: 'https://images.pexels.com/photos/69833/smile-laugh-girl-teeth-69833.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    after: 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    description: 'Professional whitening lifted years of staining in a single session.',
  },
  {
    title: 'Alignment with Clear Aligners',
    before: 'https://images.pexels.com/photos/3762402/pexels-photo-3762402.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    after: 'https://images.pexels.com/photos/3762400/pexels-photo-3762400.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    description: 'Crowded teeth were gently straightened over 14 months with invisible aligners.',
  },
  {
    title: 'Smile Restoration',
    before: 'https://images.pexels.com/photos/14465430/pexels-photo-14465430.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    after: 'https://images.pexels.com/photos/41208/fun-cold-elegance-face-41208.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    description: 'Chipped and worn teeth were rebuilt with ceramic crowns for a natural, confident smile.',
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: 'Do I need an appointment?',
    a: 'Yes, we recommend booking an appointment to ensure you receive dedicated time with our dentist. However, we do accommodate emergency walk-ins whenever possible.',
  },
  {
    q: 'How much does a consultation cost?',
    a: 'A routine dental consultation starts from ₹499. This includes a thorough examination and oral health assessment. Any further treatment is quoted transparently before we begin.',
  },
  {
    q: 'Is teeth cleaning painful?',
    a: 'Not at all. Professional teeth cleaning is a gentle procedure. Most patients feel only a mild tickling sensation. If you have sensitive teeth, we can apply a numbing gel for extra comfort.',
  },
  {
    q: 'How long does a root canal take?',
    a: 'A root canal typically takes 60–90 minutes per sitting. Most cases are completed in 1–2 sittings, depending on the complexity of the tooth and the extent of infection.',
  },
  {
    q: 'Do you provide braces for adults?',
    a: 'Yes. We offer traditional braces, ceramic braces, and clear aligners for adults of any age. It is never too late to achieve a straighter smile.',
  },
  {
    q: 'Do you treat children?',
    a: "Absolutely. We have a dedicated kids' dentistry programme designed to make children feel safe and even excited about dental visits. We recommend a first visit by age one.",
  },
  {
    q: 'Do you accept emergency appointments?',
    a: 'Yes. Dental emergencies like severe pain, swelling, or a broken tooth are prioritised. Call our emergency line and we will do our best to see you the same day.',
  },
  {
    q: 'What should I bring to my appointment?',
    a: 'Please bring a government-issued ID, any previous dental records or X-rays if available, and a list of medications you are currently taking.',
  },
];
