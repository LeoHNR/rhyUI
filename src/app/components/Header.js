'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Comprobamos si el usuario está logeado
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
                Rhythmnest
            </Link>
            <nav>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                        Logout
                    </button>
                ) : (
                    <Link href="/login" className="bg-blue-500 px-4 py-2 rounded">
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
