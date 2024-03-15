import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prisma from '@/libs/prismadb';
import { getServerSession } from "next-auth/next";

const serverAuth = async (req: NextApiRequest) => {
  let session = await getSession({req});

  console.log(session);
  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }
  
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  if (!currentUser) {
    throw new Error('User not found');
  }

  return { currentUser };
}

export default serverAuth;