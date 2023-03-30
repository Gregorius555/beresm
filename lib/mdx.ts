import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentPath = 'content';

export const getFileBySlug = async (slug: string) => {
  const fullPath = path.join(contentPath, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    data,
    content,
  };
};

export const getFiles = async () => {
  const filenames = fs.readdirSync(contentPath);
  return filenames.map((filename)
