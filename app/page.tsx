import MovieGrid from "@/components/movie-grid";
import { Suspense } from "react";

export default function Home({ searchParams }: { searchParams: { search?: string } }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        {searchParams.search ? `Search Results for "${searchParams.search}"` : "Popular Movies"}
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieGrid />
      </Suspense>
    </main>
  );
}