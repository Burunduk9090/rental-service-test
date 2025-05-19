import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";
import ApartmentCard from "../../components/ApartmentCard.jsx";

const API_URL = `${import.meta.env.VITE_API_URL}/apartments/apartments/`;

const ApartmentListPage = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    price_min: "",
    price_max: "",
    number_of_rooms: "",
    availability: "",
  });

  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const fetchApartments = async (url = API_URL, applyFilters = false) => {
    setLoading(true);
    try {
      const filterParams = applyFilters
        ? `?price__gte=${filters.price_min}&price__lte=${filters.price_max}&number_of_rooms=${filters.number_of_rooms}&availability=${filters.availability}`
        : "";

      const response = await axios.get(`${url}${applyFilters ? filterParams : ""}`);
      setApartments(response.data.results || []);
      setNextPage(response.data.next || null);
      setPreviousPage(response.data.previous || null);
      setError(null);
    } catch (err) {
      setError("Failed to load the list of apartments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchApartments(API_URL, true);
  };

  const handleClearFilters = () => {
    setFilters({
      price_min: "",
      price_max: "",
      number_of_rooms: "",
      availability: "",
    });
    fetchApartments(API_URL, false);
  };

  if (loading) return <p className="text-center text-lg py-8">Loading...</p>;
  if (error) return <p className="text-center text-red-600 py-8">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Apartment List</h1>

      <form
        className="grid sm:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-lg mb-6"
        onSubmit={handleApplyFilters}
      >
        <label className="flex flex-col gap-1">
          Minimum Price:
          <input
            type="number"
            name="price_min"
            value={filters.price_min}
            onChange={handleFilterChange}
            placeholder="0"
            className="mt-1 p-2 w-full border rounded"
          />
        </label>
        <label className="flex flex-col gap-1">
          Maximum Price:
          <input
            type="number"
            name="price_max"
            value={filters.price_max}
            onChange={handleFilterChange}
            placeholder="0"
            className="mt-1 p-2 w-full border rounded"
          />
        </label>
        <label className="flex flex-col gap-1">
          Number of Rooms:
          <input
            type="number"
            name="number_of_rooms"
            value={filters.number_of_rooms}
            onChange={handleFilterChange}
            placeholder="0"
            className="mt-1 p-2 w-full border rounded"
          />
        </label>
        <label className="flex flex-col gap-1">
          Availability:
          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="">-- Select --</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </label>
        <div className="col-span-4 sm:col-span-1 flex items-end gap-2">
          <Button type="submit" className="w-full">
            Apply
          </Button>
          <Button
            type="button"
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
        </div>
      </form>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {apartments.length > 0 ? (
          apartments.map((apartment) => (
            <ApartmentCard key={apartment.slug} apartment={apartment} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No apartments found.</p>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button
          onClick={() => fetchApartments(previousPage)}
          disabled={!previousPage}
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          onClick={() => fetchApartments(nextPage)}
          disabled={!nextPage}
          variant="primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ApartmentListPage;