'use client';

import { AppNavbar } from "@/components/navbar";
import { DataTableCandidature } from "@/components/data/DataTableCandidature";
import { EmptyData } from "@/components/data/emptyData";
import { useState, useEffect } from "react";
import { getAllInterventionReservations } from "@/services/intervention";
import { Skeleton } from "@/components/ui/skeleton";

export default function candidatureInterventions() {
  const [interventionReservations, setInterventionReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInterventionReservations = async () => {
      try {
        const dataInterventionReservations = await getAllInterventionReservations();
        setInterventionReservations(dataInterventionReservations);

      } catch (error) {
          console.error("Erreur lors de la récupération des cours:", error);
      } finally {
          setLoading(false);
      }
    };
    
    fetchInterventionReservations();
  }, []);
  
  return (
    <>
    <AppNavbar pageName="Candidatures pour interventions"/>
    <div className="flex flex-col gap-6 p-8 pt-0 h-full">
      {loading && (
        <Skeleton className="w-full h-full"></Skeleton>
      )}
      {!loading && (
        interventionReservations.length > 0 ? (
          <DataTableCandidature data={interventionReservations} />
        ) : (
          <EmptyData message="Aucune candidature trouvée." />
        )
      )}
    </div>
  </>
  );
}
