import React from "react";
import PropTypes from "prop-types";

export default function FacultyProposalDetails({ proposalID }) {
  return <h1>Details about proposal {proposalID}</h1>;
}

FacultyProposalDetails.propTypes = {
  proposalID: PropTypes.string.isRequired,
};
