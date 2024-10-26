"use client";

import { useWatchlist } from "@/hooks/use-watchlist";
import { MovieCard } from "@/components/movie-card";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Your watchlist is empty. Add some movies to get started!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}