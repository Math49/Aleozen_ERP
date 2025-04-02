"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

const users = [
  { id: 1, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "07 65 68 74 10", status: "refused" },
  { id: 3, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 4, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 5, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 6, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 7, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 8, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 9, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 10, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 11, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 12, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 13, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 14, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
  { id: 15, name: "Aubin Manceau", email: "aubinmanceau0@gmail.com", phone: "07 65 68 74 10", status: "accepted" },
];

const ITEMS_PER_PAGE = 9;

export function DataTable() {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedUsers = users.slice(startIndex, endIndex);

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 overflow-auto">
                <Table className="w-full border rounded-lg">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                        <TableHead>Prénom / Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                        <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                {user.status === "accepted"
                                        ? "Accepté"
                                        : user.status === "pending"
                                        ? "En attente"
                                        : user.status === "refused"
                                        ? "Refusé"
                                        : "N/A"}
                                </TableCell>
                                <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-5 w-5" />
                                </Button>
                                </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>    
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className={`${
                                page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                        }`}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                    onClick={() => setPage(i + 1)}
                                    className={`${
                                            page === i + 1 ? "font-bold bg-gray-200 pointer-events-none" : "cursor-pointer"
                                    }`}
                            >
                                    {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        className={`${
                                page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                        }`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
