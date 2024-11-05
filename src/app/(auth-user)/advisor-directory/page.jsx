import React from "react";
//import { faculty } from "@/lib/server/actions";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DirectorySidebar } from "@/components/sidebar/directory-sidebar";
//import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleUserRound } from "lucide-react";

//not sure where to put the ScrollArea tags 

/*Image Component will be used, too
<Image 
  src="/User/profilePictureURL"
  width={300}
/>
*/

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

  /*
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
} */

function createData(firstName, lastName, department, skills) {
  return {firstName, lastName, department, skills};
}

/* Will need to pull data from the db */
const rows = [
  createData(
    "Michael",
    "Abbott",
    "Mechanical Engineering",
    ["hydroinformatics"]
  ),
  createData(
    "Margareta",
    "Ackerman",
    "Computer Science and Engineering",
    ["human-centered generative AI", "computational creativity", "machine learning"]
  ),
  createData(
    "Ahmed",
    "Amer",
    "Computer Science and Engineering",
    ["data storage", "data processing", "data management"]
  ),
  createData(
    "Aria",
    "Amirbahman",
    "Civil, Environmental and Sustainable Engineering",
    ["hydraulics", "aquatic chemistry", "contaminant transport", "water treatment"]
  ),
  createData(
    "Ismail",
    "Araci",
    "Bioengineering",
    ["optics", "microfluidics", "biochemistry", "physical rehabilitation"]
  ),
  createData(
    "Prashanth",
    "Asuri",
    "Bioengineering",
    ["in vitro platforms", "in vivo phenomena", "tissue engineering", "healthcare innovation"]
  ),
  createData(
    "Darren",
    "Atkinson",
    "Computer Science and Engineering",
    ["digital libraries", "refactoring", "visualization"]
  ),
]

export default async function Directory() {

  return(
    <div className="px-8 m-9">

      <div className="flex flex-row">
      <div>
        <SidebarProvider className="pr-8">
          <DirectorySidebar/>
        </SidebarProvider> 
      </div>

        <div>
          <h1 className="font-black text-3xl pb-6">Faculty Advisor Directory</h1>
        <TableContainer component = {Paper}>
          <Table>          
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{'&:last-child td, &last-child th':{border:0}}}>
                  <TableCell align="left" colSpan={4}>
                    <div className="flex flex-col p-4 rounded-lg space-y2">
                      <div className="flex items-center">
                        <CircleUserRound size={50}/>
                        <h2 className="underline text-[#b30738] text-xl font-bold pl-2">{row.firstName} {row.lastName}</h2>
                      </div>
                      <br></br>
                      <p><span className="font-semibold">Department: </span>{row.department}</p>
                      <p><span className="font-semibold">Special interests: </span>{row.skills.join(", ")}</p>
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
