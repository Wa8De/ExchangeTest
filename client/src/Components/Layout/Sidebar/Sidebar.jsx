import { useState } from "react";
import Balance from "../../Balance";
import MenuItem from "../../MenuItem/MenuItem";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardIcon,
  ExchangeIcon,
  UtilisateursIcon,
  PermissionIcon,
  TransactionIcon,
  ClientsIcon,
  DeviseIcon,
  HistoriqueIcon,
  ReleveIcon,
  ParametresIcon,
  LogoutIcon,
} from "../../MenuItem/Icon";
import Logo from "../../Logo/Logo";

const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const [refresh, setRefresh] = useState(false);
  // Define a function to check if the given path is active
  const checkURL = (path) => {
    // console.log(location.pathname);
    return location.pathname.includes(path);
  };
  

  const Logout = () => {
    sessionStorage.clear();
    setRefresh(!refresh);
    window.location.replace("/login");
  };

  return (
    <>
      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform"
        aria-label="Sidebar"
      >
        <div className="h-full w-full pl-3 py-4 overflow-y-auto bg-white">
          <div className="flex flex-col h-full justify-between">
            <Link to={"/dashboard"}>
        <Logo textColor="text-black"/>
            </Link>
            <div>
              <Balance />
              <div className="text-xs mb-2 font-primary tracking-wider text-gray-500 2xl:p-2">
                MENU
              </div>
            </div>
            <ul className="space-y-2 font-medium 2xl:flex 2xl:flex-col 2xl:gap-2 ">
              <Link to={"/dashboard"}>
                <MenuItem
                  title="Dashboard"
                  icon={<DashboardIcon active={checkURL("/dashboard")} />}
                  active={checkURL("/dashboard")}
                />
              </Link>
              <Link to={"/change"}>
                <MenuItem
                  title="Exchange"
                  icon={<ExchangeIcon active={checkURL("/change")} />}
                  active={checkURL("/change")}
                />
              </Link>
              <Link to={"/utilisateurs"}>
                <MenuItem
                  title="Utilisateurs"
                  icon={<UtilisateursIcon active={checkURL("/utilisateurs")} />}
                  active={checkURL("/utilisateurs")}
                />
              </Link>
              <Link to={"/clients"}>
                <MenuItem
                  title="Clients"
                  icon={<ClientsIcon active={checkURL("/clients")} />}
                  active={checkURL("/clients")}
                />
              </Link>
              <Link to={"/roleEtPermission"}>
                <MenuItem
                  title="Rôle et Permission"
                  icon={
                    <PermissionIcon active={checkURL("/roleEtPermission")} />
                  }
                  active={checkURL("/roleEtPermission")}
                />
              </Link>
              <Link to={"/transactions"}>
                <MenuItem
                  title="Transaction"
                  icon={<TransactionIcon active={checkURL("/transactions")} />}
                  active={checkURL("/transactions")}
                />
              </Link>
              <Link to={"/devise"}>
                <MenuItem
                  title="Devise"
                  icon={<DeviseIcon active={checkURL("/devise")} />}
                  active={checkURL("/devise")}
                />
              </Link>
              <Link to={"/historique"}>
                <MenuItem
                  title="Historique"
                  icon={<HistoriqueIcon active={checkURL("/historique")} />}
                  active={checkURL("/historique")}
                />
              </Link>
              <Link to={"/transactionReleve"}>
                <MenuItem
                  title="Relève de transaction"
                  icon={<ReleveIcon active={checkURL("/transactionReleve")} />}
                  active={checkURL("/transactionReleve")}
                />
              </Link>
            </ul>
            <ul className="space-y-2 pt-2 font-medium 2xl:flex 2xl:flex-col  mt-auto">
              <Link to={"/settings/profile"}>
                <MenuItem
                  title="Paramètres"
                  icon={<ParametresIcon active={checkURL("/settings")} />}
                  active={checkURL("/settings")}
                />
              </Link>

              <Link onClick={Logout}>
                <MenuItem title="Se déconnecter" icon={<LogoutIcon />} />
              </Link>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
