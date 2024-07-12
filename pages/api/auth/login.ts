import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'a4eb4b33f5a4ae6dabc504ce4bf77d3e3e11a8dccf2bf37b5f99acc740a3d3b3cf92374861c91e9521eb2b8a286d0203b6a496e64d8d392de2fd18f299fa26d8'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validate username and password (replace with real validation)
    if (username === 'admin' && password === 'password') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
