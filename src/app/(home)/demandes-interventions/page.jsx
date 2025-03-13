import Navbar from "@/components/navbar";
import DataTable from "@/components/table";

export default function InterventionsRequests() {
  return (
    <>
      <Navbar title={"Demande d'interventions"} />
      <div className="content">
        <DataTable />
      </div>
    </>
  );
}
