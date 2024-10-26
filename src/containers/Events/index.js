import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter events based on 'type'
  const events = !type
    ? data?.events || []
    : data?.events.filter((event) => event.type === type);

  // Apply pagination
  const filteredEvents = events.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  console.log("type***", type);
  console.log("events***", events);
  console.log("filteredEvents***", filteredEvents);

  // Calculate total pages
  const pageNumber = Math.ceil(events.length / PER_PAGE);

  // Create a set of event types, filtering out undefined or null types
  const typeList = new Set(
    data?.events
      .map((event) => event.type)
      .filter((eventType) => eventType !== undefined && eventType !== null)
  );
  console.log("typeList:", Array.from(typeList));

  useEffect(() => {
    if (currentPage > pageNumber) {
      setCurrentPage(1);
    }
  }, [currentPage, type, pageNumber]);

  const changeType = (selectedType) => {
    console.log("changeType called with selectedType:", selectedType);
    setCurrentPage(1);
    setType(selectedType);
  };

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => {
              console.log("Select onChange called with value:", value);
              changeType(value || null);
            }}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              <a
                key={`page-${n + 1}`}
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
