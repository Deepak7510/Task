import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

export const TableSkeleton = ({ rows = 10 }) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-6" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>

          <TableCell className="text-right">
            <Skeleton className="h-4 w-28 ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
