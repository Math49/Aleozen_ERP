"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { updateInterventionReservationById } from "@/services/intervention";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataDetailsIntervention({ data }) {
  const [status, setStatus] = useState(data.status);

  const handleStatusChange = async (value) => {
    try {
        const id = data.reservation_id;
        const statusData = {
            "first_name": data.first_name,
            "last_name": data.last_name,
            "email": data.email,
            "phone": data.phone,
            "type": data.type,
            "intervention_date": data.intervention_date,
            "description": data.description,
            "status": value,
        };
    
        const updated = await updateInterventionReservationById(id, statusData);
    
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
              <Label>Type</Label>
              <div>{data.type || "Non renseigné"}</div>
            </div>

            <div>
              <Label>Date</Label>
              <div>{data.intervention_date || "Non renseigné"}</div>
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

          <div className="space-y-4">
            <div>
              <Label>Message</Label>
              <div>{data.description || "Non renseigné"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
