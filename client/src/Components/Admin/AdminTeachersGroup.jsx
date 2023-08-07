import { useState, useEffect, useRef } from "react";
import axios from "axios"
import Modal1 from "../GroupModal/Modal1";
import Modal2 from "../GroupModal/Modal2";
import Modal3 from "../GroupModal/Modal3";
import { useParams } from "react-router";
import config from "../../config";


export default () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [teachers, setTeachers] = useState([])
    const [teacher, setTeacher] = useState({})
    const [group, setGroup] = useState({})
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    let id = useParams('id')
    const chModal1 = () => {
        setModal1(!modal1);
    };
    const chModal2 = () => {
        setModal2(!modal2);
    };
    config
    const handleClick = () => {
        setIsDarkMode(!isDarkMode);
    };
    async function findOne(id) {
        const DATA = await axios(`${config.backApi}/admin/teachers/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: window.localStorage.getItem('token'),
            }
        })
        setTeacher(DATA.data.data);
        chModal3()
    }
    async function remove(Id) {
        const DATA = await axios.delete(`${config.backApi}/admin/groups/?idGroup=${Id}&idTeacher=${id.id}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: window.localStorage.getItem('token'),
            }
        })
        data()
    }

    async function update(Id) {

        const DATA = await axios(`${config.backApi}/admin/groups/?idGroup=${Id}&idTeacher=${id.id}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: window.localStorage.getItem('token'),
            }
        })
        DATA.data.data.group?.map(item => {
            if (item._id == Id) {
                setGroup(item);
            };
        });
        chModal1()
    }


    useEffect(() => {
        data()
    }, [])

    async function data() {
        let tokenDate = window.localStorage.getItem('tokenDate')
        if (new Date(tokenDate) < new Date()) {
            window.location.replace('/')
        } else {
            const DATA = await axios(`${config.backApi}/admin/teachers/${id.id}`, {
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
                setTeacher(DATA.data.data)
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
                        <h1>{teacher.firstName}</h1>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Day
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Time
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Students

                                    </th>

                                    <th scope="col" className="px-6 py-3 text-right w-32">
                                        <button onClick={chModal2} className="font-medium text-lg text-blue-600 dark:text-blue-500 hover:underline"><i
                                            className="fa-solid fa-square-plus"></i></button>
                                        <span className="sr-only">Close modal</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {teacher?.group?.map((item, i) => {
                                    return (

                                        <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10 dark:text-white">
                                                {i + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.day}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.time}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={`/admin/students/manage/${item._id}/${id.id}`}>
                                                    {item.students.length}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-right w-32">
                                                <button onClick={() => { update(item._id) }}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><i
                                                        className="fa-solid fa-pen"></i></button>



                                                <button onClick={() => { remove(item._id) }} className="ml-3 font-medium text-blue-600 dark:text-blue-500 hover:underline"><i
                                                    className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>

                {/* <!-- Modal authentication --> */}
                {modal1 && <Modal1 teacher={group} getAll={data} fn={chModal1} />}
                {/* <!-- Modal post --> */}
                {modal2 && <Modal2 fn={chModal2} getAll={data} />}


                {modal1 && <div onClick={chModal1} className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}
                {modal2 && <div onClick={chModal2} className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}

            </main>
        </div >
    )

}