import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApartmentDetails } from '../../services/apartmentService';

const ApartmentDetail = () => {
  const { slug } = useParams();
  const [apartment, setApartment] = useState(null);

  useEffect(() => {
    fetchApartmentDetails();
  }, [slug]);

  const fetchApartmentDetails = async () => {
    try {
      const data = await getApartmentDetails(slug);
      setApartment(data);
    } catch (error) {
      console.error('Error fetching apartment details:', error);
    }
  };

  if (!apartment) {
    return <p>Loading apartment details...</p>;
  }

  return (
    <div className="apartment-detail container mx-auto px-4">
      <h1 className="text-3xl font-bold">{apartment.name}</h1>
      <p>{apartment.description}</p>
      <ul className="mt-4">
        <li>Price: ${apartment.price}</li>
        <li>Rooms: {apartment.number_of_rooms}</li>
        <li>Square: {apartment.square} m²</li>
        <li>
          Status:{' '}
          <span
            className={`font-bold ${
              apartment.available ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {apartment.available ? 'Available' : 'Unavailable'}
          </span>
        </li>
        <li>Created at: {new Date(apartment.created_at).toLocaleString()}</li>
        <li>Updated at: {new Date(apartment.updated_at).toLocaleString()}</li>
      </ul>
    </div>
  );
};

export default ApartmentDetail;