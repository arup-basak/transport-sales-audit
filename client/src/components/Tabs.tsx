"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: number;
  className?: string;
}

export default function Tabs({
  tabs,
  defaultTab = 0,
  className,
}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (!tabs || tabs.length === 0) {
    return <div>No tabs provided</div>;
  }

  return (
    <>
      <nav className={twMerge("flex space-x-8", className)} aria-label="Tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={twMerge(
              "whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium transition-colors duration-200",
              activeTab === index
                ? "border-blue-500 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
            )}
            aria-selected={activeTab === index}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="mt-4" role="tabpanel">
        {tabs[activeTab].content}
      </div>
    </>
  );
}
