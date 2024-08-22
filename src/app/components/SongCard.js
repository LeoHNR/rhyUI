import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Importar iconos de react-icons
import { likeSong, dislikeSong, fetchSongAction } from '../services/songcard'; // Importar dislikeSong
import Link from 'next/link';

const SongCard = ({ song }) => {
  const [likesCount, setLikesCount] = useState(song.cantidad_megusta);
  const [action, setAction] = useState(null);
  const [liked, setLiked] = useState(false); // Estado para manejar si el usuario ha dado "Me gusta"
  const [isProcessing, setIsProcessing] = useState(false); // Estado para manejar el procesamiento

  useEffect(() => {
    const fetchAction = async () => {
      try {
        const actionResponse = await fetchSongAction(song.cancion_id);
        setAction(actionResponse);
      } catch (error) {
        console.error('Error fetching song action:', error);
      }
    };

    const checkIfLiked = () => {
      const userData = JSON.parse(localStorage.getItem('user_data')); // Obtener datos del usuario desde localStorage
      if (userData && userData.canciones_megusta.includes(song.cancion_id)) {
        setLiked(true); // Actualizar el estado a "Me gusta" si el usuario ha dado "Me gusta" a la canción
      }
    };

    fetchAction();
    checkIfLiked();
  }, [song.cancion_id]);

  const handleLike = async () => {
    try {
      setIsProcessing(true); // Iniciar procesamiento
      const token = localStorage.getItem('token'); // Obtener el token de autenticación
      if (!token) {
        window.location.href = '/login'; // Redirigir a la página de inicio de sesión si no hay token
        return;
      }

      await likeSong(song.cancion_id, token); // Pasar el token a la función likeSong
      setLikesCount(prevLikes => prevLikes + 1);
      setLiked(true); // Actualizar el estado a "Me gusta"

      // Actualizar los datos del usuario en localStorage
      const userData = JSON.parse(localStorage.getItem('user_data'));
      userData.canciones_megusta.push(song.cancion_id);
      localStorage.setItem('user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Error liking song:', error);
    } finally {
      setIsProcessing(false); // Finalizar procesamiento
    }
  };

  const handleDislike = async () => {
    try {
      setIsProcessing(true); // Iniciar procesamiento
      const token = localStorage.getItem('token'); // Obtener el token de autenticación
      if (!token) {
        window.location.href = '/login'; // Redirigir a la página de inicio de sesión si no hay token
        return;
      }

      await dislikeSong(song.cancion_id, token); // Pasar el token a la función dislikeSong
      setLikesCount(prevLikes => prevLikes - 1);
      setLiked(false); // Actualizar el estado a "No me gusta"

      // Actualizar los datos del usuario en localStorage
      const userData = JSON.parse(localStorage.getItem('user_data'));
      userData.canciones_megusta = userData.canciones_megusta.filter(id => id !== song.cancion_id);
      localStorage.setItem('user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Error disliking song:', error);
    } finally {
      setIsProcessing(false); // Finalizar procesamiento
    }
  };

  const handleAction = async (songId) => {
    try {
      const action = await fetchSongAction(songId);

      if (action.redirect) {
        if (action.redirect === '/login') {
          alert('No estás logeado. Serás redirigido a la página de login.');
        } else if (action.redirect === '/') {
          alert('Necesitas comprar la música para poder descargarla.');
        }
        window.location.href = action.redirect;
      } else if (action.action === 'download') {
        // Crear un enlace temporal y hacer clic en él para iniciar la descarga
        const link = document.createElement('a');
        link.href = action.enlace;
        link.download = ''; // Puedes especificar un nombre de archivo aquí si es necesario
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error fetching the song action:', error);
      alert('An error occurred while trying to perform the action');
    }
  };


  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="song-card p-6 border-2 border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-200 bg-gray-800 text-white cursor-pointer transform hover:scale-105">
      <Link href={`/songdetail/${song.cancion_id}`} legacyBehavior>
        <a className="block">
          <h3 className="text-2xl font-bold mb-2">{song.nombre_cancion}</h3>
          <p className="text-sm mb-1">Género: {song.genero}</p>
          <p className="text-sm mb-1">Duración: {song.duracion} segundos</p>
          <p className="text-sm mb-1">Me gusta: {likesCount}</p>
        </a>
      </Link>
      <div className="flex space-x-2 mt-2">
        {liked ? (
          <button
            onClick={(event) => {
              handleDislike();
              handleButtonClick(event);
            }}
            className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 flex items-center"
            disabled={isProcessing} // Deshabilitar botón mientras está en procesamiento
          >
            <FaThumbsDown className="mr-2" /> No me gusta
          </button>
        ) : (
          <button
            onClick={(event) => {
              handleLike();
              handleButtonClick(event);
            }}
            className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500 flex items-center"
            disabled={isProcessing} // Deshabilitar botón mientras está en procesamiento
          >
            <FaThumbsUp className="mr-2" /> Me gusta
          </button>
        )}
        <button
          onClick={(event) => {
            handleAction(song.cancion_id);
            handleButtonClick(event);
          }}
          className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500"
        >
          Descarga
        </button>
      </div>
    </div>
  );
};

export default SongCard;
