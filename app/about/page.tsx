import React from 'react';
import { NextPage } from 'next';
import { ArrowIcon } from 'components/icons';

const AboutPage: NextPage = () => {
  return (
    <section>
      {/* Add your custom about page content here */}
      <h1 className="font-bold text-3xl font-serif">About Me</h1>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hello! I'm Gergely, a dynamic <b>business enthusiast</b> with a diverse skill set and a passion for leadership, management, and value creation.
      </p>
      <p>
        My experiences range from restructuring a <b>natural gas pricing</b> team during a merger to auditing Hungary's largest companies, always with a focus on driving success and innovation.
      </p>
      <br />
      <hr />
      <br />
      <p>
        My interests span strategic planning, <b>business valuation</b>, stock exchange, hedge funds, and beyond. I pride myself on blending vision with emotional intelligence, fostering environments where teams can excel. By navigating change, making informed decisions, and communicating effectively, I connect deeply with others and create strong collaborative bonds.
      </p>
      <br />
      <p>
        Resilience, integrity, and continuous learning are the cornerstones of my leadership approach. I stay focused on <b>long-term goals</b>, act with honesty and transparency, and foster a culture that values growth and development, both for myself and my team.
      </p>
      <br />
      <p>
        I invite you to <b>connect with me</b> and explore new opportunities together. Don't forget to check out my blog for insights into my passions and interests. Let's expand our professional networks and make a lasting impact on the world around us!
      </p>
      <br />
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
};

export const metadata = {
  title: 'About',
  description: 'Business enthusiast',
};

export default AboutPage;

// Add the empty export statement
export {};
