'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Register } from '../services/users';
import ErrorListNotification from '../components/ErrorListNotification';
import { SignUpFormValidator } from '../utils/utils'; // Asegúrate de importar tu validador
import Header from '../components/Header';

const RegisterPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo estado para confirmación de contraseña
    const [nombre, setNombre] = useState('');
    const [username, setUsername] = useState('');
    const [warningMessage, setWarningMessage] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar los datos del formulario
        const warnings = SignUpFormValidator(email, password, confirmPassword, nombre, username);

        if (warnings.length === 0) {
            try {
                const response = await Register({
                    email,
                    password,
                    nombre,
                    username
                });

                if (response.error) {
                    setWarningMessage([response.error]);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                setWarningMessage(['Registration failed. Please try again.']);
            }
        } else {
            setWarningMessage(warnings);
        }
    };

    return (
        <div><Header />
            <div className="flex min-h-screen justify-center my-7">
                <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
                    {warningMessage.length > 0 && <ErrorListNotification errors={warningMessage} />}
                    <h1 className="text-3xl font-bold text-center text-white">Register</h1>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nombre" className="block text-xs font-semibold text-gray-300 uppercase">
                                Name
                            </label>
                            <input
                                id="nombre"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                name="nombre"
                                placeholder=""
                                className="w-full p-2 mt-1 border border-gray-600 rounded-md bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="username" className="block text-xs font-semibold text-gray-300 uppercase">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                name="username"
                                placeholder=""
                                className="w-full p-2 mt-1 border border-gray-600 rounded-md bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase">
                                Email
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
                        <div className="mt-4">
                            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-300 uppercase">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                name="confirmPassword"
                                placeholder=""
                                autoComplete="current-password"
                                className="w-full p-2 mt-1 border border-gray-600 rounded-md bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full py-2 px-3 text-white bg-blue-600 rounded-md">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

