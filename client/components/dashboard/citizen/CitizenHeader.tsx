import { Link } from "react-router-dom";

export const CitizenHeader = () => {
  return (
    <header className="relative bg-blue-100 p-6 shadow-md rounded-b-lg">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Report Water Issue – FairWater
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mt-1">
          Raipur Smart Water Complaint Portal
        </p>
      </div>
      <Link
        to="/admin"
        className="absolute top-4 right-4 text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
      >
        Admin Panel
      </Link>
    </header>
  );
};