import 'server-only';


import { queryBuilder } from 'lib/planetscale';
import { cache } from 'react';

export const getBlogViews = cache(async () => {
  if (!process.env.TWITTER_API_TOKEN) {
    return 0;
  }

  const data = await queryBuilder
    .selectFrom('views')
    .select(['count'])
    .execute();

  return data.reduce((acc, curr) => acc + Number(curr.count), 0);
});

export async function getTweetCount() {
  if (!process.env.TWITTER_API_TOKEN) {
    return 0;
  }

  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/GergelyBeresM?user.fields=public_metrics`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    }
  );

  const { data } = await response.json();
  return data?.public_metrics?.tweet_count ?? 0;
}




export async function getTotalBlogViews() {
  try {
    const data = await queryBuilder
      .selectFrom('views')
      .select(['count'])
      .execute();

      const totalViews = data.reduce((acc, post) => acc + (typeof post.count === 'string' ? parseInt(post.count, 10) : post.count), 0);

    return totalViews;
  } catch (error) {
    console.error(error);
    return 0;
  }
}