import {
  getSession,
  UserProfile,
  withApiAuthRequired,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function deleteResponse(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    // @ts-ignore
    const { user }: { user: UserProfile } = getSession(req, res);
    try {
      const deleteResponseRes = await prisma.response.delete({
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
    res.json({
      success: false,
      error: 'Invalid request method',
    });
  }
}

export default withApiAuthRequired(deleteResponse);
