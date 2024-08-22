// pages/login.js

'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { LoginUser } from '../services/users';
import { LoginFormValidator } from '../utils/utils';
import Header from '../components/Header';

import ErrorListNotification from '../components/ErrorListNotification';

const Login = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warningMessage, setWarningMessage] = useState([]);

    //Limpiamos localStorage
    useEffect(() => {
        console.log('Cleaning localStorage');
        localStorage.removeItem('token');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const warnings = LoginFormValidator(
            email,
            password
        );

        if (warnings.length === 0) {
            LoginUser({
                email: email,
                password: password
            }).then((response) => {
                if (response.error) {
                    setWarningMessage([response.error]);
                } else {
                    localStorage.setItem('token', response.access_token); // Asegúrate de usar la clave correcta
                    router.push('/');
                }
            }).catch((error) => {
                setWarningMessage(['Network response was not ok', 'User or password incorrect']);
            });
        } else {
            setWarningMessage(warnings);
        }
    }


    return (
        <div><Header />
            <div className="flex min-h-screen justify-center my-7">
                <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
                    {warningMessage.length > 0 && <ErrorListNotification errors={warningMessage} />}
                    <h1 className="text-3xl font-bold text-center text-white">Login</h1>
                    <form className="mt-6">
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase">
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                placeholder=""
                                autoComplete="email"
                                className="w-full p-2 mt-1 border border-gray-600 rounded-md bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-xs font-semibold text-gray-300 uppercase">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                placeholder=""
                                autoComplete="current-password"
                                className="w-full p-2 mt-1 border border-gray-600 rounded-md bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div className="mt-6">
                            <button onClick={handleSubmit} type="submit" className="w-full py-2 px-3 text-white bg-blue-600 rounded-md">
                                Login
                            </button>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                type="button"
                                onClick={() => router.push('/signup')}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Don't have an account? Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;