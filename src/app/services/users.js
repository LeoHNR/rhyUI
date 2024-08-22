import settings from "./settings";
import { HTTPError } from '../utils/HttpError'

export async function GetUserInfo() {

    const response = await fetch(`${ settings.domain }/user`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}

export async function ActivateUser(code) {

    const response = await fetch(`${ settings.domain }/user/code/${code}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}

export async function Register(userRegistration) {

    const response = await fetch(`http://127.0.0.1:8000/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(userRegistration)
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}

export async function LoginUser(userLogin) {
    const response = await fetch(`${settings.domain}/login/custom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(userLogin)
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();

    // Almacenar el token de acceso y los datos del usuario en localStorage
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user_data', JSON.stringify(data.user));

    return data;
}