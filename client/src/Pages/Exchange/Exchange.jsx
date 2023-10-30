import { useState } from "react"
import Button from '../../Components/Buttons/Button'

const Exchange = () => {
  const [client, setClient] = useState('...')
  const [commission, setCommission] = useState(0)
  const [devise, setDevise] = useState("...")
  const [taux, setTausx] = useState(0)
  const [total, setTotal] = useState(0)
  return (
    <div className="w-full pt-2 h-full">
      <div className="flex justify-start">
        <span className="font-primary font-bold text-3xl pt-6 pb-2 px-14 text-gray-500">Exchange</span>
      </div>
      <div className="flex w-full justify-center pt-2" style={{height:"100%"}}>
         <div className="bg-white flex justify-center w-11/12 h-full rounded-3xl">
            <div className="w-8/12 h-full flex flex-col">
              <div className="flex">
                <div className="w-1/2  px-8 pt-6">
                <div className="flex flex-col items-start">
                  <span className="mb-2 font-primary text-xs font-semibold">Description</span>
                  <textarea  type="text" placeholder="Description" name="" id="" className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal h-24 outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="mb-2 mt-2.5 font-primary text-xs font-semibold">Client</span>
                  <input  type="text" placeholder="Clients" name="" height={"37px"} id="" onChange={(e)=>setClient(e.target.value)}
                   className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="mb-2 mt-2.5 font-primary text-xs font-semibold">Devise de départ</span>
                  <input  type="text" placeholder="Devise de départ" name="" height={"37px"} id="" onChange={(e)=>setDevise(e.target.value)}
                  className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="mb-2 mt-2.5 font-primary text-xs font-semibold">Montant</span>
                  <input  type="text" placeholder="Montant" name="" height={"37px"} id="" onChange={(e)=>setTotal(e.target.value)}
                  className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="mb-2 mt-2.5 font-primary text-xs font-semibold">Commission</span>
                  <input  type="text" placeholder="Valeur" name="" height={"37px"} id="" onChange={(e)=>setCommission(e.target.value)}
                  className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
              </div>
              <div className="w-1/2 px-8 pt-6">
                <div className="flex flex-col items-start">
                  <span className="mb-2 font-primary text-xs font-semibold">Commentaire</span>
                  <textarea  type="text" placeholder="Votre Commentaire" name="" id="" className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal h-24 outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="mb-2 mt-2.5 font-primary text-xs font-semibold">La date</span>
                  <input  type="date" placeholder="Date" name="" height={"37px"} id="" className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="mb-2 mt-2.5 font-primary text-xs font-semibold">Devise d’arrivée</span>
                  <input  type="text" placeholder="Devise d’arrivée" name="" height={"37px"} id="" className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="mb-2 mt-2.5 font-primary text-xs font-semibold">Taux de change</span>
                  <input  type="text" placeholder="Taux de change" name="" height={"37px"} id="" onChange={(e)=>setTausx(e.target.value)}
                  className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="mb-2 mt-2.5 font-primary text-xs font-semibold">Pourcentage</span>
                  <input  type="text" placeholder="Pourcentage" name="" height={"37px"} id="" className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
              </div>
              </div>
              <div className="flex flex-col items-start px-8 pb-6">
                  <span className="mb-2 mt-2.5 font-primary text-xs font-semibold">Charge</span>
                  <input  type="text" placeholder="Charge" name="" height={"37px"} id="" className="bg-grayy w-full border-none rounded-xl font-primary text-xs font-normal outline-stone-200 resize-none px-5 py-2.5"  />
                </div>
            </div>
            <div className="bg-white-500 w-4/12 flex items-center pl-16 pr-2 py-8" style={{height:"100%"}}>
              <div className="h-5/6 w-full flex justify-center items-end pb-8 pt-44 border-l-2">
                <div className="flex flex-col w-4/5 items-center">
                  <div className="flex w-full">
                    <div className="flex flex-col w-2/3">
                      <span className="font-primary font-medium text-gray-400 tracking-widest text-xs mt-5">Client</span>
                      <span className="font-primary font-medium text-gray-400 tracking-widest text-xs mt-5">Commission</span>
                      <span className="font-primary font-medium text-gray-400 tracking-widest text-xs mt-5">Taux de change</span>
                      <span className="font-primary font-medium text-gray-400 tracking-widest text-xs mt-5">Devise</span>
                      <span className="font-primary font-semibold text-secondary tracking-widest text-xs mt-5">Montant total</span>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <span className="font-primary font-bold text-primary tracking-widest text-s text-right mt-5">{client}</span>
                      <span className="font-primary font-medium text-gray-400 tracking-widest text-xs text-right mt-5">{commission}%</span>
                      <span className="font-primary font-medium text-gray-400 tracking-widest text-xs text-right mt-5">{taux}%</span>
                      <span className="font-primary font-medium text-gray-400 tracking-widest text-xs text-right mt-5">{devise}</span>
                      <span className="font-primary font-bold text-black tracking-widest text-s text-right mt-4">{total}</span>                    
                    </div>
                  </div>
                    <div className="flex justify-center mt-4">
                      <Button classes="bg-primary w-40 xl:w-56 h-12" value="Valider"/>
                    </div>                
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Exchange