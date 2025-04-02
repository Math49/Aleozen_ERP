import { AppNavbar } from "@/components/navbar";
import { DataTableContact } from "@/components/table/DataTableContact";

export default function Contact() {
  return (
    <>
      <AppNavbar pageName="Demandes de contact"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        <DataTableContact />
      </div>
    </>
  );
}
