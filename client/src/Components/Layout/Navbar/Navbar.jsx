/* eslint-disable react/no-unknown-property */
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";
import LanguageDropdown from "./Language";
import ReactLoading from "react-loading";

const Navbar = () => {
  const notifications = [4];
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = sessionStorage.getItem("jwt");
        const decoded = jwt_decode(jwt);
        const userId = decoded.payload.userId;

        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);

        setUser(response.data.user);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);

        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="w-full bg-white h-20 flex items-center justify-end gap-8 pr-20 shadow-md">
      <LanguageDropdown />
      <div className="justify-center items-center mt-1">
        {notifications.length > 0 ? (
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.1704 6.30127V9.32777" stroke="#1E1E1E" strokeWidth="1.36329" strokeMiterlimit="10" strokeLinecap="round"/>
          <path d="M11.1884 2.26587C7.84376 2.26587 5.13536 4.97427 5.13536 8.31887V10.2275C5.13536 10.8455 4.88088 11.7725 4.56278 12.2997L3.40853 14.2264C2.69962 15.4171 3.1904 16.744 4.49916 17.1802C8.8435 18.6253 13.5423 18.6253 17.8866 17.1802C19.1136 16.7713 19.6407 15.3353 18.9773 14.2264L17.823 12.2997C17.5049 11.7725 17.2504 10.8364 17.2504 10.2275V8.31887C17.2414 4.99244 14.5148 2.26587 11.1884 2.26587Z" stroke="#1E1E1E" strokeWidth="1.36329" strokeMiterlimit="10" strokeLinecap="round"/>
          <path d="M14.1968 17.5529C14.1968 19.2161 12.8335 20.5794 11.1703 20.5794C10.3432 20.5794 9.57979 20.234 9.03448 19.6887C8.48916 19.1434 8.1438 18.3799 8.1438 17.5529" stroke="#1E1E1E" strokeWidth="1.36329" strokeMiterlimit="10"/>
          <g clipPath="url(#clip0_103_5)">
          <path d="M17.0778 1.35693H17.0778C14.819 1.35693 12.9879 3.18803 12.9879 5.44679V5.4468C12.9879 7.70557 14.819 9.53666 17.0778 9.53666H17.0778C19.3366 9.53666 21.1676 7.70557 21.1676 5.4468V5.44679C21.1676 3.18803 19.3366 1.35693 17.0778 1.35693Z" fill="#FF2437"/>
          <path d="M17.0778 1.35693H17.0778C14.819 1.35693 12.9879 3.18803 12.9879 5.44679V5.4468C12.9879 7.70557 14.819 9.53666 17.0778 9.53666H17.0778C19.3366 9.53666 21.1676 7.70557 21.1676 5.4468V5.44679C21.1676 3.18803 19.3366 1.35693 17.0778 1.35693Z" stroke="white" strokeWidth="1.81772"/>
          </g>
          <defs>
          <clipPath id="clip0_103_5">
          <rect width="11" height="11" fill="white" transform="translate(12)"/>
          </clipPath>
          </defs>
          </svg>          
        ) : (
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.1704 6.30127V9.32777" stroke="#1E1E1E" strokeWidth="1.36329" strokeMiterlimit="10" strokeLinecap="round"/>
          <path d="M11.1884 2.26587C7.84376 2.26587 5.13536 4.97427 5.13536 8.31887V10.2275C5.13536 10.8455 4.88088 11.7725 4.56278 12.2997L3.40853 14.2264C2.69962 15.4171 3.1904 16.744 4.49916 17.1802C8.8435 18.6253 13.5423 18.6253 17.8866 17.1802C19.1136 16.7713 19.6407 15.3353 18.9773 14.2264L17.823 12.2997C17.5049 11.7725 17.2504 10.8364 17.2504 10.2275V8.31887C17.2414 4.99244 14.5148 2.26587 11.1884 2.26587Z" stroke="#1E1E1E" strokeWidth="1.36329" strokeMiterlimit="10" strokeLinecap="round"/>
          <path d="M14.1968 17.5529C14.1968 19.2161 12.8335 20.5794 11.1703 20.5794C10.3432 20.5794 9.57979 20.234 9.03448 19.6887C8.48916 19.1434 8.1438 18.3799 8.1438 17.5529" stroke="#1E1E1E" strokeWidth="1.36329" strokeMiterlimit="10"/>
          </svg>
        )}
      </div>
      <div className="flex justify-between items-center h-full mt-1">
        <img className="rounded-full mr-2" src="http://localhost:5173/assets/images/default_avatar.png" alt="" />
        <span className="font-primary text-sm font-semibold mr-2">
          {loading ? <ReactLoading type="bars" color="#0D9E6B" height={50} width={50} /> : user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : "ANONYMOUS"}
        </span>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.0672 8.58234L13.1415 14.5081C12.4416 15.2079 11.2965 15.2079 10.5967 14.5081L4.6709 8.58234" stroke="#414141" strokeWidth="1.36329" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

      </div>
    </div>
  );
};

export default Navbar;
