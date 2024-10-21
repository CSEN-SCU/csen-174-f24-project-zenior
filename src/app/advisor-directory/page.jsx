import React from "react";
import { faculty } from "@/lib/server/actions";
import Link from "next/link";

export default async function Page() {
  const allFaculty = await faculty.get();

  if (!allFaculty || !allFaculty.length) {
    return <h1>No faculty found</h1>;
  }

  return (
    <ul>
      {allFaculty.map((faculty) => (
        <li key={faculty.id}>
          <h2>
            {faculty.firstName} {faculty.lastName}
          </h2>
          <p>{faculty.user.email}</p>
          <Link href={`/advisor-directory/${faculty.id}`}>View</Link>
        </li>
      ))}
    </ul>
  );
}
