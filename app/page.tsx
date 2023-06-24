'use client'

import Image from "next/image";
import {useState} from "react"


export default function Login() {
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const loginUser = async (e: any) => {
  e.preventDefault();
  fetch('http://localhost:"3000/api/auth', {
    method: 'POST',
    headers:{'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({username, password})
  })
 }

 

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src="/y-i.png"
            alt="Yawa"
            className="mx-auto h-50 w-auto"
            width={150}
            height={50}
            priority
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Connexion au server
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
               Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e)=> setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mot de passe
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-emerald-600 hover:text-emerald-500"
                  >
                    Mot de passe oublier?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Connexion
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
          powered by {" "}
            <a
              href="https://yawatechnologie.sn"
              className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
            >
              <Image
                src="/lo.png"
                alt="Yawa"
                className="mx-auto h-19 w-auto"
                width={120}
                height={50}
                priority
              />
            </a>
          </p>
        </div>


<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 
        <a href="https://yawatechnologie.sn/" className="hover:underline"> Yawa Technologie™</a>. All Rights Reserved. version: 3.0</span>
    </div>
</footer>


      </div>
    </>
  );
}
