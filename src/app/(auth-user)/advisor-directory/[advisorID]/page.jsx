import PropTypes from "prop-types";
import { faculty } from "@/lib/server/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function AdvisorDetails({ params }) {
  const urlParams = await params;
  const advisorID = urlParams.advisorID;
  const advisors = await faculty.get({ id: advisorID });
  const advisor = advisors[0];

  if (!advisor) {
    return <h1>No faculty with id {advisorID} was found</h1>;
  }

  return (
    <div className="my-2 p-6 bg-gray-50 border-2 border-gray-200 rounded-md w-[640px]">
      <Link
        className="text-[#b30738] underline cursor-pointer block mb-4"
        href="/advisor-directory"
      >
        Back to directory
      </Link>
      <div className="flex place-items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={advisor.user.profilePictureUrl}
            alt={`${advisor.firstName} ${advisor.lastName}`}
          />
          <AvatarFallback>
            <Image
              src={
                advisor.user.profilePictureUrl || "/images/default-avatar.png"
              }
              width={80}
              height={80}
              alt={`${advisor.firstName} ${advisor.lastName}`}
            />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold ml-4">
          {advisor.firstName} {advisor.lastName}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="custom">
              Request as Advisor
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className = "w-56">
              <DropdownMenuLabel>
                Which project proposal would you like to pitch to this faculty member?
              </DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuRadioGroup >
                <DropdownMenuRadioItem>
                  Project 1
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem>
                  Project 2
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-gray-600">{advisor.email}</p>
      </div>
      <h2 className="mt-4 text-xl font-semibold">Department</h2>
      <p className="text-gray-600 capitalize">{advisor.department}</p>
      <h2 className="mt-4 text-xl font-semibold">Bio</h2>
      <p className="mt-2 p-4 bg-white border rounded-lg">
        {advisor.bio || "No bio available"}
      </p>
      <h2 className="mt-4 text-xl font-semibold">Research Interests</h2>
      <p className="text-gray-600">{advisor.researchInterests}</p>
      <h2 className="mt-4 text-xl font-semibold">Expertise Areas</h2>
      <p className="text-gray-600">{advisor.expertiseAreas}</p>
      <h2 className="mt-4 text-xl font-semibold">Advised Projects</h2>
      {advisor.advisedProjects.map((project) => (
        <div key={project.id} className="mt-2 p-4 bg-white border rounded-lg">
          <h3 className="font-bold">{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
      <h2 className="mt-4 text-xl font-semibold">Co-Advised Projects</h2>
      {advisor.coAdvisedProjects.map((project) => (
        <div key={project.id} className="mt-2 p-4 bg-white border rounded-lg">
          <h3 className="font-bold">{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
      <h2 className="mt-4 text-xl font-semibold">Skills</h2>
      <ul className="list-disc list-inside">
        {advisor.skills.map((skill) => (
          <li key={skill.skillId} className="text-gray-600">
            {skill.skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

AdvisorDetails.propTypes = {
  params: PropTypes.object.isRequired,
};
