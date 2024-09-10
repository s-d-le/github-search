"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { GitHubUser } from "@/types/GitHubUser";
import UsersList from "./UsersList";
import styles from "./SearchForm.module.css";
import { Button } from "ui-components";

type FormInputs = {
  username: string;
};

type SearchFormProps = {
  initialSearchTerm: string;
};

export default function SearchForm({ initialSearchTerm }: SearchFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<GitHubUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormInputs>({
    defaultValues: {
      username: initialSearchTerm,
    },
  });

  const fetchUsers = async (username: string, page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/search-users?q=${encodeURIComponent(
          username
        )}&page=${page}&per_page=30`
      );
      const userData = await res.json();
      setUsers(userData.items);
      setTotalPages(Math.ceil(userData.total_count / 30));
      setSearchTerm(username);
    } catch (err) {
      setError("An error occurred while fetching users");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    router.push(`/?q=${encodeURIComponent(data.username)}`);
    setIsLoading(false);
  };

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    await fetchUsers(searchTerm, newPage);
  };

  const renderPagination = () => {
    if (!users || users.length === 0) return null;

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
  };

  const renderContent = () => {
    if (formErrors.username)
      return <p className={styles.error}>{formErrors.username.message}</p>;
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (users && users.length > 0) return <UsersList users={users} />;
    if (users && users.length === 0) return <p>No users found</p>;
    return null;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register("username", {
            required: "You must enter an username",
          })}
          type="text"
          placeholder="Looking for a Github user?"
          aria-label="Search for a Github user"
          className={styles.input}
          data-testid="search-input"
        />

        <Button type="submit" aria-label="Search" data-testid="search-button">
          Search
        </Button>
      </form>

      {renderContent()}
      {renderPagination()}
    </div>
  );
}
