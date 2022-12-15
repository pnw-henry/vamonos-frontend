import TripCard from "./TripCard";

function TripList({ trips, hotels, onDeleteTrip, onAddHotel, onTripUpdate }) {
  const tripItem = trips.map((trip) => {
    return (
      <TripCard
        key={trip.id}
        trip={trip}
        hotels={hotels}
        onDeleteTrip={onDeleteTrip}
        onAddHotel={onAddHotel}
        onTripUpdate={onTripUpdate}
      />
    );
  });

  return (
    <div>
      <ul>{tripItem}</ul>
    </div>
  );
}

export default TripList;
