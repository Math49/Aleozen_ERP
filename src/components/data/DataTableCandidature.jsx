"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 8;

export function DataTableCandidature({data}) {
    const pathname = usePathname(); 

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    const filteredData = data.filter(data => 
        (data.first_name.toLowerCase() + ' ' + data.last_name.toLowerCase()).includes(search.toLowerCase()) &&
        (statusFilter === "all" || data.status === statusFilter) &&
        (typeFilter === "all" || 
            (data.training ? data.training.type === typeFilter : 
             data.course ? data.course.type === typeFilter :
             data.intervention ? data.intervention.type === typeFilter : false))
    );

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="h-full flex flex-col gap-2">
            <div className="flex gap-4 mb-2">
                <Input
                    placeholder="Rechercher par nom..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select onValueChange={setTypeFilter} value={typeFilter}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer par type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="offline">Tai Chi</SelectItem>
                        <SelectItem value="online">Qi Qong</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={setStatusFilter} value={statusFilter}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="approved">Accepté</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="rejected">Refusé</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Table className="w-full border rounded-lg">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Prénom / Nom</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((data) => (
                            <TableRow key={data.reservation_id}>
                                <TableCell>{data.first_name + ' ' + data.last_name}</TableCell>
                                <TableCell>{data.training ? data.training.type : data.course ? data.course.type : data.type ? data.type : false}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phone}</TableCell>
                                <TableCell>
                                    {data.status === "approved" ? "Accepté" : data.status === "rejected" ? "Refusé" : "En attente"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="cursor-pointer">
                                                <Ellipsis className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem><Link href={`${pathname}/${data.reservation_id}`}>Voir le détail</Link></DropdownMenuItem>
                                            <Dialog>
                                            <DialogTrigger>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Supprimer</DropdownMenuItem>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                <DialogTitle>Êtes-vous sûr de vouloir supprimer cette candidature ?</DialogTitle>
                                                <DialogDescription>
                                                    Attention, cette action est irréversible !
                                                </DialogDescription>
                                                <div className="flex justify-end mt-4 gap-2">
                                                    <Button variant="ghost" className="cursor-pointer">Annuler</Button>
                                                    <Button variant="destructive" className="cursor-pointer">Supprimer</Button>
                                                </div>
                                                </DialogHeader>
                                            </DialogContent>
                                            </Dialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                                Aucun résultat trouvé.
                            </TableCell>
                        </TableRow>
                    )}
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
