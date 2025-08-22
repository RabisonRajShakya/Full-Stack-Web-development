import { NavLink } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../App";
import { useContext, useEffect } from "react";

function Navbar() {
    const { isAuth, setAuthState } = useContext<IAuthContext>(AuthContext);

    const logoutHandler = () => {
        localStorage.removeItem("accessToken");
        setAuthState((prev) => ({
            ...prev,
            isAuth: false,
            role : "guest"
        }));
    };

    useEffect(() => {
        console.log(isAuth)
    }, [])

    return (
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo/Brand Section */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-white text-3xl font-bold">
                                Quiz Hive
                            </h1>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            <NavLink
                                to="/"
                                className={({ isActive })=>
                                    `px-6 py-3 rounded-lg text-2xl font-medium transition-all duration-200 ${isActive
                                        ? 'bg-white/20 text-white shadow-md'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `px-6 py-3 rounded-lg text-2xl font-medium transition-all duration-200 ${isActive
                                        ? 'bg-white/20 text-white shadow-md'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`
                                }
                            >
                                About Us
                            </NavLink>
                            {isAuth ? (
                                <>
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) =>
                                            `px-6 py-3 rounded-lg text-2xl font-medium transition-all duration-200 ${isActive
                                                ? 'bg-white/20 text-white shadow-md'
                                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                            }`
                                        }
                                    >
                                        Profile
                                    </NavLink>
                                    <NavLink
                                        to="/questionset/list"
                                        className={({ isActive }) =>
                                            `px-6 py-3 rounded-lg text-2xl font-medium transition-all duration-200 ${isActive
                                                ? 'bg-white/20 text-white shadow-md'
                                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                            }`
                                        }
                                    >
                                        QuestionSet
                                    </NavLink>
                                    <button
                                        onClick={logoutHandler}
                                        className="bg-gradient-to-r from-pink-500 to-violet-600 hover:bg-red-600 text-white px-6 py-3 text-2xl font-bold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ml-3 rounded-full"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) =>
                                            `px-6 py-3 rounded-full text-2xl font-medium transition-all duration-200 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 ${isActive
                                                ? 'bg-green-500 text-white shadow-md'
                                                : 'bg-green-400 hover:bg-green-500 text-white hover:shadow-md'
                                            }`
                                        }
                                    >
                                        Register
                                    </NavLink>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            `px-6 py-3 rounded-full text-2xl font-medium transition-all duration-200 ml-3 ${isActive
                                                ? 'bg-white text-purple-600 shadow-md'
                                                : 'bg-white/10 hover:bg-white text-white hover:text-purple-600 border border-white/30 hover:border-white'
                                            }`
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors duration-200">
                            <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className="md:hidden">
                    <div className="px-3 pt-3 pb-4 space-y-2 sm:px-4 bg-black/10 rounded-lg mb-3">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200 ${isActive
                                    ? 'bg-white/20 text-white'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200 ${isActive
                                    ? 'bg-white/20 text-white'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`
                            }
                        >
                            About Us
                        </NavLink>
                        {isAuth ? (
                            <>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200 ${isActive
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }`
                                    }
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/questionset/list"
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200 ${isActive
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }`
                                    }
                                >
                                    QuestionSet
                                </NavLink>
                                <button
                                    onClick={logoutHandler}
                                    className="block w-full text-left px-4 py-3 rounded-md text-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 mt-3"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200 ${isActive
                                            ? 'bg-green-500 text-white'
                                            : 'bg-green-400 hover:bg-green-500 text-white'
                                        }`
                                    }
                                >
                                    Register
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200 ${isActive
                                            ? 'bg-white text-purple-600'
                                            : 'bg-white/10 hover:bg-white text-white hover:text-purple-600 border border-white/30'
                                        }`
                                    }
                                >
                                    Login
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;