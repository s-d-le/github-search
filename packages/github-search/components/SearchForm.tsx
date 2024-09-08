"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GitHubUser } from "@/types/GitHubUser";
import UsersList from "./UsersList";
import styles from "./SearchForm.module.css";

type FormInputs = {
  username: string;
};

export default function SearchForm() {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<GitHubUser[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/search-users?q=${encodeURIComponent(data.username)}`
      );
      const userData = await res.json();
      setUsers(userData.items);
    } catch (err) {
      setError("An error occurred while fetching users");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
          alt="Search for a Github user"
          className={styles.input}
        />
        <button type="submit" disabled={isLoading} className={styles.button}>
          Search
        </button>
      </form>

      {renderContent()}
    </div>
  );
}
