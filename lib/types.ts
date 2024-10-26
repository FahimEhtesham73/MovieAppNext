import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ).default([]),
});

export const MovieDetailsSchema = MovieSchema.extend({
  credits: z.object({
    cast: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        character: z.string(),
        profile_path: z.string().nullable(),
      })
    ),
  }),
  recommendations: z.object({
    results: z.array(MovieSchema),
  }),
});

export type Movie = z.infer<typeof MovieSchema>;
export type MovieDetails = z.infer<typeof MovieDetailsSchema>;