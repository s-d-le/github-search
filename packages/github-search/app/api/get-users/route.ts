import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "type:user";
  const page = searchParams.get("page") || "1";

  const res = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(
      query
    )}&page=${page}&per_page=30`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    return NextResponse.json(
      {
        error: "Failed to fetch users from GitHub",
        message: errorData.message,
      },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
