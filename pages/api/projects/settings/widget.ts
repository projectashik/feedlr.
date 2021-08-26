import {
  getSession,
  UserProfile,
  withApiAuthRequired,
  WithApiAuthRequired,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function updateWidget(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { type, question, thankYouMessage, coolDownResponse, projectId } =
      req.body;
    console.log(coolDownResponse);
    try {
      const updateRes = await prisma.setting.update({
        where: {
          projectId,
        },
        data: {
          type,
          question,
          thankYouMessage,
          coolDownResponse: parseInt(coolDownResponse),
        },
      });
      console.log(updateRes);
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

export default withApiAuthRequired(updateWidget);
