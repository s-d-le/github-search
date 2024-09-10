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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/get-users?q=${encodeURIComponent(searchTerm)}&page=${page}`
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
