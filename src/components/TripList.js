import TripCard from "./TripCard";

function TripList({ trips, onDeleteTrip, onTripUpdate }) {
  const tripItem = trips.map((trip) => {
    return (
      <TripCard
        key={trip.id}
        trip={trip}
        onDeleteTrip={onDeleteTrip}
        onTripUpdate={onTripUpdate}
      />
    );
  });

  return (
    <div>
      <div className="trip-list">{tripItem}</div>
    </div>
  );
}

export default TripList;
