import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoutes = () => {
  const jwt = sessionStorage.getItem("jwt");
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!jwt) {
      Swal.fire({
        title: "Access unauthorized",
        html: "You will be redirected to the login page in",
        timer: 2000,
        timerProgressBar: true,
        background: "#366B87",
        color: "#fff",
        confirmButtonColor: "#5AB4A9",
        customClass: {
          popup: "swal2-popup rounded-lg font-primary", // Apply the custom class to the modal
        },
        didDestroy: () => {
          sessionStorage.clear();
          navigate("/login");
        },
      });
    } else {
      return <Outlet />;
    }
  };

  return handleLogout();
};

export default PrivateRoutes;
