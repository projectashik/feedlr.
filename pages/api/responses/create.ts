import { NextApiRequest, NextApiResponse } from 'next';

export default function createResponse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req.headers);
  }
}
