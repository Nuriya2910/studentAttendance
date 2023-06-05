import { useState, useEffect, useRef } from "react";
import axios from "axios"
import config from '../config'

export default  ()=>{
    const [isDarkMode, setIsDarkMode] = useState(false);

  let inp1 = useRef(null)
  let inp2 = useRef(null)

  useEffect(() => {
    const isOSDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('color-theme');

    if (storedTheme === 'dark' || (!storedTheme && isOSDarkMode)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }, [isDarkMode]);

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };


const getItem = async () =>{
    const user = {
        email: inp1.current.value,
        password: inp2.current.value
    }
    if (inp1.current.value && inp2.current.value) {
        try {
            let DATA = await axios.post(`${config.backApi}/auth/signIn`, user)
            console.log(DATA.data.message)
            if (DATA.data.message==="Login not successful") {
                alert('Parol xato')
            } 
            else if (DATA.data.message==="Login successful") {
                const TOKEN = DATA.data.token
                window.localStorage.setItem('token', TOKEN)
                window.location.replace('/admin')
            }
        } catch (e) {
            if(e.response.data.error==="User not found"){
                        alert("Bunday foydalanuvchi mavjud emas")
                      }
            console.log(e);
        }
    }else{
        alert('Fill the form')
    }
}
  return (
    <div >
      <main className=" bg-white dark:bg-gray-900 h-screen">
        <div className="text-center fixed top-5  right-6">
          <button id="theme-toggle" onClick={handleClick}>
     
      <svg id="theme-toggle-dark-icon" className={isDarkMode ? 'hidden' : ''} xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 384 512"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>
      <svg id="theme-toggle-light-icon" className={isDarkMode ? '' : 'hidden'} xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg>

      
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
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-gray-400 hover:text-blue-700">Forgot password?</a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input ref={inp2} id="password" name="password" type="password" autoComplete="current-password" required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                </div>

                <div>
                  <button onClick={getItem} type="button"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                    in</button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-blue-600">Start a 14 day free
                  trial</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}