import { useState, useEffect, useRef } from "react";
import axios from "axios"
import config from "../../config";


export default () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleClick = () => {
        setIsDarkMode(!isDarkMode);
    };
    useEffect(() => {
        data()
    }, [])

    async function data() {
        let tokenDate = window.localStorage.getItem('tokenDate')
        if (new Date(tokenDate) < new Date()) {
            window.location.replace('/')
        } else {

            const data = await axios(`${config.backApi}/admin`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: window.localStorage.getItem('token'),
                }
            })
            if (data.data.message == "Token wrong") {
                window.location.replace('/')
            } else if (data.data.message == "Token is not defined") {
                window.location.replace('/')
            }
        }
    }
    
    const logout = async () => {
        let TOKEN = "none"
        window.localStorage.setItem('token', TOKEN)
        window.location.replace('/')
    }


    return (
        <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
            <main className=" bg-white dark:bg-gray-900 h-screen">
                <div className="text-center fixed top-5  right-6">
                    <button onClick={logout} className="text-sm text-blue-600 dark:text-blue-500 hover:underline mr-4">Logout</button>
                    <button onClick={handleClick} id="theme-toggle" type="button"
                        className="text-center text-gray-500 px-4 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                        {isDarkMode == true ? <i className="text-2xl fa-solid fa-sun"></i> :
                            <i className="text-2xl fa-solid fa-moon"></i>
                        }
                    </button>
                </div>

                <div className="home w-full h-screen flex items-center justify-center gap-16 ">


                    <div
                        className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 border  border-gray-200 dark:border-gray-700 rounded-lg shadow ">

                        <div className="flex flex-col items-center pb-10 px-4 pt-6">
                            <i className=" fa-solid fa-chalkboard-user text-5xl mb-3 text-gray-900 dark:text-white"></i>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Teachers</h5>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <a href="/admin/teachers"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 border  border-gray-200 dark:border-gray-700 rounded-lg shadow ">

                        <div className="flex flex-col items-center pb-10 px-4 pt-6">
                            <i className="fa-solid fa-graduation-cap text-5xl mb-3 text-gray-900 dark:text-white"></i>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Students</h5>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <a href="/admin/students"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</a>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}