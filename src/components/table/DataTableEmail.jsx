"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

const emails = [
  { id: 1, email: "aubinmanceau0@gmail.com", date: "2023-10-01" },
  { id: 2, email: "aubinmanceau0@gmail.com", date: "2023-10-01" },
  { id: 3, email: "aubinmanceau0@gmail.com", date: "2023-10-01" },
  { id: 4, email: "aubinmanceau0@gmail.com", date: "2023-10-01" },
  { id: 5, email: "aubinmanceau0@gmail.com", date: "2023-10-01" },
  { id: 6, email: "aubinmanceau0@gmail.com", date: "2023-10-01" },
];

const ITEMS_PER_PAGE = 8;

export function DataTableEmail() {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(emails.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedEmails = emails.slice(startIndex, endIndex);

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
                                <Button variant="ghost" size="icon" className="cursor-pointer">
                                    <Ellipsis className="h-5 w-5" />
                                </Button>
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
