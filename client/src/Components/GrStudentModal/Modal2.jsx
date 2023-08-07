import { useRef, useEffect, useState } from "react"
import axios from "axios"
import config from "../../config"
import { useParams } from "react-router";


export default ({ fn, getAll }) => {
    const [grStudents, setGrStudents] = useState([])
    let inp = useRef(null)
    let idGroup = useParams('id')

    const checkInp = async () => {
        let user = {
            idTeacher: idGroup.idTeacher,
            idGroup: idGroup.id,
            idStudent: inp.current.value
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                authorization: window.localStorage.getItem('token'),

            }
        }
        let res = await axios.post(`${config.backApi}/admin/students/manage`, user, axiosConfig)
        if (res.data.title == "Bunday oquvchi allaqachon mavjud") {
            alert("Bunday oquvchi allaqachon mavjud")
        } else {
           
            fn()
            getAll()
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
            const DATA = await axios(`${config.backApi}/admin/students`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: window.localStorage.getItem('token'),
                }
            })
            if (DATA.data.message == "Token wrong") {
                window.location.replace('/')
            } else if (DATA.data.message == "Token is not defined") {
                window.location.replace('/')
            } else {
                setGrStudents(DATA.data.data)
            }
        }
    }
    return (
        <div tabIndex="-1" aria-modal="true" role="dialog"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex">
            <div className="relative w-10/12 max-h-full">
                {/* <!-- Modal content --> */}
                <div className="w-full relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" onClick={fn}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="w-full px-6 py-6 lg:px-8 flex flex-col ">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Post</h3>
                        <form className="flex items-center gap-10 flex-wrap">
                            <label htmlFor="simple-search" className="sr-only">Ism</label>
                           


                            <select ref={inp} name="" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {grStudents.map((item, i) => {
                                    return (

                                        <option value={item._id}>{item.firstName}</option>
                                    )

                                })}
                            </select>

                            <button type="button" onClick={checkInp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}