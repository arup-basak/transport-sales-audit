"use client";

import React, { useState, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { formatEntryValue } from "@/utils/formatEntryValue";

type KeysOfType<T> = Extract<keyof T, string>;

export interface Column<T> {
  key: KeysOfType<T>;
  header: string;
  width?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  stickyHeader?: boolean;
  onRowClick?: (rowIndex: number) => void;
  isRowClickable?: (row: T) => boolean;
}

export default function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  className,
  stickyHeader = true,
  onRowClick,
  isRowClickable,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: KeysOfType<T>;
    direction: "asc" | "desc";
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const sortedData = React.useMemo(() => {
    const sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: KeysOfType<T>) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div
      ref={containerRef}
      className={twMerge("relative overflow-auto", className)}
    >
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ${
            stickyHeader ? "sticky top-0 z-10" : ""
          }`}
        >
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3"
                style={{ width: column.width }}
              >
                <button
                  onClick={() => requestSort(column.key)}
                  className="flex items-center w-full justify-between group"
                >
                  <span>{column.header}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {sortConfig?.key === column.key ? (
                      sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronUp className="h-4 w-4 text-gray-300" />
                    )}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedData.map((row, index) => {
            const clickable = isRowClickable ? isRowClickable(row) : true;
            return (
              <tr
                key={index}
                className={twMerge(
                  "bg-white dark:bg-gray-800",
                  clickable
                    ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                    : "cursor-not-allowed opacity-75"
                )}
                onClick={() => {
                  if (clickable && onRowClick) {
                    onRowClick(index);
                  }
                }}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {formatEntryValue(row[column.key])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
