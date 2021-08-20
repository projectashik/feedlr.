import {
  getSession,
  UserProfile,
  withApiAuthRequired,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function deleteProject(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    // @ts-ignore
    const { user }: { user: UserProfile } = getSession(req, res);
    try {
      const response = await prisma.project.findFirst({
        where: {
          id: id,
          // @ts-ignore
          userId: user.sub,
        },
      });

      if (response) {
        try {
          const response = await prisma.project.delete({
            where: {
              id,
            },
          });

          res.json({
            success: true,
          });
        } catch (error) {
          res.json({
            success: false,
            error: error.message,
          });
        }
      } else {
        res.status(404).json({
          success: false,
          error: 'Data not found',
        });
      }
    } catch (error) {
      res.json({
        success: false,
        error: error.message,
      });
    }
  } else {
    res.json({
      success: false,
      error: 'Invalid request method',
    });
  }
}

export default withApiAuthRequired(deleteProject);
