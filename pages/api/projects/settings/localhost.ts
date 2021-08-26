import {
  getSession,
  UserProfile,
  withApiAuthRequired,
  WithApiAuthRequired,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function updateUrlSettings(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body);
    const { localhostEnabled, projectId } = req.body;
    try {
      const updateRes = await prisma.setting.update({
        where: {
          projectId,
        },
        data: {
          localhostEnabled,
        },
      });
      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        error,
      });
    }
  }
}

export default withApiAuthRequired(updateUrlSettings);
