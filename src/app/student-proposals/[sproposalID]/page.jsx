import React from "react";
import PropTypes from "prop-types";

export default function StudentProposalDetails({ proposalID }) {
  return <h1>Details about proposal {proposalID}</h1>;
}

StudentProposalDetails.propTypes = {
  proposalID: PropTypes.string.isRequired,
};
