import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AVATAR_COLORS = [
  "#6366f1",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#10b981",
];

export const getColor = (name: string) => {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
};

export const getLicenseBadge = (license: string) => {
  if (license.startsWith("Free")) {
    return { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Free" };
  }
  if (license.startsWith("Freemium")) {
    return { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Freemium" };
  }
  if (license.startsWith("Pay once")) {
    return { bg: "bg-orange-500/20", text: "text-orange-400", label: "Pay Once" };
  }
  return { bg: "bg-red-500/20", text: "text-red-400", label: "Paid" };
};
