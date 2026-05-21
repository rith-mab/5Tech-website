export function EmptyState({
  title,
  description
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <div className="rounded-[28px] border border-dashed p-10 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
