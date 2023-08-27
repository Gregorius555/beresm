'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';

const navItems = {
  '/': {
    name: 'home',
  },
  '/about': {
    name: 'about',
  },
  '/blog': {
    name: 'blog',
  },
  '/guestbook': {
    name: 'guestbook',
  },
};

function Logo() {
  return (
    <Link aria-label="Gergely Béres-Molnár" href="/">
      <motion.svg
        className="text-black dark:text-white h-[25px] md:h-[37px]"
        width="45"
        height="120"
        viewBox="9 2 25 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ x: 0, y: 50, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 50,
          }}
          d="M18.2603 32.9561C8.6582 32.4507 4.02197 24.5845 4.02197 16.9819C4.02197 9.70898 8.28467 2.67773 16.5024 2.67773C17.4473 2.69971 18.3042 2.7876 19.1172 2.94141V3.11719C13.5361 3.93018 10.7017 11.291 10.7017 18.4321C10.7017 25.1558 13.2065 31.6816 18.2603 32.4287V32.9561Z"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
        />
        <motion.path
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 50,
          }}
          d="M22.6548 11.2471C24.3467 11.2471 25.731 9.84082 25.731 8.12695C25.731 6.43506 24.3467 5.05078 22.6548 5.05078C20.9629 5.05078 19.5786 6.43506 19.5786 8.12695C19.5786 9.84082 20.9629 11.2471 22.6548 11.2471Z"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
        />
                <motion.path
          initial={{ x: 0, y: -50, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 50,
          }}
          d="M27.291 22.4971V26.9136C27.291 28.4956 27.4009 30.5391 28.3896 31.5278V31.8794C27.5547 31.8354 26.7417 31.7915 25.9507 31.7915C23.9512 31.7915 22.1055 32.0332 20.4795 32.978V32.5166C20.7651 32.231 21.3145 30.4731 21.3145 27.5947V21.772C21.3145 19.7065 21.1606 18.9814 18.8096 18.2124V17.8828H27.9941V18.1904C27.3789 18.8057 27.269 19.9482 27.269 21.0029C27.269 21.5522 27.291 22.0796 27.291 22.4971Z"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
        />
      </motion.svg>
    </Link>
  );
}

export default function Navbar() {
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  return (
    <aside className="md:w-[150px] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0 font-serif">
      <div className="lg:sticky lg:top-20">
        <div className="ml-2 md:ml-[12px] mb-2 px-4 md:px-0 md:mb-8 space-y-10 flex flex-col md:flex-row items-start ">
          <Logo />
        </div>
        <LayoutGroup>
          <nav
            className="flex flex-row md:flex-col items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
          >
            <div className="flex flex-row md:flex-col space-x-0 pr-10 mb-2 mt-2 md:mt-0">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle',
                      {
                        'text-neutral-500': !isActive,
                        'font-bold': isActive,
                      }
                    )}
                  >
                    <span className="relative py-[5px] px-[10px]">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-md z-[-1]"
                          layoutId="sidebar"
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
}
