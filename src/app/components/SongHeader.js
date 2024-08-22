import React, { useState, useEffect, useCallback } from 'react';
import { FaThumbsUp, FaThumbsDown, FaMusic, FaUser } from 'react-icons/fa'; // Importar iconos de react-icons
import { likeSong, dislikeSong, fetchSongAction, fetchSongDetails } from '../services/songcard'; // Importar servicios necesarios

const SongHeader = ({ songId }) => {

    const [song, setSong] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false); // Estado para manejar si el usuario ha dado "Me gusta"
    const [isProcessing, setIsProcessing] = useState(false); // Estado para manejar el procesamiento

    const fetchsong = useCallback(async () => {
        try {
            const songDetails = await fetchSongDetails(songId);
            if (songDetails) {
                setSong(songDetails);
                setLikesCount(songDetails.cantidad_likes); // Usar cantidad_likes en lugar de cantidad_megusta
                // Verificar si el usuario ya ha dado "Me gusta"
                const userData = JSON.parse(localStorage.getItem('user_data'));
                if (userData && userData.canciones_megusta.includes(songId)) {
                    setLiked(true);
                }
            } else {
                console.error('No song details found for songId:', songId);
            }
        } catch (error) {
            console.error('Error fetching song details:', error);
        }
    }, [songId]);

    useEffect(() => {
        fetchsong();
    }, [fetchsong]);

    const handleLike = async () => {
        try {
            setIsProcessing(true); // Iniciar procesamiento
            const token = localStorage.getItem('token'); // Obtener el token de autenticación
            if (!token) {
                window.location.href = '/login'; // Redirigir a la página de inicio de sesión si no hay token
                return;
            }

            await likeSong(songId, token); // Pasar el token a la función likeSong
            setLikesCount(prevLikes => prevLikes + 1);
            setLiked(true);
            // Actualizar el estado del usuario en localStorage
            const userData = JSON.parse(localStorage.getItem('user_data'));
            userData.canciones_megusta.push(songId);
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

            await dislikeSong(songId, token); // Pasar el token a la función dislikeSong
            setLikesCount(prevLikes => prevLikes - 1);
            setLiked(false);
            // Actualizar el estado del usuario en localStorage
            const userData = JSON.parse(localStorage.getItem('user_data'));
            userData.canciones_megusta = userData.canciones_megusta.filter(id => id !== songId);
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
                // Crear un enlace temporal y abrirlo en una nueva pestaña para iniciar la descarga
                const link = document.createElement('a');
                link.href = action.enlace;
                link.target = '_blank'; // Abrir en una nueva pestaña
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

    if (!song) {
        return <div>Loading...</div>;
    }

    const handleButtonClick = (event) => {
        event.stopPropagation();
      };

    return (
        <div className="song-header p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
            <h2 className="text-3xl font-bold mb-4">{song.nombre}</h2>
            <p className="text-lg mb-2 flex items-center">
                <FaMusic className="mr-2" /> Género: {song.genero}
            </p>
            <p className="text-lg mb-2 flex items-center">
                <FaUser className="mr-2" /> Artista: {song.nombre_artista}
            </p>
            <p className="text-lg mb-4">Me gustas: {likesCount}</p>
            <div className="flex space-x-4 mt-4">
                {liked ? (
                    <button
                        onClick={handleDislike}
                        className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 flex items-center"
                        disabled={isProcessing} // Deshabilitar botón mientras está en procesamiento
                    >
                        <FaThumbsDown className="mr-2" /> No me gusta
                    </button>
                ) : (
                    <button
                        onClick={handleLike}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 flex items-center"
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

export default SongHeader;