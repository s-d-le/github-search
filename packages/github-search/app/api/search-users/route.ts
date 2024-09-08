import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch users from GitHub API" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
