"use client";

import { AppNavbar } from "@/components/navbar";
import { DataTableCreation } from "@/components/data/DataTableCreation";
import { EmptyData } from "@/components/data/EmptyData";
import { useState, useEffect } from "react";
import { getAllCourses } from "@/services/course";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function gestionStages() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const dataCourses = await getAllCourses();
        setCourses(dataCourses);

      } catch (error) {
          console.error("Erreur lors de la récupération des formations :", error);
      } finally {
          setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  
  return (
    <>
      <div className="flex items-center justify-between">
        <AppNavbar pageName="Gestion des formations"/>
        <Link href="/gestion/stages/creation" className="mr-8">Créer un stage</Link>
      </div>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        {loading && (
          <Skeleton className="w-full h-full"></Skeleton>
        )}
        {!loading && (
          courses.length > 0 ? (
            <DataTableCreation data={courses} />
          ) : (
            <EmptyData message="Aucun stage trouvé." />
          )
        )}
      </div>
    </>
  );
}
