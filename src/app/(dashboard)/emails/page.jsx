import { AppNavbar } from "@/components/navbar";
import { DataTableEmail } from "@/components/table/DataTableEmail";

export default function Emails() {
  return (
    <>
      <AppNavbar pageName="Base d'emails"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        <DataTableEmail />
      </div>
    </>
  );
}
