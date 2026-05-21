import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PaginationControls({
  currentPage,
  totalPages,
  basePath,
  params
}: Readonly<{
  currentPage: number;
  totalPages: number;
  basePath: string;
  params: URLSearchParams;
}>) {
  const makeHref = (page: number) => {
    const nextParams = new URLSearchParams(params.toString());
    if (page <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(page));
    }
    return `${basePath}?${nextParams.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {currentPage > 1 ? (
        <Button asChild variant="outline" size="sm">
          <Link href={makeHref(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        </Button>
      ) : (
        <span className="inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm text-muted-foreground">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </span>
      )}
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Button asChild variant="outline" size="sm">
          <Link href={makeHref(currentPage + 1)}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <span className="inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm text-muted-foreground">
          Next
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}
