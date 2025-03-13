import Navbar from "@/components/navbar";
import DataTable from "@/components/table";

export default function FormationsRequests() {
  return (
    <>
      <Navbar title={'Demande de formations'} />
      <div className="content">
        <DataTable />
      </div>
    </>
  );
}
