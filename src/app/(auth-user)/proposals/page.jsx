import React from "react";
//import { projects } from "@/lib/server/actions";
//import Projects from "@/components/Projects";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"

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
  return(
    <main>
      <SidebarProvider>
        <AppSidebar/>
        <div>
          <SidebarTrigger />
        </div>
      </SidebarProvider> 

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis/>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>    
    </main>
  )
}