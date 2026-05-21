import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Particles from "@/components/particles";

export default function StoreLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.12),transparent_30%)]" />
      <div className="fixed inset-0 -z-20">
        <Particles
          particleColors={['#39b54a', '#22c55e', '#14b8a6']}
          particleCount={600}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
