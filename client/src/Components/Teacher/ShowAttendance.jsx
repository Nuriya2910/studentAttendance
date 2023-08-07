import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import config from "../../config";

export default () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showAtten, setshowAtten] = useState([])

    let idStudent = useParams('id')

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
            const DATA = await axios(`${config.backApi}/teacher/attendance/?idStudent=${idStudent.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: window.localStorage.getItem('token'),
                }
            })
            if (DATA.data.message == "Token wrong!") {
                window.location.replace('/')
            } else if (DATA.data.message == "Token is not defined") {
                window.location.replace('/')
            } else {
                setshowAtten(DATA.data.data)
            }
        }
    }
    const logout = async () => {
        let TOKEN = "none"
        window.localStorage.setItem('token', TOKEN)
        window.location.replace('/')
    }

    return (
        <>
            <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="text-center fixed top-5  right-6">
                    <button onClick={logout} className="text-sm text-blue-600 dark:text-blue-500 hover:underline mr-4">Logout</button>
                    <button onClick={handleClick} id="theme-toggle" type="button"
                        className="text-center text-gray-500 px-4 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                        {isDarkMode == true ? <i className="text-2xl fa-solid fa-sun"></i> :
                            <i className="text-2xl fa-solid fa-moon"></i>
                        }
                    </button>
                </div>
                <main className="bg-white dark:bg-gray-900 h-screen pt-10">
                    <div className="container w-10/12 mx-auto py-12">
                        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
                            <h1 className="text-gray-500 dark:text-gray-400 text-2xl">{showAtten.firstName}</h1>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Absend
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Score
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showAtten.attendance?.map((item, i) => {
                                        return (

                                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10 dark:text-white">
                                                    {i + 1}
                                                </th>
                                                <td className="px-6 py-4">

                                                    {item.absend == true && "✅"}
                                                    {item.absend == false && "❌"}

                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.date}

                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.score}
                                                </td>


                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                        </div>

                    </div>



                </main>
            </div >
        </>
    )
}
