import { Link } from "react-router-dom"
export const Navbar = () => {
    return (
        <nav className=" border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeGenius</span>
                </Link>
                <div className="flex md:order-2">
                    <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="flex gap-3">
                        <div>
                            <Link to="/login" className="py-1 px-2 rounded hover:bg-indigo-700/30 hover:text-indigo-200 transition font-semibold">Login</Link>
                        </div>
                        <div>
                            <Link to="/sign-up" className="py-1 px-2 rounded hover:bg-indigo-700/30 hover:text-indigo-200 transition font-semibold">Sign Up</Link>
                        </div>
                    </div>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 border-gray-700">
                        <li>
                            <Link to="/" className="block py-1 px-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-500" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="dashboard" className="block py-1 px-2 rounded hover:bg-gray-100 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent border-gray-700">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="profile" className="block py-1 px-2 rounded hover:bg-gray-100 md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent border-gray-700">Profile</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}
