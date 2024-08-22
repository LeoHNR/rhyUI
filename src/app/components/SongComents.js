import React, { useState, useEffect, useCallback } from 'react';
import { fetchComents, fetchPostComent } from '../services/songcard'; // Importar las funciones necesarias

const SongComments = ({ songId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    const fetchComments = useCallback(async () => {
        try {
            const commentsData = await fetchComents(songId);
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [songId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handlePostComment = async () => {
        if (!newComment.trim()) return;
        setIsPosting(true);
        try {
            const userData = localStorage.getItem('user_data'); // Obtener user_data desde localStorage
            const token = localStorage.getItem('token'); // Obtener token desde localStorage
    
            if (!userData || !token) {
                throw new Error('Usuario no autenticado');
            }
    
            const parsedUserData = JSON.parse(userData); // Parsear user_data
            const usuario_id = parsedUserData.usuario_id; // Obtener usuario_id desde user_data
    
            if (!usuario_id) {
                throw new Error('Usuario no autenticado');
            }
    
            const commentData = { usuario_id, contenido: newComment }; // Crear objeto de datos del comentario
    
            await fetchPostComent(songId, commentData);
            setNewComment('');
            fetchComments(); // Refrescar los comentarios después de publicar uno nuevo
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="song-comments p-6 border rounded-lg shadow-md bg-gray-800 text-white">
            <h3 className="text-2xl font-bold mb-4">Comentarios</h3>
            <ul className="mb-4 space-y-4">
                {comments.map((comment, index) => (
                    <li key={index} className="p-4 border rounded-lg bg-gray-700">
                        <p className="text-lg font-semibold mb-2">{comment.contenido}</p>
                        <div className="text-sm text-gray-300 flex justify-between">
                            <span>Por: {comment.nombre_usuario}</span>
                            <span>{new Date(comment.fecha_publicacion).toLocaleString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="new-comment mt-6">
                <textarea
                    className="w-full p-3 border rounded-lg mb-4 bg-gray-700 text-white"
                    rows="3"
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    onClick={handlePostComment}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={isPosting}
                >
                    {isPosting ? 'Publicando...' : 'Publicar Comentario'}
                </button>
            </div>
        </div>
    );
};

export default SongComments;