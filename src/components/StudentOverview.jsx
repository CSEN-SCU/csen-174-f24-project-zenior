"use client"

import styles from "@/styles/StudentOverview.module.css";
import { useState } from "react"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox"; 
import { Card } from "@/components/ui/card"; 

// project dashboard fields 
const StudentOverview = ({ user }) => {
    const [project, setProject] = useState({
        title: "", 
        description: "", 
        members: [], 
        advisor: null, 
   //     progress: 0
    }); 

    const handleInputChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value}); 
    }; 

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className="p-6 text-center">
                    {!user.isProjectMember ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">You are not a project member yet.</h2>
                            <div className="flex justify-around mb-8">
                                <div className="flex flex-col items-center">
                                    <p className="mb-2">Already have a group formed?</p>
                                    <Button variant="custom">Fill out Project Form</Button>
                                </div>

                                <div className="flex flex-col items-center">
                                    <p className="mb-2">Have a project idea?</p>
                                    <Button variant="custom">Post a Project Proposal</Button>
                                </div>
                            </div>

                            <div>
                                <p className="mb-4">No project ideas yet? No problem!</p>
                                <div className={styles.buttonGrid}>
                                    <Button variant="custom">
                                        Explore Student Project Proposals
                                    </Button>
                                    <Button variant="custom">
                                        Explore Past Projects
                                    </Button>
                                    <Button variant="custom">
                                        Explore Faculty Advisor Project Proposals
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                        <h2 className="text-3xl font-bold mb-4">Project Title:</h2>
                        <Input
                            name="title"
                            placeholder="Title Here"
                            value={project.title}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border border-gray-300 rounded"
                        />
                    
                        <h2 className="text-3xl font-bold mb-4">Project Description:</h2>
                        <textarea
                            name="description"
                            placeholder="Enter project description here..."
                            value={project.description}
                            onChange={handleInputChange}
                            className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
                        />
                    
                        <h2 className="text-3xl font-bold mb-4">Team Members:</h2>
                        <div className="mb-4">
                            {project.members.length ? (
                                project.members.map((member, index) => (
                                    <span key={index} className="text-lg mr-2">
                                        {member}
                                    </span>
                                ))
                            ) : (
                                <span className="text-lg">No team members yet</span>
                            )}
                        </div>
                    
                        <div className="flex items-center mb-4">
                            <label className="text-lg mr-4">Do you want additional team member(s)?</label>
                            <label className="mr-2">
                                <input
                                    type="radio"
                                    name="additionalMembers"
                                    value="yes"
                                    onChange={handleInputChange}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="additionalMembers"
                                    value="no"
                                    onChange={handleInputChange}
                                />
                                No
                            </label>
                        </div>
                    
                        <div className="mb-4">
                            <label className="block text-lg">What skill sets should the additional team member(s) have?</label>
                            <Input
                                name="skills"
                                placeholder="Enter skill sets"
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                            />
                            <div className="flex gap-2">
                                <span className="bg-red-500 text-white p-1 rounded">PHP</span>
                                <span className="bg-red-500 text-white p-1 rounded">cPanel</span>
                            </div>
                        </div>
                    
                        <h2 className="text-3xl font-bold mb-4">Advisor(s):</h2>
                        <div className="flex items-center mb-4">
                            <span className="text-lg">{project.advisor || "No Advisor Yet"}</span>
                            <Button className="ml-4 bg-red-500 text-white">Find an Advisor</Button>
                        </div>
                    </div>
                    
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentOverview; 