import {ProfileIcon, Settingsicon, NotificationIcon, SecurityIcon, Loogout} from '../../../Components/MenuItem/Icon'
import InnerMenuItem from "./menuItems/InnerMenuItem"
import {Link, useLocation} from 'react-router-dom'
const InnerSidebar = () => {
  const Logout = () => {
    sessionStorage.clear();
    // setRefresh(!refresh);
    window.location.replace("/login");
  };

  const location = useLocation();
  const checkURL = (path) => {
    console.log(location.pathname);
    return location.pathname.includes(path);
  };
  
  return (
    <>
    <div className="w-56 bg-white ml-3 left-0 flex flex-col justify-start items-center">
      <div className='mt-5 w-48'>
        <Link to={"/settings/profile"}>
          <InnerMenuItem 
            icon={<ProfileIcon active={checkURL("/settings/profile")} />} 
            title="Editer le profile"
            active={checkURL("/settings/profile")}
          />
        </Link>
      </div>
      <div className='w-48'>
        <Link to={"/settings/preferences"}>
          <InnerMenuItem 
            icon={<Settingsicon active={checkURL("/settings/preferences")} />} 
            title="Préférences"
            active={checkURL("/settings/preferences")}
          />
        </Link>
      </div>
      <div className='w-48'>
        <Link to={"/settings/notifications"}>
          <InnerMenuItem 
            icon={<NotificationIcon active={checkURL("settings/notifications")} />} 
            title="Notifications"
            active={checkURL("settings/notifications")}
          />
        </Link>
      </div>
      <div className='w-48'>
        <Link to={"/settings/security"}>
          <InnerMenuItem 
            icon={<SecurityIcon active={checkURL("/settings/security")} />} 
            title="Sécurité"
            active={checkURL("/settings/security")}
          />
        </Link>
      </div>
      <div className='w-48 border-t mt-2'>
        <Link onClick={Logout}>
          <InnerMenuItem 
            icon={<Loogout/>} 
            title="Se déconnecter"
          />
        </Link>
      </div>
    </div>
    </>
  )
}

export default InnerSidebar