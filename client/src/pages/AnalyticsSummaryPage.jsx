import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartColumnIncreasing } from "lucide-react";
import axios from "axios";
import LoadingButton from "@/components/LoadingButton";

const formSchema = z.object({
  groupBy: z.string().min(1, "Group By is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minAmount: z.coerce.number().optional(),
});

const groupByList = ["region", "productCategory", "customerTier"];

const AnalyticsSummaryPage = () => {
  const [analyticsDataList, setAnalyticsDataList] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupBy: "",
      startDate: "",
      endDate: "",
      minAmount: 0,
    },
  });

  async function onSubmit(values) {
    try {
      const query = new URLSearchParams(values);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/analytics/summary?${query}`
      );
      setAnalyticsDataList(response?.data?.data?.dataList || []);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold flex gap-2 items-center">
          <ChartColumnIncreasing className="h-8 w-8" />
          <span>Analytics Summary</span>
        </h1>
        <p className="text-muted-foreground">
          Configure your analytics query parameters
        </p>
      </div>
      <div className="py-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-center gap-5">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="groupBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Group by <span className="text-red-600">*</span>{" "}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl
                          disabled={form.formState.isSubmitting}
                          className="w-full"
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Group By" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {groupByList?.map((item, index) => (
                            <SelectItem key={index + item} value={item}>
                              {item[0].toUpperCase() + item.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl disabled={form.formState.isSubmitting}>
                        <Input type={"date"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl disabled={form.formState.isSubmitting}>
                        <Input type={"date"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="minAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Amount</FormLabel>
                      <FormControl disabled={form.formState.isSubmitting}>
                        <Input
                          type={"number"}
                          placeholder="Enter min amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <LoadingButton
                userClassName="mt-5"
                loadingState={form.formState.isSubmitting}
                text="Run Analytics"
                type="submit"
              />
            </div>
          </form>
        </Form>
      </div>
      <Separator />

      <div className="border rounded-lg mt-5">
        <Table>
          <TableCaption>A list of your Analytics Summary.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>SR No</TableHead>
              <TableHead>Group Name</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Total Transactions</TableHead>
              <TableHead className="text-right">Average Sale</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analyticsDataList.length > 0 ? (
              analyticsDataList.map((listItem, index) => (
                <TableRow key={listItem.groupName}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{listItem.groupName}</TableCell>
                  <TableCell>
                    {parseFloat(listItem.totalSales).toFixed(3)}
                  </TableCell>
                  <TableCell>{listItem.totalTransactions}</TableCell>
                  <TableCell className="text-right">
                    {parseFloat(listItem.averageSale).toFixed(3)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className={"font-medium text-muted-foreground"}>
                  No Analytics Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AnalyticsSummaryPage;
