import React, { useContext } from "react";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BsMic } from "react-icons/bs";
import logo from '../../Frontend-Images/Logo/logo.svg'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Api from "../../APIs/BackendApi";
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { setUserDetails } from "../../store/userSlice";
import ROLE from "../../APIs/Role";
import Context from "../../context/context";

const Header = () => {

    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const context = useContext(Context)

    const navigate = useNavigate()

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [menuDisplay, setMenuDisplay] = useState(false)
    const [searchInput, setSearchInput] = useState('');

    const handleLogout = async () => {
        const fetchData = await fetch(Api.logout.url, {
            method: Api.logout.method,
            credentials: "include",
        })

        const data = await fetchData.json()

        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate('/')
        }
        if (data.error) {
            toast.error(data.message)
        }

    }

    console.log("Product Quantity :- ", context)

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const trimmed = searchInput.trim();
            if (trimmed) {
                navigate(`/search?q=${trimmed}`);
                setSearchInput('');
            }
        }
    };

    return (
        <div className="py-3 fixed top-0 w-full bg-white z-10">
            <header className=" px-4 py-2 shadow-md">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <button
                            className="lg:hidden px-2 text-sm text-black hover:text-gray-500"
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? '✕' : '☰'}
                        </button>

                        <div className="flex items-center space-x-2 md:px-0 px-4">
                            <Link to={'/'} ><img src={logo} alt="Titan Logo" className="w-full" /></Link>
                        </div>

                        <div className="hidden md:flex items-center border border-gray-300 rounded-md px-3 mx-3 py-1 w-1/2">
                            <FiSearch className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder="Search here"
                                className="w-full outline-none"
                            />

                            <BsMic className="text-gray-500 ml-2" />
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="flex flex-col items-center hover:text-slate-500 transition-all hover:cursor-pointer">
                                {
                                    user?._id ? (
                                        <>
                                            <span className="text-2xl" onClick={handleLogout}><FaUser /></span>
                                            <button className="text-xs" onClick={handleLogout}>Logout</button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to={'/login'}><span className="text-2xl"><FaUser /></span></Link>
                                            <span className="text-xs">Login</span>
                                        </>
                                    )
                                }

                            </div>

                            {
                                user?._id && (
                                    <Link to={"/cart"} className="relative flex flex-col items-center hover:text-slate-500 transition-all hover:cursor-pointer">
                                        <span className="text-2xl"><FaShoppingBag /></span>
                                        <span className="text-xs">Cart</span>
                                        <span className="absolute -top-3 -right-3 bg-yellow-600 text-white rounded-full text-sm px-1">
                                            {context?.cartProductCount || 0}
                                        </span>
                                    </Link>
                                )
                            }

                            <div className="relative">

                                <div className="flex flex-col items-center hover:text-slate-500 transition-all hover:cursor-pointer" onClick={() => setMenuDisplay(!menuDisplay)}>
                                    <span className="text-2xl"><FaRegUserCircle /></span>
                                    <span className="text-xs">{user?.role}</span>
                                </div>

                                {
                                    menuDisplay && (
                                        <div className="absolute bg-slate-100 mt-2 transition-all shadow-lg p-4 top-10 -right-1 hover:bg-slate-200 rounded-lg">
                                            <nav>
                                                {
                                                    user?.role === ROLE.ADMIN && (
                                                        <>
                                                            <Link to={'/adminpanel/allproducts'} className="whitespace-nowrap hidden md:block" onClick={() => setMenuDisplay((prev) => !prev)}>Admin-Panel</Link>
                                                            <div className=" hover:bg-slate-50">
                                                                <Link to={'/order-success'} className="whitespace-nowrap py-2" onClick={() => setMenuDisplay((prev) => !prev)}>Order-Page</Link>
                                                            </div>
                                                        </>
                                                    )
                                                    
                                                }
                                                {
                                                    user?.role === ROLE.GENERAL && (
                                                        <Link to={'/order-success'} className="whitespace-nowrap py-2" onClick={() => setMenuDisplay((prev) => !prev)}>Order-Page</Link>
                                                    )
                                                }
                                            </nav>
                                        </div>
                                    )
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </header>
            <div className="lg:block hidden border-t-2 border-slate-300"></div>
            <nav className="bg-white lg:py-4 lg:px-6">
                <div className="container mx-auto flex justify-center">
                    <div className="hidden lg:flex space-x-6 font-bold">
                        <a href="/men" className="hover:text-gray-700 text-black px-2">Men</a>
                        <a href="/women" className="hover:text-gray-700 text-black px-2">Women</a>
                        <a href="/swatches" className="hover:text-gray-700 text-sm text-black px-2">Smart-Watches</a>
                        <div className="relative group">
                            <button className="hover:text-gray-700 text-black px-2 text-sm">Premium-Watches</button>
                            <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 rounded-md w-48 z-10">
                                <a href="/xylys" className="block px-4 py-2 hover:bg-gray-100">XYLYS</a>
                                <a href="/nebula" className="block px-4 py-2 hover:bg-gray-100">Nebula</a>
                                <a href="/edge" className="block px-4 py-2 hover:bg-gray-100">Edge</a>
                                <a href="/raga" className="block px-4 py-2 hover:bg-gray-100">Raga</a>
                            </div>
                        </div>
                        <a href="/watches" className="hover:text-gray-700 text-black px-2">Watches</a>
                        <div className="relative group">
                            <button className="hover:text-gray-700 text-black px-2 text-sm">International-Brands</button>
                            <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 rounded-md w-48 z-10">
                                <a href="/police" className="block px-4 py-2 hover:bg-gray-100">Police</a>
                                <a href="/coach" className="block px-4 py-2 hover:bg-gray-100">Coach</a>
                                <a href="/tommy" className="block px-4 py-2 hover:bg-gray-100">Tommy-Hilfiger</a>
                                <a href="/keneth" className="block px-4 py-2 hover:bg-gray-100">Keneth-Cole</a>
                                <a href="/anne" className="block px-4 py-2 hover:bg-gray-100">Anne-Klein</a>
                            </div>
                        </div>
                        <a href="/sale" className="hover:text-gray-700 text-black px-2">Sale</a>
                        <a href="https://sonnet.titan.in" className="hover:text-gray-700 text-black px-2 text-sm">Watch-Services</a>
                    </div>
                </div>
                <div className="md:hidden flex block border border-gray-300 rounded-md px-3 mx-3 py-1">
                    <FiSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search here"
                        className="w-full outline-none"
                    />
                    <BsMic className="text-gray-500 ml-2" />
                </div>
                {isMobileMenuOpen && (
                    <div className="lg:hidden flex flex-col space-y-2 mt-4 px-4">
                        <a href="/men" className="hover:text-gray-700 text-black px-2">Men</a>
                        <a href="/women" className="hover:text-gray-700 text-black px-2">Women</a>
                        <a href="/swatches" className="hover:text-gray-700 text-black px-2">Smart-Watches</a>
                        <div className="relative group">
                            <button className="hover:text-gray-700 text-black px-2">Premium-Watches</button>
                            <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 rounded-md w-48 z-10">
                                <a href="/xylys" className="block px-4 py-2 hover:bg-gray-100">XYLYS</a>
                                <a href="/nebula" className="block px-4 py-2 hover:bg-gray-100">Nebula</a>
                                <a href="/edge" className="block px-4 py-2 hover:bg-gray-100">Edge</a>
                                <a href="/raga" className="block px-4 py-2 hover:bg-gray-100">Raga</a>
                            </div>
                        </div>
                        <a href="/watches" className="hover:text-gray-700 text-black px-2">Watches</a>
                        <div className="relative group">
                            <button className="hover:text-gray-700 text-black px-2">International-Brands</button>
                            <div className="absolute hidden group-hover:block bg-white shadow-lg py-2 rounded-md w-48 z-10">
                                <a href="/police" className="block px-4 py-2 hover:bg-gray-100">Police</a>
                                <a href="/coach" className="block px-4 py-2 hover:bg-gray-100">Coach</a>
                                <a href="/tommy" className="block px-4 py-2 hover:bg-gray-100">Tommy-Hilfiger</a>
                                <a href="/keneth" className="block px-4 py-2 hover:bg-gray-100">Keneth-Cole</a>
                                <a href="/anne" className="block px-4 py-2 hover:bg-gray-100">Anne-Klein</a>
                            </div>
                        </div>
                        <a href="/sale" className="hover:text-gray-700 text-black px-2">Sale</a>
                        <a href="https://sonnet.titan.in" className="hover:text-gray-700 text-black px-2">Watch-Services</a>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;
