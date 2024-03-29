import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {
    if (req.method !== 'PATCH') {
      return res.status(405).end();
    }

    try {
      const { currentUser } = await serverAuth(req);
      
      const { name, username, bio, coverImage, profileImage } = req.body;

      if (!name || !username) {
        throw new Error('Name and username are required');
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id
        },
        data: {
          name,
          username,
          bio,
          profileImage,
          coverImage
        }
      }); 

      return res.status(200).json(updatedUser);

    } catch (error) {
      console.error(error);
      return res.status(400).end();
    }
  }