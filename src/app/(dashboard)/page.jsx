import { AppNavbar } from "@/components/navbar";
import { NumberCard } from "@/components/home/NumberCard";
import { SliderCard } from "@/components/home/SliderCard";

export default function Dashboard() {
  return (
    <>
      <AppNavbar pageName="Tableau de bord"/>
      <div className="flex flex-col gap-6 p-8 pt-0 h-full">
        <div className="flex justify-between gap-6 h-1/3">
          <NumberCard title="Nombre de candidatures" type="Formations" content={8} contentValidated={5} contentPending={1} contentRefused={2}/>
          <NumberCard title="Nombre de candidatures" type="Stages" content={13} contentValidated={3} contentPending={2} contentRefused={8}/>
          <NumberCard title="Nombre de candidatures" type="Interventions" content={0} contentValidated={0} contentPending={0} contentRefused={0}/>
          <NumberCard title="Nombre d'emails" type="Base d'emails" content={4}/>
          <NumberCard title="Nombre de demandes" type="Contact" content={2}/>
        </div>
        <div className="flex justify-between gap-6 h-2/3">
          <SliderCard title="Les futurs formations"/>
          <SliderCard title="Les futurs stages"/>
        </div>
      </div>
    </>
  );
}
