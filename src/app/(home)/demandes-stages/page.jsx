import Navbar from "@/components/navbar";
import DataTable from "@/components/table";

export default function StagesRequests() {
  return (
    <>
      <Navbar title={"Demande de stages"} />
      <div className="content">
        <DataTable />
      </div>
    </>
  );
}
