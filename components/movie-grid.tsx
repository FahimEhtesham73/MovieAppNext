"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchMovies } from "@/lib/tmdb";
import { MovieCard } from "./movie-card";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieGrid() {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const query = searchParams.get("search");

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
  }, [query]);

  useEffect(() => {
    if ((inView && !loading && hasMore) || (page === 1 && loading)) {
      loadMoreMovies();
    }
  }, [inView, query, page]);

  async function loadMoreMovies() {
    try {
      setLoading(true);
      const data = await fetchMovies(page, query || undefined);
      setMovies((prev) => page === 1 ? data.results : [...prev, ...data.results]);
      setPage((p) => p + 1);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Failed to load movies:", error);
    } finally {
      setLoading(false);
    }
  }

  if (movies.length === 0 && !loading) {
    return (
      <div className="mt-8 text-center text-muted-foreground">
        {query ? "No movies found matching your search." : "No movies available."}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {loading && page === 1 && (
          Array(10).fill(0).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[2/3] w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))
        )}
      </div>
      
      {hasMore && (
        <div
          ref={ref}
          className="mt-8 flex items-center justify-center"
        >
          {loading && page > 1 && (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  );
}