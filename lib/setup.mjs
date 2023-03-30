import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const template = `---
title: 'Hello, World!'
publishedAt: '2023-01-01'
summary: 'This is your first blog post.'
---

Hello, World!`;

const info = `import me from '../app/avatar.jpg';

export const name = 'Gergely Béres-Molnár';
export const avatar = me;
export const about = () => {
  return (
    <>
      Hey I'm Gergely. I'm currently pursuing an 
      <b> MBA in Strategic Data-Driven Management </b> 
      from the University of Buckingham.
    </>
  );
};
export const bio = () => {
  return (
    <>
      When I'm not busy managing projects or crunching numbers, 
      I'm probably improving my coding skills, learning new languages, 
      or playing the guitar. I love connecting with people and am always 
      open to new opportunities, so feel free to reach out to me!
    </>
  );
};
`;

const about = `export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">About Me</h1>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hi, I'm Gergely, a <b>business professional</b> with a diverse skill set and a 
        passion for leadership, management, and value creation. 
      </p><br></br><br></br>
      <hr /><br></br><br></br>
      <p>
        I've worked in a variety of roles, including restructuring a natural gas pricing 
        team during a merger and auditing Hungary's largest companies. I'm always looking 
        for new challenges and opportunities to grow.
      </p><br></br>
      <p>
        My interests include management, <b>business valuation</b>, data science, crypto, 
        and more. I'm a strong communicator and problem solver, and I'm always willing to help 
        others succeed. I'm also a resilient and innovative leader who is always looking for new 
        ways to improve.
      </p><br></br>
      <p>
      I'm always looking for new opportunities to connect with people and make a difference in 
      the world. If you're interested in learning more about me or working with me, please don't 
      hesitate to reach out.
      </p><br></br>
    </section>
  );
}
`;

const deleteFolderRecursive = async (path) => {
  const stat = await fs.stat(path);
  if (stat.isDirectory()) {
    const files = await fs.readdir(path);
    await Promise.all(
      files.map((file) => deleteFolderRecursive(`${path}/${file}`))
    );
    await fs.rmdir(path);
  } else {
    await fs.unlink(path);
  }
};

(async () => {
  dotenv.config();

  if (process.env.IS_TEMPLATE === 'false') {
    // This means it's not the template, it's my legit site
    // I orderride the env variable for my site. This means that when
    // folks clone this repo for the first time, it will delete my personal content
    return;
  }

  const libDir = path.join(process.cwd(), 'lib');
  const contentDir = path.join(process.cwd(), 'content');
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const aboutDir = path.join(process.cwd(), 'app', 'about');

  await deleteFolderRecursive(contentDir);
  await deleteFolderRecursive(imagesDir);
  await fs.mkdir(contentDir);
  await fs.writeFile(path.join(contentDir, 'hello-world.mdx'), template);
  await fs.writeFile(path.join(libDir, 'info.tsx'), info);
  await fs.writeFile(path.join(aboutDir, 'page.tsx'), about);
})();
