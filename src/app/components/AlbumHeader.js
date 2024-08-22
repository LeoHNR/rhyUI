import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Importar iconos de react-icons
import { fetchAlbumDetails, fetchAlbumLikesCount, likeAlbum, dislikeAlbum } from '../services/albumheader';

const AlbumHeader = ({ albumId }) => {
    const [album, setAlbum] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false); // Estado para manejar si el usuario ha dado "Me gusta"
    const [isProcessing, setIsProcessing] = useState(false); // Estado para manejar el procesamiento
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

    useEffect(() => {
        const fetchAction = async () => {
            try {
                const albumDetails = await fetchAlbumDetails(albumId);
                setAlbum(albumDetails);

                const likes = await fetchAlbumLikesCount(albumId);
                setLikesCount(likes);

                checkIfLiked();
            } catch (error) {
                console.error('Error fetching album data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const checkIfLiked = () => {
            const userData = JSON.parse(localStorage.getItem('user_data'));
            if (userData && userData.albumes_megusta.includes(Number(albumId))) {
                setLiked(true);
            }
        };

        fetchAction();
    }, [albumId]);

    const handleLike = async () => {
        try {
            setIsProcessing(true);
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            await likeAlbum(albumId, token);
            setLikesCount(prevLikes => prevLikes + 1);
            setLiked(true);

            const userData = JSON.parse(localStorage.getItem('user_data'));
            userData.albumes_megusta.push(Number(albumId));
            localStorage.setItem('user_data', JSON.stringify(userData));
        } catch (error) {
            console.error('Error liking album:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDislike = async () => {
        try {
            setIsProcessing(true);
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            await dislikeAlbum(albumId, token);
            setLikesCount(prevLikes => prevLikes - 1);
            setLiked(false);

            const userData = JSON.parse(localStorage.getItem('user_data'));
            userData.albumes_megusta = userData.albumes_megusta.filter(id => id !== Number(albumId));
            localStorage.setItem('user_data', JSON.stringify(userData));
        } catch (error) {
            console.error('Error disliking album:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const defaultImageUrl = 'https://via.placeholder.com/150'; // URL de la imagen por defecto

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex items-center bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg">
            <img
                src={album?.portada_url || defaultImageUrl}
                alt={`${album?.nombre || 'Album'} Cover`}
                className="w-24 h-24 rounded-md mr-6"
            />
            <div className="text-white">
                <h1 className="text-4xl font-bold">{album?.nombre}</h1>
                <h2 className="text-2xl font-medium text-gray-200">{album?.nombre_artistico}</h2>
                <p className="mt-2">Likes: {likesCount}</p>
                <div className="flex space-x-2 mt-2">
                    {liked ? (
                        <button
                            onClick={handleDislike}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center"
                            disabled={isProcessing} // Deshabilitar botón mientras está en procesamiento
                        >
                            <FaThumbsDown className="mr-2" /> No me gusta
                        </button>
                    ) : (
                        <button
                            onClick={handleLike}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
                            disabled={isProcessing} // Deshabilitar botón mientras está en procesamiento
                        >
                            <FaThumbsUp className="mr-2" /> Me gusta
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlbumHeader;

