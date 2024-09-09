import { GitHubUser } from "@/types/GitHubUser";

async function getUserDetails(username: string): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

export default async function UserDetailsPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const user = await getUserDetails(username);

  return (
    <div>
      <h1>{user.name || user.login}&rsquo;s Profile</h1>
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        style={{ width: 200, height: 200, borderRadius: "50%" }}
      />
      <p>Username: {user.login}</p>
      {user.bio && <p>Bio: {user.bio}</p>}
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repositories: {user.public_repos}</p>
    </div>
  );
}
