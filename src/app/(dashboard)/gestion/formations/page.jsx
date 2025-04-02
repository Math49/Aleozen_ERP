import { AppNavbar } from "@/components/navbar";
import { DataTableCreation } from "@/components/data/DataTableCreation";

export default function gestionFormations() {
  const formations = [
    {id: 1, type: "tai-chi", date: "2023-10-01", location: "Paris", status: "public"},
  ];
  
  return (
    <>
      <AppNavbar pageName="Gestion des formations"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        <DataTableCreation data={formations}  />
      </div>
    </>
  );
}
