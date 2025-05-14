"use client";

import { AppNavbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { getCourseReservationById } from "@/services/course";
import { DataDetailsCourses } from "@/components/data/DataDetailsCourses";

export default function candidatureFormations() {
  const [courseReservation, setCourseReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourseReservation = async () => {
      try {
        const id = window.location.pathname.split("/").pop();
        const dataCourseReservation = await getCourseReservationById(id);
        setCourseReservation(dataCourseReservation);

      } catch (error) {
          console.error("Erreur lors de la récupération de la formation :", error);
      } finally {
          setLoading(false);
      }
    };
    
    fetchCourseReservation();
  }, []);

  return (
    <>
      <AppNavbar pageName="Candidatures pour formations"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        {loading && (
          <Skeleton className="w-full h-full"></Skeleton>
        )}
        {!loading && (
          <DataDetailsCourses data={courseReservation} />
        )}
      </div>
    </>
  );
}