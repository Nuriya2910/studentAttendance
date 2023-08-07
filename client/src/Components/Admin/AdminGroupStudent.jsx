import { useState, useEffect, useRef } from "react";
import axios from "axios"
import config from '../../config'
import Modal1 from "../StudentModal/Modal1";
import Modal2 from "../GrStudentModal/Modal2";
import Modal3 from "../StudentModal/Modal3";
import { useParams } from "react-router";

export default () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [teachers, setTeachers] = useState([])
    const [teacher, setTeacher] = useState({})
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);

    let idGroup  = useParams('id')

    const chModal1 = () => {
        setModal1(!modal1);
    };
    const chModal2 = () => {
        setModal2(!modal2);
    };
    const chModal3 = () => {
        setModal3(!modal3);
    };
    const handleClick = () => {
        setIsDarkMode(!isDarkMode);
    };
    async function findOne(id){
        const DATA = await axios(`${config.backApi}/admin/students/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: window.localStorage.getItem('token'),
            }
        })
        setTeacher(DATA.data.data);
        chModal3()
    }
    async function remove(id){
        let user = {
            idTeacher: idGroup.idTeacher,
            idGroup: idGroup.id,
            idStudent: id
        }
        const DATA = await axios.put(`${config.backApi}/admin/students/manage`, user
        , {
            headers: {
                'Content-Type': 'application/json',
                authorization: window.localStorage.getItem('token'),
            }
        }
        )
        data()
    }

    
    

    useEffect(()=>{
        data()
    }, [])

    async function data() {
        let tokenDate = window.localStorage.getItem('tokenDate')
        if(new Date(tokenDate) < new Date() )
        {
            window.location.replace('/')
        }else{
        const DATA = await axios(`${config.backApi}/admin/groups/${idGroup.id}/?idTeacher=${idGroup.idTeacher}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: window.localStorage.getItem('token'),
            }
        })
        if (DATA.data.message == "Token wrong!") {
            window.location.replace('/')
        }else if (DATA.data.message == "Token is not defined") {
            window.location.replace('/')
        }else{
            setTeachers(DATA.data.data.group[0].students)
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
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        First name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Last name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right w-32">
                                        <button onClick={chModal2} className="font-medium text-lg text-blue-600 dark:text-blue-500 hover:underline"><i
                                            className="fa-solid fa-square-plus"></i></button>
                                        <span className="sr-only">Close modal</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((item, i)=>{
                                    return(

                                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10 dark:text-white">
                                        {i+1}
                                    </th>
                                    <td className="px-6 py-4">
                                        <a href={`/admin/teachers/group/${item._id}`}>
                                            {item.firstName}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.lastName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.phone}
                                    </td>
                                    <td className="px-6 py-4 text-right w-32">
                                        

                                        <button onClick={()=>{findOne(item._id)}} className="ml-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"><i
                                                className="fa-solid fa-eye"></i></button>

                                        <button onClick={()=>{remove(item._id)}} className="ml-3 font-medium text-blue-600 dark:text-blue-500 hover:underline"><i
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
                {modal1 && <Modal1 teacher={teacher} getAll={data} fn={chModal1} />}
                {/* <!-- Modal post --> */}
                {modal2 && <Modal2 fn={chModal2} getAll={data} />}
                {/* <!-- Modal profile --> */}
                {modal3 && <Modal3 data={teacher} fn={chModal3}  />}

                {modal1 && <div onClick={chModal1} className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}
                {modal2 && <div onClick={chModal2} className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}
                {modal3 && <div onClick={chModal3} className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}

            </main>
        </div >
    )

}