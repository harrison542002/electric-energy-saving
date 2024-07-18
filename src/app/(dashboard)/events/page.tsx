import { authOptions } from "@/lib/auth";
import DashboardNav from "@/components/dashboard-ui";
import EventList from "@/components/event-list";
import DashboardComponentLayout from "@/components/layout/dashboard-component-layout";
import { getEvents } from "@/services/event-services";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const events = await getEvents();
  const session = await getServerSession(authOptions);
  return (
    <>
      <DashboardNav session={session} title="Events" />
      <DashboardComponentLayout>
        <EventList events={events} />
      </DashboardComponentLayout>
    </>
  );
};

export default Page;
