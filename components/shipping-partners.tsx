import { getTranslation, TranslationKey } from "@/lib/translations";
import ScrollFloat from "@/components/scroll-float";
import ShinyText from "@/components/shiny-text";
import OrbitImages from "@/components/orbit-images";

interface ShippingPartnersProps {
  lang: string | undefined;
}

export default function ShippingPartners({ lang }: ShippingPartnersProps) {
  const partnerLogos = [
    "/Shipping Partner/Grab.png",
    "/Shipping Partner/Jalat.png",
    "/Shipping Partner/VET.png"
  ];

  return (
    <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          <ShinyText text={getTranslation(lang, "about.shipping.title" as TranslationKey)} />
        </h2>
        <ScrollFloat
          as="p"
          containerClassName="my-0"
          textClassName="text-muted-foreground text-sm sm:text-base leading-relaxed"
          stagger={0.01}
        >
          {getTranslation(lang, "about.shipping.subtitle" as TranslationKey)}
        </ScrollFloat>
      </div>

      <div className="relative w-full max-w-4xl mx-auto h-[400px] sm:h-[500px] flex items-center justify-center">
        <OrbitImages
          images={partnerLogos}
          shape="ellipse"
          radiusX={370}
          radiusY={140}
          baseWidth={1000}
          itemSize={130}
          duration={25}
          rotation={-6}
          showPath={true}
          pathColor="#39b54a"
          pathWidth={3}
          responsive={true}
          centerContent={
            <div className="flex items-center justify-center h-28 w-28 drop-shadow-md overflow-hidden">
              <img
                src="/image/cambodia-map.png"
                alt="Cambodia Map"
                className="w-full h-full object-contain animate-pulse"
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
