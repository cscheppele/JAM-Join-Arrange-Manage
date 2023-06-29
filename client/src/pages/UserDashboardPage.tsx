import CreateEventForm from "../Components/UserDashboard/CreateEventForm";
import EventTile from "../Components/UserDashboard/EventTile";
import { EventState, createEventList } from "../reduxFiles/slices/events";
import { useSelector } from "react-redux";
import { RootState } from "../reduxFiles/store";
import { useGetEventsQuery } from "../services/ThesisDB";
import { useEffect } from "react";

function UserDashboardPage() {
  const eventList = useSelector((state: RootState) => state.eventListReducer);
  const { data, error, isLoading } = useGetEventsQuery(
    "57cb0816-b2f3-43f2-86d4-71cfa16ad6ad	"
  );

  useEffect(() => {
    const eventList = data?.data;
  }, [isLoading]);
  // add fetch to get all the events

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="m-5 h-full p-5 flex flex-col items-center gap-5">
          <CreateEventForm></CreateEventForm>
        </div>

        <div className=" h-full p-5 flex flex-col items-center gap-5">
          {eventList ? (
            eventList.map((event: EventState) => {
              return <EventTile event={event}></EventTile>;
            })
          ) : (
            <h3>No Upcoming Events</h3>
          )}

          <EventTile></EventTile>
          <EventTile></EventTile>
        </div>
      </div>
    </>
  );
}

export default UserDashboardPage;