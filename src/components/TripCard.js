import React, { useState } from "react";
function TripCard({ trip, hotels, onDeleteTrip, onAddHotel, onTripUpdate }) {
  const { id, destination, cost, check_in, check_out, hotel_id } = trip;
  const tripAPI = `http://localhost:9292/trips/${id}`;
  const hotelAPI = "http://localhost:9292/hotels";

  const [hotelForm, setHotelForm] = useState({
    name: "",
    location: "",
  });

  const hotelFound = hotels.find((hotel) => hotel.id === hotel_id);
  console.log("hotel found: ", hotelFound);

  function handleDelete() {
    fetch(tripAPI, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((deletedTrip) => {
        onDeleteTrip(deletedTrip);
      });
  }

  function handleHotelChange(e) {
    setHotelForm({
      ...hotelForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleHotelSubmit(e) {
    e.preventDefault();

    const newHotel = {
      name: hotelForm.name,
      location: hotelForm.location,
    };

    fetch(hotelAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHotel),
    })
      .then((r) => r.json())
      .then((hotel) => {
        onAddHotel(hotel);
        fetch(tripAPI, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hotel_id: hotel.id,
          }),
        })
          .then((r) => r.json())
          .then((trip) => {
            onTripUpdate(trip);
          });
      });
  }

  return (
    <div className="trip-card">
      <li className="trip-li">
        <span>
          <h2>
            <strong>{destination}</strong>
          </h2>
        </span>
        <article>
          <div>
            {hotelFound ? (
              <div className="current-hotel">
                <span>
                  <h4>
                    Staying At {trip.hotel.name} in {trip.hotel.location}
                  </h4>
                </span>
              </div>
            ) : (
              <div className="new-hotel">
                <span>
                  <h4>No Hotel Data Found</h4>
                  <div id="hotel-form">
                    <form onSubmit={handleHotelSubmit}>
                      <input
                        name="name"
                        type="text"
                        placeholder="Hotel Name"
                        value={hotelForm.name}
                        onChange={handleHotelChange}
                      />
                      <input
                        name="location"
                        type="text"
                        placeholder="Hotel Location"
                        value={hotelForm.location}
                        onChange={handleHotelChange}
                      />
                      <button className="submit-hotel-button" type="submit">
                        Add to {destination}
                      </button>
                    </form>
                  </div>
                </span>
              </div>
            )}
          </div>
          <p>Cost: ${cost}</p>
          <p>Check In: {check_in}</p>
          <p>Check Out: {check_out}</p>
          <button className="delete-button" onClick={handleDelete}>
            Remove From Trips
          </button>
        </article>
      </li>
    </div>
  );
}

export default TripCard;
