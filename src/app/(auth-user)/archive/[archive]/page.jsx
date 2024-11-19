import PropTypes from "prop-types";
import { projects } from "@/lib/server/actions";

export default async function ProposalDetails({ params }) {
  const currParams = await params;
  const proposals = await projects.get({ id: currParams.proposalID });
  if (!proposals) {
    return <div>Proposal not found</div>;
  }

  return (
    <div className="m-6 p-2">
      <div className="m-6 p-6 bg-slate-100">
        <h1 className="text-2xl pb-2 font-bold">{title}</h1>
        <div className="py-2">
         
          <span className="font-semibold">Advisor:</span>{" "}
     
          <br></br>
          <span className="font-semibold">Department:</span>{" "}
          {department ? department : "None yet"}
          <br></br>
        </div>
        <br></br>
        <h2 className="text-lg font-semibold">Description:</h2>
        <p>{description}</p>
        <br></br>

      </div>
    </div>
  );
}

ProposalDetails.propTypes = {
  params: PropTypes.shape({
    proposalID: PropTypes.string.isRequired,
  }).isRequired,
};