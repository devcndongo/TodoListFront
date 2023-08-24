import { useEffect, useState } from "react";
import TaskService from "../../Services/task-service";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

export default function Task({ task, getUser }) {
  const [open, setOpen] = useState(null);
  const [debut, setDebut] = useState(task.debut);
  const [fin, setFin] = useState(task.fin);
  const [titre, setTitre] = useState(task.titre);
  const [puce, setPuce] = useState(true);
  const [categorie, setCategorie] = useState(task.categorie);
  const [show, setShow] = useState(false);
  const [commentaire, setCommentaire] = useState(task.commentaire);
  const handleOpen = () => setOpen(!open);

  const customCategorie = () => {
    switch (categorie) {
      case "A_FAIRE":
        return "A FAIRE";
      case "EN_COURS":
        return "EN COURS";

      default:
        return categorie;
    }
  };
  const getBackgroundColor = (categorie) => {
    if (categorie === "A_FAIRE") {
      return "bg-orange-100";
    } else if (categorie === "EN_COURS") {
      return "bg-yellow-100";
    } else {
      return "bg-green-100"; // Par défaut, utilisez "bg-green-100" si la catégorie n'est pas reconnue
    }
  };

  const getTextColor = (categorie) => {
    if (categorie === "A_FAIRE") {
      return "text-orange-800";
    } else if (categorie === "EN_COURS") {
      return "text-yellow-800";
    } else {
      return "text-green-800"; // Par défaut, utilisez "text-green-800" si la catégorie n'est pas reconnue
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    task.debut = debut;
    task.fin = fin;
    task.titre = titre;
    task.categorie = categorie;
    task.commentaire = commentaire;

    TaskService.update(task.id, task)
      .then((response) => {
        handleOpen(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formatDateToString = (date) => {
    return date.replace(":00.000+00:00", "");
  };

  const deleteTask = async (id) => {
    TaskService.delete(id)
      .then((response) => {
        getUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return "";
    }
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = parsedDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  };
  const TaskComponent = () => {
    const bgClass = getBackgroundColor(task.categorie);
    const textClass = getTextColor(task.categorie);

    return (
      <span
        className={` ${bgClass} ${textClass} text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300`}
      >
        {customCategorie()}
      </span>
    );
  };
  useEffect(() => {
    const currentDate = new Date();
    const finDate = new Date(fin);
    setPuce(finDate < currentDate);
  }, [fin]);
  return (
    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        <li class="py-3 sm:py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <input
                type="checkbox"
                className="h-5 w-5 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0 rounded-full "
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {task.titre}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                {formatDate(task.debut)} - {formatDate(task.fin)}
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white space-x-4">
              <button
                className="bg-transparent border-none"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
              <button
                className="bg-transparent border-none"
                onClick={() => {
                  handleOpen();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <button
                className="bg-transparent border-none"
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-red-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
          {show && (
            <div className="flex">
              <div className="text-sm basis-2/3"> {task.commentaire}</div>
              <div className="text-sm basis-1/3 text-end">
                {TaskComponent()}
              </div>
            </div>
          )}
        </li>
      </ul>
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
          <div className="basis-10/12">Tache</div>
          <div className="basis-2/12 text-end">
            <span className="float-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  handleOpen(null);
                }}
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
                  value={formatDateToString(debut)}
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
                  value={formatDateToString(fin)}
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
                Commentaire
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
    </div>
  );
}
