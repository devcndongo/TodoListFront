import { Typography } from "@material-tailwind/react";

export default function ImgWithBlurredCaption({task,h}) {
  return (
    <figure className={`relative ${h} w-auto`}>
      <img
        className={`h-full w-full rounded-xl object-cover object-center`}
        src={task}
        alt="nature image"
      ></img>
      <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h5" color="blue-gray">
            Ajouter vos taches
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
            Lundi 20 Aout 2023
          </Typography>
        </div>
        <Typography variant="h5" color="blue-gray">
          Task
        </Typography>
      </figcaption>
    </figure>
  );
}