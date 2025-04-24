import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchPlaces } from '../HTTP.js';
import useFetch from '../hooks/useFetch.js';

async function fetchSortedPlaces ()
{
	const places = await fetchPlaces('places');
	return new Promise((resolve, reject) =>
	{
		navigator.geolocation.getCurrentPosition(position =>
		{
			const sortedPlaces = sortPlacesByDistance(places, position.coords.lat, position.coords.lon);
			return resolve(sortedPlaces);
		});
	});
}

export default function AvailablePlaces ({ onSelectPlace })
{
	const {
		isLoading,
		loadingError,
		fetchedData: availabelPlaces
	} = useFetch(fetchSortedPlaces, []);

	if (loadingError) return <Error title='Ошибка' message={loadingError.message} />;

	return (
		<Places
			title='Доступные места'
			places={availabelPlaces}
			fallbackText='Список доступных мест пуст.'
			onSelectPlace={onSelectPlace}
			isLoading={isLoading}
			loadingMessage='Идет загрузка данных. Ждите...'
		/>
	);
}
