import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApartments } from '../../services/apartmentService';
import Filters from '../../components/apartments/Filters';
import ApartmentCard from '../../components/apartments/ApartmentCard';
import Pagination from '../common/Pagination.jsx';

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApartments();
  }, [filters, currentPage]);

  const fetchApartments = async () => {
    try {
      const data = await getApartments(filters, currentPage);
      setApartments(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // Повертаємося на першу сторінку при зміні фільтрів
  };

  const handleCardClick = (slug) => {
    navigate(`/apartments/${slug}`);
  };

  return (
    <div className="apartment-list container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Apartment List</h1>

      {/* Фільтри */}
      <Filters filters={filters} onChange={handleFilterChange} />

      {/* Список квартир */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.length > 0 ? (
          apartments.map((apartment) => (
            <ApartmentCard
              key={apartment.slug}
              apartment={apartment}
              onClick={() => handleCardClick(apartment.slug)}
            />
          ))
        ) : (
          <p className="text-gray-600">No apartments found.</p>
        )}
      </div>

      {/* Пагінація */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ApartmentList;