import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  // const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error('No valid session my friend.');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error('No known user my friend.');
  }

  return { currentUser };
};

export default serverAuth;
