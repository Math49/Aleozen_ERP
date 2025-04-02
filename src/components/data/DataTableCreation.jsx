"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { EmptyData } from "@/components/data/EmptyData";

const ITEMS_PER_PAGE = 8;

export function DataTableCreation({ data }) {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    const filteredData = data.filter(user => 
        (statusFilter === "all" || user.status === statusFilter) &&
        (typeFilter === "all" || user.type === typeFilter)
    );

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        data.length > 0 ? (
        <div className="h-full flex flex-col gap-2">
            <div className="flex gap-4 mb-2">
                <Select onValueChange={setStatusFilter} value={statusFilter}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="public">Publié</SelectItem>
                        <SelectItem value="pending">Brouillon</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={setTypeFilter} value={typeFilter}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer par type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="tai-chi">Tai Chi</SelectItem>
                        <SelectItem value="qi-qong">Qi Qong</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Table className="w-full border rounded-lg">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Lieu</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>
                                    {data.type === "tai-chi" ? "Tai Chi" : 
                                     data.type === "qi-qong" ? "Qi Qong" : "N/A"}
                                </TableCell>
                                <TableCell>{data.date}</TableCell>
                                <TableCell>{data.location}</TableCell>
                                <TableCell>
                                    {data.status === "public" ? "Public" : 
                                     data.status === "pending" ? "Brouillon" : "N/A"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Ellipsis className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Voir le détail</DropdownMenuItem>
                                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Supprimer</DropdownMenuItem>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Êtes-vous sûr de vouloir supprimer ce cours ?</DialogTitle>
                                                        <DialogDescription>
                                                            Attention, cette action est irréversible !
                                                        </DialogDescription>
                                                        <div className="flex justify-end mt-4 gap-2">
                                                            <Button variant="ghost">Annuler</Button>
                                                            <Button variant="destructive">Supprimer</Button>
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

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    onClick={() => setPage(i + 1)}
                                    className={page === i + 1 ? "font-bold bg-gray-200 pointer-events-none" : "cursor-pointer"}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
        ) : (
            <EmptyData message="Aucune donnée trouvée."/>
        )
    );
}
