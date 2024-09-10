import { Suspense } from "react";
import styles from "./page.module.css";
import SearchForm from "@/components/SearchForm";
import Pagination from "@/components/Pagination";
import UsersList from "@/components/UsersList";
import { GitHubUser } from "@/types/GitHubUser";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

async function getUsers(
  searchTerm: string = "",
  page: number = 1
): Promise<{ items: GitHubUser[]; total_count: number }> {
  // If no search term is provided, use a default query that returns some results
  const query = searchTerm ? searchTerm : "type:user";

  const res = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(
      query
    )}&page=${page}&per_page=30`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const searchTerm = searchParams.q || "";
  const currentPage = parseInt(searchParams.page || "1", 10);
  const { items: users, total_count } = await getUsers(searchTerm, currentPage);
  const totalPages = Math.ceil(total_count / 30);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>GitHub User Search</h1>
      <SearchForm initialSearchTerm={searchTerm} />
      <Suspense fallback={<div>Loading users...</div>}>
        <UsersList users={users} />
      </Suspense>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchTerm={searchTerm}
      />
    </main>
  );
}
