import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export default async function createResponse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const ua = <string>req.headers['user-agent'];
  const { email, from, feedback, projectId, emoji }: any = req.body;
  try {
    const response = await prisma.response.create({
      data: {
        email,
        url: from,
        feedback,
        ua,
        projectId,
        emoji,
      },
    });
    console.log(response);
    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
}
