import { Target, Compass, ShoppingBag } from "lucide-react";
import { getTranslation, TranslationKey } from "@/lib/translations";
import ScrollFloat from "@/components/scroll-float";
import ShinyText from "@/components/shiny-text";
import CountUp from "@/components/count-up";
import AnimatedContent from "@/components/animated-content";

interface MissionVisionProps {
  lang: string | undefined;
}

export default function MissionVision({ lang }: MissionVisionProps) {
  return (
    <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Mission Card */}
        <AnimatedContent delay={0} distance={60} className="h-full">
          <div className="group relative overflow-hidden rounded-[32px] border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-card/60 backdrop-blur-md p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-100 dark:hover:border-emerald-900/50 h-full">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-emerald-50/50 dark:bg-emerald-950/10 blur-2xl group-hover:bg-emerald-100/50 dark:group-hover:bg-emerald-900/20 transition-all duration-500" />
            
            <div className="relative flex flex-col h-full justify-between">
              <div>
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  <ShinyText text={getTranslation(lang, "about.mission_vision.mission.title" as TranslationKey)} />
                </h3>
                <ScrollFloat 
                  as="p" 
                  containerClassName="my-0" 
                  textClassName="text-slate-600 dark:text-slate-300 text-base leading-relaxed"
                  stagger={0.01}
                >
                  {getTranslation(lang, "about.mission_vision.mission.desc" as TranslationKey)}
                </ScrollFloat>
              </div>
            </div>
          </div>
        </AnimatedContent>

        {/* Vision Card */}
        <AnimatedContent delay={0.1} distance={60} className="h-full">
          <div className="group relative overflow-hidden rounded-[32px] border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-card/60 backdrop-blur-md p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-100 dark:hover:border-emerald-900/50 h-full">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-emerald-50/50 dark:bg-emerald-950/10 blur-2xl group-hover:bg-emerald-100/50 dark:group-hover:bg-emerald-900/20 transition-all duration-500" />

            <div className="relative flex flex-col h-full justify-between">
              <div>
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Compass className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  <ShinyText text={getTranslation(lang, "about.mission_vision.vision.title" as TranslationKey)} />
                </h3>
                <ScrollFloat 
                  as="p" 
                  containerClassName="my-0" 
                  textClassName="text-slate-600 dark:text-slate-300 text-base leading-relaxed"
                  stagger={0.01}
                >
                  {getTranslation(lang, "about.mission_vision.vision.desc" as TranslationKey)}
                </ScrollFloat>
              </div>
            </div>
          </div>
        </AnimatedContent>

        {/* Sold Card */}
        <AnimatedContent delay={0.2} distance={60} className="h-full">
          <div className="group relative overflow-hidden rounded-[32px] border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-card/60 backdrop-blur-md p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-100 dark:hover:border-emerald-900/50 h-full">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-emerald-50/50 dark:bg-emerald-950/10 blur-2xl group-hover:bg-emerald-100/50 dark:group-hover:bg-emerald-900/20 transition-all duration-500" />

            <div className="relative flex flex-col h-full justify-between">
              <div>
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  <ShinyText text={getTranslation(lang, "about.mission_vision.sold.title" as TranslationKey)} />
                </h3>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
                  <CountUp from={0} to={1000} separator="," duration={2} />+
                </div>
                <ScrollFloat 
                  as="p" 
                  containerClassName="my-0" 
                  textClassName="text-slate-600 dark:text-slate-300 text-base leading-relaxed"
                  stagger={0.01}
                >
                  {getTranslation(lang, "about.mission_vision.sold.desc" as TranslationKey)}
                </ScrollFloat>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}
