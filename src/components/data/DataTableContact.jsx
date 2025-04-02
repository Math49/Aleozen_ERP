"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 8;

export function DataTableContact({data}) {
    const pathname = usePathname();

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const filteredContacts = data.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

    return (
        <div className="h-full flex flex-col gap-2">
            <div className="flex gap-4 mb-2">
                <Input
                    placeholder="Rechercher par nom..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Table className="w-full border rounded-lg">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Prénom / Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedContacts.map((contact) => (
                        <TableRow key={contact.id}>
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="cursor-pointer">
                                            <Ellipsis className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem><Link href={`${pathname}/${contact.id}`}>Voir le détail</Link></DropdownMenuItem>
                                        <Dialog>
                                        <DialogTrigger>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Supprimer</DropdownMenuItem>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                            <DialogTitle>Êtes-vous sûr de vouloir supprimer cette demande de contact ?</DialogTitle>
                                            <DialogDescription>
                                                Attention, cette action est irréversible !
                                                <div className="flex justify-end mt-4 gap-2">
                                                    <Button variant="ghost" className="cursor-pointer">Annuler</Button>
                                                    <Button variant="destructive" className="cursor-pointer">Supprimer</Button>
                                                </div>
                                            </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                        </Dialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>  
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            className={`${page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() => setPage(i + 1)}
                                className={`${page === i + 1 ? "font-bold bg-gray-200 pointer-events-none" : "cursor-pointer"}`}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            className={`${page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
