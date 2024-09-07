"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();

  const search = () => {};

  return (
    <main className={styles.main}>
      <div>
        <form onSubmit={handleSubmit(search)}>
          <div>
            <input
              {...(register("userName"), { required: true })}
              type="text"
              placeholder="Looking for a Github user?"
              name="userName"
              alt="Search for a Github user"
            />
            <button type="submit" disabled={isLoading}>
              Search
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
