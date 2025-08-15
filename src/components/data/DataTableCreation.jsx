"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { EmptyData } from "@/components/data/EmptyData";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS_PER_PAGE = 8;

export function DataTableCreation({ data }) {
    const pathname = usePathname();
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
                        <SelectItem value="published">Publié</SelectItem>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="archived">Archivé</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={setTypeFilter} value={typeFilter}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer par type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="taichi">Tai Chi</SelectItem>
                        <SelectItem value="qigong">Qi Gong</SelectItem>
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
                                    {data.type === "taichi" ? "Tai Chi" : 
                                     data.type === "qigong" ? "Qi Gong" : "N/A"}
                                </TableCell>
                                <TableCell>{data.start_date ? new Date(data.start_date).toLocaleDateString() : "N/A"}</TableCell>
                                <TableCell>{data.location}</TableCell>
                                <TableCell>
                                    {data.status === "published" ? "Publié" : 
                                     data.status === "draft" ? "Brouillon" : "N/A"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Ellipsis className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem><Link href={`${pathname}/${data.training_id ? data.training_id : data.course_id ? data.course_id : '#'}`}>Modifier</Link></DropdownMenuItem>
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
