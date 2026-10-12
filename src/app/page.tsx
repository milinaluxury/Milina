import { getProducts, getAllSettings, getCategories } from "@/lib/data";
import { Hero } from "@/components/store/Hero";
import { ProductGrid } from "@/components/store/ProductGrid";
import { BrandStats, Testimonials, FAQ, Newsletter } from "@/components/store/HomeSections";

export const revalidate = 60;

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let settings: Awaited<ReturnType<typeof getAllSettings>> = {};
  try {
    [products, settings] = await Promise.all([
      getProducts({ limit: 50 }),
      getAllSettings(),
    ]);
  } catch {
    // DB unavailable in this render — empty state will show
  }

  let heroMedia: string[] = [];
  try {
    if (settings.hero_image) {
      heroMedia = JSON.parse(settings.hero_image as string);
      if (!Array.isArray(heroMedia)) heroMedia = [settings.hero_image as string];
    }
  } catch {
    heroMedia = settings.hero_image ? [settings.hero_image as string] : [];
  }
  if (heroMedia.length === 0) {
    const fallback = products.find((p) => p.slug === "caftan-le-royal")?.images[0]?.url;
    if (fallback) heroMedia = [fallback];
  }

  const heroTitle = (settings.hero_title as string) ?? "CAFTAN LE ROYAL";
  const heroSubtitle = (settings.hero_subtitle as string) ?? undefined;
  const heroInterval = parseInt((settings.hero_interval as string) || "5", 10);

  return (
    <div>
      {/* Hero Section */}
      {heroMedia.length > 0 && (
        <Hero
          title={heroTitle}
          subtitle={heroSubtitle}
          mediaUrls={heroMedia}
          interval={heroInterval}
          ctaHref="/"
        />
      )}

      {/* Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="mb-10 text-center">
          <h2 
            className="text-3xl font-bold italic tracking-tight text-gray-900 md:text-4xl"
            style={{ fontFamily: "'Playfair Display', 'Amiri', serif" }}
          >
            Tous les articles
          </h2>
          <p className="mt-3 text-sm text-neutral-500 max-w-md mx-auto">
            Chaque pièce est choisie avec exigence pour révéler votre style
          </p>
        </div>
        <ProductGrid products={products} perPage={8} />
      </section>

      {/* Brand Stats Section */}
      <BrandStats />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}