import {
  getSession,
  UserProfile,
  withApiAuthRequired,
  WithApiAuthRequired,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function createProject(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, url } = req.body;
    // @ts-ignore
    const { user }: { user: UserProfile } = getSession(req, res);
    if (user) {
      try {
        const createReq = await prisma.projects.create({
          data: {
            name,
            url,
            // @ts-ignore
            userId: user?.sub,
          },
        });

        res.json({
          success: true,
          data: createReq,
        });
      } catch (error) {
        if (error.meta.target.includes('url')) {
          res.json({
            success: false,
            field: 'url',
            error: 'URL already exists',
          });
        } else {
          res.json({
            success: false,
            error: error,
          });
        }
      }
    } else {
      res.status(401);
    }
  } else {
    res.json({
      success: false,
      error: 'Invalid request method',
    });
  }
}

export default withApiAuthRequired(createProject);
