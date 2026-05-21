import Image from "next/image";
import { getTranslation, TranslationKey } from "@/lib/translations";
import ScrollFloat from "@/components/scroll-float";
import ShinyText from "@/components/shiny-text";

interface TeamSectionProps {
  lang: string | undefined;
}

export default function TeamSection({ lang }: TeamSectionProps) {
  const teamMembers = [
    {
      name: "Oung Denzo",
      role: getTranslation(lang, "about.team.role1" as TranslationKey),
      image: "/staff-image/Oung denzo.png"
    },
    {
      name: "Sam Many",
      role: getTranslation(lang, "about.team.role2" as TranslationKey),
      image: "/staff-image/Sam Many.png"
    },
    {
      name: "Sam Rithy",
      role: getTranslation(lang, "about.team.role3" as TranslationKey),
      image: "/staff-image/Sam Rithy.png"
    },
    {
      name: "An Bunrithy",
      role: getTranslation(lang, "about.team.role4" as TranslationKey),
      image: "/staff-image/An Bunrithy.png"
    }
  ];

  return (
    <div className="space-y-6 pt-2 max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          <ShinyText text={getTranslation(lang, "about.team.title" as TranslationKey)} />
        </h2>
        <ScrollFloat
          as="p"
          containerClassName="my-0"
          textClassName="text-muted-foreground text-sm sm:text-base leading-relaxed"
          stagger={0.01}
        >
          {getTranslation(lang, "about.team.description" as TranslationKey)}
        </ScrollFloat>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-4 lg:pt-20">
        {teamMembers.map((member, index) => {
          const isMiddle = index === 1 || index === 2;
          return (
            <div
              key={index}
              className={`bg-white dark:bg-card border border-slate-100 dark:border-slate-800 rounded-[28px] p-3 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-1 ${
                isMiddle ? "lg:-translate-y-16 lg:hover:-translate-y-18" : ""
              }`}
            >
              <div className="relative aspect-[896/1152] w-full overflow-hidden rounded-[20px] bg-slate-50">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="pt-4 pb-2 px-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white transition-colors group-hover:text-emerald-700">
                    {member.name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
