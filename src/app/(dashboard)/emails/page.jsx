import { AppNavbar } from "@/components/navbar";
import { DataTableEmail } from "@/components/data/DataTableEmail";
import { EmptyData } from "@/components/data/EmptyData";

export default function Emails() {
  const emails = [

  ];

  return (
    <>
      <AppNavbar pageName="Base d'emails"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
          {emails.length > 0 ? (
          <DataTableEmail data={emails}  />
          ) : (
            <EmptyData message="Aucun email trouvé." />
          )}
      </div>
    </>
  );
}
