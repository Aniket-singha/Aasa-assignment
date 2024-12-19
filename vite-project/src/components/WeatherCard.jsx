function WeatherCard({ error, weather }) {
    return (
      <div className="mt-8 flex items-center justify-center">
        {error && <p className="text-red-500">{error}</p>}
        {weather && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center flex flex-col items-center space-y-6">
            <h2 className="text-xl font-bold">
              {weather.location.name}, {weather.location.region}, {weather.location.country}
            </h2>
            <img
              src={weather.current.weather_icons[0]}
              alt={weather.current.weather_descriptions[0]}
              className="mx-auto"
            />
            <p className="text-lg font-medium">
              {weather.current.temperature}°C - {weather.current.weather_descriptions[0]}
            </p>
          </div>
        )}
      </div>
    );
  }
  
  export default WeatherCard;