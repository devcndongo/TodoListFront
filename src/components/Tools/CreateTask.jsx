import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody
} from "@material-tailwind/react";
import TaskService from "../../Services/task-service";
import Swal from "sweetalert2";
export default function Create({user,getUser}) {
  const [open, setOpen] = React.useState(false);
  const [debut, setDebut] = useState(null);
  const [fin, setFin] = useState(null);
  const [titre, setTitre] = useState(null);
  const [categorie, setCategorie] = useState("A_FAIRE");
  
  const [commentaire, setCommentaire] = useState(null);
  const handleOpen = () => setOpen(!open);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      debut:debut,
      fin:fin,
      titre:titre,
      categorie:categorie,
      commentaire:commentaire,
      user:user
    }
    
    TaskService.create(data).then(
      (response)=>{
         getUser()
         handleOpen(null)
         Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tache crée',
          showConfirmButton: false,
          timer: 1500
        })
      }
    ).catch((error)=>{
      console.log(error)
    })
  };

  return (
    <>
      <div className="mt-4 text-right">
        <button
          className="bg-transparent border-none"
          onClick={handleOpen}
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 text-slate-950 font-bold"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        className="h-auto w-2/4"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="flex flex-row">
         
          <div className="basis-10/12">Creer une tache</div>
          <div className="basis-2/12 text-end">
            <span className="float-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleOpen(null)}
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>{" "}
        </DialogHeader>
        <DialogBody divider>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-row space-x-2">
              <div className="basis-2/3">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Titre
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border border-l-transparent border-t-transparent border-r-transparent border-b-sky-800 border-b-2 focus:border-b-sky-950  text-gray-900 sm:text-sm rounded-none  block w-full p-2.5 focus:ring-2 focus:ring-transparent focus:outline-none`}
                  placeholder="name@gmail.com"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  required
                ></input>
              </div>
              <div className="basis-1/3">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Categorie
                </label>
                <select
                  className={`bg-gray-50 border border-l-transparent border-t-transparent border-r-transparent border-b-sky-800 border-b-2 focus:border-b-sky-950 text-gray-900 sm:text-sm rounded-none block w-full p-2.5 focus:ring-2 focus:ring-transparent focus:outline-none`}
                  placeholder="name@gmail.com"
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                >
                  <option value="A_FAIRE" selected>
                    A FAIRE
                  </option>
                  <option value="EN_COURS">EN COURS</option>
                  <option value="TERMINER"> TERMINER</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="sm:basis-1/2">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date de début
                </label>
                <input
                  type="datetime-local"
                  name="debut"
                  id="debut"
                  className="bg-gray-50 border border-l-transparent border-t-transparent border-r-transparent border-b-sky-800 border-b-2 focus:border-b-sky-950  text-gray-900 sm:text-sm rounded-none  block w-full p-2.5 focus:ring-2 focus:ring-transparent focus:outline-none "
                  placeholder="Début"
                  value={debut} 
                  onChange={(e) => setDebut(e.target.value)}
                  required
                ></input>
              </div>
              <div className="sm:basis-1/2">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date de Fin
                </label>
                <input
                  type="datetime-local"
                  name="fin"
                  id="fin"
                  className="bg-gray-50 border border-l-transparent border-t-transparent border-r-transparent border-b-sky-800 border-b-2 focus:border-b-sky-950  text-gray-900 sm:text-sm rounded-none  block w-full p-2.5 focus:ring-2 focus:ring-transparent focus:outline-none "
                  placeholder="Fin"
                  value={fin}
                  onChange={(e) => setFin(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <div className="">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                className="bg-gray-50 border border-l-transparent border-t-transparent border-r-transparent border-b-sky-800 border-b-2 focus:border-b-sky-950 text-gray-900 sm:text-sm rounded-none block w-full p-2.5 focus:ring-2 focus:ring-transparent focus:outline-none"
                cols="30"
                rows="4"
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-red-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Ajouter
            </button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
