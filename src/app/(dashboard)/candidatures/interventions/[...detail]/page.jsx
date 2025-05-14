"use client";

import { AppNavbar } from "@/components/navbar";
import { useState, useEffect } from "react";
import { getInterventionReservationById } from "@/services/intervention";
import { Skeleton } from "@/components/ui/skeleton";
import { DataDetailsIntervention } from "@/components/data/DataDetailsIntervention";

export default function candidatureFormations() {
  const [interventionReservation, setInterventionReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInterventionReservation = async () => {
      try {
        const id = window.location.pathname.split("/").pop();
        const dataInterventionReservation = await getInterventionReservationById(id);
        setInterventionReservation(dataInterventionReservation);

      } catch (error) {
          console.error("Erreur lors de la récupération de la formation :", error);
      } finally {
          setLoading(false);
      }
    };
    
    fetchInterventionReservation();
  }, []);

  return (
    <>
      <AppNavbar pageName="Candidatures pour interventions"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        {loading && (
          <Skeleton className="w-full h-full"></Skeleton>
        )}
        {!loading && (
          <DataDetailsIntervention data={interventionReservation} />
        )}
      </div>
    </>
  );
}