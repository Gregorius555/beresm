import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { queryBuilder } from 'lib/planetscale';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);

  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(403).send('Unauthorized');
  }

  const email = session.user.email as string;
  const name = session.user.name as string;

  if (req.method === 'POST') {
    try {
      await queryBuilder
        .insertInto('guestbook')
        .values({
          email,
          content: (req.body.body || '').slice(0, 500),
          created_by: name,
        })
        .execute();

      return res.status(200).json({ error: null });
    } catch (error) {
      console.error('POST error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await queryBuilder
        .deleteFrom('guestbook')
        .where('id', '=', req.body.id)
        .where('email', '=', email)
        .execute();

      return res.status(204).json({});
    } catch (error) {
      console.error('DELETE error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.send('Method not allowed.');
}
