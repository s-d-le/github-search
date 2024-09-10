import { Suspense } from "react";
import styles from "./page.module.css";
import SearchForm from "@/components/SearchForm";
import UsersList from "@/components/UsersList";
import { GitHubUser } from "@/types/GitHubUser";

async function getUsers(searchTerm: string = ""): Promise<GitHubUser[]> {
  const res = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(
      searchTerm
    )}&per_page=30`,
    { next: { revalidate: 60 } } // Revalidate every 60 seconds
  );
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await res.json();
  return data.items;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const searchTerm = searchParams.q || "";
  const users = await getUsers(searchTerm);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>GitHub User Search</h1>
      <SearchForm initialSearchTerm={searchTerm} />
      <Suspense fallback={<div>Loading users...</div>}>
        <UsersList users={users} />
      </Suspense>
    </main>
  );
}
