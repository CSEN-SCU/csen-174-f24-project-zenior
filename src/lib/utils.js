import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getRole = (email) => {
  const superAdminEmails = []; 
  const adminEmails = ["vceban@scu.edu", "jcisneros@scu.edu"];
  const facultyEmails = [];

  if (superAdminEmails.includes(email)) {
    return "super_admin";
  }

  if (adminEmails.includes(email)) {
    return "admin";
  }

  if (facultyEmails.includes(email)) {
    return "faculty";
  }

  return "student";
};
