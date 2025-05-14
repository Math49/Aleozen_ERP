'use client';

import { AppNavbar } from "@/components/navbar";
import { DataTableCandidature } from "@/components/data/DataTableCandidature";
import { EmptyData } from "@/components/data/EmptyData";
import { useState, useEffect } from "react";
import { getAllCourseReservations } from "@/services/course";
import { Skeleton } from "@/components/ui/skeleton";

export default function candidatureStages() {
  const [courseReservations, setCourseReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourseReservations = async () => {
      try {
        const dataCouseReservations = await getAllCourseReservations();
        setCourseReservations(dataCouseReservations);

      } catch (error) {
          console.error("Erreur lors de la récupération des cours:", error);
      } finally {
          setLoading(false);
      }
    };
    
    fetchCourseReservations();
  }, []);
  
  return (
    <>
      <AppNavbar pageName="Candidatures pour stages"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        {loading && (
          <Skeleton className="w-full h-full"></Skeleton>
        )}
        {!loading && (
          courseReservations.length > 0 ? (
            <DataTableCandidature data={courseReservations} />
          ) : (
            <EmptyData message="Aucune candidature trouvée." />
          )
        )}
      </div>
    </>
  );
}
