"use client";
import React, { useEffect } from "react";
import { getSortedPostsData } from "@/lib/posts";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";
//import styles from "./Pagination.modules.css";


// get statick props is not supported in app router
//
// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

/* export default async function Student() {
  // just get the data from file. await if needed
  const allPostsData = getSortedPostsData();
  return <h1>Student Proposals Page</h1>;
}
 */
export default function Student() {
  const[allPostsData, setAllPostsData] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const PageSize = 6;


useEffect(() => {
  async function fetchData() {
    const data = await getSortedPostsData();
    setAllPostsData(data);
  }
  fetchData();
}, []);

const onPageChange = (page) => {
  setCurrentPage(page);
};

const paginatedData = allPostsData.slice(
  (currentPage - 1) * PageSize, currentPage * PageSize
);

return (
  <div>
      {paginatedData.map((proposal) => (
        <p key={proposal.id}>{proposal.title}</p>
      )
      )}
      {/* pagination component to handle display and logic for navigating between pages*/}
      <Pagination 
        items = {allPostsData.length}
        currentPage = {currentPage}
        pageSize = {PageSize}
        onPageChange = {onPageChange}
      />
  </div>
);}