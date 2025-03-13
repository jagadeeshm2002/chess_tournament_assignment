import React, { useState, useEffect } from "react";
import { TournamentTableView } from "../components/tournamentTableView";
import Pagination from "../components/pagination";
import { Tournament } from "../types/type";

const Home = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState({ title: "", location: "" });
  const [searchInputs, setSearchInputs] = useState({ title: "", location: "" });
  const [error,setError] =useState({error:false,message:""})
  const [pagination, setPagination] = useState<{
    page: number;
    totalPages: number;
    total: number;
  }>({
    page: 1,
    totalPages: 1,
    total: 1,
  });

  useEffect(() => {
    // Assuming 10 items per page
    const itemsPerPage = 10;
    const totalPages = Math.ceil(pagination.total / itemsPerPage);
    setPagination((prev) => ({ ...prev, totalPages }));
  }, [pagination.total]);

  useEffect(() => {
    const fetchTournaments = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          ...(searchQuery.title && { title: searchQuery.title }),
          ...(searchQuery.location && { city: searchQuery.location }),
          ...(pagination.page !== 1 && { page: pagination.page.toString() }),
        });

        const response = await fetch(
          `http://localhost:3000/api/tournaments?${queryParams}`
        );
        if (!response.ok) {
          setError({error:true,message:"Error fetching tournaments"})
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTournaments(data.data.tournaments);
        console.log(data.data.tournaments);
        setPagination((prev) => ({ ...prev, total: data.data.total }));
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        // Add error state here
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, [searchQuery, pagination.page]);

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Update the search query state which will trigger the API call
    setSearchQuery({
      title: searchInputs.title,
      location: searchInputs.location,
    });
    // Reset to first page when searching
    setPagination((prev) => ({ ...prev, page: 1 }));
  }

  return (
    <div className="w-full bg-white text-black flex flex-col justify-center items-center pt-5">
      <form
        className="flex items-center space-x-2 mb-4 w-full px-[5%]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search by title"
          className="border rounded-md px-3 py-2 w-64"
          value={searchInputs.title}
          onChange={(e) =>
            setSearchInputs({ ...searchInputs, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Search by location"
          className="border rounded-md px-3 py-2 w-64"
          value={searchInputs.location}
          onChange={(e) =>
            setSearchInputs({ ...searchInputs, location: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button> {error?.error && <p className="text-red-500">{error.message}</p>}
      </form>

      {isLoading ? (
        <div className="w-full min-h-96 flex justify-center items-center text-center py-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-lg font-semibold text-blue-500">
            Loading tournaments...
          </p>
        </div>
      ) : (
        <>
          <div className="flex space-x-2 w-full">
            <TournamentTableView tournaments={tournaments} />
          </div>
          <div className="flex space-x-2 w-full">
            <Pagination pagination={pagination} onPageChange={onPageChange} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
