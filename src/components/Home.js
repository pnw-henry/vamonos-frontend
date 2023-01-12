function Home({ user, isLoggedIn, trips, hotels }) {
  return (
    <div className="home">
      <div className="home-trips">
        {isLoggedIn && user !== 0 && trips != null && trips.length > 0 ? (
          <div>
            <h2>Your Destinations</h2>
            {trips.map((trip) => {
              return <p key={trip.id}>{trip.destination}</p>;
            })}
            <h2>Your Hotels</h2>
            {hotels.map((hotel) => {
              if (hotel != null) {
                return <p key={hotel.id}>{hotel.name}</p>;
              }
            })}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Home;
