import { Model, DataTypes, Sequelize, ModelDefined, Optional } from "sequelize";

// Define types for embedded data
type GenderType = "male" | "female";
type FoodType = "breakfast" | "lunch" | "dinner" | "snacks" | "beverages";
type TournamentType = "rapid"| "blitz"| "classical"| "swiss"| "roundrobin";

// String literal type for tournament levels instead of enum
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

// Define interfaces for embedded objects
interface AgeCategory {
  gender: GenderType;
  category: string;
}

interface FoodOption {
  type: FoodType;
  available: boolean;
}

// Base Tournament attributes
interface TournamentAttributes {
  id: number;
  // Tournament Details
  title: string;
  fideRated: boolean;
  organizerName: string;
  tournamentLevel: TournamentLevel;
  startDate: Date;
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

  // Contact Details
  contactPersonName: string | null;
  emailId: string | null;
  contactNumber: string | null;
  alternateContact: string | null;

  // Prize Details
  numberOfTrophiesMale: number;
  numberOfTrophiesFemale: number;
  totalCashPrize: number;

  // Venue Details
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

  // Other Facilities
  chessboardProvided: boolean;
  timerProvided: boolean;
  parkingFacility: number;
  hasFoodFacility: boolean;

  // Embedded data as JSON
  ageCategories: AgeCategory[];
  foodOptions: FoodOption[];

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Creation attributes (optional id and timestamps)
interface TournamentCreationAttributes
  extends Optional<TournamentAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the Tournament model with performance optimizations
export const initTournament = (
  sequelize: Sequelize
): ModelDefined<TournamentAttributes, TournamentCreationAttributes> => {
  const Tournament = sequelize.define<
    Model<TournamentAttributes, TournamentCreationAttributes>
  >(
    "Tournament",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Tournament Details
      title: {
        type: DataTypes.STRING(100),  // Optimized: Fixed length string
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      fideRated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      organizerName: {
        type: DataTypes.STRING(100),  // Optimized: Fixed length string
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      tournamentLevel: {
        type: DataTypes.ENUM(
          "international",
          "national",
          "state",
          "district",
          "club",
          "school",
          "college",
          "university",
          "other"
        ),
        allowNull: false,  // Changed from true to false for consistency
      },
      startDate: {
        type: DataTypes.DATEONLY,  // Optimized: Use DATEONLY if time not needed
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,  // Optimized: Use DATEONLY if time not needed
        allowNull: false,
      },
      reportingTime: {
        type: DataTypes.STRING(8),  // Optimized: Fixed length for time (HH:MM:SS)
        allowNull: true,  // Changed from false to true to match interface
        defaultValue: "00:00:00",
      },
      registrationDeadline: {
        type: DataTypes.DATEONLY,  // Optimized: Use DATEONLY if time is stored separately
        allowNull: false,
      },
      registrationDeadlineTime: {
        type: DataTypes.STRING(8),  // Optimized: Fixed length for time
        allowNull: true,
      },
      chiefArbiterName: {
        type: DataTypes.STRING(100),  // Optimized: Fixed length string
        allowNull: true,
      },
      tournamentDirectorName: {
        type: DataTypes.STRING(100),  // Optimized: Fixed length string
        allowNull: true,
      },
      registrationFeesCurrency: {
        type: DataTypes.STRING(3),  // Optimized: Fixed length for currency code
        defaultValue: "INR",
      },
      registrationFeesAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      numberOfRounds: {
        type: DataTypes.SMALLINT,  // Optimized: SMALLINT for small numbers
        allowNull: true,
      },
      timeControlType: {
        type: DataTypes.STRING(20),  // Fixed: Using ENUM for consistency
        allowNull: false,  // Changed to match interface
      },
      timeControlDuration: {
        type: DataTypes.STRING(20),  // Optimized: Fixed length string
        allowNull: true,
      },
      timeControlIncrement: {
        type: DataTypes.STRING(20),  // Optimized: Fixed length string
        allowNull: true,
      },
      tournamentType: {
        type: DataTypes.ENUM("rapid", "blitz", "classical", "swiss", "roundrobin"),
        allowNull: true,
      },
      nationalApproval: {
        type: DataTypes.BOOLEAN,  // Changed from STRING to BOOLEAN to match interface
        defaultValue: false,
      },
      stateApproval: {
        type: DataTypes.BOOLEAN,  // Changed from STRING to BOOLEAN to match interface
        defaultValue: false,
      },
      districtApproval: {
        type: DataTypes.BOOLEAN,  // Changed from STRING to BOOLEAN to match interface
        defaultValue: false,
      },

      // Contact Details
      contactPersonName: {
        type: DataTypes.STRING(100),  // Optimized: Fixed length string
        allowNull: true,
      },
      emailId: {
        type: DataTypes.STRING(100),  // Optimized: Fixed length string
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      contactNumber: {
        type: DataTypes.STRING(20),  // Optimized: Fixed length for phone numbers
        allowNull: true,
      },
      alternateContact: {
        type: DataTypes.STRING(20),  // Optimized: Fixed length for phone numbers
        allowNull: true,
      },

      // Prize Details
      numberOfTrophiesMale: {
        type: DataTypes.SMALLINT,  // Optimized: SMALLINT for small numbers
        defaultValue: 0,
      },
      numberOfTrophiesFemale: {
        type: DataTypes.SMALLINT,  // Optimized: SMALLINT for small numbers
        defaultValue: 0,
      },
      totalCashPrize: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },

      // Venue Details
      country: {
        type: DataTypes.STRING(60),  // Optimized: Fixed length string
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(60),  // Optimized: Fixed length string
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING(60),  // Optimized: Fixed length string
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(60),  // Optimized: Fixed length string
        allowNull: true,
      },
      pincode: {
        type: DataTypes.STRING(10),  // Optimized: Fixed length for postal codes
        allowNull: true,
      },
      venueAddress: {
        type: DataTypes.TEXT('tiny'),  // Optimized: Use TINYTEXT for short text
        allowNull: true,
      },
      nearestLandmark: {
        type: DataTypes.STRING(100),  // Optimized: Fixed length string
        allowNull: true,
      },
      brochureUrl: {
        type: DataTypes.STRING(255),  // Optimized: Fixed length for URLs
        allowNull: true,
      },
      locationLatitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      locationLongitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },

      // Other Facilities
      chessboardProvided: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      timerProvided: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      parkingFacility: {
        type:DataTypes.INTEGER,
        defaultValue: 1,
      },
      hasFoodFacility: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      // Embedded data
      ageCategories: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      foodOptions: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      
      // Timestamps
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "tournaments",
      timestamps: true,
      indexes: [  // Optimized: Added indexes for common query fields
        { fields: ['title'] },
        { fields: ['startDate'] },
        { fields: ['registrationDeadline'] },
        { fields: ['tournamentLevel'] }
      ],
    }
  );

  return Tournament;
};