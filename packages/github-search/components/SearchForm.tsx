"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GitHubUser } from "@/types/GitHubUser";

type FormInputs = {
  username: string;
};

export default function SearchForm() {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-10 h-10 rounded-full inline-block mr-2"
              />
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {user.login}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
