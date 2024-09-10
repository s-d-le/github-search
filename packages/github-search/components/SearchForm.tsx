"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./SearchForm.module.css";
import { Button } from "ui-components";

type FormInputs = {
  username: string;
};

type SearchFormProps = {
  initialSearchTerm: string;
};

export default function SearchForm({ initialSearchTerm }: SearchFormProps) {
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    router.push(`/?q=${encodeURIComponent(data.username)}`);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register("username", {
            required: "You must enter a username",
          })}
          type="text"
          placeholder="Looking for a GitHub user?"
          aria-label="Search for a GitHub user"
          className={styles.input}
          data-testid="search-input"
        />

        <Button
          type="submit"
          aria-label="Search"
          data-testid="search-button"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      {formErrors.username && (
        <p className={styles.error}>{formErrors.username.message}</p>
      )}
    </div>
  );
}
