import React from "react";
import PropTypes from "prop-types";
import { faculty } from "@/lib/server/actions";

export default async function AdvisorDetails({ advisorID }) {
  const advisor = await faculty.get({ id: advisorID })[0];

  if (advisor) {
    return <h1>No faculty with id {advisorID} was found</h1>;
  }

  return <h1>Details about advisor {advisorID}</h1>;
}

AdvisorDetails.propTypes = {
  advisorID: PropTypes.string.isRequired,
};
