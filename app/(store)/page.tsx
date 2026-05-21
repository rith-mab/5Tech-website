import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategories, getProducts } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { ProductGrid } from "@/components/product-grid";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { getTranslation } from "@/lib/translations";
import ShinyText from "@/components/shiny-text";
import SpotlightCard from "@/components/spotlight-card";
import { BrandMarquee } from "@/components/brand-marquee";
import StoreMarquee from "@/components/store-marquee";
import SplitText from "@/components/split-text";
import ScrollVelocity from "@/components/scroll-velocity";
import TeamSection from "@/components/team-section";
import MissionVision from "@/components/mission-vision";
import CoreValues from "@/components/core-values";
import ShippingPartners from "@/components/shipping-partners";

export default async function HomePage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value;
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(lang, key);

  const [featuredProducts, trendingProducts, categories] = await Promise.all([
    getProducts({ featured: true }),
    getProducts({ trending: true }),
    getCategories()
  ]);

  return (
    <div className="relative space-y-8 pb-24">
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <img src="/logos/logo-no-text.png" alt="Background Logo" className="w-[300px] object-contain" />
      </div>
      <section className="relative page-shell pt-16 sm:pt-20 pb-4 lg:pt-32 lg:pb-8 2xl:pt-40 2xl:pb-12 overflow-hidden">
        <div className="relative z-10 grid gap-10 sm:gap-14 lg:gap-16 lg:grid-cols-2 items-center max-w-[1600px] mx-auto w-full">
          {/* Logo Section */}
          <div className="flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000">
            <img 
              src="/logos/logo-no-text.png" 
              alt="5Tech Store Logo" 
              className="w-[220px] sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[500px] 2xl:w-[650px] drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
            />
          </div>
          
          {/* Text Content Section */}
          <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 lg:-ml-12 xl:-ml-24 2xl:-ml-32">
            <SplitText
              text={t("hero.badge") as string}
              tag="h2"
              className="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-medium text-emerald-600/80 tracking-wide"
              delay={35}
              duration={0.8}
              splitType="words"
            />
            
            <h1 className="text-[2.75rem] leading-tight sm:text-6xl md:text-[5rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[6.5rem] font-bold tracking-tight text-emerald-600 pb-2">
              <ShinyText text={t("hero.title") as string} speed={3} className="pb-4" />
            </h1>
            
            <SplitText
              text={t("hero.description") as string}
              tag="p"
              className="max-w-[320px] sm:max-w-md md:max-w-lg xl:max-w-2xl 2xl:max-w-4xl text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-gray-600 leading-relaxed font-medium"
              delay={15}
              duration={0.8}
              splitType="words"
            />
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-2 sm:pt-4 2xl:pt-8">
              <Button asChild size="lg" className="rounded-full px-6 sm:px-8 py-6 text-sm sm:text-base xl:text-lg 2xl:text-2xl 2xl:px-12 2xl:py-8 bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/40 transition-all hover:-translate-y-1">
                <Link href="/products" className="flex items-center">
                  <ShinyText text={t("hero.browse") as string} speed={3} color="#ffffff" shineColor="#a7f3d0" className="inline-block" />
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6 sm:px-8 py-6 text-sm sm:text-base xl:text-lg 2xl:text-2xl 2xl:px-12 2xl:py-8 border-emerald-200 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-300 transition-all hover:-translate-y-1">
                <Link href="/contact">{t("hero.contact")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BrandMarquee lang={lang} />

      {/* Store Photos Marquee Loop */}
      <StoreMarquee lang={lang} />

      {/* ScrollVelocity Text Scroll */}
      <div className="!mt-0 py-2 bg-slate-50 dark:bg-card/40 border-y border-slate-100 dark:border-slate-800 overflow-hidden w-full">
        <ScrollVelocity
          texts={["5Tech Store •", "5Tech Store •"]}
          velocity={25}
          numCopies={40}
          className="text-emerald-800 dark:text-emerald-400 font-medium uppercase text-xs sm:text-sm tracking-[0.2em]"
        />
      </div>

      {/* Mission & Vision Section */}
      <div className="py-8 bg-white/40 dark:bg-background/40">
        <MissionVision lang={lang} />
      </div>

      {/* Core Values Section */}
      <div className="py-4 bg-white/40 dark:bg-background/40">
        <CoreValues lang={lang} />
      </div>

      {/* Team Section */}
      <div className="py-12 bg-white/40 dark:bg-background/40">
        <TeamSection lang={lang} />
      </div>

      {/* Shipping Partners Section */}
      <div className="py-4 bg-white/40 dark:bg-background/40">
        <ShippingPartners lang={lang} />
      </div>

      {/* 
      <section className="page-shell space-y-8">
        <SectionHeading
          eyebrow={t("section.featured.eyebrow")}
          title={t("section.featured.title")}
          description={t("section.featured.desc")}
        />
        <ProductGrid products={featuredProducts.slice(0, 6)} />
      </section>
      */}

      {/* 
      <section className="page-shell space-y-8">
        <SectionHeading
          eyebrow={t("section.categories.eyebrow")}
          title={t("section.categories.title")}
          description={t("section.categories.desc")}
          align="center"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <SpotlightCard key={category.id} className="p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{category.name}</p>
              <p className="mt-3 text-muted-foreground">{category.description}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="page-shell space-y-8">
        <SectionHeading
          eyebrow={t("section.trending.eyebrow")}
          title={t("section.trending.title")}
          description={t("section.trending.desc")}
        />
        <ProductGrid products={trendingProducts.slice(0, 3)} />
      </section>
      */}
    </div>
  );
}
