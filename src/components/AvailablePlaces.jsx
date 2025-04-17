import { useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces ({ onSelectPlace })
{
  const [availabelPlaces, setAvailabelPlaces] = useState([]);

  return (
    <Places
      title="Доступные места"
      places={availabelPlaces}
      fallbackText="Список доступных мест пуст."
      onSelectPlace={onSelectPlace}
    />
  );
}
