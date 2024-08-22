export async function fetchAlbumDetails(albumId) {
  const response = await fetch(`http://127.0.0.1:8000/albumes/${albumId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch album details');
  }

  const data = await response.json();
  return data;
}

export async function fetchArtistName(artistId) {
  const response = await fetch(`http://127.0.0.1:8000/artistas/${artistId}/nombre`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch artist name');
  }

  const data = await response.json();
  return data;
}

export async function fetchAlbumLikesCount(albumId) {
  const response = await fetch(`http://127.0.0.1:8000/albumes/${albumId}/me_gusta`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch album likes count');
  }

  const text = await response.text();
  if (!text) {
    throw new Error('Empty response');
  }

  try {
    const data = JSON.parse(text);
    return data.cantidad.cantidad; // Extrae el valor correcto
  } catch (error) {
    throw new Error('Failed to parse JSON response');
  }
}

export async function fetchSongsInfo(albumId) {
  const response = await fetch(`http://127.0.0.1:8000/albumes/${albumId}/canciones_info`);
  if (!response.ok) {
      throw new Error('Failed to fetch songs info');
  }
  return response.json();
}

export async function likeAlbum(albumId) {
  const token = localStorage.getItem('token'); // Suponiendo que guardas el JWT en localStorage

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`http://127.0.0.1:8000/albumes/${albumId}/me_gusta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}` // Aquí se envía el token JWT
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error('Failed to like album');
  }

  const data = await response.json();
  return data;
}

export async function dislikeAlbum(albumId) {
  const token = localStorage.getItem('token'); // Suponiendo que guardas el JWT en localStorage

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`http://127.0.0.1:8000/albumes/${albumId}/no_me_gusta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}` // Aquí se envía el token JWT
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error('Failed to like album');
  }

  const data = await response.json();
  return data;
}

export async function fetchAlbumHome() {
  const response = await fetch('http://127.0.0.1:8000/albumes');
  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }
  return response.json();
}


