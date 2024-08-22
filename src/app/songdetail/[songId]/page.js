
'use client';

import React from 'react';
import { useParams } from 'next/navigation'; // Importar useRouter de next/navigation
import SongHeader from '../../components/SongHeader';
import SongComments from '@/app/components/SongComents';
import Header from '@/app/components/Header';

const SongDetailPage = () => {
    const { songId } = useParams(); // Usar useRouter para obtener songId

    if (!songId) return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtiene el songId

    return (
        <div>
            <Header />
            <SongHeader songId={songId} /> {/* Usar el componente SongHeader */}
            <SongComments songId={songId} /> {/* Usar el componente SongComments */}
        </div>
    );
};

export default SongDetailPage;