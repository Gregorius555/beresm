import type { Metadata } from 'next';
import { ArrowIcon } from 'components/icons';
import AnalyticsWrapper from 'components/AnalyticsWrapper';

export const metadata: Metadata = {
  title: 'About',
  description: 'Business enthusiast',
};


const AboutPage = () => {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">About Me</h1>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hi, I'm Gergely, a <b>business professional</b> with a diverse skill set and a 
        passion for leadership, management, and value creation. 
      </p>
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
      <div className="flex flex-col gap-2 md:flex-row md:gap-2">
        {/*<a
          className="flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
          rel="noopener noreferrer" 
          target="_blank"
          href="https://www.linkedin.com/in/gregbm/"
        >
          <ArrowIcon />
          <p className="h-7">connect with me on linkedin</p>
        </a>*/}
      </div>
    </section>
  );
}

const WrappedAboutPage = () => {
  return (
    <AnalyticsWrapper>
      <AboutPage />
    </AnalyticsWrapper>
  );
};

export default WrappedAboutPage;