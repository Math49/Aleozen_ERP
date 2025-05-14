"use client";

import { AppNavbar } from "@/components/navbar";
import { useState, useEffect } from "react";
import { getTrainingReservationById } from "@/services/training";
import { Skeleton } from "@/components/ui/skeleton";
import { DataDetails } from "@/components/data/DataDetailsTraining";

export default function candidatureFormations() {
  const [trainingReservation, setTrainingReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTrainingReservation = async () => {
      try {
        const id = window.location.pathname.split("/").pop();
        const dataTrainingReservation = await getTrainingReservationById(id);
        setTrainingReservation(dataTrainingReservation);

      } catch (error) {
          console.error("Erreur lors de la récupération de la formation :", error);
      } finally {
          setLoading(false);
      }
    };
    
    fetchTrainingReservation();
  }, []);

  return (
    <>
      <AppNavbar pageName="Candidatures pour formations"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        {loading && (
          <Skeleton className="w-full h-full"></Skeleton>
        )}
        {!loading && (
          <DataDetails data={trainingReservation} />
        )}
      </div>
    </>
  );
}