import { useState, useEffect, useRef } from "react";
import axios from "axios"
import config from '../config'

export default () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  let inp1 = useRef(null)
  let inp2 = useRef(null)

  const signIn = async () => {
    const user = {
      email: inp1.current.value,
      password: inp2.current.value
    }
    if (inp1.current.value && inp2.current.value) {
      try {
        let DATA = await axios.post(`${config.backApi}/auth/signIn`, user)
        if (DATA.data.message === "Login not successful") {
          alert('Parol xato')
        }
        else if (DATA.data.message === "Login successful") {
          const TOKEN = DATA.data.token
          window.localStorage.setItem('token', TOKEN)
          let date = new Date()
          date.setHours(date.getHours() + 2)
          window.localStorage.setItem("tokenDate", date)
          if (DATA.data.role === 'admin') {
            window.location.replace('/admin')
          } else if (DATA.data.role === 'teacher') {
            window.location.replace('/teacher')
          } else if (DATA.data.role === 'student') {
            window.location.replace('/student')
          }
        }
      } catch (e) {
        if (e.response.data.error === "User not found") {
          alert("Bunday foydalanuvchi mavjud emas")
        }
      }
    } else {
      alert('Fill the form')
    }
  }
  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <main className=" bg-white dark:bg-gray-900 h-screen">
        <div className="text-center fixed top-5  right-6">

          <button id="theme-toggle" onClick={handleClick} className="text-center text-gray-500 px-4 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" >

            {isDarkMode == true ? <i className="text-2xl fa-solid fa-sun"></i> :
              <i className="text-2xl fa-solid fa-moon"></i>
            }

          </button>
        </div>
        <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
          <div className="card sm:mx-auto sm:w-full sm:max-w-sm bg-gray-200 dark:bg-gray-800 p-5  rounded-lg shadow">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">

              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                Sign in to your
                account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Email
                    address</label>
                  <div className="mt-2">
                    <input ref={inp1} id="email" name="email" type="email" autoComplete="email" required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Password</label>

                  </div>
                  <div className="mt-2">
                    <input ref={inp2} id="password" name="password" type="password" autoComplete="current-password" required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                </div>

                <div>
                  <button onClick={signIn} type="button"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                    in</button>
                </div>
              </form>


            </div>
          </div>
        </div>
      </main>
    </div>
  )
}