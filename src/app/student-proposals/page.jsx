import React from "react";
import { getSortedPostsData } from "@/lib/posts";

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

export default async function Student() {
  // just get the data from file. await if needed
  const allPostsData = getSortedPostsData();
  return <h1>Student Proposals Page</h1>;
}
