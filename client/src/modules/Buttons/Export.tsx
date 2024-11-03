"use client";

import React from "react";
import { Download } from "lucide-react";
import { useTimelineStore } from "@/store/timeline";
import Papa from "papaparse";
import type { TimelineData } from "@/validation/timeline.validation";

const Export = () => {
  const { timelines } = useTimelineStore();
  
  const handleExport = () => {
    const now = new Date();
    const timestamp = now.toISOString()
      .replace(/[-:]/g, '_')
      .replace(/\..+/, '')
      .replace('T', '_');

    const csv = Papa.unparse(timelines.map((timeline: TimelineData) => ({
      Date: new Date(String(timeline.date)).toDateString(),
      Actual: timeline.actual,
      Forecast: timeline.forecast,
      Value: timeline.value
    })));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `timeline_report_${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <button 
      onClick={handleExport}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
    >
      <Download size={16} />
      Export
    </button>
  );
};

export default Export;