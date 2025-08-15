'use client';

import { AppNavbar } from "@/components/navbar";
import { DataTableCandidature } from "@/components/data/DataTableCandidature";
import { EmptyData } from "@/components/data/EmptyData";
import { useState, useEffect } from "react";
import { getAllTrainingReservations } from "@/services/training";
import { Skeleton } from "@/components/ui/skeleton";

export default function candidatureFormations() {
  const [trainingReservations, setTrainingReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTrainingReservations = async () => {
      try {
        const dataTrainingReservations = await getAllTrainingReservations();
        setTrainingReservations(dataTrainingReservations);

      } catch (error) {
          console.error("Erreur lors de la récupération des formations :", error);
      } finally {
          setLoading(false);
      }
    };
    
    fetchTrainingReservations();
  }, []);
  
  return (
    <>
      <AppNavbar pageName="Candidatures pour formations"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        {loading && (
          <Skeleton className="w-full h-full"></Skeleton>
        )}
        {!loading && (
          trainingReservations.length > 0 ? (
            <DataTableCandidature data={trainingReservations} />
          ) : (
            <EmptyData message="Aucune candidature trouvée." />
          )
        )}
      </div>
    </>
  );
};
