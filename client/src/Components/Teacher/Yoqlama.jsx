import { useState, useEffect, useRef } from "react";
import axios from "axios"
import { useParams } from "react-router";
import config from "../../config";

export default () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [atten, setAtten] = useState([])
    const [showStudent, setShowStudent] = useState({})
    const itemsRef = useRef([]);
    const itemsRef1 = useRef([]);

    let idGroup = useParams('id')

    const handleClick = () => {
        setIsDarkMode(!isDarkMode);
    };

    async function addAttendance() {
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        let data = []
        for (let i = 0; i < atten.students?.length; i++) {
            let absend = false
            let date = day + '/' + month + '/' + year
            let score = 0
            if (itemsRef.current[i].checked === true) {
                score = itemsRef1.current[i].value === '' ? 1 : itemsRef1.current[i].value
            }
            if (itemsRef.current[i].checked === true) {
                absend = true
            }
            let newData = {
                _id: atten.students[i]._id,
                absend: absend,
                date: date,
                score: score
            }
            data.push(newData)

            let res = await axios.post(`${config.backApi}/teacher/attendance`, { data: data }, {
                headers: {
                    authorization: window.localStorage.getItem("token")
                }
            })

            alert(res.data.message)
            window.location.reload()
        }
    }


    useEffect(() => {
        data()
    }, [])

    async function data() {
        let tokenDate = window.localStorage.getItem('tokenDate')
        if (new Date(tokenDate) < new Date()) {
            window.location.replace('/')
        } else {
            const DATA = await axios(`${config.backApi}/teacher/group/${idGroup.id}`, {
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
                setAtten(DATA.data.data.group[0])
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
                        <h1 className="text-gray-500 dark:text-gray-400 text-2xl">{atten.title}</h1>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Full name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Rating
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {atten.students?.map((item, i) => {
                                    return (

                                        <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10 dark:text-white">
                                                {i + 1}
                                            </th>
                                            <td className="px-6 py-4">

                                                {item.firstName}  {item.lastName}

                                            </td>
                                            <td className="px-6 py-4">
                                                {item.attendance[0] == undefined ? 0 : item.attendance.slice(-1).pop().score}

                                            </td>
                                            <td className="px-6 py-4">
                                                {<input ref={el => itemsRef.current[i] = el} type="checkbox" className="bg-gray-200 dark:bg-gray-700 mx-4" />}
                                                {<input ref={el => itemsRef1.current[i] = el} type="number" inputMode="numeric" max={10} min={1} className="inp text-gray-900 w-14 h-8 bg-gray-200 dark:bg-gray-700 dark:text-gray-200" />}
                                            </td>


                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </div>
                    <button onClick={addAttendance} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5">Submit</button>

                </div>



            </main>
        </div >
    )

}