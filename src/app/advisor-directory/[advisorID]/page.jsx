import React from "react";
import PropTypes from "prop-types";

export default function AdvisorDetails({ advisorID }) {
  return <h1>Details about advisor {advisorID}</h1>;
}

AdvisorDetails.propTypes = {
  advisorID: PropTypes.string.isRequired,
};
