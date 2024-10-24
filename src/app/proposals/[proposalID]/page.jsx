import React from "react";
import PropTypes from "prop-types";

export default function ProposalDetails({ params }) {
  return <h1>Details about proposal {params.proposalID}</h1>;
}

ProposalDetails.propTypes = {
  params: PropTypes.shape({
    proposalID: PropTypes.string.isRequired,
  }).isRequired,
};
