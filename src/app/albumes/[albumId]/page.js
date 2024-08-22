'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Importa useParams desde next/navigation
import AlbumHeader from '../../components/AlbumHeader';
import SongCard from '../../components/SongCard';
import { fetchAlbumDetails } from '../../services/albumheader';
import { fetchArtistName } from '../../services/albumheader';
import { fetchSongsInfo } from '../../services/albumheader';
import Header from '@/app/components/Header';

const AlbumPage = () => {
    const { albumId } = useParams(); // Usa useParams para obtener albumId
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (!albumId) return; // Esperar a que albumId esté disponible

        const getSongsInfo = async () => {
            const songsInfo = await fetchSongsInfo(albumId);

            // Ordenar las canciones por una propiedad específica, por ejemplo, 'cancion_id'
            const sortedSongs = songsInfo.sort((a, b) => a.cancion_id - b.cancion_id);

            setSongs(sortedSongs);
        };

        getSongsInfo();
    }, [albumId]);

    if (!albumId) return <div>Loading...</div>;

    return (
        <div className="bg-gray-800 p-6">
            <Header />
            <AlbumHeader albumId={albumId} />
            <div className="flex flex-wrap">
                {songs.map(song => (
                    <div key={song.cancion_id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                        <div className="border border-gray-700 rounded-lg">
                            <SongCard song={song} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumPage;
