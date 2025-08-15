import { AppNavbar } from "@/components/navbar";
import { DataCreation } from "@/components/data/DataCreation";

export default function CreationFormations() {
  return (
    <>
      <AppNavbar pageName="Créer un stage" />
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        <DataCreation />
      </div>
    </>
  );
}
