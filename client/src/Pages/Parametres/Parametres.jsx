import { Outlet } from "react-router-dom"
import InnerSidebar from "./innerSidebar/InnerSidebar"

const Parametres = () => {
  return (
    <div className="w-full pt-2">
      <div className="flex w-full  justify-center pt-10 px-20">
        <div className="bg-white flex justify-start w-11/12 h-[60vh] 2xl:h-[500px] px-2 mr-8">
          <InnerSidebar />
          <div className="w-11/12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parametres