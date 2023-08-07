export default ({ fn,data }) => {
    return (
        <div tabIndex="-1" aria-modal="true" role="dialog"
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex">
                    <div className="relative w-full max-w-md max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" onClick={fn}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                data-modal-hide="profile-modal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-8 py-6 lg:px-8">
                                <div className="w-full max-w-md p-3  border-none bg-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 ">
                                    
                                    <div className="flex flex-col pb-10">
                                        <div className="Profile flex items-center ">
                                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                                                src="https://images.unsplash.com/photo-1684611235343-dd6c5fa8f49f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" />
                                            <p className="text-yellow-300 ml-3 text-1xl">13<i
                                                className="fa-solid fa-arrow-up ml-1 text-yellow-300 "></i></p>
                                        </div>
                                        <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>First Name : </strong>{data.firstName}</p>
                                        <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>Last Name : </strong>{data.lastName}</p>
                                        <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>mother's phone : </strong>{data.parentsPhone?.mother}</p>

                                        <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>father's phone : </strong>{data.parentsPhone?.father}</p>
                                     
                                        <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>Email : </strong>{data.email}
                                        </p>
                                        <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>Phone number : </strong>{data.phone}
                                        </p>
                                        <div className="flex mt-4 space-x-3 md:mt-6">
                                            <a href="#"
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i
                                                    className="fa-solid fa-user-plus"></i></a>
                                            <a href="#"
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-yellow-400 border border-gray-300 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"><i
                                                    className="fa-solid fa-star"></i></a>
                                            <a href="#"
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"><i
                                                    className="fa-solid fa-message"></i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
    )
}