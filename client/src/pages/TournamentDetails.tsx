import React, { useEffect, useState } from "react";
import { Tournament } from "../types/type";

const TournamentDetails = () => {
  const id = window.location.pathname.split("/").pop();
  const [tournament, setTournament] = useState<Tournament>({} as Tournament);
  if (!id) {
    throw new Error("Tournament ID not found in URL");
  }
  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tournaments/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setTournament(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        // Add error state here
      }
    };

    fetchTournament();
  }, [id]);
  const excludedProperties = [
    "id",
    "title",
    "createdAt",
    "updatedAt",
    "ageCategories",
    "foodOptions",
    "locationLatitude",
    "locationLongitude",
    "brochureUrl",
  ];

  return (
    <div className="bg-blue-50 p-4 w-full space-x-8 mx-auto rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-4">
        {tournament.title}
      </h1>

      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <tbody>
          {Object.entries(tournament)
            .filter(([key]) => !excludedProperties.includes(key))
            .map((item, index) => {
              const [key, value] = item;

              // Function to safely convert value to string for rendering but i am skipping it the objects
              const renderValue = (val: unknown): string => {
                if (val === null || val === undefined) return "";
                if (typeof val === "boolean") return val ? "Yes" : "No";
                if (typeof val === "object") return JSON.stringify(val);
                return String(val);
              };

              // Check if the value is an object (but not an array)
              if (
                value !== null &&
                typeof value === "object" &&
                !Array.isArray(value)
              ) {
                // Handle nested object
                return (
                  <React.Fragment key={key}>
                    <tr
                      className={`${
                        index % 2 === 0 ? "bg-purple-50" : "bg-green-50"
                      }`}
                    >
                      <th
                        className="text-left p-3 font-medium border-r border-gray-200 w-1/3 bg-gray-100"
                        colSpan={2}
                      >
                        {key}
                      </th>
                    </tr>
                    {/* Recursively render child object entries with indentation */}
                    {Object.entries(value).map((childItem) => (
                      <tr
                        key={`${key}-${childItem[0]}`}
                        className={`${
                          index % 2 === 0 ? "bg-purple-50" : "bg-green-50"
                        }`}
                      >
                        <th className="text-left p-3 pl-6 font-medium border-r border-gray-200 w-1/3">
                          {childItem[0]}
                        </th>
                        <td className="p-3 flex">
                          <span className="flex-grow">
                            {renderValue(childItem[1])}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              } else {
                // Handle normal key-value pairs as before
                return (
                  <tr
                    key={key}
                    className={`${
                      index % 2 === 0 ? "bg-purple-50" : "bg-green-50"
                    }`}
                  >
                    <th className="text-left p-3 font-medium border-r border-gray-200 w-1/3">
                      {key}
                    </th>
                    <td className="p-3 flex">
                      <span className="flex-grow">{renderValue(value)}</span>
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
      <div className="flex justify-center ic space-x-4 py-4">
        <button className="px-4 py-2  bg-blue-700  hover:bg-blue-400 rounded-xl text-white transition-all" >Download Brochure</button>
        <button className="px-4 py-2  bg-red-700  hover:bg-red-400 rounded-xl text-white transition-all">View Map</button>
        <button className="px-4 py-2  bg-green-700  hover:bg-blue-400 rounded-xl text-white transition-all">Register nOW</button>
      </div>
    </div>
  );
};

export default TournamentDetails;
