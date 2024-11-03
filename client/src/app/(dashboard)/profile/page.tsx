"use client";

import React from "react";
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Skeleton from "@/components/Skeleton";
import { format } from "date-fns";

const Page = () => {
  const { getUser } = useAuth();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const profileInfo = user
    ? [
        { Icon: User, text: user.name },
        { Icon: Mail, text: user.email },
        { Icon: Phone, text: "+91 (555) 789-0123" },
        { Icon: MapPin, text: "Chicago, IL" },
        { Icon: Briefcase, text: "Speedy Logistics Inc." },
        {
          Icon: Calendar,
          text: `JOINED ${format(new Date(user.createdAt), "MMM dd yyyy")}`,
        },
      ]
    : [];

  const skills = [
    "Fleet Management",
    "Sales Auditing",
    "Logistics",
    "Supply Chain",
  ];

  if (isLoading) {
    return (
      <main className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 dark:bg-gray-700 p-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 dark:bg-gray-700 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
          <p className="text-gray-300">{user?.role}</p>
        </div>
        <div className="p-6">
          {profileInfo.map(({ Icon, text }, index) => (
            <div key={index} className="flex items-center mb-4">
              <Icon className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
              <span className="dark:text-gray-300">{text}</span>
            </div>
          ))}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 dark:text-gray-200">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
