import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export default function CustomPagination({ page, totalPages, setPage }) {
  const getPages = () => {
    let pages = [];

    // Always show first page
    pages.push(1);

    // Show left ellipsis
    if (page > 4) pages.push("left");

    // Middle pages (page -2 to page +2)
    for (let p = page - 2; p <= page + 2; p++) {
      if (p > 1 && p < totalPages) pages.push(p);
    }

    // Show right ellipsis
    if (page < totalPages - 3) pages.push("right");

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <Pagination className="select-none w-full flex justify-center mt-4">
      <PaginationContent className="flex gap-1">
        {/* first  */}
        <PaginationItem>
          <Button
            size={"sm"}
            variant={"secondary"}
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            First Page
          </Button>
        </PaginationItem>
        {/* Previous */}
        <PaginationItem>
          <Button
            size={"sm"}
            variant="ghost"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <PaginationPrevious />
          </Button>
        </PaginationItem>

        {/* Page Numbers */}
        {pages.map((p, i) =>
          p === "left" || p === "right" ? (
            <PaginationItem key={i}>
              <PaginationEllipsis className={"w-full px-2"} />
            </PaginationItem>
          ) : (
            <PaginationItem key={i}>
              <PaginationLink
                className="cursor-pointer w-full px-2"
                isActive={page === p}
                onClick={() => setPage(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <Button
            size={"sm"}
            variant="ghost"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <PaginationNext />
          </Button>
        </PaginationItem>

        {/* Last  */}
        <PaginationItem>
          <Button
            size={"sm"}
            variant={"secondary"}
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            Last Page
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
