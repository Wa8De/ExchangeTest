import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import DeleteModal2 from "../../Components/modals/DeleteModal2";
import Edit from "../../Components/Buttons/Edit";
import jwt_decode from "jwt-decode";
import Loading from "react-loading";
const Utilisateurs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const jwt = sessionStorage.getItem("jwt");
  const decoded = jwt_decode(jwt);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/api/transactions`)
        .then((response) => {
          setTransactions(response.data.transactions);
          if (transactions.length > 0) {
            setIsLoading(false);
          }
          console.log(transactions);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);

          if (error.response && error.response.status === 404) {
            console.log(error);
          }
        });
    };
    if (isLoading) {
      fetchData();
    }
  });

  /* PAGINATION FUNCTIONS   */
  // const handlePrevious = () => {
  //   // Go to the previous page
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // };
  // const handleNext = () => {
  //   // Go to the next page
  //   if (page < pageCount) {
  //     setPage(page + 1);
  //   }
  // };
  // const getPageNumbers = () => {
  //   const pages = [];
  //   for (let i = 1; i <= pageCount; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // };
  /* END OF PAGINATION FUNCTIONS   */

  /* FUNCTION TO CONVERT THE DATE FROM TIMESTAMP TO REGULAR DATE */
  const formatDateTime = (dateTimeStr) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateTimeStr).toLocaleString(undefined, options);
  };
  /* END DATE FUNCTION */

  return (
    <>
      <div className="flex justify-center flex-col w-full items-center">
        <div
          className="flex justify-center font-primary text-3xl font-semibold w-full my-6  leading-9"
          style={{ color: "#4D4D4D" }}
        >
          <span className="w-11/12 leading-9">Clients</span>
        </div>
      </div>
      {isLoading && (
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
      )}
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-full flex justify-center font-primary my-4 m-3">
          <div
            className="w-11/12 bg-white p-6  "
            style={{
              borderRadius: "25px",
            }}
          >
            {/* <table className="w-full text-sm text-left text-gray-500">
              <thead
                className="text-xs text-gray-700 capitalize bg-gray-50  sticky top-0 "
                style={{
                  borderRadius: "25px",
                }}
              >
                <tr
                  className="text-sm 2xl:text-base"
                  style={{
                    borderRadius: "25px",
                    position: "sticky",
                    top: " 0px",
                  }}
                >
                  <th className="text-center ">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs 2xl:checkbox-sm rounded-xl"
                    />
                  </th>
                  <th
                    className="px-12 text-center font-medium text-sm "
                    style={{
                      color: "#96B0C4",
                      borderTopLeftRadius: "25px",
                      borderBottomLeftRadius: "25px",
                    }}
                  >
                    Statut
                  </th>
                  <th
                    scope="col"
                    className=" text-center font-medium text-sm "
                    style={{ color: "#96B0C4" }}
                  >
                    <div className="flex justify-center gap-2 items-center cursor-pointer ">
                      Ref
                      <span className="cursor-pointer"></span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className=" text-center font-medium text-sm "
                    style={{ color: "#96B0C4" }}
                  >
                    <div className="flex justify-center gap-2 items-center cursor-pointer ">
                      Nom
                      <span className="cursor-pointer"></span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className=" text-center font-medium text-sm "
                    style={{ color: "#96B0C4" }}
                  >
                    <div className="flex justify-center gap-2 items-center cursor-pointer ">
                      Nom
                      <span className="cursor-pointer"></span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-center font-medium text-sm"
                    style={{ color: "#96B0C4" }}
                  >
                    <div className="flex justify-center gap-2 items-center ">
                      Montant
                      <svg
                        className="cursor-pointer hover:shadow-md "
                        width="12"
                        height="15"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_89_35685)">
                          <path
                            d="M4.69985 10.7485C4.69681 10.7432 4.69405 10.7337 4.69019 10.7329C4.40089 10.6859 4.17509 10.5235 3.94625 10.3636C2.92379 9.65433 1.90059 8.94511 0.876656 8.23597C0.371774 7.88518 0.205045 7.26985 0.485781 6.74261C0.716828 6.30954 1.10108 6.08324 1.61176 6.08324C3.52234 6.0799 5.43302 6.07937 7.34378 6.08165C7.63004 6.08165 7.9163 6.08165 8.20255 6.08165C8.75878 6.08165 9.22971 6.40712 9.4003 6.90508C9.56841 7.39513 9.38677 7.92395 8.9382 8.23544C7.85133 8.98994 6.76382 9.74365 5.67566 10.4966C5.50037 10.6182 5.31183 10.7076 5.09293 10.7305C5.08548 10.7305 5.07941 10.7421 5.07278 10.7482L4.69985 10.7485ZM4.91185 6.87317H2.24334C2.02251 6.87317 1.80168 6.86869 1.58084 6.87475C1.51006 6.87708 1.44108 6.89672 1.38051 6.93179C1.31994 6.96687 1.26979 7.0162 1.23487 7.07507C1.19995 7.13395 1.18142 7.2004 1.18104 7.26807C1.18067 7.33574 1.19848 7.40238 1.23275 7.4616C1.2748 7.52615 1.33138 7.58093 1.39838 7.62196C2.47182 8.36521 3.54534 9.10872 4.61897 9.85249C4.8122 9.98648 4.98445 9.99756 5.16167 9.87491C6.26087 9.11514 7.35943 8.35413 8.45734 7.59189C8.52835 7.54427 8.58178 7.47642 8.60999 7.39803C8.70633 7.13059 8.50206 6.8737 8.19068 6.87343C7.09792 6.87326 6.00498 6.87317 4.91185 6.87317Z"
                            fill="#96B0C4"
                          />
                          <path
                            d="M5.07279 0.624109C5.12799 0.659715 5.1948 0.650487 5.25525 0.66974C5.3998 0.713474 5.53606 0.779104 5.65882 0.864124C6.75471 1.62346 7.85309 2.37963 8.94566 3.14345C9.33212 3.4138 9.50934 3.79175 9.44944 4.24567C9.3865 4.72358 9.10052 5.05063 8.62794 5.22154C8.49846 5.26774 8.36119 5.29081 8.22298 5.28959C6.01243 5.28959 3.80179 5.28959 1.59106 5.28959C1.33091 5.28827 1.07776 5.20894 0.867322 5.0628C0.656884 4.91665 0.499778 4.71107 0.41817 4.47505C0.336561 4.23903 0.334568 3.98448 0.412471 3.74732C0.490375 3.51015 0.644243 3.30235 0.852369 3.15321C1.95985 2.38077 3.06954 1.6115 4.18144 0.845396C4.31921 0.751619 4.47504 0.684838 4.63995 0.648903C4.66093 0.644156 4.69129 0.653651 4.70013 0.622528L5.07279 0.624109ZM4.89667 4.4994C5.98244 4.4994 7.06821 4.4994 8.15397 4.4994C8.20217 4.50173 8.2505 4.49898 8.29807 4.49122C8.47198 4.4535 8.58653 4.35038 8.62269 4.18342C8.65886 4.01647 8.5973 3.87826 8.45238 3.77777C7.35704 3.01835 6.26124 2.25936 5.16498 1.50082C4.99025 1.38002 4.81883 1.38345 4.6405 1.50636C4.32167 1.72527 4.0056 1.94656 3.68677 2.16573C2.91717 2.69886 2.14747 3.23181 1.37768 3.76459C1.26478 3.84371 1.19245 3.94077 1.18445 4.07449C1.16706 4.31767 1.3567 4.49834 1.62971 4.49834C2.71842 4.49904 3.80741 4.4994 4.89667 4.4994Z"
                            fill="#96B0C4"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_89_35685">
                            <rect
                              width="9.11189"
                              height="10.1243"
                              fill="white"
                              transform="translate(0.349609 0.62413)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-center font-medium text-sm"
                    style={{ color: "#96B0C4" }}
                  >
                    <div className="flex justify-center gap-2 items-center ">
                      Montant Payé
                      <svg
                        className="cursor-pointer hover:shadow-md "
                        width="12"
                        height="15"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_89_35685)">
                          <path
                            d="M4.69985 10.7485C4.69681 10.7432 4.69405 10.7337 4.69019 10.7329C4.40089 10.6859 4.17509 10.5235 3.94625 10.3636C2.92379 9.65433 1.90059 8.94511 0.876656 8.23597C0.371774 7.88518 0.205045 7.26985 0.485781 6.74261C0.716828 6.30954 1.10108 6.08324 1.61176 6.08324C3.52234 6.0799 5.43302 6.07937 7.34378 6.08165C7.63004 6.08165 7.9163 6.08165 8.20255 6.08165C8.75878 6.08165 9.22971 6.40712 9.4003 6.90508C9.56841 7.39513 9.38677 7.92395 8.9382 8.23544C7.85133 8.98994 6.76382 9.74365 5.67566 10.4966C5.50037 10.6182 5.31183 10.7076 5.09293 10.7305C5.08548 10.7305 5.07941 10.7421 5.07278 10.7482L4.69985 10.7485ZM4.91185 6.87317H2.24334C2.02251 6.87317 1.80168 6.86869 1.58084 6.87475C1.51006 6.87708 1.44108 6.89672 1.38051 6.93179C1.31994 6.96687 1.26979 7.0162 1.23487 7.07507C1.19995 7.13395 1.18142 7.2004 1.18104 7.26807C1.18067 7.33574 1.19848 7.40238 1.23275 7.4616C1.2748 7.52615 1.33138 7.58093 1.39838 7.62196C2.47182 8.36521 3.54534 9.10872 4.61897 9.85249C4.8122 9.98648 4.98445 9.99756 5.16167 9.87491C6.26087 9.11514 7.35943 8.35413 8.45734 7.59189C8.52835 7.54427 8.58178 7.47642 8.60999 7.39803C8.70633 7.13059 8.50206 6.8737 8.19068 6.87343C7.09792 6.87326 6.00498 6.87317 4.91185 6.87317Z"
                            fill="#96B0C4"
                          />
                          <path
                            d="M5.07279 0.624109C5.12799 0.659715 5.1948 0.650487 5.25525 0.66974C5.3998 0.713474 5.53606 0.779104 5.65882 0.864124C6.75471 1.62346 7.85309 2.37963 8.94566 3.14345C9.33212 3.4138 9.50934 3.79175 9.44944 4.24567C9.3865 4.72358 9.10052 5.05063 8.62794 5.22154C8.49846 5.26774 8.36119 5.29081 8.22298 5.28959C6.01243 5.28959 3.80179 5.28959 1.59106 5.28959C1.33091 5.28827 1.07776 5.20894 0.867322 5.0628C0.656884 4.91665 0.499778 4.71107 0.41817 4.47505C0.336561 4.23903 0.334568 3.98448 0.412471 3.74732C0.490375 3.51015 0.644243 3.30235 0.852369 3.15321C1.95985 2.38077 3.06954 1.6115 4.18144 0.845396C4.31921 0.751619 4.47504 0.684838 4.63995 0.648903C4.66093 0.644156 4.69129 0.653651 4.70013 0.622528L5.07279 0.624109ZM4.89667 4.4994C5.98244 4.4994 7.06821 4.4994 8.15397 4.4994C8.20217 4.50173 8.2505 4.49898 8.29807 4.49122C8.47198 4.4535 8.58653 4.35038 8.62269 4.18342C8.65886 4.01647 8.5973 3.87826 8.45238 3.77777C7.35704 3.01835 6.26124 2.25936 5.16498 1.50082C4.99025 1.38002 4.81883 1.38345 4.6405 1.50636C4.32167 1.72527 4.0056 1.94656 3.68677 2.16573C2.91717 2.69886 2.14747 3.23181 1.37768 3.76459C1.26478 3.84371 1.19245 3.94077 1.18445 4.07449C1.16706 4.31767 1.3567 4.49834 1.62971 4.49834C2.71842 4.49904 3.80741 4.4994 4.89667 4.4994Z"
                            fill="#96B0C4"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_89_35685">
                            <rect
                              width="9.11189"
                              height="10.1243"
                              fill="white"
                              transform="translate(0.349609 0.62413)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-center font-medium text-sm"
                    style={{
                      color: "#96B0C4",
                    }}
                  >
                    <div className="flex justify-center gap-2 items-center ">
                      Solde
                      <svg
                        className="cursor-pointer hover:shadow-md "
                        width="12"
                        height="15"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_89_35685)">
                          <path
                            d="M4.69985 10.7485C4.69681 10.7432 4.69405 10.7337 4.69019 10.7329C4.40089 10.6859 4.17509 10.5235 3.94625 10.3636C2.92379 9.65433 1.90059 8.94511 0.876656 8.23597C0.371774 7.88518 0.205045 7.26985 0.485781 6.74261C0.716828 6.30954 1.10108 6.08324 1.61176 6.08324C3.52234 6.0799 5.43302 6.07937 7.34378 6.08165C7.63004 6.08165 7.9163 6.08165 8.20255 6.08165C8.75878 6.08165 9.22971 6.40712 9.4003 6.90508C9.56841 7.39513 9.38677 7.92395 8.9382 8.23544C7.85133 8.98994 6.76382 9.74365 5.67566 10.4966C5.50037 10.6182 5.31183 10.7076 5.09293 10.7305C5.08548 10.7305 5.07941 10.7421 5.07278 10.7482L4.69985 10.7485ZM4.91185 6.87317H2.24334C2.02251 6.87317 1.80168 6.86869 1.58084 6.87475C1.51006 6.87708 1.44108 6.89672 1.38051 6.93179C1.31994 6.96687 1.26979 7.0162 1.23487 7.07507C1.19995 7.13395 1.18142 7.2004 1.18104 7.26807C1.18067 7.33574 1.19848 7.40238 1.23275 7.4616C1.2748 7.52615 1.33138 7.58093 1.39838 7.62196C2.47182 8.36521 3.54534 9.10872 4.61897 9.85249C4.8122 9.98648 4.98445 9.99756 5.16167 9.87491C6.26087 9.11514 7.35943 8.35413 8.45734 7.59189C8.52835 7.54427 8.58178 7.47642 8.60999 7.39803C8.70633 7.13059 8.50206 6.8737 8.19068 6.87343C7.09792 6.87326 6.00498 6.87317 4.91185 6.87317Z"
                            fill="#96B0C4"
                          />
                          <path
                            d="M5.07279 0.624109C5.12799 0.659715 5.1948 0.650487 5.25525 0.66974C5.3998 0.713474 5.53606 0.779104 5.65882 0.864124C6.75471 1.62346 7.85309 2.37963 8.94566 3.14345C9.33212 3.4138 9.50934 3.79175 9.44944 4.24567C9.3865 4.72358 9.10052 5.05063 8.62794 5.22154C8.49846 5.26774 8.36119 5.29081 8.22298 5.28959C6.01243 5.28959 3.80179 5.28959 1.59106 5.28959C1.33091 5.28827 1.07776 5.20894 0.867322 5.0628C0.656884 4.91665 0.499778 4.71107 0.41817 4.47505C0.336561 4.23903 0.334568 3.98448 0.412471 3.74732C0.490375 3.51015 0.644243 3.30235 0.852369 3.15321C1.95985 2.38077 3.06954 1.6115 4.18144 0.845396C4.31921 0.751619 4.47504 0.684838 4.63995 0.648903C4.66093 0.644156 4.69129 0.653651 4.70013 0.622528L5.07279 0.624109ZM4.89667 4.4994C5.98244 4.4994 7.06821 4.4994 8.15397 4.4994C8.20217 4.50173 8.2505 4.49898 8.29807 4.49122C8.47198 4.4535 8.58653 4.35038 8.62269 4.18342C8.65886 4.01647 8.5973 3.87826 8.45238 3.77777C7.35704 3.01835 6.26124 2.25936 5.16498 1.50082C4.99025 1.38002 4.81883 1.38345 4.6405 1.50636C4.32167 1.72527 4.0056 1.94656 3.68677 2.16573C2.91717 2.69886 2.14747 3.23181 1.37768 3.76459C1.26478 3.84371 1.19245 3.94077 1.18445 4.07449C1.16706 4.31767 1.3567 4.49834 1.62971 4.49834C2.71842 4.49904 3.80741 4.4994 4.89667 4.4994Z"
                            fill="#96B0C4"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_89_35685">
                            <rect
                              width="9.11189"
                              height="10.1243"
                              fill="white"
                              transform="translate(0.349609 0.62413)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-center font-medium text-sm"
                    style={{
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody className="capitalize table-body">
                {transactions.length > 0 ? (
                  transactions.map((e) => (
                    <>
                      <tr className="bg-white hover:bg-gray-50   ">
                        <td className=" text-center px-2 py-4">
                          <div className="flex items-center justify-center">
                            <div
                              className="h-3 w-3 rounded-full "
                              style={
                                e.status
                                  ? { backgroundColor: "#05CD99" }
                                  : { backgroundColor: "#D62832" }
                              }
                            ></div>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-xs"
                            />
                          </div>
                        </td>
                        <td className=" w-1/6 text-center py-4">
                          <div className="flex items-center justify-center">
                            <div
                              className="h-3 w-3 rounded-full "
                              style={
                                e.status
                                  ? { backgroundColor: "#05CD99" }
                                  : { backgroundColor: "#D62832" }
                              }
                            ></div>
                          </div>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-2 text-center w-1/6"
                          style={{ color: "#787878" }}
                        >
                          01245
                        </td>
                        <th
                          scope="row"
                          className="px-6 py-2 text-center w-1/6"
                          style={{ color: "#787878" }}
                        >
                          {`${e.ClientId.profile.firstName} ${e.ClientId.profile.lastName}`}
                        </th>
                        <td className="px-6 py-2  text-center w-1/6">
                          {e.CurrencyId.CurrencyName}
                        </td>
                        <td className="px-6 py-2 text-center w-1/6">
                          {e.Amount.Amount}
                        </td>
                        <td className="px-6 py-2 text-center w-1/6">
                          {e.Amount.Amount}
                        </td>
                        <td className="px-6 py-2 text-center w-1/6">
                          0 Crédits
                        </td>
                        <td className="px-6 py-2 text-center flex gap-2 w-1/6 items-center">
                          <Link
                            to={`/utilisateurs/${e._id}`}
                            className="inline"
                          >
                            <Edit
                              className="fill-gray-500 hover:fill-secondary"
                              width="16"
                              height="16"
                            />
                          </Link>

                          <DeleteModal2 message="Vous voulez supprimer la transaction ?" />
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <>
                    <tr className="bg-white hover:bg-gray-50   ">
                      <td colSpan={6} className=" w-full text-center py-4">
                        No users
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table> */}
          </div>
        </div>
        <div className="flex w-11/12 justify-between p-3 font-primary items-center  ">
          <p className="text-sm tracking-wide " style={{ color: "#8D98AF" }}>
            Résultats :{" "}
            <span className="font-medium  " style={{ color: "#8D98AF" }}></span>{" "}
            -{" "}
            <span className="font-medium " style={{ color: "#8D98AF" }}></span>{" "}
            sur{" "}
            <span className="font-medium " style={{ color: "#8D98AF" }}></span>
          </p>
          <div className=" w-1/3 flex  justify-end ">
            <div className=" flex gap-2 ">
              <a
                className={`cursor-pointer relative inline-flex items-center justify-center px-4 text-xs font-medium text-gray-700 w-32 h-8 gap-1 `}
                style={{
                  borderRadius: "25px",
                  fontSize: "12px",
                }}
              >
                <svg
                  width="25"
                  height="15"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.25103 14.2011C7.91908 14.5331 7.38089 14.5331 7.04895 14.2011L1.94895 9.10111C1.617 8.76917 1.617 8.23098 1.94895 7.89903L7.04895 2.79903C7.38089 2.46709 7.91908 2.46709 8.25103 2.79903C8.58297 3.13098 8.58297 3.66917 8.25103 4.00111L4.60207 7.65007L14.45 7.65007C14.9194 7.65007 15.3 8.03063 15.3 8.50007C15.3 8.96952 14.9194 9.35007 14.45 9.35007L4.60207 9.35007L8.25103 12.999C8.58297 13.331 8.58297 13.8692 8.25103 14.2011Z"
                    fill={``}
                  />
                </svg>
                Précedent
              </a>
              <div className="flex gap-2 "></div>
              <a
                style={{
                  color: ``,
                  borderRadius: "25px",
                }}
                className={`cursor-pointer relative inline-flex items-center justify-center  text-sm font-medium  w-32 h-8 gap-1`}
              >
                Suivant
                <svg
                  width="25"
                  height="15"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.74897 2.79889C9.08092 2.46694 9.61911 2.46694 9.95105 2.79889L15.0511 7.89889C15.383 8.23083 15.383 8.76902 15.0511 9.10097L9.95105 14.201C9.61911 14.5329 9.08092 14.5329 8.74897 14.201C8.41703 13.869 8.41703 13.3308 8.74897 12.9989L12.3979 9.34993L2.55001 9.34993C2.08057 9.34993 1.70001 8.96937 1.70001 8.49993C1.70001 8.03048 2.08057 7.64993 2.55001 7.64993H12.3979L8.74897 4.00097C8.41703 3.66902 8.41703 3.13083 8.74897 2.79889Z"
                    fill={``}
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Utilisateurs;
