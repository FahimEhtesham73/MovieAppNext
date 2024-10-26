"use client";

import { type MovieDetails as MovieDetailsType } from "@/lib/types";
import { MovieHero } from "./movie-hero";
import { CastCard } from "./cast-card";

export function MovieDetails({ movie }: { movie: MovieDetailsType }) {
  return (
    <>
      <MovieHero movie={movie} />

      {/* Cast Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold">Cast</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movie.credits.cast.slice(0, 6).map((person) => (
            <CastCard key={person.id} member={person} />
          ))}
        </div>
      </section>
    </>
  );
}