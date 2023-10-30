import React, { useState } from "react";
import Logo from "../../Components/Logo/Logo";
import LanguageDropdown from "../../Components/Layout/Navbar/Language";
import { Link, NavLink } from "react-router-dom";

const ForgottenPassword = () => {
  const [success, setSuccess] = useState(true);
  return (
    <div className="flex flex-col  w-full h-full gap-14">
      {/* LOGO & NAVBAR */}
      <div className="flex py-4 px-12  items-center ">
        <Link to={"/login"}>
          <Logo textColor="text-primary" />
        </Link>
        <div className="absolute top-8 right-10">
          <LanguageDropdown btnClass="text-tiny  " type="no-layout" />
        </div>
      </div>
      {/* END LOGO & NAVBAR */}

      {/* HEADER  */}
      <div className="w-full flex justify-center items-center 2xl:my-12 ">
        <div className="flex flex-col w-5/12 2xl:w-2/6 items-center justify-center bg-white rounded-3xl ">
          {!success ? (
            <div className="flex flex-col justify-center items-center p-16 2xl:p-16  gap-4   ">
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="140" height="140" rx="70" fill="#F0EAFF" />
                <g clip-path="url(#clip0_41_1632)">
                  <rect width="140" height="140" rx="70" fill="#F0EAFF" />
                  <circle
                    cx="24"
                    cy="30"
                    r="40"
                    fill="#5AB4A9"
                    fill-opacity="0.13"
                  />
                  <rect
                    x="77"
                    y="79"
                    width="70"
                    height="70"
                    fill="#5AB4A9"
                    fill-opacity="0.13"
                  />
                  <path
                    d="M47.809 69C47.809 56.7442 57.7442 46.809 70 46.809C82.2558 46.809 92.191 56.7442 92.191 69V105.191H47.809V69Z"
                    stroke="#5AB4A9"
                    stroke-width="13.618"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="25"
                    y="72"
                    width="90"
                    height="68"
                    rx="22.6966"
                    fill="#5AB4A9"
                  />
                  <rect
                    x="64"
                    y="97"
                    width="12"
                    height="22"
                    rx="6"
                    fill="#F0EAFF"
                  />
                </g>
                <rect
                  x="99"
                  y="9"
                  width="36"
                  height="36"
                  rx="18"
                  fill="#5AB4A9"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M111 19C111.552 19 112 19.4477 112 20V22.1013C113.27 20.8049 115.041 20 117 20C120.049 20 122.641 21.9493 123.601 24.6668C123.785 25.1875 123.513 25.7588 122.992 25.9428C122.471 26.1269 121.9 25.854 121.716 25.3332C121.029 23.3899 119.175 22 117 22C115.365 22 113.912 22.785 112.999 24H116C116.552 24 117 24.4477 117 25C117 25.5523 116.552 26 116 26H111C110.448 26 110 25.5523 110 25V20C110 19.4477 110.448 19 111 19ZM111.008 28.0572C111.529 27.8731 112.1 28.146 112.284 28.6668C112.971 30.6101 114.825 32 117 32C118.635 32 120.088 31.215 121.001 30L118 30C117.448 30 117 29.5523 117 29C117 28.4477 117.448 28 118 28H123C123.265 28 123.52 28.1054 123.707 28.2929C123.895 28.4804 124 28.7348 124 29V34C124 34.5523 123.552 35 123 35C122.448 35 122 34.5523 122 34V31.8987C120.73 33.1951 118.959 34 117 34C113.951 34 111.359 32.0507 110.399 29.3332C110.215 28.8125 110.487 28.2412 111.008 28.0572Z"
                  fill="white"
                />
                <defs>
                  <clipPath id="clip0_41_1632">
                    <rect width="140" height="140" rx="70" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="font-primary text-2xl 2xl:text-3xl font-semibold py-4">
                Réinitialiser le mot de passe
              </span>
              <span
                className="font-primary text-sm 2xl:tracking-wide text-center w-11/12"
                style={{ color: " #6978A0" }}
              >
                Entrez votre adresse e-mail pour recevoir un lien de
                réinitialisation
              </span>
              <div className="flex font-primary justify-between items-center w-full p-3 ">
                <input
                  className="  bg-white px-12 focus:outline-none font-primary  w-full h-12 rounded-xl "
                  type="email"
                  name="Email"
                  placeholder="Email"
                  style={{ border: "1px solid rgba(223, 230, 236, 1)" }}
                />
                <div className="absolute m-4  ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.4039 7.06027L11.9998 11.8582L21.5959 7.06021C21.5235 5.79979 20.4785 4.8 19.1999 4.8H4.7999C3.52132 4.8 2.47626 5.79982 2.4039 7.06027Z"
                      fill="#B0B7C3"
                    />
                    <path
                      d="M21.5999 9.74149L11.9998 14.5415L2.3999 9.74155V16.8C2.3999 18.1255 3.47442 19.2 4.7999 19.2H19.1999C20.5254 19.2 21.5999 18.1255 21.5999 16.8V9.74149Z"
                      fill="#B0B7C3"
                    />
                  </svg>
                </div>
              </div>
              <button
                className="my-4 h-12 w-full rounded-xl bg-secondary text-white font-primary text-base  "
                onClick={() => setSuccess(!success)}
              >
                Réinitialiser le mot de passe
              </button>
              <span
                className="font-primary text-sm 2xl:text-base "
                style={{ color: "#8D98AF" }}
              >
                Vous n'avez pas de compte ?{" "}
                <Link className="text-secondary">S'inscrire</Link>
              </span>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center p-16 2xl:p-16  gap-4   ">
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="140" height="140" rx="70" fill="#F0EAFF" />
                <g clip-path="url(#clip0_41_1660)">
                  <circle
                    cx="24"
                    cy="30"
                    r="40"
                    fill="#5AB4A9"
                    fill-opacity="0.13"
                  />
                  <rect
                    x="77"
                    y="79"
                    width="70"
                    height="70"
                    fill="#5AB4A9"
                    fill-opacity="0.13"
                  />
                  <g clip-path="url(#clip1_41_1660)">
                    <rect
                      x="24"
                      y="39"
                      width="91"
                      height="103"
                      rx="12"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M64.9999 62.2V60.6C64.9999 58.3909 66.7908 56.6 68.9999 56.6C71.209 56.6 72.9999 58.3909 72.9999 60.6V62.2C73.8836 62.2 74.5999 62.9164 74.5999 63.8V67.8C74.5999 68.6837 73.8836 69.4 72.9999 69.4H64.9999C64.1162 69.4 63.3999 68.6837 63.3999 67.8V63.8C63.3999 62.9164 64.1162 62.2 64.9999 62.2ZM71.3999 60.6V62.2H66.5999V60.6C66.5999 59.2745 67.6744 58.2 68.9999 58.2C70.3254 58.2 71.3999 59.2745 71.3999 60.6Z"
                      fill="#5AB4A9"
                    />
                    <rect
                      x="42"
                      y="90"
                      width="21"
                      height="4"
                      rx="2"
                      fill="#5AB4A9"
                    />
                    <rect
                      x="42"
                      y="102"
                      width="34"
                      height="4"
                      rx="2"
                      fill="#5AB4A9"
                      fill-opacity="0.47"
                    />
                    <rect
                      x="82"
                      y="102"
                      width="15"
                      height="4"
                      rx="2"
                      fill="#5AB4A9"
                    />
                    <rect
                      x="58"
                      y="122"
                      width="39"
                      height="4"
                      rx="2"
                      fill="#5AB4A9"
                      fill-opacity="0.47"
                    />
                    <rect
                      x="42"
                      y="122"
                      width="10"
                      height="4"
                      rx="2"
                      fill="#5AB4A9"
                    />
                    <rect
                      x="42"
                      y="112"
                      width="50"
                      height="4"
                      rx="2"
                      fill="#5AB4A9"
                      fill-opacity="0.47"
                    />
                  </g>
                </g>
                <rect
                  x="99"
                  y="7"
                  width="36"
                  height="36"
                  rx="18"
                  fill="#5AB4A9"
                />
                <path
                  d="M126.447 25.8944C126.786 25.725 127 25.3788 127 25C127 24.6212 126.786 24.275 126.447 24.1056L112.447 17.1056C112.093 16.9282 111.667 16.9772 111.361 17.2305C111.056 17.4838 110.93 17.8934 111.038 18.2747L112.467 23.2747C112.59 23.704 112.982 24 113.429 24L118 24C118.552 24 119 24.4477 119 25C119 25.5523 118.552 26 118 26L113.429 26C112.982 26 112.59 26.296 112.467 26.7253L111.038 31.7253C110.93 32.1066 111.056 32.5163 111.361 32.7695C111.667 33.0228 112.093 33.0718 112.447 32.8944L126.447 25.8944Z"
                  fill="white"
                />
                <defs>
                  <clipPath id="clip0_41_1660">
                    <rect width="140" height="140" rx="70" fill="white" />
                  </clipPath>
                  <clipPath id="clip1_41_1660">
                    <rect
                      x="24"
                      y="39"
                      width="91"
                      height="103"
                      rx="12"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>

              <span className="font-primary text-2xl 2xl:text-3xl font-semibold py-4 text-center">
                Réinitialisation du mot de passe réussie
              </span>
              <span
                className="font-primary text-sm 2xl:tracking-wide text-center w-11/12"
                style={{ color: " #6978A0" }}
              >
                Veuillez vérifier votre courriel pour obtenir les instructions
                afin de réinitialiser votre mot de passe.
              </span>

              <button
                className="my-4 h-12 w-full rounded-xl bg-secondary text-white font-primary text-base  "
                onClick={() => setSuccess(!success)}
              >
                Retour à la page de connexion
              </button>
              <span
                className="font-primary text-sm 2xl:text-base flex gap-2"
                style={{ color: "#8D98AF" }}
              >
                Vous ne recevez pas d'e-mail ?
                <Link className="text-secondary">Renvoyer</Link>
              </span>
            </div>
          )}
        </div>
      </div>
      {/* END HEADER  */}
    </div>
  );
};

export default ForgottenPassword;

// IN CASE I WANNA WORK WITH QUICK NESTED COMPONENTS //
// const ResetCard = () => {
//   return (
//     <div className="flex flex-col justify-center items-center p-16 2xl:p-16  gap-4   ">
//       <svg
//         width="140"
//         height="140"
//         viewBox="0 0 140 140"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <rect width="140" height="140" rx="70" fill="#F0EAFF" />
//         <g clip-path="url(#clip0_41_1632)">
//           <rect width="140" height="140" rx="70" fill="#F0EAFF" />
//           <circle cx="24" cy="30" r="40" fill="#5AB4A9" fill-opacity="0.13" />
//           <rect
//             x="77"
//             y="79"
//             width="70"
//             height="70"
//             fill="#5AB4A9"
//             fill-opacity="0.13"
//           />
//           <path
//             d="M47.809 69C47.809 56.7442 57.7442 46.809 70 46.809C82.2558 46.809 92.191 56.7442 92.191 69V105.191H47.809V69Z"
//             stroke="#5AB4A9"
//             stroke-width="13.618"
//             stroke-linejoin="round"
//           />
//           <rect
//             x="25"
//             y="72"
//             width="90"
//             height="68"
//             rx="22.6966"
//             fill="#5AB4A9"
//           />
//           <rect x="64" y="97" width="12" height="22" rx="6" fill="#F0EAFF" />
//         </g>
//         <rect x="99" y="9" width="36" height="36" rx="18" fill="#5AB4A9" />
//         <path
//           fill-rule="evenodd"
//           clip-rule="evenodd"
//           d="M111 19C111.552 19 112 19.4477 112 20V22.1013C113.27 20.8049 115.041 20 117 20C120.049 20 122.641 21.9493 123.601 24.6668C123.785 25.1875 123.513 25.7588 122.992 25.9428C122.471 26.1269 121.9 25.854 121.716 25.3332C121.029 23.3899 119.175 22 117 22C115.365 22 113.912 22.785 112.999 24H116C116.552 24 117 24.4477 117 25C117 25.5523 116.552 26 116 26H111C110.448 26 110 25.5523 110 25V20C110 19.4477 110.448 19 111 19ZM111.008 28.0572C111.529 27.8731 112.1 28.146 112.284 28.6668C112.971 30.6101 114.825 32 117 32C118.635 32 120.088 31.215 121.001 30L118 30C117.448 30 117 29.5523 117 29C117 28.4477 117.448 28 118 28H123C123.265 28 123.52 28.1054 123.707 28.2929C123.895 28.4804 124 28.7348 124 29V34C124 34.5523 123.552 35 123 35C122.448 35 122 34.5523 122 34V31.8987C120.73 33.1951 118.959 34 117 34C113.951 34 111.359 32.0507 110.399 29.3332C110.215 28.8125 110.487 28.2412 111.008 28.0572Z"
//           fill="white"
//         />
//         <defs>
//           <clipPath id="clip0_41_1632">
//             <rect width="140" height="140" rx="70" fill="white" />
//           </clipPath>
//         </defs>
//       </svg>
//       <span className="font-primary text-2xl 2xl:text-3xl font-semibold py-4">
//         Réinitialiser le mot de passe
//       </span>
//       <span
//         className="font-primary text-sm 2xl:tracking-wide text-center w-11/12"
//         style={{ color: " #6978A0" }}
//       >
//         Entrez votre adresse e-mail pour recevoir un lien de réinitialisation
//       </span>
//       <div className="flex font-primary justify-between items-center w-full p-3 ">
//         <input
//           className="  bg-white px-12 focus:outline-none font-primary  w-full h-12 rounded-xl "
//           type="email"
//           name="Email"
//           placeholder="Email"
//           style={{ border: "1px solid rgba(223, 230, 236, 1)" }}
//         />
//         <div className="absolute m-4  ">
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M2.4039 7.06027L11.9998 11.8582L21.5959 7.06021C21.5235 5.79979 20.4785 4.8 19.1999 4.8H4.7999C3.52132 4.8 2.47626 5.79982 2.4039 7.06027Z"
//               fill="#B0B7C3"
//             />
//             <path
//               d="M21.5999 9.74149L11.9998 14.5415L2.3999 9.74155V16.8C2.3999 18.1255 3.47442 19.2 4.7999 19.2H19.1999C20.5254 19.2 21.5999 18.1255 21.5999 16.8V9.74149Z"
//               fill="#B0B7C3"
//             />
//           </svg>
//         </div>
//       </div>
//       <button className="my-4 h-12 w-full rounded-xl bg-secondary text-white font-primary text-base  ">
//         Réinitialiser le mot de passe
//       </button>
//       <span
//         className="font-primary text-sm 2xl:text-base "
//         style={{ color: "#8D98AF" }}
//       >
//         Vous n'avez pas de compte ?{" "}
//         <Link className="text-secondary">S'inscrire</Link>
//       </span>
//     </div>
//   );
// };
// export { ResetCard };

// const ResetSuccess = () => {
//   return (
//     <div className="flex flex-col justify-center items-center p-16 2xl:p-16  gap-4   ">
//       <svg
//         width="140"
//         height="140"
//         viewBox="0 0 140 140"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <rect width="140" height="140" rx="70" fill="#F0EAFF" />
//         <g clip-path="url(#clip0_41_1660)">
//           <circle cx="24" cy="30" r="40" fill="#5AB4A9" fill-opacity="0.13" />
//           <rect
//             x="77"
//             y="79"
//             width="70"
//             height="70"
//             fill="#5AB4A9"
//             fill-opacity="0.13"
//           />
//           <g clip-path="url(#clip1_41_1660)">
//             <rect x="24" y="39" width="91" height="103" rx="12" fill="white" />
//             <path
//               fill-rule="evenodd"
//               clip-rule="evenodd"
//               d="M64.9999 62.2V60.6C64.9999 58.3909 66.7908 56.6 68.9999 56.6C71.209 56.6 72.9999 58.3909 72.9999 60.6V62.2C73.8836 62.2 74.5999 62.9164 74.5999 63.8V67.8C74.5999 68.6837 73.8836 69.4 72.9999 69.4H64.9999C64.1162 69.4 63.3999 68.6837 63.3999 67.8V63.8C63.3999 62.9164 64.1162 62.2 64.9999 62.2ZM71.3999 60.6V62.2H66.5999V60.6C66.5999 59.2745 67.6744 58.2 68.9999 58.2C70.3254 58.2 71.3999 59.2745 71.3999 60.6Z"
//               fill="#5AB4A9"
//             />
//             <rect x="42" y="90" width="21" height="4" rx="2" fill="#5AB4A9" />
//             <rect
//               x="42"
//               y="102"
//               width="34"
//               height="4"
//               rx="2"
//               fill="#5AB4A9"
//               fill-opacity="0.47"
//             />
//             <rect x="82" y="102" width="15" height="4" rx="2" fill="#5AB4A9" />
//             <rect
//               x="58"
//               y="122"
//               width="39"
//               height="4"
//               rx="2"
//               fill="#5AB4A9"
//               fill-opacity="0.47"
//             />
//             <rect x="42" y="122" width="10" height="4" rx="2" fill="#5AB4A9" />
//             <rect
//               x="42"
//               y="112"
//               width="50"
//               height="4"
//               rx="2"
//               fill="#5AB4A9"
//               fill-opacity="0.47"
//             />
//           </g>
//         </g>
//         <rect x="99" y="7" width="36" height="36" rx="18" fill="#5AB4A9" />
//         <path
//           d="M126.447 25.8944C126.786 25.725 127 25.3788 127 25C127 24.6212 126.786 24.275 126.447 24.1056L112.447 17.1056C112.093 16.9282 111.667 16.9772 111.361 17.2305C111.056 17.4838 110.93 17.8934 111.038 18.2747L112.467 23.2747C112.59 23.704 112.982 24 113.429 24L118 24C118.552 24 119 24.4477 119 25C119 25.5523 118.552 26 118 26L113.429 26C112.982 26 112.59 26.296 112.467 26.7253L111.038 31.7253C110.93 32.1066 111.056 32.5163 111.361 32.7695C111.667 33.0228 112.093 33.0718 112.447 32.8944L126.447 25.8944Z"
//           fill="white"
//         />
//         <defs>
//           <clipPath id="clip0_41_1660">
//             <rect width="140" height="140" rx="70" fill="white" />
//           </clipPath>
//           <clipPath id="clip1_41_1660">
//             <rect x="24" y="39" width="91" height="103" rx="12" fill="white" />
//           </clipPath>
//         </defs>
//       </svg>

//       <span className="font-primary text-2xl 2xl:text-3xl font-semibold py-4 text-center">
//         Réinitialisation du mot de passe réussie
//       </span>
//       <span
//         className="font-primary text-sm 2xl:tracking-wide text-center w-11/12"
//         style={{ color: " #6978A0" }}
//       >
//         Veuillez vérifier votre courriel pour obtenir les instructions afin de
//         réinitialiser votre mot de passe.
//       </span>

//       <button className="my-4 h-12 w-full rounded-xl bg-secondary text-white font-primary text-base  ">
//         Retour à la page de connexion
//       </button>
//       <span
//         className="font-primary text-sm 2xl:text-base flex gap-2"
//         style={{ color: "#8D98AF" }}
//       >
//         Vous ne recevez pas d'e-mail ?
//         <Link className="text-secondary">Renvoyer</Link>
//       </span>
//     </div>
//   );
// };
// export { ResetSuccess };
