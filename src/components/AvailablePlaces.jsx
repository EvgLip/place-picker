import Places from './Places.jsx';

export default function AvailablePlaces ({ onSelectPlace })
{
  return (
    <Places
      title="Доступные места"
      places={[]}
      fallbackText="Список доступных мест пуст."
      onSelectPlace={onSelectPlace}
    />
  );
}
