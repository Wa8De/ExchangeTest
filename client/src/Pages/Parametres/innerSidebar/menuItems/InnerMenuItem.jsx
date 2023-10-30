const InnerMenuItem = (props) => {
  return (
    <div className={`w-full h-10 rounded-xl px-3.5 py-2.5 mt-1.5 ${props.active?'bg-grayy':'bg-white'}  flex justify-start items-center`}>
        <span className='mr-1.5 w-auto'>
            {props.icon}
        </span> 
        <span className={`font-primary text-sm ${props.active?'text-secondary':'text-gray-400'}`}>
            {props.title}
        </span>
    </div>
  )
}

export default InnerMenuItem