import Image from "next/image";
import { GitHubUser } from "@/types/GitHubUser";
import styles from "./UsersList.module.css";

interface UsersListProps {
  users: GitHubUser[] | null;
}

export default function UsersList({ users }: UsersListProps) {
  return (
    <ul className={styles.list} data-testid="users-list">
      {users &&
        users.map((user) => (
          <li key={user.id} className={styles.listItem} data-testid="user-item">
            <Image
              src={user.avatar_url}
              alt={user.login}
              className={styles.avatar}
              width={60}
              height={60}
              data-testid="user-avatar"
            />
            <div>
              <a
                href={user.html_url}
                target="_blank"
                className={styles.link}
                data-testid="user-link"
              >
                {user.login}
              </a>
              <p>{user.id}</p>
            </div>
          </li>
        ))}
    </ul>
  );
}
