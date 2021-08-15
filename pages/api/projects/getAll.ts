import {
  getSession,
  UserProfile,
  withApiAuthRequired,
  WithApiAuthRequired,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function getAllProjects(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const { user }: { user: UserProfile } = getSession(req, res);
  if (user) {
    const response = await prisma.projects.findMany({
      where: {
        // @ts-ignore
        userId: user.sub,
      },
    });
    res.json(response);
  } else {
    res.status(401);
  }
}

export default withApiAuthRequired(getAllProjects);
