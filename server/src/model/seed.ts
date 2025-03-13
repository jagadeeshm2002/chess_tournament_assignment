import {
  CreateTournamentInput,
  Tournament as ZodTournament,
} from "../types/zod";

// Sample tournament data for testing
export const tournamentSeedData: CreateTournamentInput[] = [
  {
    title: "Chefss Masfters Champfdsdfsdfhip 2025",
    fideRated: true,
    organizerName: "International Chess Federation",
    tournamentLevel: "international",
    startDate: "2025-05-10",
    endDate: "2025-05-15",
    reportingTime: "09:00 AM",
    registrationDeadline: "2025-04-25",
    registrationDeadlineTime: "11:59 PM",
    chiefArbiterName: "Michael Torres",
    tournamentDirectorName: "Sophie Chen",
    registrationFeesCurrency: "USD",
    registrationFeesAmount: 150,
    numberOfRounds: 7,
    timeControlType: "swiss",
    timeControlDuration: "90 minutes",
    timeControlIncrement: "30 seconds",
    tournamentType: "swiss",
    nationalApproval: true,
    stateApproval: true,
    districtApproval: true,
    contactPersonName: "John Smith",
    emailId: "tournament@chessorg.com",
    contactNumber: "+1-555-123-4567",
    alternateContact: "+1-555-765-4321",
    numberOfTrophiesMale: 5,
    numberOfTrophiesFemale: 5,
    totalCashPrize: 10000,
    country: "United States",
    state: "California",
    district: "San Francisco",
    city: "San Francisco",
    pincode: "94105",
    venueAddress: "Chess Grand Hall, 123 Market Street",
    nearestLandmark: "Financial District",
    brochureUrl: "https://example.com/tournament-brochure.pdf",
    locationLatitude: 37.7749,
    locationLongitude: -122.4194,
    chessboardProvided: true,
    timerProvided: true,
    parkingFacility: 3,
    hasFoodFacility: true,
    ageCategories: [
      { gender: "male", category: "Open" },
      { gender: "female", category: "Open" },
      { gender: "male", category: "U18" },
      { gender: "female", category: "U18" },
    ],
    foodOptions: [
      { type: "breakfast", available: true },
      { type: "lunch", available: true },
      { type: "dinner", available: true },
      { type: "snacks", available: true },
      { type: "beverages", available: true },
    ],
  },
  {
    title: "Stafte sdfsfdasdfmpionship",
    fideRated: false,
    organizerName: "State Chess Association",
    tournamentLevel: "state",
    startDate: "2025-06-20",
    endDate: "2025-06-22",
    reportingTime: "08:30 AM",
    registrationDeadline: "2025-06-10",
    registrationDeadlineTime: "06:00 PM",
    chiefArbiterName: "Robert Johnson",
    tournamentDirectorName: "Emily Davis",
    registrationFeesCurrency: "INR",
    registrationFeesAmount: 2000,
    numberOfRounds: 5,
    timeControlType: "swiss",
    timeControlDuration: "60 minutes",
    timeControlIncrement: "10 seconds",
    tournamentType: "roundrobin",
    nationalApproval: false,
    stateApproval: true,
    districtApproval: true,
    contactPersonName: "Raj Patel",
    emailId: "statechess@example.com",
    contactNumber: "+91-9876543210",
    alternateContact: "+91-8765432109",
    numberOfTrophiesMale: 3,
    numberOfTrophiesFemale: 3,
    totalCashPrize: 50000,
    country: "India",
    state: "Maharashtra",
    district: "Mumbai",
    city: "Mumbai",
    pincode: "400001",
    venueAddress: "State Sports Complex, Marine Drive",
    nearestLandmark: "Gateway of India",
    brochureUrl: "https://example.com/state-championship.pdf",
    locationLatitude: 18.922,
    locationLongitude: 72.8347,
    chessboardProvided: true,
    timerProvided: true,
    parkingFacility: 2,
    hasFoodFacility: true,
    ageCategories: [
      { gender: "male", category: "Open" },
      { gender: "female", category: "Open" },
    ],
    foodOptions: [
      { type: "lunch", available: true },
      { type: "snacks", available: true },
      { type: "beverages", available: true },
    ],
  },
  {
    title: "Universfifty sdffss Tournament",
    fideRated: false,
    organizerName: "University Chess Club",
    tournamentLevel: "university",
    startDate: "2025-03-25",
    endDate: "2025-03-26",
    reportingTime: "10:00 AM",
    registrationDeadline: "2025-03-20",
    registrationDeadlineTime: "05:00 PM",
    chiefArbiterName: "Professor Williams",
    tournamentDirectorName: "Emily Davis",
    registrationFeesCurrency: "INR",
    registrationFeesAmount: 500,
    numberOfRounds: 4,
    timeControlType: "rapid",
    timeControlDuration: "30 minutes",
    timeControlIncrement: "5 seconds",
    tournamentType: "rapid",
    nationalApproval: false,
    stateApproval: false,
    districtApproval: false,
    contactPersonName: "Student Council",
    emailId: "chessclub@university.edu",
    contactNumber: "+91-7654321098",
    alternateContact: "+91-8765432109",
    numberOfTrophiesMale: 1,
    numberOfTrophiesFemale: 1,
    totalCashPrize: 5000,
    country: "India",
    state: "Karnataka",
    district: "Bangalore",
    city: "Bangalore",
    pincode: "560001",
    venueAddress: "University Main Hall",
    nearestLandmark: "Central Library",

    locationLatitude: 12.9716,
    locationLongitude: 77.5946,
    chessboardProvided: true,
    timerProvided: false,
    parkingFacility: 1,
    hasFoodFacility: false,
    ageCategories: [
      { gender: "male", category: "University Students" },
      { gender: "female", category: "University Students" },
    ],
    foodOptions: [
      { type: "snacks", available: true },
      { type: "beverages", available: true },
    ],
  },
];

// Complete tournament data with IDs and timestamps
export const completeTournamentData: ZodTournament[] = tournamentSeedData.map(
  (tournament) => ({
    ...tournament,

    createdAt: new Date(),
    updatedAt: new Date(),
  })
);

