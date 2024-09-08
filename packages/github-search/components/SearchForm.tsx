"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { getUsername } from "../actions/getUsername";

type FormInputs = {
  username: string;
};

export default function SearchForm() {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormInputs>();

  return (
    <div>
      <form action={getUsername}>
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
      {errors.username && <p>{errors.username.message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
