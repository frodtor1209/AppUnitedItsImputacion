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
                <div className="relative flex items-center space-x-2 text-[#38B5AD]">
                    <div onClick={toggleMenu} className="flex items-center space-x-2 hover:border-2 hover:border-[#38B5AD] rounded-full p-1 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 18c-3.313 0-6 2.687-6 6h12c0-3.313-2.687-6-6-6z"
                            />
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