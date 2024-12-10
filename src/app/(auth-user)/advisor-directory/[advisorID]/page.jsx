import PropTypes from "prop-types";
import { faculty, user } from "@/lib/server/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RequestAdvisorButtons } from "@/components/Requests";

export default async function AdvisorDetails({ params }) {
  const urlParams = await params;
  const advisorID = urlParams.advisorID;
  const advisors = await faculty.get({ id: advisorID });

  const advisor = advisors[0];
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const users = await user.get({ email: session.user.email });
  const currentUser = users[0];

  const projects = [];

  if (currentUser.student) {
    const projectsParticipates = currentUser.student.projects;
    projectsParticipates.map((current) => {
      const alreadyAdvising =
        current.project.advisorId === advisorID ||
        current.project.coAdvisorId === advisorID;
      !alreadyAdvising && projects.push(current.project);
    });
  }

  if (!advisor) {
    return <h1>No faculty with id {advisorID} was found</h1>;
  }

  return (
    <div className="p-6 my-2 bg-gray-50 rounded-md border-2 border-gray-200 w-[640px]">
      <Link
        className="block mb-4 underline cursor-pointer text-[#b30738]"
        href="/advisor-directory"
      >
        Back to directory
      </Link>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
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
          <h1 className="ml-4 text-3xl font-bold">
            {advisor.firstName} {advisor.lastName}
          </h1>
        </div>
        {currentUser.student && (
          <RequestAdvisorButtons
            studentId={currentUser.student.id}
            projects={projects}
            facultyId={advisorID}
          />
        )}
        <p className="text-gray-600">{advisor.email}</p>
      </div>
      <h2 className="mt-4 text-xl font-semibold">Department</h2>
      <p className="text-gray-600 capitalize">{advisor.department}</p>
      <h2 className="mt-4 text-xl font-semibold">Bio</h2>
      <p className="p-4 mt-2 bg-white rounded-lg border">
        {advisor.bio || "No bio available"}
      </p>
      <h2 className="mt-4 text-xl font-semibold">Research Interests</h2>
      <p className="text-gray-600">{advisor.researchInterests}</p>
      <h2 className="mt-4 text-xl font-semibold">Expertise Areas</h2>
      <p className="text-gray-600">{advisor.expertiseAreas}</p>
      <h2 className="mt-4 text-xl font-semibold">Advised Projects</h2>
      {advisor.advisedProjects.map((project) => (
        <div key={project.id} className="p-4 mt-2 bg-white rounded-lg border">
          <h3 className="font-bold">{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
      <h2 className="mt-4 text-xl font-semibold">Co-Advised Projects</h2>
      {advisor.coAdvisedProjects.map((project) => (
        <div key={project.id} className="p-4 mt-2 bg-white rounded-lg border">
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
