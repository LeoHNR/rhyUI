export async function fetchSongDetails(songId) {
    const response = await fetch(`http://127.0.0.1:8000/canciones/${songId}`, {
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch song details');
    }
    return response.json();
}

export async function likeSong(songId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:8000/canciones/${songId}/me_gusta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to like song');
    }
    return response.json();
}

export async function dislikeSong(songId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:8000/canciones/${songId}/no_me_gusta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to dislike song');
    }
    return response.json();
}

export async function fetchSongAction(songId) {
    const token = localStorage.getItem('token'); // Obtener el token de autenticación
    if (!token) {
        throw new Error('No authentication token found');
    }

    const response = await fetch(`http://127.0.0.1:8000/canciones/${songId}/accion`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Incluir el token en los encabezados
            'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch song action');
    }

    const data = await response.json();
    return data;
}

export async function fetchComents(songId) {
    const response = await fetch(`http://127.0.0.1:8000/canciones/${songId}/comentarios`, {
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return response.json();
}

export async function fetchPostComent(songId, commentData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:8000/canciones/${songId}/comentarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(commentData)
    });
    if (!response.ok) {
        throw new Error('Failed to post comment');
    }
    return response.json();
}

