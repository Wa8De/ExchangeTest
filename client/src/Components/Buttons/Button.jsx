/* eslint-disable react/prop-types */
const Button = (props) => {
  return (
    <button
      className={`font-primary font-semibold text-white rounded-3xl ${props.classes}`}
      onClick={props.onClick}
      style={props.style}
    >
      {props.value}
    </button>
  );
};

export default Button;
