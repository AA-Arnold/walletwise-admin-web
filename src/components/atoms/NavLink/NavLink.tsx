"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { useActivePath } from "@/lib/hooks/useActivePath";

interface NavLinkProps {
  label: string;
  link: string;
  index?: number;
  icon?: React.ReactElement;
}

const NavLink = ({ label, link, index = 0, icon }: NavLinkProps) => {
  const isActive = useActivePath(link);
  return (
    <Link href={link}>
      <motion.div
        className={`relative group w-full flex flex-col items-center justify-center py-2 px-2 text-gray-600 dark:text-gray-400 transition-all duration-300 ${
          isActive
            ? "border-r-2 border-purple-700 bg-gray-300 dark:bg-gray-900"
            : "hover:bg-gray-400 dark:hover:bg-gray-950"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 * index, ease: "easeOut" }}
      >
        {icon && icon}
        <span className="text-xs capitalize text-center">{label}</span>
      </motion.div>
    </Link>
  );
};

export default NavLink;
