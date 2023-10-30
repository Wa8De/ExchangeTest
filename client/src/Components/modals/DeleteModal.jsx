import { useState } from 'react'
import Button from '../Buttons/Button';
const DeleteModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  return (
    <div>
      <Button onClick={openModal} classes="bg-secondary w-36 h-12" value={props.dialog}/>
      {isModalOpen && (
        <dialog id="DeviseModal" className="modal" open>
            <div className="modal-box h-auto w-auto">
            <div className="flex flex-col items-center justify-center h-full p-6">
            <span className='text-3xl text-center font-primary font-semibold pt-6'>
                {props.message}
            </span>
            <div className='flex justify-around'>
                <Button value="Oui" classes="bg-secondary w-36 h-14 m-3 mt-10" onClick={props.onClick}/>
                <Button value="Non" classes="bg-primary w-36 h-14 m-3 mt-10" onClick={closeModal}/>
            </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default DeleteModal