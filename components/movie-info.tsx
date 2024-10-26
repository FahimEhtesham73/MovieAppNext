"use client";

import Image from "next/image";
import { getImagePath } from "@/lib/tmdb";
import { type MovieDetails } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/hooks/use-watchlist";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Check } from "lucide-react";

export default function MovieInfo({ movie }: { movie: MovieDetails }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const isWatchlisted = isInWatchlist(movie.id);

  const handleWatchlistClick = () => {
    if (isWatchlisted) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="relative">
      {movie.backdrop_path && (
        <div className="absolute inset-0">
          <Image
            src={getImagePath(movie.backdrop_path)!}
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
        </div>
      )}

      <div className="container relative py-8 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="shrink-0">
            <div className="relative aspect-[2/3] w-full max-w-[300px] overflow-hidden rounded-lg">
              {movie.poster_path ? (
                <Image
                  src={getImagePath(movie.poster_path)!}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  No Image
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="mb-4 text-4xl font-bold">{movie.title}</h1>
            
            <div className="mb-6 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>

            <p className="mb-6 text-lg leading-relaxed">{movie.overview}</p>

            <Button
              size="lg"
              variant={isWatchlisted ? "secondary" : "default"}
              onClick={handleWatchlistClick}
            >
              {isWatchlisted ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  In Watchlist
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-5 w-5" />
                  Add to Watchlist
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}