import { Metadata } from 'next'
import ExploreBtn from '@/components/ExploreBtn';
import EventCard from '@/components/EventCard';
import { IEvent } from '@/database';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: "EventLoop | Discover Developer Events",
  description: "The ultimate hub for developers to find hackathons, tech conferences, and local meetups.",
};


const Page = async () => {
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not set');
  }

  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

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
          {events && events.length > 0 && events.map((event: IEvent) => (
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

/* 2.41.22 */