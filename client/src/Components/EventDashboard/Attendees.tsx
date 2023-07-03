import React, { useState, useEffect } from 'react';
import { useGetUsersQuery } from "../../services/ThesisDB";
import { UserState } from "../../reduxFiles/slices/users";

interface User {
  userId: string;
  name: string;
  email: string;
  phone?: string | null;
  profilePic?: string | undefined;
  password: string;
}

export default function Attendees() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesPerSlide = 5;
  const eventId = "e9d175f7-c56b-422e-9b69-1ca19f5bf729";
  const apiUrl = `https://codeworks-thesis-4063bceaa74a.herokuapp.com/users/${eventId}`;

  const [attendees, setAttendees] = useState<UserState[]>([]);

  const { data, error, isLoading } = useGetUsersQuery(eventId);

  useEffect(() => {
    if (data) {
      const fetchedToDos = data.data;
      setAttendees(fetchedToDos);
    }
  }, [data]);

  const handlePrevious = () => {
    setActiveIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    const lastIndex = Math.max(attendees.length - imagesPerSlide, 0);
    setActiveIndex(prevIndex => (prevIndex < lastIndex ? prevIndex + 1 : prevIndex));
  };

  const renderImages = () => {
    const startIndex = activeIndex;
    const endIndex = Math.min(startIndex + imagesPerSlide, attendees.length);
    const renderedImages = [];

    for (let i = startIndex; i < endIndex; i++) {
      renderedImages.push(
        <div key={i} className="carousel-item m-4">
          <img
            src={attendees[i].profilePic}
            alt={`User${i + 1}`}
            className="rounded-full w-24 h-24 object-cover"
          />
        </div>
      );
    }

    return renderedImages;
  };

  return (
    <div className="carousel carousel-center rounded-box w-3/5 mx-auto absolute bottom-6 left-0 right-0 flex justify-center">
      {activeIndex > 0 && (
        <button className="carousel-arrow left-arrow" onClick={handlePrevious}>
          <span className="carousel-arrow-icon text-4xl">&lt;</span>
        </button>
      )}

      {renderImages()}

      {activeIndex < attendees.length - imagesPerSlide && (
        <button className="carousel-arrow right-arrow" onClick={handleNext}>
          <span className="carousel-arrow-icon text-4xl">&gt;</span>
        </button>
      )}
    </div>
  );
}
