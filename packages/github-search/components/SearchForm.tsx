"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { getUsername } from "../actions/getUsername";

type FormInputs = {
  username: string;
};

export default function SearchForm() {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/search-users?q=${encodeURIComponent(data.query)}`
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("username", {
              required: "You must enter an username",
            })}
            type="text"
            placeholder="Looking for a Github user?"
            alt="Search for a Github user"
          />
          <button type="submit" disabled={isLoading}>
            Search
          </button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
