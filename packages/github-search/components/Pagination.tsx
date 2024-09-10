// components/Pagination.tsx

"use client";

import { useRouter } from "next/navigation";
import styles from "./Pagination.module.css";
import { Button } from "ui-components";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  searchTerm: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  searchTerm,
}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    router.push(`/?q=${encodeURIComponent(searchTerm)}&page=${newPage}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
