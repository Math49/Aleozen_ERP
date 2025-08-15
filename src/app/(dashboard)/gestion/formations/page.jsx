"use client";

import { AppNavbar } from "@/components/navbar";
import { DataTableCreation } from "@/components/data/DataTableCreation";
import { EmptyData } from "@/components/data/EmptyData";
import { useState, useEffect } from "react";
import { getAllTrainings } from "@/services/training";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";


export default function gestionFormations() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const dataTrainings = await getAllTrainings();
        setTrainings(dataTrainings);

      } catch (error) {
          console.error("Erreur lors de la récupération des formations :", error);
      } finally {
          setLoading(false);
      }
    };

    fetchTrainings();
  }, []);
  
  return (
    <>
      <div className="flex items-center justify-between">
        <AppNavbar pageName="Gestion des formations"/>
        <Link href="/gestion/formations/creation" className="mr-8">Créer une formation</Link>
      </div>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        {loading && (
          <Skeleton className="w-full h-full"></Skeleton>
        )}
        {!loading && (
          trainings.length > 0 ? (
            <DataTableCreation data={trainings} />
          ) : (
            <EmptyData message="Aucune formation trouvée." />
          )
        )}
      </div>
    </>
  );
}
