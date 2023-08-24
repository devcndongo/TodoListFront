import React, { useState } from "react";
import passwordValidator from "password-validator";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ApiService from "../../Services/base-service";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordIsConform, setPasswordIsConform] = useState(false);
  const schema = new passwordValidator();
  schema
    .is()
    .min(8) // Minimum length is 8 characters
    .has()
    .letters() // Must have at least one letter
    .has()
    .symbols(); // Must have at least one symbol

  const checkPassword = (newPassword) => {
    setPassword(newPassword);
    setPasswordIsValid(schema.validate(newPassword));
  };
  const checkConfirmPassword = async (newConfirmPass) => {
    await setConfirmPassword(newConfirmPass);
    setPasswordIsConform(password === newConfirmPass);
  };
  const goPath = () => {
    switch (Cookies.get("back")) {
      case "create":
        navigate(-2)
        break;
    
      default:
        navigate(-1)
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    ApiService.register({name:name,email:email,password:password}).then(
      (response)=>{
        Cookies.set('token',response.token)
        Cookies.set('user',JSON.stringify(response.user))
        goPath()
      }

    ).catch(
      (error)=>{
          console.log(error)
      }
    )
  };
  return (
    <div className=" pl-4 w-full">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inscription
            </h1>
            <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit}>
              <div className="flex space-x-4">
              <div >
                
                  <label
                    for="nom"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="nom"
                    id="nom"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-sky-900 focus:border-transparent focus:outline-none "
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
               
                
              </div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-sky-900 focus:border-transparent focus:outline-none "
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>
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
                  className={`${
                    passwordIsValid || password.length === 0
                      ? "bg-gray-50 border-gray-300 focus:ring-sky-900 "
                      : "bg-red-50 border-red-300 focus:ring-red-500 "
                  } border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:border-transparent focus:outline-none`}
                  value={password}
                  onChange={(e) => checkPassword(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label
                  for="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className={`${
                    passwordIsConform || confirmPassword.length === 0
                      ? "bg-gray-50 border-gray-300 focus:ring-sky-900 "
                      : "bg-red-50 border-red-300 focus:ring-red-500 "
                  } border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:border-transparent focus:outline-none`}
                  value={confirmPassword}
                  onChange={(e) => checkConfirmPassword(e.target.value)}
                  required
                ></input>
              </div>

              <button
                type="submit"
                disabled={!passwordIsConform || !passwordIsValid}
                className="w-full text-white bg-sky-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Inscrivez-vous
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Connectez-vous
                </Link>
              </p>
            </form>
            </div>
         
  );
}
