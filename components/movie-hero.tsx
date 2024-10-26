"use client";

import Image from "next/image";
import { getImagePath } from "@/lib/tmdb";
import { type MovieDetails } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/hooks/use-watchlist";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Check, CalendarIcon, Clock } from "lucide-react";

export function MovieHero({ movie }: { movie: MovieDetails }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const isWatchlisted = isInWatchlist(movie.id);
  const posterPath = getImagePath(movie.poster_path, "original");
  const backdropPath = getImagePath(movie.backdrop_path, "original");

  const handleWatchlistClick = () => {
    if (isWatchlisted) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="relative h-[70vh] w-full">
      {backdropPath && (
        <Image
          src={backdropPath}
          alt={movie.title}
          fill
          className="object-cover brightness-50"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container mx-auto flex gap-8">
          {posterPath && (
            <div className="relative hidden h-[400px] w-[300px] shrink-0 overflow-hidden rounded-lg sm:block">
              <Image
                src={posterPath}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="flex flex-col justify-end">
            <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-white">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-white">{movie.overview}</p>
            <Button
              size="lg"
              variant={isWatchlisted ? "secondary" : "default"}
              onClick={handleWatchlistClick}
              className="mt-6 w-fit"
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