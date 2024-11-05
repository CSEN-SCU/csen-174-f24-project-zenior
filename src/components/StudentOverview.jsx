"use client";

import styles from "@/styles/StudentOverview.module.css";
import { useState } from "react"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 

/* UI component for group request: need to at attach to database */
const GroupRequest = ({ grouprequests }) => {
    return (
        <div className={styles.groupRequestContainer}>
            <h2 className="text-xl font-semibold mb-4">Group Request</h2>
            {grouprequests.length > 0 ? (
                <>
                    <p className="mb-4">You have asked to join the following group(s):</p>
                    {grouprequests.map((request, index) => (
                        <div
                            key={index}
                            className={
                                request.status === "approved"
                                    ? styles.groupBoxApproved
                                    : request.status === "pending"
                                    ? styles.groupBoxPending
                                    : styles.groupBoxDenied
                            }
                        >
                            <div className="flex justify-between items-center">
                                <span>{request.name}</span>
                                <span
                                    className={`font-bold ${
                                        request.status === "approved"
                                            ? "text-green-600"
                                            : request.status === "pending"
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {request.status === "approved"
                                        ? "approved ✓"
                                        : request.status === "pending"
                                        ? "pending ⌛"
                                        : "denied ❌ "}
                                </span>
                            </div>
                            <div className="flex justify-end gap-4 mt-2">
                                {request.status === "approved" && (
                                    <>
                                        <Button variant="custom" className="text-white">Accept Request</Button>
                                        <Button variant="custom" className="text-white">Reject Request</Button>
                                    </>
                                )}
                                {request.status === "pending" && (
                                    <Button variant="custom" className="text-white">Withdraw Request</Button>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <p className="text-center bold text-black-700">No Requests</p>
            )}
        </div>
    );
};

// UI component for team member requests
const TeamRequest = ({ teamrequests, handleAccept, handleReject }) => {
    return (
        <div className={styles.teamRequestContainer}>
            <h2 className="text-xl font-semibold mb-4">Team Member Requests</h2>
            {teamrequests.length > 0 ? (
                teamrequests.map((request, index) => (
                    <div key={index} className={styles.requestCard}>
                        <div className="flex items-center">
                            <Avatar className="w-10 h-10">
                                <AvatarImage
                                    src={"/images/default-avatar.png"}
                                    alt="Profile"
                                />
                                <AvatarFallback>Profile Picture</AvatarFallback>
                            </Avatar>
                            <div className={styles.requestInfo}>
                                <h3 className="text-lg font-semibold text-red-700">{request.name}</h3>
                                <p className="text-black-600">
                                    {request.major.join(", ")}
                                </p>
                            </div>
                            <div className="gap-5">
                                <p className="text-white">....... </p> {/* some other way to get spacing must happen */}
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded"
                                >
                                    ✓
                                </button>
                                <button
                                    onClick={() => handleReject(request.id)}
                                    className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded"
                                >
                                    ✗
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-black-500">No team member requests</p>
            )}
        </div>
    );
};

// project dashboard fields 
const StudentOverview = ({ user }) => {
    const [project, setProject] = useState({
        title: "", 
        description: "", 
        members: [], 
        advisor: null, 
    }); 

    const [teamRequests] = useState([
        {id: 1, name: "name1", major:["COEN"]}, // connect to database; placeholder for now
    ]); 

    const [groupRequests] = useState([
        // insert data for group requests here aka database connection
        {name: "project 1", status: "approved"} // placeholder!
    ]); 

    // handle accept/reject
    const handleAccept = (id) => {
        console.log("Accepted request ID:", id); 
        // routing here? aka logic
    }; 

    const handleReject = (id) => {
        console.log("Rejection request ID:", id); 
        // routing here? aka logic 
    }

    const handleInputChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value}); 
    }; 

    const [skillInput, setSkillInput] = useState(""); 
    const [skills, setSkills] = useState([]); 

    const handleSkillInputChange = (e) => {
        setSkillInput(e.target.value); // fix to update skillInput state
    }; 

    // add the skill to the list when "Enter" is pressed
    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter" && skillInput.trim() !== "") {
            e.preventDefault(); // prevent form submission
            setSkills([...skills, skillInput.trim()]);
            setSkillInput(""); // clear the input after adding
        }
    };

    // remove a skill with the 'x'
    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    return (
        <div className={styles.container}>
            <GroupRequest grouprequests={groupRequests} /> {/*database!*/}
            <TeamRequest teamrequests={teamRequests} handleAccept={handleAccept} handleReject={handleReject}/>
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
                                    <Button variant="custom">Explore Student Project Proposals</Button>
                                    <Button variant="custom">Explore Past Projects</Button>
                                    <Button variant="custom">Explore Faculty Advisor Project Proposals</Button>
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
                                    value={skillInput}
                                    onChange={handleSkillInputChange}
                                    onKeyDown={handleSkillKeyDown}
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                />

                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <div key={index} className="bg-red-500 text-white p-1 rounded flex items-center">
                                            {skill}
                                            <span
                                                onClick={() => handleRemoveSkill(skill)}
                                                className="ml-2 cursor-pointer"
                                            >
                                                x
                                            </span>
                                        </div>
                                    ))}
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
