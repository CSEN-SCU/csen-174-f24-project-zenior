"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

const Checklist = () => {
    // checklist items
    const [items, setItems] = React.useState([
        { label: "Project Title Approved?", checked: false}, 
        { label: "Project Description Approved?", checked: false }, 
        { label: "Team Members Finalized?", checked: false }, 
        { label: "Advisor Secured?", checked: false},
    ])

    // calculate progress
    const completedCount = items.filter((item) => item.checked).length
    const progress = (completedCount / items.length) * 100

    // toggle between unchecked and checked
    const handleToggle = (index) => {
        const updatedItems = [ ...items]
        updatedItems[index].checked = !updatedItems[index].checked
        setItems(updatedItems)
    }

    return (
        <div className="border-solid border-4 bg-gray-40 border-spacing-10 max-w-xs p-6 m-6">
            <h1 className="text-lg font-bold"> Progress </h1>
            <div className="mt-2"> 
                {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                            checked = {item.checked}
                            onCheckedChange={() => handleToggle(index)}
                            id = {`checkbox-${index}`}
                        />
                        <label htmlFor={`checkbox-${index}`} className="text-sm">
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Progress value={progress} className="w-full h-4" />
                <span className="text-sm">{progress.toFixed(0)}%</span>
            </div>
        </div>
    )
}

export { Checklist }