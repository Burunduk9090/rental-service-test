import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/apartments/apartments/`;

const ApartmentDetailPage = () => {
  const { slug } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}${slug}/`);
        setApartment(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load apartment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchApartmentDetails();
  }, [slug]);

  if (loading) return <p className="text-center text-lg py-8">Loading...</p>;
  if (error) return <p className="text-center text-red-600 py-8">{error}</p>;
  if (!apartment) return <p className="text-center text-gray-500 py-8">Apartment not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{apartment.name}</h1>
      <p className="text-lg">
        <strong className="font-medium">Price:</strong> {apartment.price} UAH
      </p>
      <p className="text-lg">
        <strong className="font-medium">Number of rooms:</strong> {apartment.number_of_rooms}
      </p>
      <p className="text-lg">
        <strong className="font-medium">Availability:</strong>{" "}
        <span className={apartment.availability ? "text-green-600" : "text-red-600"}>
          {apartment.availability ? "Available" : "Unavailable"}
        </span>
      </p>
      <p className="text-lg">
        <strong className="font-medium">Description:</strong> {apartment.description}
      </p>

      <button
        onClick={() => window.history.back()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back
      </button>
    </div>
  );
};

export default ApartmentDetailPage;