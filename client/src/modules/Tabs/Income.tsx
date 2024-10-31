"use client";

import React, { useState } from "react";
import DataTable from "@/components/DataTable";
import { type TimelineData } from "@/validation/timeline.validation";
import { formatEntryValue } from "@/utils/formatEntryValue";
import useTimeline from "@/hooks/useTimeline";
import { income_column } from "@/constants/datatable";

export default function Income() {
  const [currentView, setCurrentView] = useState<number>(0);
  const { timelineData } = useTimeline();

  return (
    <div className="grid md:grid-cols-3">
      <DataTable<TimelineData>
        data={timelineData}
        columns={income_column}
        className="col-span-2 max-h-[50vh] md:max-h-[80vh]"
        onRowClick={(index) => setCurrentView(index)}
      />
      <div className="p-4 text-gray-500">
        {timelineData[currentView] &&
          Object.entries(timelineData[currentView]).map(([key, value]) => (
            <div key={key} className="mb-2">
              <span className="font-semibold">{key}</span>:{" "}
              {formatEntryValue(value)}
            </div>
          ))}
      </div>
    </div>
  );
}
