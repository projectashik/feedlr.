import { NextApiRequest, NextApiResponse } from 'next';

export default function createResponse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.headers['user-agent']);
  console.log(req.body);
  if (req.method === 'POST') {
    res.json({
      success: true,
    });
  }
}
