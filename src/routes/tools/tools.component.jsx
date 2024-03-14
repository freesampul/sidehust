import React, { useState, useEffect, Fragment } from 'react';


const Tools = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Fragment className='bg-red-50'>
      <div className='bg-gray-100'>
      <h1 className="text-4xl font-bold mb-4 mt-5 text-center">Tools are coming soon!</h1>
      <h2 className="text-lg font-semibold mb-[-3] text-center">Check back here for more updates, but here is what we're planning to roll out to start making you some money!</h2>
      <h3 className="text-lg font-semibold mt-8 text-center">If you are excited about what's next, join our email list for updates</h3>
          
          <div className="relative w-full h-screen overflow-y-scroll flex justify-center items-center">
        
        <ol className="w-full max-w-lg p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
          <li className="mb-10 relative">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">&#8203;--Within three weeks</time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Short form content creation automation bot</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">We are going to be building a bot that can produce hundreds of short form videos a day to post on social media and easily generate extra revune for our users</p>
          </li>
          <li className="mb-10 relative">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">--1-2 months</time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">World class digital consultant</h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">An automated consultant who specializes in YOU! You will be able to give this bot your information and it can tailor a business plan with complete walk throughs to get your business of the ground. You can also package and sell this assistant to future clients</p>
          </li>
          <li className="relative">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">--2-3 months</time>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Marketing tools</h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Harnessing custom ai image genration, we can build a multi-level-model capable of producing ads for products or markerting material that you can use or sell as a service to customers!</p>
          </li>
        </ol>
        </div>
        </div>
    </Fragment>
  );
};

export default Tools;
