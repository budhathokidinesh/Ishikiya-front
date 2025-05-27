"use client";

import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";

export function DateRangePicker({
  className,
  onChange,
  initialStartDate = new Date(new Date().setMonth(new Date().getMonth() - 1)),
  initialEndDate = new Date(),
}) {
  const [date, setDate] = React.useState({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date.startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.startDate ? (
              date.endDate ? (
                <>
                  {format(date.startDate, "MMM dd, yyyy")} -{" "}
                  {format(date.endDate, "MMM dd, yyyy")}
                </>
              ) : (
                format(date.startDate, "MMM dd, yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              if (item.selection.startDate && item.selection.endDate) {
                const newRange = {
                  startDate: item.selection.startDate,
                  endDate: item.selection.endDate,
                };
                setDate(newRange);
                if (onChange) onChange(newRange);
              }
            }}
            moveRangeOnFirstSelection={false}
            ranges={[
              {
                startDate: date.startDate,
                endDate: date.endDate,
                key: "selection",
              },
            ]}
            className="border-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
