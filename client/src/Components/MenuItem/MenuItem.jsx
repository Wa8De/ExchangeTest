/* eslint-disable react/prop-types */
const MenuItem = (props) => {
  return (
    <li className="h-10 mt-1">
      <a
        href="#"
        className="flex items-center h-6 font-primary mt-1 mb-1  text-gray-900 rounded-lg dark:text-white"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.802734"
            y="0.604004"
            width="28.4266"
            height="28.4266"
            rx="8.88331"
            fill={props.active?"#5AB4A9":"#F1F5FF"}
          />

          <g transform="translate(7.5, 7.5)">
            {props.icon}
          </g>
        </svg>

        <span className={`ml-3 tracking-wider font-primary text-xs font-semibold ${props.active ? 'text-gray-900' : ' text-light'}`}>{props.title}</span>
        
        <span className="ml-auto">
          {props.active && (
            <svg width="18" height="30" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.62454 32.5145C3.13815 27.9676 2.97978 20.756 7.4188 16.1628C12.201 11.2145 15.6546 8.9556 21.7788 -4.74662e-06L21.7788 48.8582C16.7306 41.2179 12.278 37.2307 7.62454 32.5145Z" fill="#F6F9FF"/>
              <circle cx="17.3372" cy="23.9849" r="2.66499" fill="#5AB4A9"/>
            </svg>
          )}
        </span>
      </a>
    </li>
  );
};


export default MenuItem;