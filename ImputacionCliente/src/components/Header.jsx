import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ userName }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white shadow-md py-4">
            <div className="p-2 flex justify-between items-center w-full">
                <h1 className="text-2xl font-semibold text-[#38B5AD]">Imputacion United</h1>
                <img src="../../public/logoUnited.png" alt="Logo United" className="h-14" />
                <div className="relative flex items-center space-x-2 text-[#38B5AD]">
                    <div
                        onClick={toggleMenu}
                        className="flex items-center justify-center space-x-2 border-2 border-transparent hover:border-[#38B5AD] rounded-full p-1 cursor-pointer transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                            <circle cx="12" cy="8" r="4.5" />
                            <path d="M20 21c0-4.4-3.6-8-8-8s-8 3.6-8 8" />
                        </svg>

                        <span className="cursor-pointer font-medium">{userName}</span>
                    </div>

                    {menuOpen && (
                        <div
                            ref={menuRef}
                            className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg z-50"
                        >
                            <ul className="py-1">
                                <li
                                    className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-[#38B5AD] hover:text-white"
                                    onClick={handleLogout}
                                >
                                    Cerrar Sesión
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}