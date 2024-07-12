import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = 'a4eb4b33f5a4ae6dabc504ce4bf77d3e3e11a8dccf2bf37b5f99acc740a3d3b3cf92374861c91e9521eb2b8a286d0203b6a496e64d8d392de2fd18f299fa26d8';

interface CustomJwtPayload extends JwtPayload {
  username: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as CustomJwtPayload;
      res.status(200).json({ username: decoded.username });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Authorization header missing' });
  }
}
