export async function fetchAvailablePlaces ()
{
  const resp = await fetch('http://localhost:3000/places');
  if (!resp.ok) throw new Error('ошибка при получении данных');
  const { places } = await resp.json();

  return places;
}

export async function fetchPlaces (path)
{
  const resp = await fetch('http://localhost:3000/' + path);
  if (!resp.ok) throw new Error('ошибка при получении данных');
  const { places } = await resp.json();

  return places;
}

export async function updateUserPlaces (places)
{
  const resp = await fetch('http://localhost:3000/user-places',
    {
      method: 'PUT',
      body: JSON.stringify({ places }),
      headers:
      {
        'Content-Type': 'application/json'
      }
    }
  );

  if (!resp.ok) throw new Error('Не удалось сохранить данные');

  const resData = await resp.json();
  return resData.message;
}