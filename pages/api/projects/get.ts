import {
  getSession,
  UserProfile,
  withApiAuthRequired,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function getProject(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  // @ts-ignore
  const { user }: { user: UserProfile } = getSession(req, res);

  try {
    const response = await prisma.projects.findFirst({
      where: {
        // @ts-ignore
        id,
        //@ts-ignore
        userId: user.sub,
      },
    });

    res.json(response);
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
}

export default withApiAuthRequired(getProject);
