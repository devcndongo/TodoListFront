import { useEffect } from "react";
import { useState } from "react";
import EvenementService from "../../Services/evenementService";
import Tools from "../../Services/tools";
import CardEvent from "../../components/Widgets/CardEvent";
import { Link } from "react-router-dom";

export default function ListEvenements() {
  const [filtreTypes, setTiltreTypes] = useState([]);
  const [evenements, setEvenements] = useState([]);
  const [tampons,setTampons] = useState([]);
  const image_url = Tools.API_FILE_URL;
  const focusFiltre = (id) => {
    let values = [...filtreTypes];
    values = values.map((type) => {
      if (type.id === id) {
        type.active = !type.active;
      }
      return type;
    });
    setTiltreTypes(values)
    filtreByType()
  };

  const filtreByType = () => {
    const filtres = filtreTypes.filter(type=>type.active)
    switch (true) {
      case filtres.length === 0:
            setEvenements(tampons)
        break;
      case filtres.length > 0:
          setEvenements(tampons.filter((evenement)=> filtres.map((filtre)=>filtre.id).includes(evenement.type)))
        break;

      default:
        setEvenements(tampons)
        break;
    }
  }
  useEffect(() => {
    EvenementService.list()
      .then((response) => {
        setEvenements(response);
        setTampons(response);
      })
      .catch((error) => {
        console.log(error);
      });
    EvenementService.getTypes()
      .then((response) => {
        const filtres = response.map((type) => {
          const value = {
            id: type._id,
            type: type.type,
            icon: "",
            active: false,
          };
          switch (type.type) {
            case "ENTREPRISE":
              value.icon = "https://img.icons8.com/ios/50/calendar--v1.png";
              return value;
            case "CULTUREL":
              value.icon = "https://img.icons8.com/ios/50/playlist.png";
              return value;
            case "SPORTIVE":
              value.icon = "https://img.icons8.com/ios/50/football2.png";
              return value;
            case "SOCIAL":
              value.icon = "https://img.icons8.com/ios/50/comments--v1.png";
              return value;
            case "COLLECTE DE FONDS":
              value.icon = "https://img.icons8.com/ios/50/salary-female.png";
              return value;

            default:
              return value;
          }
        });
        setTiltreTypes(filtres);
      })
      .catch((error) => {});

    return () => {};
  }, []);
  return (
    <div>
      <section className="h-auto min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-2 flex justify-center">
          <ol class="justify-center text-black items-center w-max space-y-4 sm:flex sm:space-x-8 sm:space-y-1 p-3 pb-0 rounded-lg shadow-xl">
            {filtreTypes.map((type) => (
              <Link
                onClick={()=>{
                  focusFiltre(type.id)
                }}
                key={type.id}
                className={` flex items-center  hover:text-gray-600 space-x-2.5 hover:border-b-2 hover:border-b-black ${type.active ? 'text-gray-600 border-b-black border-b-2' :''}`}
              >
                <div className="mb-4 flex space-x-2">
                  <img className="w-6 h-6" src={type.icon} alt="" srcset="" />
                  <br />
                  <p>{type.type}</p>
                </div>
              </Link>
            ))}
            <li class="flex items-center text-gray-600  space-x-2.5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              <br />

              <p>filtres</p>
            </li>
          </ol>
        </div>
        <div className="grid grid-cols-4 items-end justify-center space-x-2  space-y-2 px-6 py-8 m-4 lg:py-0">
          {evenements.map((evenement) => (
            <div key={evenement._id} className="basis-1/4">
              <CardEvent
                image={image_url + evenement.affiche}
                evenement={evenement}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
