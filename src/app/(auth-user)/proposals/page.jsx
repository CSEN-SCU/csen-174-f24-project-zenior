//import React from "react";
//import { projects } from "@/lib/server/actions";
//import Projects from "@/components/Projects";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
//import { DataTable } from "./[proposalID]/data-table";
//import { columns } from "./columns"
//import { data } from "./columns"

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

function createData(id, title, description, members, advisor) {
  return { id, title, description, members, advisor };
}

const rows = [
  createData(
    1,
    "AI in Healthcare",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ["Vani Aggarwal", "Vladimir Ceban"],
    "Ahmed Amer",
  ),
  createData(
    2,
    "Milk Guard",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "None",
    "Prashanth Asur",
  ),
  createData(
    3,
    "Embedded Systems",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "Jason Cisneros",
    "None",
  ),
  createData(
    4,
    "A Fourth Project",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Mia Lassiter",
    "Silvia Figuiera",
  ),
]

export default async function Proposals() {
  return(
    <div>

      <div className="flex flex-row m-6">
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
          <Table sx={{ minWidth: 650 }}>

            <TableHead>
              <TableRow>
                <TableCell>Project ID</TableCell>
                <TableCell>Project Title</TableCell>
                <TableCell>Project Description</TableCell>
                <TableCell>Project Members</TableCell>
                <TableCell>Project Advisor</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{'&:last-child td, &last-child th':{border:0}}}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell alight="right">{row.title}</TableCell>
                  <TableCell alight="right">{row.description}</TableCell>
                  <TableCell alight="right">{row.members}</TableCell>
                  <TableCell alight="right">{row.advisor}</TableCell>
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