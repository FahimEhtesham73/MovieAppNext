"use client";

import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/lib/tmdb";
import { Star, Plus, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useWatchlist } from "@/hooks/use-watchlist";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const posterPath = getImagePath(movie.poster_path);
  const isWatchlisted = isInWatchlist(movie.id);
  const year = new Date(movie.release_date).getFullYear();
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWatchlisted) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className={cn("group relative overflow-hidden", className)}>
        <div className="relative aspect-[2/3]">
          {posterPath ? (
            <Image
              src={posterPath}
              alt={movie.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <Button
            size="icon"
            variant="ghost"
            className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleWatchlistClick}
          >
            {isWatchlisted ? (
              <Check className="h-5 w-5 text-white" />
            ) : (
              <Plus className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-1 font-semibold">{movie.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
            <span>•</span>
            <span>{year || "TBA"}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}