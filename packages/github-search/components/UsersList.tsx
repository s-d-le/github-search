import Image from "next/image";
import { GitHubUser } from "@/types/GitHubUser";
import styles from "./UsersList.module.css";

interface UsersListProps {
  users: GitHubUser[];
}

export default function UsersList({ users }: UsersListProps) {
  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <li key={user.id} className={styles.listItem}>
          <Image
            src={user.avatar_url}
            alt={user.login}
            className={styles.avatar}
            width={60}
            height={60}
          />
          <div>
            <a href={user.html_url} target="_blank" className={styles.link}>
              {user.login}
            </a>
            <p>{user.id}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
