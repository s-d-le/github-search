"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./page.module.css";

type FormInputs = {
  username: string;
};

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${data.username}`
      );
      setUser(response.json());
      setError(null);
    } catch (err) {
      setUser(null);
      setError("User not found or error occurred");
    }
  };

  return (
    <main className={styles.main}>
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
        {errors.username && <p>{errors.username.message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </main>
  );
}
