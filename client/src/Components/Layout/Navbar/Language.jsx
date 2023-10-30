import { useEffect, useRef, useState } from "react";

const languages = [
  { id: 1, code: "fr", label: "FRANÇAIS", icon: "francais.png" },
  { id: 3, code: "ar", label: "ARABIC", icon: "arabic.png" },
  { id: 2, code: "en", label: "ENGLISH", icon: "english.png" },
];

function LanguageDropdown(props) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };


  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Add a click event listener to the window to close the dropdown when clicking anywhere on the page
  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  // Filter out the selected language from the available languages
  const unchosenLanguages = languages.filter(
    (language) => language.id !== selectedLanguage.id
  );
  ("");
  // console.log(selectedLanguage)
  return (
    <div className={` relative inline-block `} ref={dropdownRef}>
      {props.type === "no-layout" ? (
        <>
          <button
            onClick={toggleDropdown}
            className={`rounded-3xl flex justify-start p-2 px-4 items-center  bg-white w-40  `}
          >
            <span className=" h-full flex items-center rounded-full">
              <img
                src={`http://localhost:5173/assets/icons/${selectedLanguage.icon}`}
                width={20}
              />
            </span>
            <span
              className={`w-3/4 font-primary font-bold  text-tiny 2xl:text-sm px-2`}
            >
              {selectedLanguage.label}
            </span>
            <span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.40878 4.56918L5.34724 7.50764C5.69426 7.85467 6.26213 7.85467 6.60915 7.50764L9.54761 4.56918"
                  stroke="#001E98"
                  strokeWidth="1.1589"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          {isDropdownOpen && (
            // dropdown-content z-[1] rounded-b-lg h-28 w-32  shadow bg-white absolute top-14 2xl:w-36 -left-2 2xl:left-2 2xl:top-12
            <div
              className=" dropdown-content  bg-white w-32  h-28 2xl:w-36  left-4 rounded-sm absolute 2xl:left-2 2xl:top-9  "
              style={{
                borderBottomLeftRadius: "18px",
                borderBottomRightRadius: "18px",
              }}
            >
              <div className="flex justify-center items-center h-full w-full flex-col  ">
                {unchosenLanguages.map((language) => (
                  <button
                    key={language.id}
                    onClick={() => handleLanguageSelect(language)}
                    className="mb-4 rounded-3xl flex justify-start p-2 pl-4 items-center  2xl:w-28 shadow-md h-8  bg-white"
                  >
                    <span className="w-1/4 h-full flex items-center rounded-full">
                      <img
                        src={`http://localhost:5173/assets/icons/${language.icon}`}
                        alt={language.label}
                        width={20}
                      />
                    </span>
                    <span className="w-3/4 font-primary font-bold text-tiny">
                      {language.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={` flex justify-center items-center`}>
          <button
            onClick={toggleDropdown}
            className={`rounded-3xl flex justify-center  p-2 px-4 items-center shadow w-32 h-8 ${props.btnClass} 2xl:w-36 2xl:h-10`}
          >
            <span className=" h-full flex items-center rounded-full ">
              <img
                src={`http://localhost:5173/assets/icons/${selectedLanguage.icon}`}
                width={20}
              />
            </span>
            <span
              className={`w-3/4 font-primary font-bold  text-tiny 2xl:text-sm`}
            >
              {selectedLanguage.label}
            </span>
            <span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.40878 4.56918L5.34724 7.50764C5.69426 7.85467 6.26213 7.85467 6.60915 7.50764L9.54761 4.56918"
                  stroke="#001E98"
                  strokeWidth="1.1589"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          {isDropdownOpen && (
            <div
              className="dropdown-content z-[1] rounded-b-lg h-28 w-32 shadow bg-white absolute top-14 2xl:w-38 mx-3"
              style={{
                borderBottomLeftRadius: "18px",
                borderBottomRightRadius: "18px",
                left: "-8px",
              }}
            >
              <div className="flex justify-center items-center h-full w-full flex-col">
                {unchosenLanguages.map((language) => (
                  <button
                    key={language.id}
                    onClick={() => handleLanguageSelect(language)}
                    className="mb-4 rounded-3xl flex justify-start p-2 pl-4 items-center shadow w-28 h-8"
                  >
                    <span className="w-1/4 h-full flex items-center rounded-full">
                      <img
                        src={`http://localhost:5173/assets/icons/${language.icon}`}
                        alt={language.label}
                        width={20}
                      />
                    </span>
                    <span
                      className="w-3/4 font-primary font-bold"
                      style={{ fontSize: "8.89px" }}
                    >
                      {language.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;
