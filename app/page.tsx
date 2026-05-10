import React from 'react'
import { Metadata } from 'next'
import ExploreBtn from '@/components/ExploreBtn';
import { title } from 'process';
import EventCard from '@/components/EventCard';
import { events } from '@/lib/constants';

export const metadata: Metadata = {
  title: "EventLoop | Discover Developer Events",
  description: "The ultimate hub for developers to find hackathons, tech conferences, and local meetups.",
};


const Page = () => {
  return (
    <section className="flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center">
      {/* Main Headline */}
      <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
        Don’t Block the Thread. <br />
        <span className="text-5xl font-extrabold tracking-tight md:text-7xl">
          Stay in the Loop.
        </span>
      </h1>

      {/* Sub-headline */}
      <p className="mt-5 max-w-2xl text-lg text-white/75 md:text-xl">
        The Hub for Every Dev Event You Can&apos;t Miss. <br className="hidden md:block" />
        Find <span className="font-semibold text-white">Hackathons</span>,
        <span className="font-semibold text-white"> Meetups</span>, and
        <span className="font-semibold text-white"> Conferences</span> all in one place.
      </p>

      {/* Call to Action Button */}
      <ExploreBtn />
      
      {/* Featured Events Section */}
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
            {events.map((event) => (
                <li key={event.title} className="list-none">
                    <EventCard {...event} />
                </li>
            ))}
        </ul>
      </div>

    </section>
  )
}

export default Page