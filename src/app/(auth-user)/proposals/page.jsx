//import React from "react";
//import { projects } from "@/lib/server/actions";
//import Projects from "@/components/Projects";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
//import { DataTable } from "./[proposalID]/data-table";
//import { columns } from "./columns"
//import { data } from "./columns"
import{Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"

/*
export default async function Proposals() {
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

function createData(title, description, members, advisor) {
  return {title, description, members, advisor };
}

/*
function createMembers(name, email, department) {
  return {name, email, department};
}*/


const rows = [
  createData(
    "AI in Healthcare",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    [
      { name: "Vani Aggarwal", email: "vani@scu.edu", department: "Computer Science and Engineering" },
      { name: "Vladimir Ceban", email: "vladimir@scu.edu", department: "Data Science" }
    ],
    "Ahmed Amer",
  ),
  createData(
    "Milk Guard",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    [],
    "Prashanth Asur",
  ),
  createData(
    "Embedded Systems",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    [{ name: "Jason Cisneros", email: "jcisneros@scu.edu", department: "Computer Science and Engineering" }],
    "None",
  ),
  createData(
    "A Fourth Project",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    [{ name: "Mia Lassiter", email: "mlassiter@scu.edu", department: "Web Design and Engineering" }],
    "Silvia Figuiera",
  ),
]

export default async function Proposals() {
  return(
    <div>

      <div className="flex flex-row p-12 m-9">
      <div>
        <SidebarProvider>
          <AppSidebar/>
          <div>
            <SidebarTrigger />
          </div>
        </SidebarProvider> 
      </div>

        <div>
        <TableContainer component = {Paper}>
          <Table>
            
            <TableHead>
              <TableRow>
                <TableCell>Project Title</TableCell>
                <TableCell>Project Description</TableCell>
                <TableCell>Project Members</TableCell>
                <TableCell>Project Advisor</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{'&:last-child td, &last-child th':{border:0}}}>
                  <TableCell align="left" colSpan={4}>
                    <div className="flex flex-col p-4 rounded-lg space-y2">
                      <div className="text-xl font-bold">{row.title}</div>
                      <div>
                        {
                          row.description.length > 225 ? (
                            <>
                              {row.description.slice(0,225)}...
                              <a href={`/proposals/${row.id}`} className="textDecoration: 'underline' text-[#b30738]">Read more</a>
                            </>
                          ) : row.description
                        }
                      </div>
                      <div> Members:</div>
                      <ul className="space-y-1">
                        {row.members.map((member, index) => (
                          <li key={index}>
                            <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="text-[#b30738] underline decoration-solid text-xs">{member.name}</TooltipTrigger>
                                    <TooltipContent>
                                      <div>
                                        <ul>
                                          <li className="font-bold">{member.name}</li>
                                          <li>flast@scu.edu</li>
                                          <li>Computer Science and Engineering</li>
                                        </ul>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                          </li>           
                        ))}
                      </ul>
                      <div>Advisor: <span>{row.advisor}</span></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        
         </Table>
        </TableContainer>
        </div>
        </div>
      
        <div>
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
      </div>
      
    </div>
  )
}