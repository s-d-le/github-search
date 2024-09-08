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
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<FormInputs>();

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

      {error && <p className={styles.error}>{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <UsersList users={users} />
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
