import PropTypes from "prop-types";
import { getThesisWithContextKey } from "@/lib/server/scholar-commons";

export default async function ArchiveDetails({ params }) {
  const currParams = await params;
  const previousProject = await getThesisWithContextKey(currParams.context_key);
  if (!previousProject) {
    return <div>Proposal not found</div>;
  }
  return (
    <div className="p-2 m-6">
      <div className="p-6 m-6 bg-slate-100">
        <h1 className="pb-2 text-2xl font-bold">{previousProject[0].title}</h1>
        <div className="py-2">
          <span className="font-semibold">Advisor: </span>
          {previousProject[0].configured_field_t_advisor.toString()}
        </div>
        <br></br>
        <h2 className="text-lg font-semibold">Description:</h2>
        <p>{previousProject[0].abstract}</p>
        <br></br>
      </div>
    </div>
  );
}

ArchiveDetails.propTypes = {
  params: {
    context_key: PropTypes.string.isRequired,
  }.isRequired,
};
