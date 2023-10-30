import { useState } from 'react';
import Button from '../Buttons/Button';

const DeviseModal = (props) => {
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
          <div className="modal-box">
            <button
              className=" absolute right-2 top-2"
              onClick={closeModal}
            >
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="19.5" cy="19.5" r="19.5" fill="#5AB4A9" fillOpacity="0.13"/>
                <path d="M13.9108 13.0008C14.2142 12.996 14.4393 13.1477 14.6438 13.3534C16.0929 14.8065 17.5413 16.2605 18.9892 17.7152C19.1361 17.8633 19.2071 17.8863 19.3679 17.7237C20.8206 16.2528 22.2798 14.7881 23.7455 13.3297C24.2054 12.8704 24.8256 12.8947 25.1794 13.3795C25.2963 13.5305 25.3601 13.7159 25.3607 13.9068C25.3614 14.0978 25.2989 14.2836 25.183 14.4354C25.1142 14.5258 25.0383 14.6106 24.9561 14.689C23.5179 16.132 22.0781 17.5732 20.6367 19.0126C20.505 19.1437 20.4765 19.208 20.6282 19.3585C22.1016 20.8197 23.5634 22.2924 25.0307 23.7597C25.2965 24.0255 25.4245 24.3295 25.3202 24.7052C25.2814 24.852 25.2061 24.9866 25.1013 25.0965C24.9965 25.2063 24.8655 25.2879 24.7207 25.3336C24.5759 25.3792 24.4219 25.3875 24.273 25.3576C24.1241 25.3278 23.9852 25.2607 23.8692 25.1627C23.7995 25.102 23.7364 25.0413 23.672 24.9746C22.2327 23.5328 20.7947 22.0898 19.3582 20.6455C19.2234 20.5102 19.1573 20.4908 19.0111 20.6395C17.5547 22.1092 16.0929 23.5692 14.6341 25.0341C14.3914 25.2768 14.1159 25.4242 13.7615 25.3593C13.5991 25.3356 13.4468 25.2664 13.3222 25.1598C13.1975 25.0532 13.1055 24.9134 13.057 24.7567C12.9963 24.5995 12.9838 24.4278 13.0209 24.2635C13.0581 24.0991 13.1433 23.9496 13.2657 23.8338C13.7196 23.3671 14.1838 22.9096 14.6438 22.4484C15.6705 21.4168 16.6954 20.3852 17.7283 19.3645C17.8642 19.2298 17.8824 19.1637 17.7349 19.0168C16.2676 17.5605 14.8058 16.0984 13.3494 14.6308C12.9471 14.2266 12.8913 13.7654 13.1905 13.3686C13.2741 13.2559 13.3826 13.1641 13.5075 13.1003C13.6325 13.0365 13.7705 13.0025 13.9108 13.0008Z" fill="#5AB4A9"/>
                </svg>

            </button>
            <div className="modal-header">
              <span className="font-primary font-semibold">Editer la devise</span>
            </div>
            <div className="flex flex-col items-center justify-center mt-6">
              <div className="flex justify-start flex-col items-start w-4/5">
                <label htmlFor="name" className="mb-1">
                  Nom de la devise
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Type here"
                  className="input input-bordered input-info max-w-s m-1 w-full"
                />
              </div>
              <div className="flex justify-start flex-col items-start w-4/5">
                <label htmlFor="country" className="mb-1">
                  Pays
                </label>
                <input
                  type="text"
                  id="country"
                  placeholder="Type here"
                  className="input input-bordered input-info max-w-s m-1 w-full"
                />
              </div>
              <div className="flex justify-start flex-col items-start w-4/5">
                <label htmlFor="amount" className="mb-1">
                  Montant
                </label>
                <input
                  type="text"
                  id="amount"
                  placeholder="Type here"
                  className="input input-bordered input-info max-w-s m-1 w-full"
                />
              </div>
              <Button onClick={()=>console.log("hhhojiojh")} classes="bg-secondary w-56 h-12 mt-8" value="Ajouter"/>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DeviseModal;
