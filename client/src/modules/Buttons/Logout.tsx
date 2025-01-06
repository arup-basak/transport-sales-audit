"use client";

import React from "react";
import { motion } from "motion/react";
import { LogOutIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  icon?: boolean;
  className?: string;
}

const Logout = ({ icon = false, className }: Props) => {
  const { logout } = useAuth();
  return (
    <motion.button
      onClick={logout}
      className={twMerge(
        "text-sm text-red-600 hover:text-red-700 flex items-center gap-3 p-3",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <LogOutIcon className="w-5 h-5" />}
      Logout
    </motion.button>
  );
};

export default Logout;
