export function LoadingCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-[28px] border bg-card">
          <div className="aspect-[4/3] animate-pulseSoft bg-secondary" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-24 animate-pulseSoft rounded-full bg-secondary" />
            <div className="h-6 w-2/3 animate-pulseSoft rounded-full bg-secondary" />
            <div className="h-4 w-full animate-pulseSoft rounded-full bg-secondary" />
            <div className="h-4 w-1/2 animate-pulseSoft rounded-full bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}
