"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { getTrainingById, updateTrainingReservationById } from "@/services/training";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataDetails({ data }) {
    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(data.status);

    useEffect(() => {
    const fetchTraining = async () => {
        try {
            const id = data.training_id;
            const trainingData = await getTrainingById(id);
            setTraining(trainingData);
        } catch (error) {
            console.error("Erreur lors de la récupération de la formation :", error);
            setTraining(null);
        } finally {
            setLoading(false);
        }
    };

    if (data.training_id) {
           fetchTraining();
    }
  }, [data.training_id]);

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
    
        const updated = await updateTrainingReservationById(id, statusData);
    
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
              <Label>Dossier de candidature</Label>
              <div>
                {data.application_file ? (
                  <a
                    href={data.application_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Télécharger le dossier
                  </a>
                ) : (
                  "Aucun fichier"
                )}
              </div>
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
              ) : training ? (
                <div className="space-y-4">
                  <div className="font-semibold text-xl">{training.title || "Titre inconnu"}</div>

                  <div>
                    <Label>Type</Label>
                    <div>{training.type || "Non renseigné"}</div>
                  </div>

                  <div>
                    <Label>Lieu</Label>
                    <div>{training.location || "Non renseigné"}</div>
                  </div>

                  <div>
                    <Label>Date de début</Label>
                    <div>
                      {training.start_date
                        ? new Date(training.start_date).toLocaleDateString()
                        : "Non renseignée"}
                    </div>
                  </div>

                  <div>
                    <a
                      href={`/gestion/formations/${data.training_id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Voir la formation
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
