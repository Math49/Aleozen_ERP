"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 8;

export function DataTableEmail({data}) {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedEmails = data.slice(startIndex, endIndex);

    return (
        <div className="h-full flex flex-col gap-2">
            <Table className="w-full border rounded-lg">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Email</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedEmails.map((email) => (
                        <TableRow key={email.id}>
                            <TableCell>{email.email}</TableCell>
                            <TableCell>{email.date}</TableCell>
                            <TableCell className="text-right">
                                <Dialog>
                                    <DialogTrigger>
                                        <Button variant="ghost" size="icon" className="cursor-pointer">
                                            <Trash className="h-5 w-5" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                        <DialogTitle>Êtes-vous sûr de vouloir supprimer cet email ?</DialogTitle>
                                        <DialogDescription>
                                            <p>Attention, cette action est irréversible !</p>
                                            <div className="flex justify-end mt-4 gap-2">
                                                <Button variant="ghost" className="cursor-pointer">Annuler</Button>
                                                <Button variant="destructive" className="cursor-pointer">Supprimer</Button>
                                            </div>
                                        </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
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
