import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../HTTP.js';

export default function AvailablePlaces ({ onSelectPlace })
{
	const [availabelPlaces, setAvailabelPlaces] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState(null);

	useEffect(function ()
	{
		getPlaces();

		async function getPlaces ()
		{
			try
			{
				setIsLoading(true);
				const places = await fetchAvailablePlaces();

				navigator.geolocation.getCurrentPosition(position =>
				{
					const sortedPlaces = sortPlacesByDistance(places, position.coords.lat, position.coords.lon);

					setAvailabelPlaces(sortedPlaces);
					setIsLoading(false);
				});
				// setAvailabelPlaces(places);
			}
			catch (error)
			{
				setErrors(
					{
						message: error.message || 'Не удалось найти место, попробуйте позже.'
					});
				setIsLoading(false);
			}
			// setIsLoading(false);
		}
	}, []);

	if (errors) return <Error title='Ошибка' message={errors.message} />;

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
