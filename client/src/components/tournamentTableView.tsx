import { type Tournament } from "../types/type";
import { Link, useNavigate } from "react-router-dom";
export const TournamentTableView: React.FC<{ tournaments: Tournament[] }> = ({
  tournaments,
}) => {
  const columns = [
    { id: "title", label: "Tournament Title", sortable: false },
    { id: "fideRated", label: "FIDE Rated", sortable: true },
    { id: "totalCashPrize", label: "totalCashPrize", sortable: true },
    { id: "date", label: "Date", sortable: true },
    { id: "country", label: "Country", sortable: true },
    { id: "state", label: "State", sortable: true },
    { id: "city", label: "City", sortable: true },
    { id: "entryFees", label: "Entry Fees", sortable: false },
    { id: "actions", label: "", sortable: false },
  ];
  const navigate = useNavigate()
  // const tournaments = [
  //   {
  //     title: "Chess Masters Championship 2025",
  //     fideRated: true,
  //     organizerName: "International Chess Federation",
  //     tournamentLevel: "international",
  //     startDate: "2025-05-10",
  //     endDate: "2025-05-15",
  //     reportingTime: "09:00 AM",
  //     registrationDeadline: "2025-04-25",
  //     registrationDeadlineTime: "11:59 PM",
  //     chiefArbiterName: "Michael Torres",
  //     tournamentDirectorName: "Sophie Chen",
  //     registrationFeesCurrency: "USD",
  //     registrationFeesAmount: 150,
  //     numberOfRounds: 7,
  //     timeControlType: "swiss",
  //     timeControlDuration: "90 minutes",
  //     timeControlIncrement: "30 seconds",
  //     tournamentType: "swiss",
  //     nationalApproval: true,
  //     stateApproval: true,
  //     districtApproval: true,
  //     contactPersonName: "John Smith",
  //     emailId: "tournament@chessorg.com",
  //     contactNumber: "+1-555-123-4567",
  //     alternateContact: "+1-555-765-4321",
  //     numberOfTrophiesMale: 5,
  //     numberOfTrophiesFemale: 5,
  //     totalCashPrize: 10000,
  //     country: "United States",
  //     state: "California",
  //     district: "San Francisco",
  //     city: "San Francisco",
  //     pincode: "94105",
  //     venueAddress: "Chess Grand Hall, 123 Market Street",
  //     nearestLandmark: "Financial District",
  //     brochureUrl: "https://example.com/tournament-brochure.pdf",
  //     locationLatitude: 37.7749,
  //     locationLongitude: -122.4194,
  //     chessboardProvided: true,
  //     timerProvided: true,
  //     parkingFacility: 3,
  //     hasFoodFacility: true,
  //     ageCategories: [
  //       { gender: "male", category: "Open" },
  //       { gender: "female", category: "Open" },
  //       { gender: "male", category: "U18" },
  //       { gender: "female", category: "U18" },
  //     ],
  //     foodOptions: [
  //       { type: "breakfast", available: true },
  //       { type: "lunch", available: true },
  //       { type: "dinner", available: true },
  //       { type: "snacks", available: true },
  //       { type: "beverages", available: true },
  //     ],
  //   },
  // ];

  return (
    <div className="w-full bg-white text-black  px-[5%]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-3 text-left font-medium text-gray-800"
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.sortable && (
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tournaments.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center">
                  No tournaments found
                </td>
              </tr>
            ) : (
              tournaments.map((tournament) => (
                <tr
                  key={tournament.id || 1}
                  className="border-b hover:bg-gray-50"
                  onClick={() => navigate(`/${tournament.id}`)}
                >
                  <td className="px-4 py-4">{tournament.title}</td>
                  <td className="px-4 py-4">
                    {tournament.fideRated ? "yes" : "no"}
                  </td>
                  <td className="px-4 py-4">{tournament.totalCashPrize}</td>
                  <td className="px-4 py-4">
                    {tournament.startDate} To {tournament.endDate}
                  </td>
                  <td className="px-4 py-4 font-medium">
                    {tournament.country}
                  </td>
                  <td className="px-4 py-4">{tournament.state}</td>
                  <td className="px-4 py-4">{tournament.city}</td>
                  <td className="px-4 py-4">
                    {tournament.registrationFeesAmount}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <Link to={`/${tournament.id}`}>
                        <button className="px-3 py-1 bg-blue-700 text-white text-sm rounded">
                          More Details
                        </button>
                      </Link>
                      <button className="px-3 py-1 bg-green-600 text-white text-sm rounded flex items-center">
                        Brochure
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
