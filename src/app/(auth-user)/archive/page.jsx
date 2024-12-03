"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ArchiveSidebar } from "@/components/sidebar/archive-sidebar";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";

import * as React from "react";
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

import { getThesesWithKeywordFilters } from "@/lib/server/scholar-commons";

export default function Archives() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  React.useEffect(() => {
    //fetch archived projects from db with applied filters
    const fetchFilteredArchives = async () => {
      console.log(selectedItems);

      const results = await getThesesWithKeywordFilters(selectedItems, 5);
      setFilteredRows(results);
    };
    fetchFilteredArchives();
  }, [selectedItems, page]);


  return (
    <div className="px-8 m-9">
      <div className="flex flex-row">
        <div>
          <SidebarProvider className="pr-8">
            <ArchiveSidebar
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </SidebarProvider>
        </div>

        <div>
          <h1 className="font-black text-3xl pb-6">Project Archive</h1>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {filteredRows.map((row) => (
                  <TableRow
                    key={row.title}
                    sx={{ "&:last-child td, &last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" colSpan={4}>
                      <div className="flex flex-col p-4 rounded-lg space-y2">
                        <a
                          href={`/archives/${row.id}`}
                          className="underline text-[#b30738] text-xl font-bold"
                        >
                          {row.title}
                        </a>
                        <div>
                          {
                          row ?   (
                          <h1 className="font-black text-3xl pb-6">No Projects</h1>
                        ) :
                        (
                          row.description?.length > 280 ? (
                            <>
                              {row.abstract.slice(0, 280)}...
                              <a
                                href={`/archives/${row.id}`}
                                className="underline text-[#b30738]"
                              >
                                Read more
                              </a>
                            </>
                          ) : (
                            row.description
                          )
                        )
                        }
                        </div>
                        <br></br>
                        <div>
                          {row.advisor ? (
                            <>
                              <span className="font-semibold">Advisor</span>:{" "}
                              <span>
                                {row.advisor.firstName} {row.advisor.lastName}
                              </span>
                            </>
                          ) : (
                            <span className="font-semibold">No Advisor</span>
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
