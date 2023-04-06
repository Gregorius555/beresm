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

  console.log("getBlogViews Data:", data);

  return data.reduce((acc, curr) => acc + Number(curr.count), 0);
});

export async function getTweetCount() {
  if (!process.env.TWITTER_API_TOKEN) {
    return 0;
  }

  console.log("Twitter API Token:", process.env.TWITTER_API_TOKEN);

  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/GergelyBeresM?user.fields=public_metrics`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    }
  );

  console.log("getTweetCount Response:", response);

  if (!response.ok) {
    console.error("Twitter API request failed with status:", response.status);
    return 0;
  }

  const { data } = await response.json();

  console.log("getTweetCount Parsed Data:", data);

  return Number(data.public_metrics.tweet_count);
}


export async function getTotalBlogViews() {
  try {
    const data = await queryBuilder
      .selectFrom('views')
      .select(['count'])
      .execute();
      
    console.log("getTotalBlogViews Data:", data);

    const totalViews = data.reduce((acc, post) => acc + (typeof post.count === 'string' ? parseInt(post.count, 10) : post.count), 0);

    return totalViews;
  } catch (error) {
    console.error(error);
    return 0;
  }
}