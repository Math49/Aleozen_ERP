import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Avatar from '@mui/material/Avatar';
import '@/style/navbar.css';

export default function Navbar({ title }) {
  return (
    <div className="navbar">
    <h1>{title}</h1>
    <Link href="/profil" className="profil">
      <Avatar sx={{ width: 24, height: 24 }} alt="Aubin Manceau"/>
      <p className="name">Aubin Manceau</p>
    </Link>
    </div>
  );
}