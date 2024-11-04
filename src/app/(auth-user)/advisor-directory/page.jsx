import React from "react";
import { faculty } from "@/lib/server/actions";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DirectorySidebar } from "@/components/sidebar/directory-sidebar";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default async function Page() {
  const allFaculty = await faculty.get();

  if (!allFaculty || !allFaculty.length) {
    return <h1>No faculty found</h1>;
  }

  /*

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
} */

function createData(firstName, lastName, department) {
  return {firstName, lastName, department};
}

/* Will need to pull data from the db */
const rows = [
  createData(
    "Michael",
    "Abbott",
    "Mechanical Engineering"
  ),
  createData(
    "Margareta",
    "Ackerman",
    "Computer Science and Engineering"
  ),
  createData(
    "Ahmed",
    "Amer",
    "Computer Science and Engineering"
  ),
  createData(
    "Aria",
    "Amirbahman",
    "Civil, Environmental and Sustainable Engineering"
  ),
  createData(
    "Ismail",
    "Araci",
    "Bioengineering"
  ),
  createData(
    "Prashanth",
    "Asuri",
    "Bioengineering"
  ),
  createData(
    "Darren",
    "Atkinson",
    "Computer Science and Engineering"
  ),
]

  return(
    <div className="px-8 m-9">

      <div className="flex flex-row">
      <div>
        <SidebarProvider>
          <DirectorySidebar/>
        </SidebarProvider> 
      </div>

        <div>
          <h1 className="font-black text-3xl pb-6">Project Proposals</h1>
        <TableContainer component = {Paper}>
          <Table>
            
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{'&:last-child td, &last-child th':{border:0}}}>
                  <TableCell align="left" colSpan={4}>
                    <div className="flex flex-col p-4 rounded-lg space-y2">
                      <h2 className="underline text-[#b30738] text-xl font-bold">{row.firstName} {row.lastName}</h2>
                      <br></br>
                      <p>{row.department}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        
         </Table>
        </TableContainer>
        </div>
        </div>
      
    </div>
  )
}
