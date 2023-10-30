import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Edit from "../../Components/Buttons/Edit";

const DetailsUtilisateurs = () => {
  const { id } = useParams();
  // console.log(id);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${id}`
        );
        setUser(response.data.user);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);

        setLoading(false);
      }
    };
    fetchData();
  }, [id, user]);
  const UpdateStatus = async () => {
    try {
      await axios.put(`http://localhost:3000/api/users/${id}/status`);
    } catch (error) {
      console.error("Error Updating user's status:", error);
    }
  };

  return (
    <div className="w-full pt-2 h-full">
      <div className="flex justify-start">
        <span className="font-primary font-bold text-xl pt-6 pb-2 px-14 text-gray-500">
          {`Détails de l'utilisateur`}
        </span>
      </div>
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#6D6A6A66",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="#0D9E6B" height={50} width={50} />
        </div>
      ) : (
        <div className="flex w-full pt-2 px-8 h-full py-4">
          <div className="w-1/3 flex justify-start p-4 mr-4">
            <div className="w-full flex justify-start items-start">
              <div className="w-full flex justify-center relative flex-col items-center bg-white rounded-3xl px-4 py-8">
                <button className="absolute right-4 top-4 ">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_89_35449)">
                      <path
                        d="M10.7333 0.872976C10.7559 0.92826 10.8151 0.917212 10.8563 0.937557C10.9868 1.00168 11.0927 1.10695 11.1576 1.23717C11.2225 1.36738 11.2428 1.51532 11.2153 1.6582C11.1879 1.80107 11.1142 1.93096 11.0057 2.02786C10.8972 2.12476 10.7598 2.18331 10.6148 2.19448C10.5546 2.1989 10.4936 2.19448 10.433 2.19448H4.22888C3.01839 2.19448 2.16172 3.0538 2.16172 4.26827V14.4267C2.16172 15.6283 3.02193 16.4908 4.2218 16.4908H14.397C15.5978 16.4908 16.458 15.6292 16.458 14.4276C16.458 12.3262 16.458 10.225 16.458 8.12396C16.458 7.82499 16.5827 7.6012 16.8591 7.47957C17.1161 7.36635 17.3536 7.41721 17.5668 7.59589C17.6791 7.69009 17.7269 7.82366 17.7822 7.9528V14.9358C17.7202 14.98 17.7379 15.0543 17.7251 15.1127C17.4275 16.6712 16.0856 17.8079 14.5001 17.8105C11.0363 17.8176 7.57257 17.8176 4.10902 17.8105C2.31607 17.8056 0.845529 16.3342 0.841107 14.543C0.832261 11.0739 0.832261 7.60458 0.841107 4.13514C0.844203 2.68318 1.83886 1.39795 3.23377 0.997699C3.40493 0.948607 3.58759 0.945958 3.75079 0.869888L10.7333 0.872976Z"
                        fill="#C1C4C7"
                      />
                      <path
                        d="M5.80585 14.3725C5.50317 14.367 5.20167 14.333 4.9054 14.2708C4.62058 14.2093 4.43571 14.0262 4.3844 13.7378C4.07482 12.0042 4.4994 10.4651 5.72492 9.20329C7.41129 7.4665 9.14099 5.77262 10.8521 4.06016C11.5598 3.35032 12.2674 2.63562 12.9825 1.93241C14.4354 0.506101 16.8444 1.11554 17.4003 3.05444C17.6604 3.96021 17.4711 4.78681 16.8696 5.51611C16.8058 5.59201 16.7382 5.66463 16.6671 5.7337C14.3166 8.08509 11.9658 10.4368 9.61466 12.7887C8.82964 13.5755 7.9053 14.0917 6.80892 14.2925C6.47787 14.351 6.14199 14.3778 5.80585 14.3725ZM5.98276 13.0501C6.98803 13.0223 7.88716 12.6437 8.63106 11.9002C11.0013 9.5288 13.3719 7.15795 15.7427 4.78769C15.7869 4.74346 15.8281 4.70189 15.8674 4.65501C16.0859 4.39922 16.1985 4.06978 16.1825 3.73381C16.1664 3.39785 16.0228 3.08065 15.781 2.84685C15.5392 2.61305 15.2174 2.48025 14.8811 2.47552C14.5448 2.47079 14.2193 2.59447 13.971 2.82137C13.7534 3.02392 13.5495 3.24197 13.3355 3.44895C13.2775 3.50468 13.2784 3.53739 13.3355 3.59312C13.4681 3.71784 13.596 3.84699 13.722 3.97834C13.9874 4.25742 13.9913 4.66784 13.7291 4.92701C13.4668 5.18618 13.0692 5.18131 12.7924 4.91949C12.6641 4.79831 12.5372 4.67535 12.4191 4.54444C12.3501 4.46793 12.3112 4.47146 12.2386 4.54444C10.3776 6.41081 8.50678 8.26789 6.65412 10.1422C5.95401 10.8498 5.62231 11.7313 5.61081 12.7259C5.60462 13.097 5.5573 13.0382 5.9801 13.0501H5.98276Z"
                        fill="#C1C4C7"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_89_35449">
                        <rect
                          width="16.9473"
                          height="16.9473"
                          fill="white"
                          transform="translate(0.835205 0.873169)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <span
                  className="font-primary font-medium rounded-full bg-grayy w-20 h-20 
                           flex justify-center items-center text-2xl text-gray-400"
                >
                  {user
                    ? `${
                        user.profile.firstName
                          ? user.profile.firstName[0].toUpperCase()
                          : ""
                      }${
                        user.profile.lastName
                          ? user.profile.lastName[0].toUpperCase()
                          : ""
                      }`
                    : ""}
                </span>
                <span className="text-center font-primary font-medium text-black tracking-widest leading-snug text-base pt-2.5">
                  {user
                    ? `${
                        user.profile.firstName ? user.profile.firstName : ""
                      } ${user.profile.lastName ? user.profile.lastName : ""}`
                    : ""}
                </span>
                <span className="text-center font-primary font-medium text-gray-400 tracking-widest text-sm">
                  {user
                    ? `${
                        user.profile.phoneNumber ? user.profile.phoneNumber : ""
                      }`
                    : ""}
                </span>
                <span className="w-28 bg-secondary font-primary flex justify-center items-center mt-2.5 text-center h-6 text-white rounded-3xl">
                  {user
                    ? `${user.role.roleName ? user.role.roleName : ""}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
          <div className="w-2/3 py-4">
            <span className="border-b-2 border-secondary pb-1 font-primary font-semibold text-secondary">
              Détails du profil
            </span>
            <div className="bg-white w-11/12  mt-5 px-8 pt-4 pb-2 rounded-3xl">
              <div className="h-12 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  E-mail
                </span>
                <span className="w-3/5 text-xs font-primary font-medium">
                  {user ? (user.email ? user.email : "E-mail not found") : ""}
                </span>
                <span>
                  <Edit
                    className="fill-gray-400 hover:fill-secondary cursor-pointer"
                    width="16"
                    height="16"
                  />
                </span>
              </div>
              <div className="h-12 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Mot de passe
                </span>
                <span className="w-3/5 text-xs font-primary font-medium">
                  *********
                </span>
                <span>
                  <Edit
                    className="fill-gray-400 hover:fill-secondary cursor-pointer"
                    width="16"
                    height="16"
                  />
                </span>
              </div>
              <div className="h-12 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Rôle
                </span>
                <span className="w-3/5 text-xs font-primary font-medium">
                  {user && user.role.roleName}
                </span>
                <span>
                  <Edit
                    className="fill-gray-400 hover:fill-secondary cursor-pointer"
                    width="16"
                    height="16"
                  />
                </span>
              </div>
              <div className="h-12 w-full flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Statut
                </span>
                <span className="w-3/5 text-xs font-primary font-medium">
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    style={{ marginLeft: "-5px" }}
                    onChange={UpdateStatus}
                    checked={user && user.status}
                  />
                </span>
              </div>
            </div>
            <div className="bg-white h-60 2xl:h-80 w-11/12 mt-4 py-6 px-8 rounded-3xl overflow-y-scroll">
              <span className="font-primary text-sm font-semibold text-gray-500">
                Permissions
              </span>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Accès administrateur
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Tout sélectionner</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Gestion des utilisateurs
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Gestion de contenu
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Direction financière
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Rapports
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Paie
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Gestion des litiges
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Contrôles API
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Gestion de base de données
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  Gestion du référentiel
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
              <div className="h-8 w-full border-b border-gray-400 border-opacity-50 flex items-center">
                <span className="w-2/5 text-xs font-primary font-medium text-gray-400 ">
                  More permissions
                </span>
                <div className="flex justify-between mr-4 w-3/5">
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Lire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Écrire</label>
                </span>
                <span className="text-xs font-primary font-medium flex">
                  <input type="checkbox" className="checkbox checkbox-success checkbox-xs text-white" />
                  <label htmlFor="" className="block  mx-3 font-primary text-gray-400 text-xs">Créer</label>
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsUtilisateurs;
