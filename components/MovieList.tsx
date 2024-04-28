import { isEmpty, shuffle } from 'lodash';
import MovieCard from '@/components/MovieCard';
import { useCallback, useEffect, useState } from 'react';

interface MovieListProps {
  title: string;
  data: Record<string, any>[];
  toShuffle?: boolean;
}

export default function MovieList({ data: movieList, title, toShuffle }: MovieListProps) {
  // let shownMovieList = toShuffle ? shuffle(movieList) : [...movieList];

  if (isEmpty(movieList)) {
    return null;
  }

  return (
    <div className='px-4 md:px-12 mt-2 md:mt-10 space-y-8'>
      <div>
        <p className='text-md md:text-xl lg:text-2xl font-semibold mb-4'>{title}</p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {movieList.map((movie: any, index) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              lastElement={index === movieList.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
