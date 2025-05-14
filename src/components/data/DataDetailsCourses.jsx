"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourseById, updateCourseReservationById } from "@/services/course";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataDetailsCourses({ data }) {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(data.status);

    useEffect(() => {
    const fetchCourse = async () => {
        try {
            const id = data.course_id;
            const courseData = await getCourseById(id);
            setCourse(courseData);
        } catch (error) {
            console.error("Erreur lors de la récupération de la formation :", error);
            setCourse(null);
        } finally {
            setLoading(false);
        }
    };

    if (data.course_id) {
           fetchCourse();
    }
  }, [data.course_id]);

  const handleStatusChange = async (value) => {
    try {
        const id = data.reservation_id;
        const statusData = {
            "first_name": data.first_name,
            "last_name": data.last_name,
            "email": data.email,
            "phone": data.phone,
            "status": value,
        };
    
        const updated = await updateCourseReservationById(id, statusData);
    
        if (updated) {
          setStatus(value);
        } else {
          console.error("La mise à jour du statut a échoué.");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full">
        <CardContent className="px-6">
          <div className="text-2xl font-semibold mb-8">Fiche de renseignement de candidature</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label>Prénom</Label>
              <div>{data.first_name || "Non renseigné"}</div>
            </div>

            <div>
              <Label>Nom</Label>
              <div>{data.last_name || "Non renseigné"}</div>
            </div>

            <div>
              <Label>Email</Label>
              <div>{data.email || "Non renseigné"}</div>
            </div>

            <div>
              <Label>Téléphone</Label>
              <div>{data.phone || "Non renseigné"}</div>
            </div>

            <div>
              <Label>Statut</Label>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="approved">Accepté</SelectItem>
                  <SelectItem value="rejected">Refusé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="my-6 border-t border-gray-300"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : course ? (
                <div className="space-y-4">
                  <div className="font-semibold text-xl">{course.title || "Titre inconnu"}</div>

                  <div>
                    <Label>Type</Label>
                    <div>{course.type || "Non renseigné"}</div>
                  </div>

                  <div>
                    <Label>Lieu</Label>
                    <div>{course.location || "Non renseigné"}</div>
                  </div>

                  <div>
                    <Label>Date de début</Label>
                    <div>
                      {course.start_date
                        ? new Date(course.start_date).toLocaleDateString()
                        : "Non renseignée"}
                    </div>
                  </div>

                  <div>
                    <a
                      href={`/gestion/formations/${course.course_id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Voir le stage
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-red-500">Erreur de chargement</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
