import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res); // this is the check if user is signed in
    // find random movie
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prismadb.movie.findMany({
      // creates an array with only one movie
      take: 1,
      skip: randomIndex,
    });

    return res.status(200).json(randomMovies[0]); // takes the first(and only) movie from the array
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
