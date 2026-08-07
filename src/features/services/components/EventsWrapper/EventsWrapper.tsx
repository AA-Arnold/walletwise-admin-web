import Container from "@/components/atoms/Container/Container";
import EventsTable from "../EventsTable/EventsTable";
import ServiceNavLink from "@/components/atoms/ServiceNavLink/ServiceNavLink";
import Button from "@/components/atoms/Button/Button";

import { services } from "@/lib/constants";

const EventsWrapper = () => {
  return (
    <div className="">
      <div className=" h-10 w-full border-b border-[#EDEDED] dark:border-gray-700 top-14 right-0 fixed bg-white/65 dark:bg-gray-900/65 backdrop-blur-2xl z-20">
        <Container>
          <div className="flex items-center lg:justify-end flex-1 w-full no-scrollbar overflow-x-auto h-10 gap-4">
            {services?.map((service) => (
              <ServiceNavLink
                key={service?.name}
                name={service?.name}
                link={service?.link}
              />
            ))}
          </div>
        </Container>
      </div>
      <div className="h-24 w-full" />
      <div className="py-6 flex justify-between flex-wrap gap-4">
        <h2 className="sm:text-3xl text-2xl font-semibold dark:text-gray-300 capitalize">
          Events
        </h2>
        <Button href="/services/events/create" width="w-fit">
          Create Partner Event
        </Button>
      </div>
      <EventsTable />
    </div>
  );
};

export default EventsWrapper;
