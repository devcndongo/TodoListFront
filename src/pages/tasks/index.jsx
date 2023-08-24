import Task from "../../components/Tools/task";
import Create from "../../components/Tools/CreateTask";
import { useEffect, useState } from "react";
import ApiService from "../../Services/base-service";
import Cookies from "js-cookie";
import jwt from 'jwt-decode';

export default function Tasks() {
  const [user,setUser] = useState(null)
  const getUser = ()=>{
    const user = jwt(Cookies.get("token"));
    ApiService.getId(user.sub).then(
      (response)=>{
        setUser(response)   
      }
    ).catch((error)=>{
      console.log(error)
    })
  }
  
  useEffect(() =>{
    

     getUser();
    return () => {
      
    };
  },[])
  return (
    <div>
      <div class="flex items-center justify-center w-screen h-full font-medium">
        <div class="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
          <div class="max-w-full p-8 bg-white rounded-lg shadow-lg w-2/4 mt-16 mb-16">
            <div class="flex items-center mb-6 w-full">
              <svg
                class="h-8 w-8 text-red-700 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h4 class="font-semibold ml-3 text-lg ">taches à faire</h4>
            </div>
            <div className="flex w-full items-end flex-row space-x-2">
              <div class="basis-3/5 w-full mb-3">
                <form>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="bg-gray-50 border border-l-transparent border-t-transparent border-r-transparent border-b-sky-800 border-b-2 focus:border-b-sky-950  text-gray-900 sm:text-sm rounded-none  block w-full p-2.5 focus:ring-2 focus:ring-transparent focus:outline-none "
                      placeholder="              Taches"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="basis-2/5 w-full mb-3">
              <select
                      className="bg-gray-50 border border-l-transparent border-t-transparent border-r-transparent border-b-sky-800 border-b-2 focus:border-b-sky-950 text-gray-900 sm:text-sm rounded-none block w-full p-2.5 focus:ring-2 focus:ring-transparent focus:outline-none"
                      
                      
                    >
                      <option selected>Tous les Taches</option>
                      
                    </select>
              </div>
            </div>

            <Create user={user} getUser={getUser}/>
            {
              user && user.tasks.map(
                (task) => <Task task={task} getUser={getUser}/>
              )
            }
            
            
          </div>
        </div>
      </div>
      
    </div>



  );
}

