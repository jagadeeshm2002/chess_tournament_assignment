import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTournamentSchema } from "../types/zod";

export default function CreateTournament() {
  // const [ageCategories, setAgeCategories] = useState<
  //   typeof createTournamentSchema._type.ageCategories
  // >([]);
  // const [foodOptions, setFoodOptions] = useState<
  //   typeof createTournamentSchema._type.foodOptions
  // >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm({
    resolver: zodResolver(createTournamentSchema),
    defaultValues: {
      fideRated: false,
      registrationFeesCurrency: "INR",
      nationalApproval: false,
      stateApproval: false,
      districtApproval: false,
      numberOfTrophiesMale: 0,
      numberOfTrophiesFemale: 0,
      totalCashPrize: 0,
      chessboardProvided: false,
      timerProvided: false,
      parkingFacility: 0,
      hasFoodFacility: false,
    },
  });

  const onSubmit = async (data: typeof createTournamentSchema._type) => {
    try {
      const response = await fetch("http://localhost:3000/api/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <h1 className="text-2xl font-bold">Create Tournament</h1>

      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organizer Name
            </label>
            <input
              type="text"
              {...register("organizerName")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.organizerName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.organizerName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tournament Level
            </label>
            <select
              {...register("tournamentLevel")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="local">Local</option>
              <option value="district">District</option>
              <option value="state">State</option>
              <option value="national">National</option>
              <option value="international">International</option>
            </select>
            {errors.tournamentLevel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tournamentLevel.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <input
              type="checkbox"
              id="fideRated"
              {...register("fideRated")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label
              htmlFor="fideRated"
              className="text-sm font-medium text-gray-700"
            >
              FIDE Rated
            </label>
          </div>
        </div>
      </div>

      {/* Dates and Times */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Dates and Times</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              {...register("startDate", { valueAsDate: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              {...register("endDate", { valueAsDate: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reporting Time
            </label>
            <input
              type="text"
              placeholder="e.g. 09:00 AM"
              {...register("reportingTime")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.reportingTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reportingTime.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration Deadline
            </label>
            <input
              type="date"
              {...register("registrationDeadline", { valueAsDate: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.registrationDeadline && (
              <p className="text-red-500 text-sm mt-1">
                {errors.registrationDeadline.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration Deadline Time
            </label>
            <input
              type="text"
              placeholder="e.g. 11:59 PM"
              {...register("registrationDeadlineTime")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.registrationDeadlineTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.registrationDeadlineTime.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Officials */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tournament Officials</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chief Arbiter Name
            </label>
            <input
              type="text"
              {...register("chiefArbiterName")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.chiefArbiterName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.chiefArbiterName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tournament Director Name
            </label>
            <input
              type="text"
              {...register("tournamentDirectorName")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.tournamentDirectorName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tournamentDirectorName.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tournament Format */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tournament Format</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Rounds
            </label>
            <input
              type="number"
              {...register("numberOfRounds", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.numberOfRounds && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numberOfRounds.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tournament Type
            </label>
            <select
              {...register("tournamentType")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="swiss">Swiss</option>
              <option value="roundrobin">Round Robin</option>
              <option value="rapid">Rapid</option>
              <option value="blitz">Blitz</option>
              <option value="classical">Classical</option>
            </select>
            {errors.tournamentType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tournamentType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Control Type
            </label>
            <select
              {...register("timeControlType")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="classical">Classical</option>
              <option value="rapid">Rapid</option>
              <option value="blitz">Blitz</option>
              <option value="swiss">Swiss</option>
              <option value="roundRobin">Round Robin</option>
            </select>
            {errors.timeControlType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.timeControlType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Control Duration
            </label>
            <input
              type="text"
              placeholder="e.g. 90 minutes"
              {...register("timeControlDuration")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.timeControlDuration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.timeControlDuration.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Control Increment
            </label>
            <input
              type="text"
              placeholder="e.g. 30 seconds"
              {...register("timeControlIncrement")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.timeControlIncrement && (
              <p className="text-red-500 text-sm mt-1">
                {errors.timeControlIncrement.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="nationalApproval"
              {...register("nationalApproval")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label
              htmlFor="nationalApproval"
              className="text-sm font-medium text-gray-700"
            >
              National Approval
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="stateApproval"
              {...register("stateApproval")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label
              htmlFor="stateApproval"
              className="text-sm font-medium text-gray-700"
            >
              State Approval
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="districtApproval"
              {...register("districtApproval")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label
              htmlFor="districtApproval"
              className="text-sm font-medium text-gray-700"
            >
              District Approval
            </label>
          </div>
        </div>
      </div>

      {/* Registration & Fees */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Registration & Fees</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration Fees Amount
            </label>
            <input
              type="number"
              {...register("registrationFeesAmount", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.registrationFeesAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.registrationFeesAmount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration Fees Currency
            </label>
            <select
              {...register("registrationFeesCurrency")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            {errors.registrationFeesCurrency && (
              <p className="text-red-500 text-sm mt-1">
                {errors.registrationFeesCurrency.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Person Name
            </label>
            <input
              type="text"
              {...register("contactPersonName")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.contactPersonName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactPersonName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email ID
            </label>
            <input
              type="email"
              {...register("emailId")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.emailId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              {...register("contactNumber")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Alternate Contact
            </label>
            <input
              type="text"
              {...register("alternateContact")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.alternateContact && (
              <p className="text-red-500 text-sm mt-1">
                {errors.alternateContact.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Prizes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Prizes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Trophies (Male)
            </label>
            <input
              type="number"
              {...register("numberOfTrophiesMale", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.numberOfTrophiesMale && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numberOfTrophiesMale.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Trophies (Female)
            </label>
            <input
              type="number"
              {...register("numberOfTrophiesFemale", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.numberOfTrophiesFemale && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numberOfTrophiesFemale.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Cash Prize
            </label>
            <input
              type="number"
              {...register("totalCashPrize", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.totalCashPrize && (
              <p className="text-red-500 text-sm mt-1">
                {errors.totalCashPrize.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Venue Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Venue Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              {...register("country")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              {...register("state")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <input
              type="text"
              {...register("district")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">
                {errors.district.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              {...register("city")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              {...register("pincode")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pincode.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Venue Address
            </label>
            <input
              type="text"
              {...register("venueAddress")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.venueAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.venueAddress.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nearest Landmark
            </label>
            <input
              type="text"
              {...register("nearestLandmark")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.nearestLandmark && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nearestLandmark.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brochure URL
            </label>
            <input
              type="text"
              {...register("brochureUrl")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.brochureUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brochureUrl.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location Latitude
            </label>
            <input
              type="number"
              step="0.0001"
              {...register("locationLatitude", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.locationLatitude && (
              <p className="text-red-500 text-sm mt-1">
                {errors.locationLatitude.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location Longitude
            </label>
            <input
              type="number"
              step="0.0001"
              {...register("locationLongitude", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.locationLongitude && (
              <p className="text-red-500 text-sm mt-1">
                {errors.locationLongitude.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="chessboardProvided"
              {...register("chessboardProvided")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label
              htmlFor="chessboardProvided"
              className="text-sm font-medium text-gray-700"
            >
              Chessboard Provided
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="timerProvided"
              {...register("timerProvided")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label
              htmlFor="timerProvided"
              className="text-sm font-medium text-gray-700"
            >
              Timer Provided
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parking Facility
            </label>
            <select
              {...register("parkingFacility", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value={0}>None</option>
              <option value={1}>Limited</option>
              <option value={2}>Adequate</option>
              <option value={3}>Ample</option>
            </select>
            {errors.parkingFacility && (
              <p className="text-red-500 text-sm mt-1">
                {errors.parkingFacility.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasFoodFacility"
              {...register("hasFoodFacility")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label
              htmlFor="hasFoodFacility"
              className="text-sm font-medium text-gray-700"
            >
              Food Facility Available
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
        >
          Create Tournament
        </button>
      </div>
    </form>
  );
}
{
  /* <div className="bg-white p-6 rounded-lg shadow-md">
<h2 className="text-xl font-semibold mb-4">Age Categories</h2>

{ageCategories.map((category, index) => (
  <div
    key={index}
    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b pb-4"
  >
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Gender
      </label>
      <select
        {...register(`ageCategories.${index}.gender`)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        Category
      </label>
      <select
        {...register(`ageCategories.${index}.category`)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      >
        <option value="Open">Open</option>
        <option value="U18">Under 18</option>
        <option value="U16">Under 16</option>
        <option value="U14">Under 14</option>
        <option value="U12">Under 12</option>
        <option value="U10">Under 10</option>
        <option value="U8">Under 8</option>
      </select>
    </div>
  </div>
))}

<button
  type="button"
  onClick={addAgeCategory}
  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md mt-2"
>
  + Add Age Category
</button>
</div>

<div className="bg-white p-6 rounded-lg shadow-md">
<h2 className="text-xl font-semibold mb-4">Food Options</h2>

{foodOptions.map((option, index) => (
  <div
    key={index}
    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b pb-4"
  >
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Food Type
      </label>
      <select
        {...register(`foodOptions.${index}.type`)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      >
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snacks">Snacks</option>
        <option value="beverages">Beverages</option>
      </select>
    </div>

    <div className="flex items-center space-x-2 mt-6">
      <input
        type="checkbox"
        id={`foodOptions.${index}.available`}
        {...register(`foodOptions.${index}.available`)}
        className="h-4 w-4 rounded border-gray-300"
      />
      <label
        htmlFor={`foodOptions.${index}.available`}
        className="text-sm font-medium text-gray-700"
      >
        Available
      </label>
    </div>
  </div>
))}

<button
  type="button"
  // onClick={addFoodOption}
  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md mt-2"
>
  + Add Food Option
</button>
</div> */
}
