import { event } from "@prisma/client";
import { url } from "inspector";
import React from "react";

type Props = {
  events: event[];
};

const Event = ({ event }: { event: event }) => (
  <div
    className={`bg-center bg-cover  rounded-lg shadow-md transition-all hover:-translate-y-1 duration-500 delay-75`}
    style={{
      backgroundImage: `url(/events/${event.img})`,
    }}
  >
    <div className="relative h-[180px] w-full bg-black/50 rounded-lg">
      <div className="absolute bottom-4 left-4 text-white text-pretty">
        <p className="text-xs">{event.time.toDateString()}</p>
        <p className="text-sm font-semibold">{event.title}</p>
        <p className="text-xs text-balance">{event.desc}</p>
      </div>
    </div>
  </div>
);
const EventList = ({ events }: Props) => {
  return (
    <div className="grid md:grid-cols-2 gap-2">
      {events.map((event) => (
        <Event event={event} key={event.id} />
      ))}
    </div>
  );
};

export default EventList;
