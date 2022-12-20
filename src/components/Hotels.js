import React, { useState, useEffect } from "react";

function Hotels({ tripId, onTripUpdate }) {
  const [hotels, setHotels] = useState([]);
  const hotelAPI = "http://localhost:9292/hotels";

  useEffect(() => {
    fetch(hotelAPI)
      .then((r) => r.json())
      .then((hotels) => {
        setHotels(hotels);
      });
  }, []);

  function handleHotelSelect(hotelId, tripId) {
    const tripAPI = `http://localhost:9292/trips/${tripId}`;

    fetch(tripAPI, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotel_id: hotelId,
      }),
    })
      .then((r) => r.json())
      .then((trip) => {
        onTripUpdate(trip);
      });
  }

  const hotelOption = hotels.map((hotel) => {
    return (
      <option className="hotel-item" key={hotel.id} value={hotel.id}>
        {hotel.name}
      </option>
    );
  });

  return (
    <div className="hotel-options">
      <select
        id="hotels"
        onChange={(e) => handleHotelSelect(e.target.value, tripId)}
      >
        <option className="hotel-item" value="selected" defaultValue>
          Choose a hotel
        </option>
        {hotelOption}
      </select>
    </div>
  );
}

export default Hotels;
