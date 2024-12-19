import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";

function Input({weather,error}) {

    const {currentUser, setCurrentUser} = useUser();
    const navigate = useNavigate();
 
    

    const handleWeatherSearch = async (e) => {
        e.preventDefault();
        setWeather(null);
        setError("");

        if (!city) {
            setError("Please enter a city name.");
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:3000/get-weather/${city}`, {
                method: 'GET',
                credentials: 'include',
            }
            );

            const data = await response.json();
            setWeather(data.data)

        } catch (error) {
            console.error("Error fetching weather:", error);
            setError("Could not fetch weather for the entered city.");
        }
    };


    return (
        <div className="flex items-center justify-center mt-10">
            <form onSubmit={handleWeatherSearch} className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Enter the city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Go
                </button>
            </form>
        </div>
    )
}

export default Input
