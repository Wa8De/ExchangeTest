import { useState, useEffect } from "react";

const Balance = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    const year = today.getFullYear();
    const options = { month: "long" };
    const monthName = today.toLocaleString("en-US", options);

    setDate(`${monthName} ${dayOfMonth}, ${year}`);
  }, []);

  return (
    <div className="flex-col items-center mb-2 3xl:mb-6 w-60" style={{marginLeft:"-2%"}}>
      <div className="w-full px-1 py-0 bg-secondary h-10 rounded-t-3xl flex justify-around items-center">
        <span className="font-perimary font-bold text-white text-xs">
          Votre Portefeuille
        </span>
        <span className="text-xs text-gray-100">{date}</span>
      </div>
      <div className="w-full bg-dark h-16 rounded-b-3xl p-3 pt-2 pb-5 pl-3 flex-col items-center">
        <span className="text-secondary text-xs font-primary">
          Investissement Total
        </span>
        <div className="flex items-center justify-between">
          <span className="text-white font-primary font-bold leading-3">
            $4,389.80
          </span>
          <svg
            style={{ marginRight: "-65px" }}
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.55815 8.53772H6.23516H3.24288C2.73083 8.53772 2.47481 7.91899 2.83751 7.55629L5.60044 4.79336C6.04315 4.35065 6.76322 4.35065 7.20592 4.79336L8.25669 5.84413L9.96885 7.55629C10.3262 7.91899 10.0702 8.53772 9.55815 8.53772Z"
              fill="#5AB4A9"
            />
          </svg>

          <span className="text-secondary ">14.31%</span>
        </div>
      </div>
    </div>
  );
};

export default Balance;
