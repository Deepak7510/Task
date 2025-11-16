import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ArrowLeftRight, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { TableSkeleton } from "@/components/TableSkeleton";
import { useSearchParams } from "react-router-dom";
import CustomPagination from "@/components/Pagination";

const pageLimitList = [10, 20, 30, 40, 50];

const TransactionsPage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("timestamp");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      page,
      limit,
      sortBy,
      order,
    });
  }, [page, limit, sortBy, order, setSearchParams]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/transactions?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`
        );

        setDataList(response?.data?.data?.dataList || []);
        setTotalRows(response?.data?.data?.totalRows);
        setTotalPages(response?.data?.data?.totalPages);
      } catch (error) {
        console.error(error);
        setDataList([]);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [limit, page, sortBy, order, setSearchParams]);

  function setSortHandler(getSortBy) {
    if (getSortBy === sortBy) {
      if (order === "asc") {
        setOrder("desc");
      } else {
        setOrder("asc");
      }
    } else {
      setOrder("desc");
      setSortBy(getSortBy);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold flex gap-2 items-center">
        <ArrowLeftRight className="h-6 w-6" />
        <span>Transactions</span>
      </h1>
      <p className="text-muted-foreground">
        Set your preferred filters to view transaction{" "}
      </p>
      <div className="border rounded-lg mt-2">
        {/* List All Data --------------------------------------------------------- */}
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>SR No</TableHead>
              <TableHead>Transaction_Id</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Product Category</TableHead>
              <TableHead>Customer Tier</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  // salesAmount
                  onClick={() => setSortHandler("salesAmount")}
                >
                  Sales Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  // timestamp
                  onClick={() => setSortHandler("timestamp")}
                >
                  Timestamp
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={limit} />
            ) : dataList.length > 0 ? (
              dataList.map((listItem, index) => (
                <TableRow key={listItem._id}>
                  <TableCell className="font-medium">
                    {(page - 1) * Number(limit) + (index + 1)}
                  </TableCell>
                  <TableCell>{listItem.transactionId}</TableCell>
                  <TableCell>{listItem.region}</TableCell>
                  <TableCell>{listItem.productCategory}</TableCell>
                  <TableCell>{listItem.customerTier}</TableCell>
                  <TableCell>
                    {parseFloat(listItem.salesAmount).toFixed(3)}
                  </TableCell>
                  <TableCell className="text-right">
                    {format(listItem.timestamp, "PPP")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No Transaction Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="pt-2 pb-14">
        {/* Show Details part --------------------------------------- */}
        <div className="flex justify-between">
          <div className="text-muted-foreground font-medium text-sm">
            <div> Total Rows : {totalRows}</div>
            <div> Page No : {`${page} / ${Math.ceil(totalRows / limit)}`}</div>
          </div>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Select Row Size" />
            </SelectTrigger>
            <SelectContent>
              {pageLimitList.map((item, index) => {
                return (
                  <SelectItem key={index} value={String(item)}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Pagination -------------------------------- */}
        <CustomPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
