type GenderType = "male" | "female";
type FoodType = "breakfast" | "lunch" | "dinner" | "snacks" | "beverages";
type TournamentType = "rapid"| "blitz"| "classical"| "swiss"| "roundrobin";

type TournamentLevel = 
  | "international"
  | "national"
  | "state" 
  | "district"
  | "club"
  | "school"
  | "college"
  | "university"
  | "other";

interface AgeCategory {
  gender: GenderType;
  category: string;
}

interface FoodOption {
  type: FoodType;
  available: boolean;
}

export interface Tournament {
  id: number;
  title: string;
  fideRated: boolean;
  organizerName: string;
  tournamentLevel: TournamentLevel;
  startDate:Date;
  endDate: Date;
  reportingTime: string | null;
  registrationDeadline: Date;
  registrationDeadlineTime: string;
  chiefArbiterName: string | null;
  tournamentDirectorName: string | null;
  registrationFeesCurrency: string;
  registrationFeesAmount: number | null;
  numberOfRounds: number | null;
  timeControlType: string | null;
  timeControlDuration: string | null;
  timeControlIncrement: string | null;
  tournamentType: TournamentType | null;
  nationalApproval: boolean;
  stateApproval: boolean;
  districtApproval: boolean;
  contactPersonName: string | null;
  emailId: string | null;
  contactNumber: string | null;
  alternateContact: string | null;
  numberOfTrophiesMale: number;
  numberOfTrophiesFemale: number;
  totalCashPrize: number;
  country: string | null;
  state: string | null;
  district: string | null;
  city: string | null;
  pincode: string | null;
  venueAddress: string | null;
  nearestLandmark: string | null;
  brochureUrl: string | null;
  locationLatitude: number | null;
  locationLongitude: number | null;
  chessboardProvided: boolean;
  timerProvided: boolean;
  parkingFacility: number;
  hasFoodFacility: boolean;
  ageCategories: AgeCategory[];
  foodOptions: FoodOption[];
  createdAt: Date;
  updatedAt: Date;
}