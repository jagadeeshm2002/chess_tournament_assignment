import { Model, DataTypes, Sequelize, ModelDefined, Optional } from "sequelize";

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

interface TournamentAttributes {
  id: number;
  title: string;
  fideRated: boolean;
  organizerName: string;
  tournamentLevel: TournamentLevel;
  startDate:string;
  endDate: string;
  reportingTime: string | null;
  registrationDeadline: string;
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

interface TournamentCreationAttributes
  extends Optional<TournamentAttributes, "id" | "createdAt" | "updatedAt"> {}

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
      title: {
        type: DataTypes.STRING(100),
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
        type: DataTypes.STRING(100),
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
        allowNull: false,
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reportingTime: {
        type: DataTypes.STRING(8),
        allowNull: true,
        defaultValue: "00:00:00",
      },
      registrationDeadline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registrationDeadlineTime: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      chiefArbiterName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      tournamentDirectorName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      registrationFeesCurrency: {
        type: DataTypes.STRING(3),
        defaultValue: "INR",
      },
      registrationFeesAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      numberOfRounds: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      timeControlType: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      timeControlDuration: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      timeControlIncrement: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      tournamentType: {
        type: DataTypes.ENUM("rapid", "blitz", "classical", "swiss", "roundrobin"),
        allowNull: true,
      },
      nationalApproval: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      stateApproval: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      districtApproval: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      contactPersonName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      emailId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      contactNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      alternateContact: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      numberOfTrophiesMale: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
      },
      numberOfTrophiesFemale: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
      },
      totalCashPrize: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      country: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      pincode: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      venueAddress: {
        type: DataTypes.TEXT('tiny'),
        allowNull: true,
      },
      nearestLandmark: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      brochureUrl: {
        type: DataTypes.STRING(255),
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
      ageCategories: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      foodOptions: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
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
      indexes: [
        { fields: ['title'] },
        { fields: ['startDate'] },
        { fields: ['registrationDeadline'] },
        { fields: ['tournamentLevel'] }
      ],
    }
  );

  return Tournament;
};