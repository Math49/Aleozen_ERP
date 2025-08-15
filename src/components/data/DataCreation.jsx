"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createTraining } from "@/services/training";
import { createCourse } from "@/services/course";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DataCreation() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_date: "",
    type: "",
    price: "",
    status: "",
  });

  const types = {
    taichi: "Tai Chi",
    qigong: "Qi Gong",
  };
  const statuses = {
    draft: "Brouillon",
    published: "Publié",
    archived: "Archivé",
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const path = window.location.pathname;

    if (path.includes("/gestion/formations")) {
        createTraining({
            ...formData,
            price: formData.price ? parseFloat(formData.price) : 0,
        })
        .then(() => {
            router.push("/gestion/formations");
        })
        .catch((error) => {
            console.error("Erreur lors de la création de la formation :", error);
        });
    } else if (path.includes("/gestion/stages")) {
        createCourse({...formData})
        .then(() => {
            router.push("/gestion/stages");
        })
        .catch((error) => {
            console.error("Erreur lors de la création du stage :", error);
        });
    } else {
        console.warn("URL non reconnue pour la création :", path);
    }
    };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
        label="Titre"
        placeholder="Titre de la formation"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        required
        />

        <Textarea
        label="Description"
        placeholder="Description de la formation"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        className={"h-[200px] resize-none"}
        />

        <div className="flex flex-wrap gap-4">
        <Input
            label="Lieu"
            placeholder="Lieu"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            required
            className="flex-1 min-w-[150px]"
        />

        <Input
            label="Date de début"
            type="date"
            value={formData.start_date}
            onChange={(e) => handleChange("start_date", e.target.value)}
            required
            className="flex-1 min-w-[150px]"
        />
        </div>
        <div className="flex gap-4">
        <Select
            value={formData.type}
            onValueChange={(value) => handleChange("type", value)}
            className="!w-[300px]"
        >
            <SelectTrigger>
            <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
            {Object.entries(types).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                {label}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>

        <Select
            value={formData.status}
            onValueChange={(value) => handleChange("status", value)}
            className="!w-[300px]"
        >
            <SelectTrigger>
            <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
            {Object.entries(statuses).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                {label}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>
        </div>

        <Input
        label="Prix"
        type="number"
        min="0"
        placeholder="Prix (optionnel)"
        value={formData.price}
        onChange={(e) => handleChange("price", e.target.value)}
        className="hidden"
        />

        <div className="flex justify-center mt-4">
        <Button size="sm" type="submit">
            Créer {window.location.pathname.includes("/gestion/formations") ? "une formation" : "un stage"}
        </Button>
        </div>
    </form>
  );
}
