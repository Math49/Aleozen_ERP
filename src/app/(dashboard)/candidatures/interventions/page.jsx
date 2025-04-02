import { AppNavbar } from "@/components/navbar";
import { DataTable } from "@/components/table/DataTable";

export default function candidatureInterventions() {
  return (
    <>
      <AppNavbar pageName="Candidatures pour interventions"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        <DataTable />
      </div>
    </>
  );
}
