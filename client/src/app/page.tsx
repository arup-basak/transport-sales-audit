import React from "react";
import Tabs, { Tab } from "@/components/Tabs";
import Others from "@/modules/Tabs/Others";
import Tax from "@/modules/Tabs/Tax";
import Expense from "@/modules/Tabs/Expense";
import Income from "@/modules/Tabs/Income";

const tabsData: Tab[] = [
  {
    label: "Income",
    content: <Income />,
  },
  {
    label: "Expense",
    content: <Expense />,
  },
  {
    label: "Tax",
    content: <Tax />,
  },
  {
    label: "Others",
    content: <Others />,
  },
];

const Home = () => {
  return (
    <main>
      <Tabs tabs={tabsData} />
    </main>
  );
};

export default Home;
