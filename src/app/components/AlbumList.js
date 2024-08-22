import React, { useEffect, useState } from 'react';
import { fetchAlbumHome } from '../services/albumheader'; // Asegúrate de que la ruta sea correcta
import Link from 'next/link';

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAlbumHome();
                setAlbums(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="album-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map((album, index) => (
                <Link key={`${album.id}-${index}`} href={`/albumes/${album.album_id}`} legacyBehavior>
                    <a className="block">
                        <div className="album-card p-6 border-2 border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-200 bg-gray-800 text-white cursor-pointer transform hover:scale-105">
                            <h3 className="text-2xl font-bold mb-2">{album.nombre}</h3>
                            <p className="text-sm mb-1">Fecha: {album.fecha_lanzamiento}</p>
                        </div>
                    </a>
                </Link>
            ))}
        </div>
    );
};

export default AlbumList;