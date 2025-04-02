import { AppNavbar } from "@/components/navbar";
import { DataTableCandidature } from "@/components/data/DataTableCandidature";
import { EmptyData } from "@/components/data/EmptyData";

export default function candidatureStages() {
  const users = [
    {id: 1, name: "Aubin Manceau", email: "aubin.manceau@gmail.com", phone: "06 12 34 56 78", status: "accepted"},
  ];
  
  return (
    <>
      <AppNavbar pageName="Candidatures pour stages"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        {users.length > 0 ? (
        <DataTableCandidature data={users}  />
        ) : (
          <EmptyData message="Aucune candidature trouvée." />
        )}
      </div>
    </>
  );
}
