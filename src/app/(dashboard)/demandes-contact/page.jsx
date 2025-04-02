import { AppNavbar } from "@/components/navbar";
import { DataTableContact } from "@/components/data/DataTableContact";
import { EmptyData } from "@/components/data/EmptyData";

export default function Contact() {
  const contacts = [

  ];

  return (
    <>
      <AppNavbar pageName="Demandes de contact"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
          {contacts.length > 0 ? (
          <DataTableContact data={contacts}  />
          ) : (
            <EmptyData message="Aucune demande de contact trouvée." />
          )}
      </div>
    </>
  );
}
