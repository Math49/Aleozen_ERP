import { AppNavbar } from "@/components/navbar";
import { DataTableCandidature } from "@/components/table/DataTableCandidature";

export default function candidatureInterventions() {
  return (
    <>
      <AppNavbar pageName="Candidatures pour interventions"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        <DataTableCandidature />
      </div>
    </>
  );
}
