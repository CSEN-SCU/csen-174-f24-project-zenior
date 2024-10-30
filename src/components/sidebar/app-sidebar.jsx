"use client"
//import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useState } from "react";

//grouped filters 
const categories = [
    {
        category: "Department", 
        options: [
            {id: 1, label: "Bioengineering"},
            {id: 2, label: "Civil, Environmental and Sustainable Engineering"},
            {id: 3, label: "Computer Science and Engineering"},
            {id: 4, label: "Electrical and Computer Engineering"},
            {id: 5, label: "General Engineering"},
            {id: 6, label: "Mechanical Engineering"},
        ],
    },
    {
        category: "Interdisciplinary?",
        options: [
            {id: 7, label: "Yes"},
            {id: 8, label: "No"},
        ],
    },
    {
        category: "Openings for additional members?",
        options: [
            {id: 9, label: "Yes"},
            {id: 10, label: "No"},
        ],
    },
    {
        category: "Has an advisor already?",
        options: [
            {id: 11, label: "Yes"},
            {id: 12, label: "No"},
        ],
    },
];

export function AppSidebar() {
    /*state initialization: 
    initialize selectedItems as an empty array which will store the IDs of selection options
    setSelectedItems updates selectedItems array */
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) =>
            //if id is unchecked, add it to the array
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return(
        <Sidebar>
            <SidebarContent>
                <div className = "p-4">
                    <h2 className = "font-semibold text-lg mb-4">Filter</h2>
                    {categories.map((category) => (
                        <div key={category.category} className = "mb-6">
                            <h3 className = "font-medium text-md mb-2">{category.category}</h3>
                            <ul>
                                {category.options.map((option) => (
                                    <li key={option.id} className="flex items-center mb-2">
                                        <input
                                            type = "checkbox"
                                            id = {`checkbox-${option.id}`}
                                            checked = {selectedItems.includes(option.id)}
                                            className = "mr-2"
                                        />
                                        <label htmlFor = {`checkbox-${option.id}`}>
                                            {option.label}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            </div>
                    ))}
                </div>
            </SidebarContent>
        </Sidebar>
    )
}