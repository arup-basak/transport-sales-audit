"use client";

import React, { useState } from "react";
import DataTable from "@/components/DataTable";
import { type TimelineData } from "@/validation/timeline.validation";
import { formatEntryValue } from "@/utils/formatEntryValue";
import useTimeline from "@/hooks/useTimeline";
import { income_column } from "@/constants/datatable";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { twMerge } from "tailwind-merge";

export default function Income() {
  const [currentView, setCurrentView] = useState<number>(0);
  const { timelineData, isLoading, updateTimeline } = useTimeline();
  const [currentSliderView, setSliderView] = useState<number>(0);

  const handleUpdate = async () => {
    await updateTimeline({
      id: timelineData[currentView].id!,
      value: currentSliderView,
    });
  };

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3">
        <div className="col-span-2">
          <Skeleton className="w-full h-[50vh] md:h-[80vh]" />
        </div>
        <div className="p-4 space-y-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-full h-6" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3">
      <DataTable<TimelineData>
        data={timelineData}
        columns={income_column}
        className="col-span-2 max-h-[50vh] md:max-h-[80vh]"
        onRowClick={setCurrentView}
      />
      <div
        className={twMerge(
          "control p-4 text-gray-500 space-y-2",
          timelineData.length === 0 ? "hidden" : ""
        )}
      >
        {timelineData[currentView] ? (
          <>
            <div className="grid grid-cols-[5rem_1fr] gap-y-2">
              <span className="font-semibold">Date: </span>
              <p>{formatEntryValue(timelineData[currentView].date)}</p>
              <span className="font-semibold">Actual: </span>
              <p>{formatEntryValue(timelineData[currentView].actual)}</p>
              <span className="font-semibold">Forecast: </span>
              <p>{formatEntryValue(timelineData[currentView].forecast)}</p>
              <span className="font-semibold">Value: </span>
              <p>{formatEntryValue(timelineData[currentView].value)}</p>
            </div>
            <Slider
              onChange={setSliderView}
              value={timelineData[currentView].value}
              max={1000000}
              min={0}
            />
            <button className="bg-blue-500" onClick={handleUpdate}>
              Submit
            </button>
          </>
        ) : (
          <p className="text-gray-400 italic">Select a row to view details</p>
        )}
      </div>
    </div>
  );
}
