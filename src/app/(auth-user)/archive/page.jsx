"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ArchiveSidebar } from "@/components/sidebar/archive-sidebar";
import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getTheses } from "@/lib/server/scholar-commons";
import { getThesesWithDepartments} from "@/lib/server/scholar-commons";

export default function Archives() {
  const [departments, setSelectedItems] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPages] = useState(0);

  useEffect(() => {
    //fetch archived projects from db with applied filters
    const fetchFilteredArchives = async () => {
      console.log(departments);
      var results;
      if (departments.length === 0) {
        results = await getTheses(5);
      } else {
        results = await getThesesWithDepartments(departments, 5);
      }
      setFilteredRows(results);
    };
    fetchFilteredArchives();
  }, [departments, page]);

  if(filteredRows.length === 0){
    return <p>Loading..</p>
  }


  return (
    <div className="px-8 m-9">
      <div className="flex flex-row">
        <div>
          <SidebarProvider className="pr-8">
            <ArchiveSidebar
              departments={departments}
              setSelectedItems={setSelectedItems}
            />
          </SidebarProvider>
        </div>

        <div>
          <h1 className="pb-6 text-3xl font-black">Project Archive</h1>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {filteredRows.map((row) => (
                  <TableRow
                    key={row.context_key}
                    sx={{ "&:last-child td, &last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" colSpan={4}>
                      <div className="flex flex-col p-4 rounded-lg space-y2">
                        <a
                          href={`/archive/${row.context_key}`}
                          className="text-xl font-bold underline text-[#b30738]"
                        >
                          {row.title}
                        </a>
                        <div>
                          {row.abstract.length > 280 ? (
                            <>
                              {row.abstract.slice(0, 280)}...
                              <a
                                href={`/archive/${row.id}`}
                                className="underline text-[#b30738]"
                              >
                                Read more
                              </a>
                            </>
                          ) : (
                            row.abstract
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="mt-2">
        <Pagination className="content-center">
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                disabled={page === 0}
                className={page === 0 ? "cursor-not-allowed" : ""}
                onClick={() => {
                  setPage((prev) => Math.max(prev - 5, 0));
                }}
              />
            </PaginationItem>
            {[...Array(maxPages).keys()].map((i) => (
              <PaginationItem className="cursor-pointer" key={i}>
                <PaginationLink
                  className={page === i * 5 ? "font-bold" : ""}
                  onClick={() => {
                    setPage(i * 5);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem className="cursor-pointer">
              <PaginationNext
                disabled={maxPages <= Math.ceil((page + 5) / 5)}
                className={
                  maxPages <= Math.ceil((page + 5) / 5)
                    ? "cursor-not-allowed"
                    : ""
                }
                onClick={() => {
                  if (maxPages > Math.ceil((page + 5) / 5)) {
                    setPage((prev) => prev + 5);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
