import DeleteModal from "../../Components/modals/DeleteModal"
const Transaction = () => {
  return (
    <div>
      <DeleteModal dialog="Delete Transaction"
        message="Vous voulez supprimer la Transaction ?"
      />
    </div>
  )
}

export default Transaction