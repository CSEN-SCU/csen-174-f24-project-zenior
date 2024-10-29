import React from "react";
import ProposalForm from "../../components/ProjectProposalForm/Proposal";
import { user, projects } from "@/lib/server/actions";
import { auth} from "@/lib/auth";

const Submit = async() => {
  const session = await auth();
  const currentUser = await user.get({ email: session.user.email });
  return <ProposalForm user={currentUser[0]} create = {projects.create} />
}

export function Faculty() {
  return (
    <section>
      <ProposalForm />
    </section>
  );
}

export default Submit;