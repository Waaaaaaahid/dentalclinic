import {
  Sparkles,
  Sun,
  Activity,
  Anchor,
  Braces,
  AlignCenterHorizontal,
  Crown,
  Scissors,
  Baby,
  HeartPulse,
  type LucideIcon,
} from 'lucide-react';

export interface Treatment {
  id: string;
  name: string;
  icon: LucideIcon;
  short: string;
  benefits: string[];
  description: string;
  procedure: string;
  duration: string;
  recovery: string;
  startingPrice: string;
  faqs: { q: string; a: string }[];
}

export const treatments: Treatment[] = [
  {
    id: 'teeth-cleaning',
    name: 'Teeth Cleaning',
    icon: Sparkles,
    short: 'Professional scaling and polishing to remove plaque and tartar for a fresher, healthier smile.',
    benefits: ['Removes plaque & tartar', 'Fresher breath', 'Healthier gums', 'Brighter appearance'],
    description:
      'A professional cleaning removes hardened plaque that daily brushing cannot. We use gentle ultrasonic scaling followed by polishing to leave your teeth spotless and your gums healthy.',
    procedure:
      'Examination → Ultrasonic scaling → Polishing → Fluoride application → Oral hygiene guidance.',
    duration: '30–45 minutes',
    recovery: 'No downtime. Mild sensitivity for a few hours is normal.',
    startingPrice: '₹999',
    faqs: [
      { q: 'Is teeth cleaning painful?', a: 'No. Most patients feel only a mild tickling sensation. We ensure the process is comfortable throughout.' },
      { q: 'How often should I get it done?', a: 'Every 6 months for most patients, or as recommended by your dentist.' },
    ],
  },
  {
    id: 'teeth-whitening',
    name: 'Teeth Whitening',
    icon: Sun,
    short: 'Safe, professional whitening that brightens your smile by several shades in a single visit.',
    benefits: ['Up to 6 shades brighter', 'Single-session results', 'Enamel-safe gel', 'Stain removal'],
    description:
      'Our in-clinic whitening uses a clinically tested peroxide gel activated by a specialised light to lift deep-set stains and restore a luminous, even tone.',
    procedure:
      'Shade assessment → Gum protection → Whitening gel application → Light activation → Final shade check.',
    duration: '60–90 minutes',
    recovery: 'No downtime. Avoid staining foods for 48 hours.',
    startingPrice: '₹7,999',
    faqs: [
      { q: 'Will whitening damage my enamel?', a: 'No. Our gel is enamel-safe and applied under professional supervision.' },
      { q: 'How long do results last?', a: 'Typically 1–2 years with good oral hygiene and limited staining foods.' },
    ],
  },
  {
    id: 'root-canal',
    name: 'Root Canal Treatment',
    icon: Activity,
    short: 'Pain-relieving treatment that saves a badly decayed or infected tooth from extraction.',
    benefits: ['Relieves severe pain', 'Saves natural tooth', 'Stops infection', 'Restores function'],
    description:
      'When decay reaches the tooth pulp, a root canal removes the infected tissue, disinfects the canals, and seals the tooth — preserving your natural smile and eliminating pain.',
    procedure:
      'Diagnosis & X-ray → Local anaesthesia → Pulp removal → Canal cleaning & shaping → Sealing → Crown placement.',
    duration: '60–90 minutes per sitting',
    recovery: 'Mild soreness for 1–2 days. Normal eating resumes the next day.',
    startingPrice: '₹4,999',
    faqs: [
      { q: 'Is a root canal painful?', a: 'No. The procedure is performed under local anaesthesia and is virtually painless. Most patients feel immediate relief afterwards.' },
      { q: 'How many sittings are needed?', a: 'Usually 1–2 sittings depending on the tooth and infection severity.' },
    ],
  },
  {
    id: 'dental-implants',
    name: 'Dental Implants',
    icon: Anchor,
    short: 'Permanent, natural-looking replacements for missing teeth that restore full chewing function.',
    benefits: ['Permanent solution', 'Looks & feels natural', 'Prevents bone loss', 'No damage to adjacent teeth'],
    description:
      'Implants are titanium roots placed into the jawbone to support a custom crown. They are the gold standard for replacing missing teeth, offering unmatched stability and longevity.',
    procedure:
      '3D scan & planning → Implant placement → Healing period (3–6 months) → Crown fitting.',
    duration: 'Placement: 60–90 min. Full restoration: 3–6 months.',
    recovery: 'Mild swelling for 2–3 days. Soft diet for a week.',
    startingPrice: '₹24,999',
    faqs: [
      { q: 'How long do implants last?', a: 'With proper care, implants can last a lifetime. The crown may need replacement after 10–15 years.' },
      { q: 'Is the surgery safe?', a: 'Yes. We use 3D-guided planning for precision and safety.' },
    ],
  },
  {
    id: 'braces',
    name: 'Braces',
    icon: Braces,
    short: 'Traditional metal or ceramic braces that straighten teeth and correct bite alignment.',
    benefits: ['Corrects alignment', 'Improves bite', 'Durable & effective', 'Suitable for all ages'],
    description:
      'Braces apply gentle, controlled pressure to gradually move teeth into their ideal position. We offer metal and ceramic options to suit your preference and lifestyle.',
    procedure:
      'Consultation & scans → Bracket placement → Periodic adjustments (every 4–6 weeks) → Retention.',
    duration: '18–24 months (varies by case)',
    recovery: 'Mild soreness for 2–3 days after each adjustment.',
    startingPrice: '₹19,999',
    faqs: [
      { q: 'Do braces hurt?', a: 'You may feel pressure and mild soreness after adjustments, which subsides in a few days.' },
      { q: 'Can adults get braces?', a: 'Absolutely. There is no age limit for orthodontic treatment.' },
    ],
  },
  {
    id: 'clear-aligners',
    name: 'Clear Aligners',
    icon: AlignCenterHorizontal,
    short: 'Invisible, removable aligners that straighten teeth discreetly without metal braces.',
    benefits: ['Nearly invisible', 'Removable for eating', 'Comfortable fit', 'Fewer clinic visits'],
    description:
      'Clear aligners are custom-made transparent trays that gradually shift your teeth. They are removable, virtually invisible, and perfect for adults who want discreet treatment.',
    procedure:
      'Digital scan → 3D treatment plan → Custom aligner sets → Wear 20–22 hrs/day → Check-ups every 6–8 weeks.',
    duration: '12–18 months (varies by case)',
    recovery: 'No downtime. Mild pressure for 1–2 days per new aligner.',
    startingPrice: '₹49,999',
    faqs: [
      { q: 'Are aligners as effective as braces?', a: 'For most mild to moderate cases, yes. Complex cases may still require braces.' },
      { q: 'How long do I wear them each day?', a: '20–22 hours per day, removing them only to eat and brush.' },
    ],
  },
  {
    id: 'crowns-bridges',
    name: 'Crowns & Bridges',
    icon: Crown,
    short: 'Custom restorations that rebuild damaged teeth or replace missing ones seamlessly.',
    benefits: ['Restores tooth shape', 'Strengthens weak teeth', 'Replaces missing teeth', 'Natural appearance'],
    description:
      'Crowns cap damaged teeth to restore strength and appearance, while bridges span the gap left by missing teeth — both crafted to match your natural shade.',
    procedure: 'Tooth preparation → Digital impression → Temporary crown → Final fitting & cementation.',
    duration: '2–3 visits over 1–2 weeks',
    recovery: 'Mild sensitivity for a few days. Normal eating after fitting.',
    startingPrice: '₹6,999',
    faqs: [
      { q: 'What are crowns made of?', a: 'We offer ceramic, zirconia, and metal-ceramic options. Zirconia is the most popular for its strength and natural look.' },
      { q: 'How long do they last?', a: '10–15 years with proper oral hygiene and regular check-ups.' },
    ],
  },
  {
    id: 'wisdom-tooth',
    name: 'Wisdom Tooth Removal',
    icon: Scissors,
    short: 'Safe surgical extraction of impacted or painful wisdom teeth with minimal discomfort.',
    benefits: ['Relieves pain & pressure', 'Prevents crowding', 'Stops infection', 'Protects adjacent teeth'],
    description:
      'Wisdom teeth often lack space to erupt properly, causing pain, infection, or damage to neighbouring teeth. Our surgical extraction is quick, safe, and comfortable.',
    procedure: 'X-ray & assessment → Local anaesthesia → Extraction → Sutures (if needed) → Aftercare guidance.',
    duration: '30–60 minutes',
    recovery: 'Swelling for 2–3 days. Full healing in 1–2 weeks.',
    startingPrice: '₹3,999',
    faqs: [
      { q: 'Is wisdom tooth removal painful?', a: 'No. It is done under local anaesthesia. Post-operative discomfort is managed with prescribed medication.' },
      { q: 'Do all wisdom teeth need removal?', a: 'No. Only impacted, decayed, or painful ones require extraction.' },
    ],
  },
  {
    id: 'kids-dentistry',
    name: 'Kids Dentistry',
    icon: Baby,
    short: "Gentle, friendly dental care designed to keep children's smiles healthy and cavity-free.",
    benefits: ['Child-friendly approach', 'Cavity prevention', 'Habit counselling', 'Positive dental experience'],
    description:
      'We make dental visits fun and stress-free for children. From fluoride applications to sealants and early orthodontic checks, we build healthy habits that last a lifetime.',
    procedure: 'Friendly check-up → Cleaning → Fluoride/sealants → Parent guidance → Reward sticker!',
    duration: '30 minutes',
    recovery: 'No downtime.',
    startingPrice: '₹699',
    faqs: [
      { q: 'At what age should my child first visit the dentist?', a: 'By their first birthday or when their first tooth appears — whichever comes first.' },
      { q: 'How do you keep children calm?', a: 'We use a tell-show-do approach, gentle pacing, and a warm, playful environment.' },
    ],
  },
  {
    id: 'gum-treatment',
    name: 'Gum Treatment',
    icon: HeartPulse,
    short: 'Specialised care for gum disease — from deep cleaning to advanced periodontal therapy.',
    benefits: ['Stops gum disease', 'Prevents tooth loss', 'Reduces bleeding', 'Healthier gums'],
    description:
      'Gum disease is the leading cause of tooth loss in adults. Our periodontal treatments remove infection, reduce pocket depth, and restore gum health.',
    procedure: 'Periodontal assessment → Deep cleaning (scaling & root planing) → Medication → Maintenance visits.',
    duration: '1–2 visits, 45–60 minutes each',
    recovery: 'Mild sensitivity for 2–3 days. Soft diet recommended.',
    startingPrice: '₹2,999',
    faqs: [
      { q: 'Can gum disease be cured?', a: 'Early stages are fully reversible. Advanced stages can be managed effectively to prevent progression.' },
      { q: 'Will my gums stop bleeding?', a: 'Yes. With treatment and proper home care, bleeding gums resolve within weeks.' },
    ],
  },
];
