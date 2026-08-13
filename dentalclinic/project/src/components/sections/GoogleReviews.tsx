import { Star, ExternalLink } from 'lucide-react';
import { clinic } from '@/config/clinic';
import { Reveal } from '@/components/ui/Reveal';

export function GoogleReviews() {
  return (
    <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-white text-xs font-semibold tracking-wide">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            Google Reviews
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white leading-tight">
            Trusted by Our Patients
          </h2>
          <p className="mt-3 text-white/80 text-sm sm:text-base">
            See what our patients say about their experience at Lumière Dental on Google.
          </p>
          <a
            href={clinic.CLINIC_GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            View Google Reviews
            <ExternalLink className="w-4 h-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
