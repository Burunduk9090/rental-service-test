import React from "react";
import { Link } from "react-router-dom";

const ApartmentCard = ({ apartment }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <h3 className="text-lg font-semibold">
        <span className={`${!apartment.availability ? "blur-[0.8px]" : ""}`}>
          {apartment.name}
        </span>
      </h3>
      <p>
        <span className="font-medium">Price:</span> <span>{apartment.price} UAH</span>
      </p>
      <p>
        <span className="font-medium">Number of rooms:</span> <span>{apartment.number_of_rooms}</span>
      </p>
      <p>
        <span className="font-medium">Availability:</span>{" "}
        <span className={apartment.availability ? "text-green-600" : "text-red-600"}>
          {apartment.availability ? "Available" : "Unavailable"}
        </span>
      </p>
      <Link
        to={`/apartments/${apartment.slug}/`}
        className="mt-2 text-blue-600 hover:underline font-medium"
      >
        Details
      </Link>
    </div>
  );
};

export default ApartmentCard;