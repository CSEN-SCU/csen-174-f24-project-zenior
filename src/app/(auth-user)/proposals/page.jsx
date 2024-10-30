import React from "react";
import { projects } from "@/lib/server/actions";
//import Projects from "@/components/Projects";
import PaginationControls from '@/components/PaginationControls'
import { AppSidebar } from "@/components/sidebar/app-sidebar";

/* 

const data = [
  'proposal 1',
  'proposal 2',
  'proposal 3',
  'proposal 4',
  'proposal 5',
  'proposal 6',
]

export default async function Student() {
  const allProjects = await projects.get();

  if (!projects || !projects.length) {
    return <h1>No projects found</h1>;
  } else {
    //return <Projects projects={allProjects} />;
    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);
    const proposals = data.slice(start, end);

    return(
      <div className = 'flex flex-col gap-2 items-center'>
        {proposals.map((proposal) => (
          <p key={proposal}>{proposal}</p>
        ))}

        <PaginationControls 
          hasNextPage = {end < data.length}
          hasPrevPage = {start > 0}
        />
      </div>
    )
  }
}
*/

export default async function Proposals() {
  <AppSidebar/>
}