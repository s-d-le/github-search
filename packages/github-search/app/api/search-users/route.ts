import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("per_page") || 10;

  if (query === null) {
    return NextResponse.json(
      { error: "Invalid query parameter" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${perPage}`,
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
