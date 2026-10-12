"use client";

import { useEffect, useRef, useState } from "react";
import { IconStar } from "./Icons";

/* ========= BRAND STATS SECTION ========= */
export function BrandStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "+1200", label: "Clientes Satisfaites" },
    { value: "58", label: "Wilayas Livrées" },
    { value: "24h", label: "Échange Garanti" },
    { value: "4.9★", label: "Note Moyenne" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ backgroundColor: "#111827" }}>
      {/* Decorative border */}
      <div className="mx-4 md:mx-8 my-0">
        <div className="brand-border-glow rounded-none py-14 px-6 md:py-20 md:px-12 text-center">
          {/* Logo */}
          <h2
            className="text-2xl md:text-3xl font-bold uppercase tracking-[0.4em] text-white mb-6"
            style={{ fontFamily: "'Playfair Display', 'Amiri', serif" }}
          >
            Boutique Milina
          </h2>

          {/* Tagline */}
          <p className="mx-auto max-w-lg text-sm md:text-base leading-relaxed text-white/60 italic">
            L&apos;univers de l&apos;élégance intemporelle, où chaque pièce est choisie
            avec exigence pour révéler votre style.
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {["Élégance", "Raffinement", "Exclusivité"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats grid */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center ${
                  isVisible ? "animate-count-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <span
                  className="text-2xl md:text-3xl font-bold gradient-text-gold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========= TESTIMONIALS SECTION ========= */
const testimonials = [
  {
    text: "La qualité est incroyable, exactement comme sur les photos. Livraison rapide à Alger, je recommande vivement !",
    name: "Amira B.",
    city: "Alger",
    rating: 5,
  },
  {
    text: "J'ai échangé ma robe en moins de 24h sans aucun problème. Un service client au top, très professionnel.",
    name: "Sarah M.",
    city: "Oran",
    rating: 5,
  },
  {
    text: "Enfin une boutique qui comprend l'élégance. Le paiement à la livraison m'a donné entière confiance.",
    name: "Kenza L.",
    city: "Constantine",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-20" style={{ backgroundColor: "var(--store-bg, #ffffff)" }}>
      <div className="mx-auto max-w-4xl text-center">
        {/* Section heading */}
        <h2
          className="text-2xl md:text-3xl font-bold italic text-gray-900"
          style={{ fontFamily: "'Playfair Display', 'Amiri', serif" }}
        >
          Ce que disent nos clientes
        </h2>
        <p className="mt-3 text-sm text-neutral-500">
          Votre confiance est notre plus belle réussite
        </p>

        {/* Testimonial cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card rounded-2xl border border-neutral-100 bg-white p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <IconStar key={j} size={14} filled className="text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-5 border-t border-neutral-100 pt-4">
                <p className="text-sm font-bold text-gray-900">{t.name}</p>
                <p className="text-xs text-neutral-400">{t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========= FAQ SECTION ========= */
const faqs = [
  {
    question: "Comment passer commande ?",
    answer:
      "Ajoutez vos articles au panier, validez et remplissez vos coordonnées. Notre équipe vous confirmera la commande par téléphone ou WhatsApp.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "La livraison est assurée entre 24h et 72h selon votre wilaya. Nous livrons les 58 wilayas d'Algérie.",
  },
  {
    question: "Puis-je échanger un article ?",
    answer:
      "Oui, les échanges sont possibles dans les 24 heures suivant la réception de votre commande. Contactez-nous par WhatsApp pour organiser l'échange.",
  },
  {
    question: "Comment payer ma commande ?",
    answer:
      "Le paiement se fait à la livraison (COD). Vous payez uniquement quand vous recevez votre colis.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-100">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-neutral-600"
      >
        <span className="text-sm font-semibold text-gray-900 pr-4">{question}</span>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center text-neutral-400 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div className={`faq-answer ${open ? "open" : ""}`}>
        <p className="pb-5 text-sm leading-relaxed text-neutral-500">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-20" style={{ backgroundColor: "var(--store-bg, #ffffff)" }}>
      <div className="mx-auto max-w-2xl">
        {/* Section heading */}
        <div className="text-center">
          <h2
            className="text-2xl md:text-3xl font-bold italic text-gray-900"
            style={{ fontFamily: "'Playfair Display', 'Amiri', serif" }}
          >
            Questions fréquentes
          </h2>
          <p className="mt-3 text-sm text-neutral-500">
            Tout ce que vous devez savoir
          </p>
        </div>

        {/* FAQ items */}
        <div className="mt-10 border-t border-neutral-100">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========= NEWSLETTER SECTION ========= */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <section className="px-4 py-16 md:px-8" style={{ backgroundColor: "#faf7f4" }}>
      <div className="mx-auto max-w-xl text-center">
        <h2
          className="text-2xl md:text-3xl font-bold italic text-gray-900"
          style={{ fontFamily: "'Playfair Display', 'Amiri', serif" }}
        >
          Restez élégante
        </h2>
        <p className="mt-3 text-sm text-neutral-500">
          Recevez nos nouveautés et offres exclusives avant tout le monde
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex gap-0 overflow-hidden rounded-full border border-neutral-300 bg-white">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            required
            className="newsletter-input flex-1 bg-transparent px-5 py-3 text-sm text-gray-900 placeholder:text-neutral-400 outline-none"
          />
          <button
            type="submit"
            disabled={submitted}
            className="shrink-0 bg-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-neutral-800 disabled:opacity-50"
          >
            {submitted ? "Merci !" : "S'abonner"}
          </button>
        </form>
      </div>
    </section>
  );
}
