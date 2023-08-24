import Register from "../../components/Tools/Register";
import ImgWithBlurredCaption from "../../components/Widgets/homeImg";
import task from '../../assets/img/Work together.jpeg';

function Create() {
    const h = 'h-96';
  return (
       <div className="p-12 pl-40 pr-40">
            <div className="flex space-x-9 rounded-lg shadow-lg w-max pr-24">
              <div className="">
                <ImgWithBlurredCaption task={task} h={h}/>
              </div>
                <div className>
                <Register />
                </div>
            </div>
       </div>
  );
}
export default Create;
