import { AppNavbar } from "@/components/navbar";
import { DataTable } from "@/components/table/DataTable";

export default function candidatureStages() {
  return (
    <>
      <AppNavbar pageName="Candidatures pour stages"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        <DataTable />
      </div>
    </>
  );
}
