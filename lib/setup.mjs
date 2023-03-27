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
      <b>MBA in Strategic Data-Driven Management</b> 
      from the University of Buckingham.
    </>
  );
};
export const bio = () => {
  return (
    <>
      When I'm not busy managing projects or crunching numbers, 
      I'm probably improving my coding skills, learning Mandarin Chinese, 
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
        Hello! I'm Gergely, a dynamic <b>business enthusiast</b> with a diverse skill set 
        and a passion for leadership, management, and value creation.
      </p>
      <p>
        My experiences range from restructuring a <b>natural gas pricing</b> team during 
        a merger to auditing Hungary's largest companies, always with a 
        focus on driving success and innovation.
      </p><br></br>
      <hr /><br></br>
      <p>
        My interests span strategic planning, <b>business valuation</b>, stock exchange, 
        hedge funds, and beyond. I pride myself on blending vision with emotional 
        intelligence, fostering environments where teams can excel. By navigating 
        change, making informed decisions, and communicating effectively, I connect 
        deeply with others and create strong collaborative bonds.
      </p><br></br>
      <p>
        Resilience, integrity, and continuous learning are the cornerstones of my 
        leadership approach. I stay focused on <b>long-term goals</b>, act with honesty and 
        transparency, and foster a culture that values growth and development, both for 
        myself and my team.
      </p><br></br>
      <p>
        I invite you to <b>connect with me</b> and explore new opportunities together. 
        Don't forget to check out my blog for insights into my passions and interests. 
        Let's expand our professional networks and make a lasting impact on the world 
        around us!
      </p><br></br>
      <div className="flex flex-col gap-2 md:flex-row md:gap-2">
        <a
          className="flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/gregbm/"
        >
          <ArrowIcon />
          <p className="h-7">connect with me on linkedin</p>
        </a>
      </div>
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
