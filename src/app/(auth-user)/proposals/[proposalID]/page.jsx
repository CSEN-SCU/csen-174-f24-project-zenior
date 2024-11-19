import PropTypes from "prop-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { projects } from "@/lib/server/actions";

export default async function ProposalDetails({ params }) {
  const currParams = await params;
  const proposals = await projects.get({ id: currParams.proposalID });
  if (!proposals) {
    return <div>Proposal not found</div>;
  }

  const {
    title,
    description,
    members,
    advisor,
    coAdvisor,
    department,
    skills,
  } = proposals[0];

  return (
    <div className="m-6 p-2">
      <div className="m-6 p-6 bg-slate-100">
        <h1 className="text-2xl pb-2 font-bold">{title}</h1>
        <div className="py-2">
          {/*
          <span className="font-semibold">Proposed by: </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-[#b30738] underline decoration-solid">
                Member Name
              </TooltipTrigger>
              <TooltipContent>
                <span className="block">
                  <ul>
                    <li className="font-bold">First Last</li>
                    <li>flast@scu.edu</li>
                    <li>Computer Science and Engineering</li>
                  </ul>
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <br></br>
          */}
          <span className="font-semibold">Project Members:</span>{" "}
          {members.length === 0 ? "None yet" : ""}
          {members.map((member) => (
            <span key={member.student.id}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-[#b30738] underline decoration-solid">
                    {member.student.firstName} {member.student.lastName}
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>
                      <ul>
                        <li className="font-bold">
                          {member.student.firstName} {member.student.lastName}
                        </li>
                        <li>
                          <span className="font-semibold">Major:</span>{" "}
                          {member.student.major}
                        </li>
                        <li>
                          <span className="font-semibold">Minor:</span>{" "}
                          {member.student.minor}
                        </li>
                        <li>
                          <span className="font-semibold">Email:</span>{" "}
                          <a
                            className="text-blue-500 underline"
                            href={`mailto:${member.student.user.email}`}
                          >
                            {member.student.user.email}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          ))}
          <br></br>
          <span className="font-semibold">Advisor:</span>{" "}
          {!advisor && !coAdvisor ? "None yet" : ""}
          {advisor && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-[#b30738] underline decoration-solid">
                  {advisor.firstName} {advisor.lastName}
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <ul>
                      <li className="font-bold">
                        {advisor.firstName} {advisor.lastName}
                      </li>
                      <li>
                        <span className="font-semibold">Department:</span>{" "}
                        {advisor.department}
                      </li>
                      <li>
                        <span className="font-semibold">Email:</span>{" "}
                        <a
                          className="text-blue-500 underline"
                          href={`mailto:${advisor.user.email}`}
                        >
                          {advisor.user.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}{" "}
          {coAdvisor && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-[#b30738] underline decoration-solid">
                  {coAdvisor.firstName} {coAdvisor.lastName}
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <ul>
                      <li className="font-bold">
                        {coAdvisor.firstName} {coAdvisor.lastName}
                      </li>
                      <li>
                        <span className="font-semibold">Email:</span>{" "}
                        <a
                          className="text-blue-500 underline"
                          href={`mailto:${coAdvisor.user.email}`}
                        >
                          {coAdvisor.user.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <br></br>
          <span className="font-semibold">Department:</span>{" "}
          {department ? department : "None yet"}
          <br></br>
        </div>
        <br></br>
        <h2 className="text-lg font-semibold">Description:</h2>
        <p>{description}</p>
        <br></br>
        <h3 className="font-semibold">Desired Skillsets</h3>
        <ul className="list-disc pl-8 pb-4">
          {skills.map((skill) => (
            <li key={skill.skill.id}>{skill.skill.name}</li>
          ))}
        </ul>
        <Button variant="custom" className="object-right">
          <span className="pr-2">Request to Join</span> <UserPlus size="20" />
        </Button>
      </div>
    </div>
  );
}

ProposalDetails.propTypes = {
  params: PropTypes.shape({
    proposalID: PropTypes.string.isRequired,
  }).isRequired,
};
