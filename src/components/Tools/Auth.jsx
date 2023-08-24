import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../Services/base-service";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [auth, setAuth] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.auth({email:email,password:password}).then((response)=>{
      Cookies.set('token',response.jwtToken)
    navigate('/tasks')

    }).catch((error) => {
      setAuth(true)
    });
    
  };
  
  return (
    <div className="p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Connectez-vous
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border-gray-300 focus:ring-red-900
                  border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-red-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:border-transparent focus:outline-none`}
                  
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>

              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border-gray-300 focus:ring-red-900 
                   border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:border-transparent focus:outline-none`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    value={remember}
                    onChange={(e) => setRemember(e.target.value)}
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    for="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Se souvenir de moi.
                    
                
                  </label>
                </div>
              </div>
              <p className={`text-sm ${ auth ? 'block' : 'hidden' } font-light text-red-700 dark:text-red-700`} >Email ou mot de passe incorrect !</p>
              <button
                type="submit"
                className="w-full text-white bg-red-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Connexion
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Avez-vous un compte?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Inscrivez-vous
                </Link>
              </p>
            </form></div>
          
  );
}
