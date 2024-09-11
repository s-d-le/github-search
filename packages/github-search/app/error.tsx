"use client";
import { Button } from "ui-components";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main>
      <h2>{error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
}
