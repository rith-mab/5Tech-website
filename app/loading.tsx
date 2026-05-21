import { LoadingCards } from "@/components/loading-cards";

export default function Loading() {
  return (
    <div className="page-shell space-y-8 py-12">
      <div className="space-y-3">
        <div className="h-4 w-24 animate-pulseSoft rounded-full bg-secondary" />
        <div className="h-10 w-1/2 animate-pulseSoft rounded-full bg-secondary" />
        <div className="h-5 w-2/3 animate-pulseSoft rounded-full bg-secondary" />
      </div>
      <LoadingCards />
    </div>
  );
}
