import { cookies } from "next/headers";
import TeamSection from "@/components/team-section";
import MissionVision from "@/components/mission-vision";
import CoreValues from "@/components/core-values";
import ShippingPartners from "@/components/shipping-partners";

export default async function AboutPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value;

  return (
    <div className="page-shell space-y-8 pt-32 pb-20 lg:pt-40">
      {/* Mission & Vision Section */}
      <MissionVision lang={lang} />

      {/* Our Team Section */}
      <TeamSection lang={lang} />

      {/* Core Values Section */}
      <CoreValues lang={lang} />

      {/* Shipping Partners Section */}
      <ShippingPartners lang={lang} />
    </div>
  );
}

