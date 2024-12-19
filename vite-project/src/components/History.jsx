import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function History() {

const [history,setHistory]=useState([]);    

useEffect(function(){

const getHistory=async()=>{
    const response=await fetch("http://localhost:3000/weather-history", {
        method: "GET",
        credentials: "include",
      })
  const data=await response.json()
  setHistory(data.data)
}
getHistory();    


},[])    
  
    return (
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-4 text-center">Weather Search History</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="px-6 py-3 border text-center">ID</th>
                      <th className="px-6 py-3 border text-center">Username</th>
                      <th className="px-6 py-3 border text-center">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 ? (
                      history.map((entry, index) => (
                        <tr
                          key={entry.id}
                          className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                        >
                          <td className="px-6 py-3 border text-center">{entry.id}</td>
                          <td className="px-6 py-3 border text-center">{entry.username}</td>
                          <td className="px-6 py-3 border text-center">{entry.city}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-3 border text-center">
                          No search history found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
    )
}

export default History
