"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
} from "@/components/ui/sidebar";

import {PropTypes} from 'prop-types'
import { Filter } from "lucide-react";

//grouped filters
const categories = [
  {
    category: "Department",
    type: "checkbox",
    options: [
      { id: "Bioengineering", label: "Bioengineering" },
      { id: 2, label: "Civil, Environmental and Sustainable Engineering" },
      { id: 3, label: "Computer Science and Engineering" },
      { id: 4, label: "Electrical and Computer Engineering" },
      { id: 5, label: "General Engineering" },
      { id: 6, label: "Mechanical Engineering" },
    ]
  }
];

ArchiveSidebar.propTypes = {
  selectedItems: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
};

export default function ArchiveSidebar({selectedItems, setSelectedItems}) {


  const handleCheckboxChange = (id) => {
    //if id is unchecked, add it to the array
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const resetFilters = () => {
    setSelectedItems([]);
  };

  return (
    <Sidebar variant="floating" collapsible="none">
      <SidebarHeader />
      <SidebarContent>
        <div className="p-4">
          <div className="flex flex-row items-center">
            <h2 className="font-semibold text-lg pr-4">Filter</h2>
            <Filter size="15" />
          </div>

          <button onClick={resetFilters} className="pb-4">
            <span className="text-xs underline text-[#b30738]">
              Reset Filters
            </span>
          </button>
          {categories.map((category) => (
            <SidebarGroup key={category.category} className="mb-6 p-1">
              <h3 className="font-medium text-sm mb-2">{category.category}</h3>
                <ul>
                  {category.options.map((option) => (
                    <li key={option.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`checkbox-${option.id}`}
                        checked={selectedItems.includes(option.id)}
                        onChange={() => handleCheckboxChange(option.id)}
                        className="mr-2"
                        style={{ accentColor: "#b30738" }}
                      />
                      <label
                        htmlFor={`checkbox-${option.id}`}
                        className="text-xs"
                      >
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
