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
          <div className="flex justify-between gap-6 h-1/3">
            <Skeleton className="w-full" />
            <Skeleton className="w-full" />
            <Skeleton className="w-full" />
            <Skeleton className="w-full" />
            <Skeleton className="w-full" />
          </div>
          <div className="flex justify-between gap-6 h-2/3 w-full">
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      )}
      {!loading &&(
        <div className="flex flex-col gap-6 p-8 pt-0 h-full">
          <div className="flex justify-between gap-6 h-1/3">
            <NumberCard title="Nombre de candidatures" type="Formations" content={trainingReservations}/>
            <NumberCard title="Nombre de candidatures" type="Stages" content={courseReservations}/>
            <NumberCard title="Nombre de candidatures" type="Interventions" content={interventionReservations}/>
            <NumberCard title="Nombre d'emails" type="Base d'emails" content={4}/>
            <NumberCard title="Nombre de demandes" type="Contact" content={2}/>
          </div>
          <div className="flex justify-between gap-6 h-2/3 w-[calc(50%-12px)]">
            <SliderCard title="Prochaine(s) formation(s)" data={trainings}/>
            <SliderCard title="Prochain(s) stage(s)" data={courses}/>
          </div>
        </div>
      )}
    </>
  );
}
