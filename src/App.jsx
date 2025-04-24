import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchPlaces, updateUserPlaces } from './HTTP.js';
import Error from './components/Error.jsx';
import useFetch from './hooks/useFetch.js';

function App ()
{
  const selectedPlace = useRef();

  const {
    isLoading,
    loadingError,
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces
  } = useFetch(fetchPlaces.bind(null, 'user-places'), []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState(null);

  function handleStartRemovePlace (place)
  {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace ()
  {
    setModalIsOpen(false);
  }

  async function handleSelectPlace (selectedPlace)
  {
    setUserPlaces(prevPickedPlaces =>
    {
      if (!prevPickedPlaces) prevPickedPlaces = [];
      //исключаем повторный выбор места
      if (prevPickedPlaces.some(place => place.id === selectedPlace.id))
        return prevPickedPlaces;

      return [selectedPlace, ...prevPickedPlaces];
    });

    //оптимистичное обновление
    try
    {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    }
    catch (error)
    {
      setUserPlaces(userPlaces);
      setError(
        {
          message: `Выбранное место не сохранено. ( ${error.message})`
        }
      );
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace ()
  {
    setUserPlaces(prevPickedPlaces =>
      prevPickedPlaces.filter(place => place.id !== selectedPlace.current.id)
    );

    try
    {
      const updatePlaces = userPlaces.filter(place => place.id !== selectedPlace.current.id);
      await updateUserPlaces(updatePlaces);
    }
    catch (error)
    {
      setUserPlaces(userPlaces);
      setError(
        {
          message: `Выбранное место не удалено. ( ${error.message})`
        }
      );
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  function handleError ()
  {
    setError(null);
  }

  return (
    <>
      <Modal open={error} onClick={handleError}>
        {error && <Error
          title='Ошибка!'
          message={error.message}
          onConfirm={handleError}
        />}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt='Stylized globe' />
        <h1>Любимые места</h1>
        <p>
          Создайте свою личную коллекцию мест, которые вы хотели бы посетить или
          которые вы уже посетили.
        </p>
      </header>
      <main>
        {loadingError && <Error title='Ошибка' message={loadingError.message} />}
        {!loadingError &&
          <Places
            title='Что я хотел бы навестить ...'
            fallbackText='Ниже выберите места, которые хотели бы посетить.'
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
            isLoading={isLoading}
            loadingMessage='Идет загрузка данных. Ждите...'
          />
        }

        <AvailablePlaces
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
