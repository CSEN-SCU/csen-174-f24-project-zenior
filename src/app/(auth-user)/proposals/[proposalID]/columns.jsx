"use client"
//import React from "react";
//import { columnDef } from "@tanstack/react-table"

export const columns = [
    {
        accessorKey: "id",
        header: "Project ID",
    },
    {
        accessorKey: "title",
        header: "Project Title",
    },
    {
        accessorKey: "description",
        header: "Project Description",
    },
    {
        accessorKey: "members",
        header: "Project Members",
    },
    {
        accessorKey: "advisor",
        header: "Project Advisor",
    },
]

/*
export default function ListView ({ id, title, description, academicYear, department, 
    isInterdisciplinary, status, groupOpen, advisorId, coAdvisorId, advisor, coAdvisor, 
    members
}) {
    return(
        <div>
            <h2>{title}</h2>
        </div>
    )
}
*/