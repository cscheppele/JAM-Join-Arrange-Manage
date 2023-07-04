import CreateEventForm from "../Components/UserDashboard/CreateEventForm";
import EventTile from "../Components/UserDashboard/EventTile";
import { EventState, createEventList } from "../reduxFiles/slices/events";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../reduxFiles/store";
import { useGetEventsQuery } from "../services/ThesisDB";
import { useEffect, useState } from "react";
import { setEventList } from "../reduxFiles/slices/events";

function UserDashboardPage() {
  const dispatch = useAppDispatch();
  const userToken = localStorage.getItem("token");


  const eventList = useSelector((state: RootState) => state.eventListReducer);
  const { data, error, isLoading } = useGetEventsQuery(userToken as string);

  useEffect(() => {
    if (!isLoading && !error) {
      dispatch(setEventList(data?.data));
    }
  }, [isLoading, error]);


  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="m-5 h-full p-5 flex flex-col items-center gap-5">
          <CreateEventForm></CreateEventForm>
        </div>

        <div className=" h-full p-5 flex flex-col items-center gap-1">
          {eventList ? (
            eventList.map((event: EventState) => {
              return <EventTile event={event}></EventTile>;
            })
          ) : (
            <h3>No Upcoming Events</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDashboardPage;
