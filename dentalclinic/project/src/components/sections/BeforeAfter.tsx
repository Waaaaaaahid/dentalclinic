import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Info } from 'lucide-react';
import { beforeAfterCases } from '@/data/site';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

export function BeforeAfter() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full tracking-wide">
            Before & After
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            Real transformations, remarkable results.
          </h2>
          <p className="mt-4 text-slate-500">
            A look at what modern dentistry can achieve. Every smile below was restored with care and precision.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {beforeAfterCases.map((c) => (
            <BeforeAfterCard key={c.title} {...c} />
          ))}
        </RevealGroup>

        <Reveal delay={0.2}>
          <p className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Info className="w-3.5 h-3.5" />
            Results may vary depending on individual cases.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function BeforeAfterCard({ title, before, after, description }: { title: string; before: string; after: string; description: string }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100"
    >
      <div className="relative aspect-[3/2] overflow-hidden group cursor-pointer" onClick={() => setShowAfter((v) => !v)}>
        <img
          src={before}
          alt={`${title} — before treatment`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showAfter ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
        />
        <img
          src={after}
          alt={`${title} — after treatment`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showAfter ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-black/60 text-white backdrop-blur-sm">
          {showAfter ? 'After' : 'Before'}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700 shadow-md group-hover:bg-white transition">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          Tap to {showAfter ? 'see before' : 'see after'}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
