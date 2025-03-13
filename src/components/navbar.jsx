import Link from 'next/link';
import '@/style/navbar.css';

export default function Navbar({ title }) {
  return (
    <div className="navbar">
    <h1>{title}</h1>
    <Link href="/profil" className="profil">
      <div>Profil</div>
    </Link>
    </div>
  );
}