import { Cpu, Users, ShieldCheck, Award } from "lucide-react";
import { getTranslation, TranslationKey } from "@/lib/translations";
import ScrollFloat from "@/components/scroll-float";
import ShinyText from "@/components/shiny-text";
import AnimatedContent from "@/components/animated-content";

interface CoreValuesProps {
  lang: string | undefined;
}

export default function CoreValues({ lang }: CoreValuesProps) {
  const values = [
    {
      icon: Cpu,
      titleKey: "about.values.1.title" as TranslationKey,
      descKey: "about.values.1.desc" as TranslationKey,
    },
    {
      icon: Users,
      titleKey: "about.values.2.title" as TranslationKey,
      descKey: "about.values.2.desc" as TranslationKey,
    },
    {
      icon: ShieldCheck,
      titleKey: "about.values.3.title" as TranslationKey,
      descKey: "about.values.3.desc" as TranslationKey,
    },
    {
      icon: Award,
      titleKey: "about.values.4.title" as TranslationKey,
      descKey: "about.values.4.desc" as TranslationKey,
    },
  ];

  return (
    <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          <ShinyText text={getTranslation(lang, "about.values.title" as TranslationKey)} />
        </h2>
        <ScrollFloat
          as="p"
          containerClassName="my-0"
          textClassName="text-muted-foreground text-sm sm:text-base leading-relaxed"
          stagger={0.01}
        >
          {getTranslation(lang, "about.values.subtitle" as TranslationKey)}
        </ScrollFloat>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((val, index) => {
          const Icon = val.icon;
          return (
            <AnimatedContent
              key={index}
              delay={index * 0.1}
              distance={60}
              className="h-full"
            >
              <div
                className="group relative flex flex-col bg-white dark:bg-card border border-slate-100 dark:border-slate-800 hover:border-emerald-100 dark:hover:border-emerald-900/50 rounded-[28px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30 mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:bg-emerald-600 transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <ScrollFloat
                  as="h4"
                  containerClassName="my-0 mb-2"
                  textClassName="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#39b54a] transition-colors"
                >
                  {getTranslation(lang, val.titleKey)}
                </ScrollFloat>
                <ScrollFloat
                  as="p"
                  containerClassName="my-0 mt-1"
                  textClassName="text-slate-500 dark:text-slate-400 text-sm leading-relaxed"
                  stagger={0.01}
                >
                  {getTranslation(lang, val.descKey)}
                </ScrollFloat>
              </div>
            </AnimatedContent>
          );
        })}
      </div>
    </div>
  );
}
