import Link from "next/link";
import '@/style/sidebar.css';

export default function Sidebar() {
    return (
      <div className="sidebar">
        <div className="container">
          <Link className="brand" href="/">Aléozen</Link>
          <div className="links">
            <Link className="link" href="/demandes-formations">Demandes de formations</Link>
            <Link className="link" href="/demandes-interventions">Demande d'interventions</Link>
            <Link className="link" href="/demandes-stages">Demande de stages</Link>
            <Link className="link" href="/stages">Gestion des stages</Link>
            <Link className="link" href="/formations">Gestion des formations</Link>
            <Link className="link" href="/newsletter-emails">Base d'email</Link>
          </div>
        </div>
        <div className="logout">
            <div>Logout</div>
        </div>
      </div>
    );
  }