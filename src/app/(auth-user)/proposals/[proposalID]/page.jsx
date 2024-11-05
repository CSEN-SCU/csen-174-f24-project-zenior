import PropTypes from "prop-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default async function ProposalDetails({ params }) {
  const currParams = await params;
  return (
    <div className="m-6 p-2">
      <div className="m-6 p-6 bg-slate-100">
        <h1 className="text-2xl pb-2 font-bold">
          Title Placeholder {currParams.proposalID}
        </h1>
        <p className="py-2">
          <span className="font-semibold">Proposed by: </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-[#b30738] underline decoration-solid">
                Member Name
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  <ul>
                    <li className="font-bold">First Last</li>
                    <li>flast@scu.edu</li>
                    <li>Computer Science and Engineering</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <br></br>
          <span className="font-semibold">Project Members:</span> None yet{" "}
          <br></br>
          <span className="font-semibold">Advisor:</span> None yet <br></br>
          <span className="font-semibold">Department:</span> Computer Science
          and Engineering <br></br>
        </p>
        <br></br>
        <h2 className="text-lg font-semibold">Description:</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <br></br>
        <h3 className="font-semibold">Desired Skillsets</h3>
        <ul className="list-disc pl-8 pb-4">
          <li>Cryptography</li>
          <li>Middleware</li>
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
