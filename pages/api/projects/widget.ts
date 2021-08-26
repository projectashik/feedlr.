import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export default async function getTheProjectDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, id }: { url?: string; id?: string } = req.query;

  try {
    if (url) {
      const response = await prisma.project.findFirst({
        where: {
          url,
        },
        include: {
          setting: true,
        },
      });
      res.json(response);
    }
    if (id) {
      const response = await prisma.project.findFirst({
        where: {
          id,
        },
        include: {
          setting: true,
        },
      });
      res.json(response);
    }
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
}
