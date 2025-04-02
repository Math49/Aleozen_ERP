import { AppNavbar } from "@/components/navbar";
import { DataTableCandidature } from "@/components/data/DataTableCandidature";
import { EmptyData } from "@/components/data/EmptyData";

export default function candidatureFormations() {
  const users = [

  ];
  
  return (
    <>
      <AppNavbar pageName="Candidatures pour formations"/>
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
