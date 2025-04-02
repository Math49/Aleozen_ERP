import { AppNavbar } from "@/components/navbar";
import { DataTableEmail } from "@/components/data/DataTableEmail";
import { EmptyData } from "@/components/data/EmptyData";
import { date } from "zod";

export default function Emails() {
  const emails = [
    {id: 1, email: "aubin.manceau@gmail.com", date: "2023-10-01" },
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
