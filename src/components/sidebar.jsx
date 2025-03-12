import Link from "next/link";
export default function Sidebar() {
    return (
      <div>
        <h1>Sidebar</h1>
        <Link href="/">Dashboard</Link>
        <Link href="/demandes-formations">Demandes de formations</Link>
        <Link href="/demandes-interventions">Demande d'interventions</Link>
        <Link href="/demandes-stages">Demande de stages</Link>
        <Link href="/stages">Gestion des stages</Link>
        <Link href="/formations">Gestion des formations</Link>
        <Link href="/newsletter-emails">Base d'email</Link>
      </div>
    );
  }