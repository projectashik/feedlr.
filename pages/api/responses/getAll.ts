import {
  getSession,
  UserProfile,
  withApiAuthRequired,
  WithApiAuthRequired,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function getAllResponses(req: NextApiRequest, res: NextApiResponse) {
  const { projectId } = req.query;
  // @ts-ignore
  const { user }: { user: UserProfile } = getSession(req, res);
  if (user) {
    try {
      const response = await prisma.response.findMany({
        where: {
          // @ts-ignore
          projectId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.json(response);
    } catch (error) {
      res.status(401);
    }
  }
}

export default withApiAuthRequired(getAllResponses);
