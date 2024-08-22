export default async function GetCard() {
    const res = await fetch('http://127.0.0.1:8000/cards');

    if (!res.ok) {
        throw new Error('Failed to fetch');
    }

    const data = await res.json();
    return data;
}