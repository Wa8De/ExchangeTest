import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Layout/Sidebar/Sidebar";
import Navbar from "../Components/Layout/Navbar/Navbar";

const Layout = () => {
  return (
    <div>
      {/* Place any layout-specific content here */}
        <Sidebar />
      <div className="ml-64 ">
        <Navbar />
      </div>
      <div className="ml-64 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
