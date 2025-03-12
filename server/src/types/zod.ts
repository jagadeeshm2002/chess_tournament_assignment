import z from "zod";


export const tournamentIdSchema = z.object({
  id: z.number({ required_error: "Id is required" }),
});


// Define types for embedded data
const GenderType = z.enum(["male", "female"]);
const FoodType = z.enum(["breakfast", "lunch", "dinner", "snacks", "beverages"]);

const TournamentType = z.enum(["swiss", "roundrobin", "knockout"]);
const TournamentLevel = z.enum([
  "international",
  "national",
  "state",
  "district",
  "club",
  "school",
  "college",
  "university",
  "other"
]);

// Define embedded objects
const AgeCategorySchema = z.object({
  gender: GenderType,
  category: z.string().min(1)
});

const FoodOptionSchema = z.object({
  type: FoodType,
  available: z.boolean()
});

// Main tournament schema
export const createTournamentSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  fideRated: z.boolean().default(false),
  organizerName: z.string().min(1, { message: "Organizer name is required" }),
  tournamentLevel: z.enum(["international",
  "national",
  "state",
  "district",
  "club",
  "school",
  "college",
  "university",
  "other"]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  reportingTime: z.string(),
  registrationDeadline: z.string().datetime(),
  registrationDeadlineTime: z.string(),
  // Make these required instead of optional with refine
  chiefArbiterName: z.string().min(1, { message: "Chief arbiter name is required" }),
  tournamentDirectorName: z.string().min(1, { message: "Tournament director name is required" }),
  registrationFeesCurrency: z.string().default("INR"),
  registrationFeesAmount: z.number().nullish(),
  numberOfRounds: z.number().nullish(),
  timeControlType: z.string().nullish(),
  timeControlDuration: z.string().nullish(),
  timeControlIncrement: z.string().nullish(),
  // This appears to be duplicating timeControlType, decide if you need both
  tournamentType: z.enum(["rapid", "blitz", "classical", "swiss", "roundrobin"]).nullish(),
  nationalApproval: z.boolean().default(false),
  stateApproval: z.boolean().default(false),
  districtApproval: z.boolean().default(false),
  contactPersonName: z.string().min(1, { message: "Contact person name is required" }),
  emailId: z.string().email().nullish(),
  contactNumber: z.string().nullish(),
  alternateContact: z.string().nullish(),
  numberOfTrophiesMale: z.number().default(0),
  numberOfTrophiesFemale: z.number().default(0),
  totalCashPrize: z.number().default(0),
  country: z.string().nullish(),
  state: z.string().nullish(),
  district: z.string().nullish(),
  city: z.string().nullish(),
  pincode: z.string().nullish(),
  venueAddress: z.string().nullish(),
  nearestLandmark: z.string().nullish(),
  brochureUrl: z.string().nullish(),
  locationLatitude: z.number().nullish(),
  locationLongitude: z.number().nullish(),
  chessboardProvided: z.boolean().default(false),
  timerProvided: z.boolean().default(false),
  parkingFacility: z.number().max(3).default(0),
  hasFoodFacility: z.boolean().default(false),
  ageCategories: z.array(AgeCategorySchema).default([]),
  foodOptions: z.array(FoodOptionSchema).default([]),
});

// Define the output type for reference
export type CreateTournamentInput = z.infer<typeof createTournamentSchema>;

// You can also create a schema for return values that might include id and timestamps
export const tournamentSchema = createTournamentSchema.extend({
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Tournament = z.infer<typeof tournamentSchema>;

export const updateTournamentSchema = createTournamentSchema.partial();

export const getTournamentsSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  title: z.string().min(1, { message: "Title is required" }).optional(),
  city: z.string().min(1, { message: "City is required" }).optional(),
});
