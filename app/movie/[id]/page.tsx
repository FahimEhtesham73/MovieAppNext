import { fetchMovieDetails, fetchMovies, getImagePath } from "@/lib/tmdb";
import { MovieDetails } from "@/components/movie-details";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateStaticParams() {
  const { results } = await fetchMovies(1);
  const { results: page2 } = await fetchMovies(2);
  return [...results, ...page2].map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await fetchMovieDetails(params.id);

  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<MovieSkeleton />}>
        <MovieDetails movie={movie} />
      </Suspense>
    </main>
  );
}

function MovieSkeleton() {
  return (
    <div className="space-y-8 p-8">
      <div className="relative h-[70vh] w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}