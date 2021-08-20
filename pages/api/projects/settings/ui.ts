import {
  getSession,
  UserProfile,
  withApiAuthRequired,
  WithApiAuthRequired,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function updateUISettings(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      lightModeBackground,
      lightModeButtonColor,
      lightModeTextColor,
      darkModeBackground,
      darkModeButtonColor,
      darkModeTextColor,
      projectId,
    } = req.body;
    try {
      const updateRes = await prisma.setting.update({
        where: {
          projectId,
        },
        data: {
          lightModeBackground,
          lightModeButtonColor,
          lightModeTextColor,
          darkModeBackground,
          darkModeButtonColor,
          darkModeTextColor,
        },
      });
      res.json({
        success: true,
      });
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }
}

export default withApiAuthRequired(updateUISettings);
