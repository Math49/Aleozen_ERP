'use client';

import { AppNavbar } from "@/components/navbar";
import { NumberCard } from "@/components/home/NumberCard";
import { SliderCard } from "@/components/home/SliderCard";
import { useEffect, useState } from "react";
import { getAllTrainings, getNumberInscriptionsByTrainingById, getAllTrainingReservations } from "@/services/training";
import { getAllCourses, getNumberInscriptionsByCourseById, getAllCourseReservations } from "@/services/course";
import { getAllInterventionReservations } from "@/services/intervention";
import { Skeleton } from "@/components/ui/skeleton";


export default function Dashboard() {
  const [trainings, setTrainings] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseReservations, setCourseReservations] = useState(0);
  const [trainingReservations, setTrainingReservations] = useState(0);
  const [interventionReservations, setInterventionReservations] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainings = async () => {
        try {
            const dataTrainings = await getAllTrainings();
            const dataCourses = await getAllCourses();

            const dataCourseReservations = await getAllCourseReservations();
            const dataTrainingReservations = await getAllTrainingReservations();
            const dataInterventionReservations = await getAllInterventionReservations();
            setCourseReservations(dataCourseReservations.length);
            setTrainingReservations(dataTrainingReservations.length);
            setInterventionReservations(dataInterventionReservations.length);


            const enrichedTrainings = await Promise.all(
              dataTrainings.map(async (item) => {
                const count = await getNumberInscriptionsByTrainingById(item.training_id);
                return { ...item, inscriptionCount: count };
              })
            );
            setTrainings(enrichedTrainings);

            const enrichedCourses = await Promise.all(
              dataCourses.map(async (item) => {
                const count = await getNumberInscriptionsByCourseById(item.course_id);
                return { ...item, inscriptionCount: count };
              })
            );
            setCourses(enrichedCourses);

        } catch (error) {
            console.error("Erreur lors de la récupération des formations et de cours:", error);
        } finally {
            setLoading(false);
        }
    };
    
    fetchTrainings();
  }, []);

  return (
    <>
      <AppNavbar pageName="Tableau de bord"/>
      {loading && (
        <div className="flex flex-col gap-6 p-8 pt-0 h-full">
          <div className="w-full h-2/3 rounded-xl">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="grid items:center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 h-1/3">
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      )}
      {!loading &&(
        <div className="flex flex-col gap-6 p-8 pt-0 h-full">
          <div className="w-full h-2/3 bg-card text-card-foreground rounded-xl border py-6 shadow-sm">

          </div>
          <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 h-1/3">
            <NumberCard title="Nombre de candidatures" type="Formations" content={trainingReservations}/>
            <NumberCard title="Nombre de candidatures" type="Stages" content={courseReservations}/>
            <NumberCard title="Nombre de candidatures" type="Interventions" content={interventionReservations}/>
            <NumberCard title="Nombre d'emails" type="Base d'emails" content={4}/>
            <NumberCard title="Nombre de demandes" type="Contact" content={2}/>
          </div>
        </div>
      )}
    </>
  );
}
