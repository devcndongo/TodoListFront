import Auth from "../../components/Tools/Auth";
import ImgWithBlurredCaption from "../../components/Widgets/homeImg";
import task from '../../assets/img/task.jpeg';

function Home() {
  const h = 'h-96';
  return (
       <div className="p-12 pl-40 pr-40">
            <div className="flex rounded-lg shadow-lg ">
              <div className="">
                <ImgWithBlurredCaption task={task} h={h}/>
              </div>
                <div>
                <Auth />
                </div>
            </div>
       </div>
  );
}
export default Home;
