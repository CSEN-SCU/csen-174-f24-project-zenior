"use client"
import React from "react";
import ProposalForm from "../../components/ProjectProposalForm/Proposal";

export default function Faculty() {
  return(
    <section>
        <h1>Project Proposal Form</h1>
        <p>This form creates a SD project proposal, which will be shown on your profile. You may edit any of the fields, at any time</p>
        <ProposalForm/>
    </section>
  );
}
