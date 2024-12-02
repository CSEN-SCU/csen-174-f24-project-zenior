"use client"
import { useState } from "react";

const AdvisorRequests = () => {
    const projects = [
        {
            id: 1,
            title: "Privacy-Preserving Fingerprinting of IoT Devices in WiFi Networks",
            overview: "Identifying and fingerprinting devices within networks is a crucial step for network security. We propose and implement a novel machine learning-based solution that passively fingerprints devices while maintaining user privacy.",
            members: "Ethan Shenassa, Michael Castillo",
        },
        {
            id: 2,
            title: "IoTsolate: Network Microsegmentation for Managing and Securing IoT Devices",
            overview: "IoTsolate uses virtual local area network (VLAN) micro-segmentation to identify,isolate, and neutralize security risks in IoT devices. These devices have limited processing capabilities, diverse designs, and long lifespans, so they lack adequate shielding from attacks. IoTsolate prevents compromised devices from communicating with others, protecting unaffected devices on the network.",
            members: "Anagha Nair, Chloe Morali",
        },
        {
            id: 3,
            title: "Ultra Low-power, High-Performance Presence Detection System",
            overview: "A presence detection system using an accelerometer and T-MOS technology to operate as both a low-power wake-up system for older, resource-intensive security systems and a stand-alone motion-detecting security system.",
            members: "Dante Bajarias, Christian Medal, Jashan Kaeley",
        },
        {
            id: 4,
            title: "Edge-Connected Microcontroller Security",
            overview: "With a wide range of applications and the rise of cyberattacks, securing MCUs has become imperative; however, ensuring MCU performance is also crucial given how interconnected today’s systems are. This project examines the security and performance of next-generation microcontroller units (MCUs) leveraging new security solutions for IoT edge applications. By benchmarking these MCUs against key performance metrics, their viability will be assessed to facilitate the widespread adoption of this new firmware.",
            members: "Gavin Ryder, Neena Ekanathan, Divya Syal",
        },
        {
            id: 5,
            title: "E-Scooter Black Box",
            overview: "Our project is a black box system that is able to record and analyze e-scooter riding data for the purpose of detecting misuse and rough handling of e-scooters in order to improve the cost-effectiveness and appeal of ride-sharing services.",
            members: "Raghav Batra, Joshua Jerome, Mubashir Hussain, Soham Phadke, Suvass Ravala",
        },
    ]
    const [activeTabs, setActiveTabs] = useState(
        projects.map(() => "overview")
    );

    const handleTabClick = (index, tab) => {
        const updatedTabs = [...activeTabs];
        updatedTabs[index] = tab;
        setActiveTabs(updatedTabs);
    }

    return(
    <section className="px-8 m-9">
        <h1 className="text-2xl pb-2 font-bold">The following Senior Design teams have requested you as a faculty advisor.</h1>
        <h2 className="text-xl pb-2 font-bold">Read the project overview, then click the Manage tab to accept or deny the request.</h2>
        <br></br>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2"> 
            {projects.map((project, index) => (
                <div key={project.id} className="w-full bg-whitie border border-gray-200 rounded-lg shadow">
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50">
                        <li className="me-2">
                            <button
                                 id={`overview-tab-${project.id}`}
                                 type="button" role="tab" aria-controls={`overview-${project.id}`}
                                 aria-selected = {activeTabs[index] === "overview"}
                                 className={`inline-block p-4 hover:bg-gray-100 ${activeTabs[index] === "overview" ? "text-gray-900 border-b-2 border-gray-900" : ""}`}
                                 onClick={() => handleTabClick(index, "overview")}
                            >
                                Project Overview
                            </button>
                        </li>
                        <li className="me-2">
                            <button
                                id={`manage-tab-${project.id}`} type="button" role="tab" aria-controls={`manage-${project.id}`}
                                aria-selected={activeTabs[index] === "manage"}
                                className={'inline-block p-4 hover:bg-gray-100 ${activeTabs[index] === "manage" ? "text-gray-900 border-b-2 border-gray-900" : ""}'}
                                onClick={() => handleTabClick(index, "manage")}
                            >
                                Manage
                            </button>
                        </li>
                    </ul>

                    {/* Tab Content */}
                    <div>
                        {activeTabs[index] === "overview" && (
                            <div className="p-4 bg-white rounded-lg md:p-8" id={`overview-${project.id}`} role="tabpanel">
                                <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
                                    {project.title}
                                </h2>
                                <p className="mb-3 text-gray-500">
                                    {project.overview}
                                </p>
                            </div>
                        )}
                        {activeTabs[index] === "manage" && (
                            <div className="p-4 bg-white rounded-lg md:p-8" id={`manage-${project.id}`} role="tabpanel">
                                <h3 className="font-bold"> Manage Project: <br></br>{project.title}</h3>
                                <br></br>
                                <h3>Project Members:</h3>
                                <p>{project.members}</p>
                                <button type="submit" className="bg-[#07B31B] text-white cursor-pointer py-2 px-4 m-4">
                                    Advise this Project
                                </button>
                                <button type="submit" className="bg-[#b30738] text-white cursor-pointer py-2 px-4 m-4">
                                    Do NOT Advise this Project
                                </button>
                                
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </section>
    )
};

export { AdvisorRequests };