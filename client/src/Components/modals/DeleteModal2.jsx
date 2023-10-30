import { useState } from "react";
import TrashCan from "../../Components/Buttons/TrashCan";
import Button from "../Buttons/Button";
const DeleteModal2 = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 const handleClick = () => {
   if (props.onClick) {
     props.onClick();
   }
   closeModal(); 
 };


  return (
    <div>
      <TrashCan
        onClick={!props.onClick? null : openModal}
        width="17"
        height="19"
        className="inline fill-gray-500 hover:fill-red-500"
      />
      {isModalOpen && (
        <dialog id="DeviseModal" className="modal" open>
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
            <div className={` modal-box h-auto w-auto `}>
              <div className="flex flex-col items-center justify-center h-full p-6">
                <span className="text-xl text-center font-primary font-semibold pt-6">
                  {props.message}
                </span>
                <div className="flex justify-around">
                  <Button
                    value="Oui"
                    classes="bg-secondary w-36 h-14 m-3 mt-10"
                    onClick={handleClick}
                  />
                  <Button
                    value="Non"
                    classes="bg-primary w-36 h-14 m-3 mt-10"
                    onClick={closeModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DeleteModal2;
