import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import History from "./History";

function NavBar() {
const { currentUser, setCurrentUser } = useUser();
const navigate=useNavigate() 
const handleLogout = async () => {
        try {
          const response = await fetch("http://localhost:3000/logout", {
            method: "POST",
            credentials: "include",
          });
          setCurrentUser(null);
          navigate("/login");
        } catch (error) {
          console.error("Error during logout:", error);
          alert("An error occurred. Please try again.");
        }
      };

   
      
    return (
        <nav className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold">
          Hi {currentUser.username.split(" ")[0]}, know the weather now!
        </h1>
        <div className="flex space-x-4 ml-auto">
        <button
            className="bg-white text-blue-500 py-2 px-4 rounded-lg font-medium shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
           <Link to={'/history'}>Search History</Link>
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-500 py-2 px-4 rounded-lg font-medium shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </nav>

    )
}

export default NavBar
