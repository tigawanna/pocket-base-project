import React from 'react'
import { Payment } from '../../utils/other/types'

interface SharedPaymentFormProps {
formopen:boolean
setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
input:Payment
handleChange: (e: any) => void
handleSubmit: (e: any) => Promise<void>
error:{name:string,error:string}
}

export const SharedPaymentForm: React.FC<SharedPaymentFormProps> = (
{input,error,handleChange,handleSubmit,formopen,setFormOpen}) => {
return (
 <div>
{formopen?<div className="w-[90%] md:w-[40%] h-[60%] flex-center fixed left-[5%] md:left-[30%] top-[20%] z-20">
        
        <form className="w-full h-full flex-center ">
         <div className="p-2 w-[90%] flex flex-col items-center justify-center 
             rounded-md text-white bg-slate-500">

            <div className="w-full h-full flex sm:flex-row flex-col ">
            {/* shop number */}
            <div className="w-full flex flex-col m-1">
                <label className="text-sm">Shop Number</label>
                <input
                type="text"
                placeholder="Shop number"
                className="p-2 w-[95%]  rounded-md text-black"
                id="shopnumber"
                onChange={handleChange}
                value={input.shopnumber}
                />
                {error && error.name === "shopno" ? (
                <div className="shop-form-error">{error.error}</div>
                ) : null}
            </div>

            {/* shop name */}
            <div className="w-full flex flex-col m-1">
                <label className="text-sm">payment</label>
                <input
                type="text"
                placeholder="Payment"
                className="p-2 w-[95%]  rounded-md text-black"
                id="payment"
                onChange={handleChange}
                value={input.payment}
                />
                {error && error.name === "payment" ? (
                <div className="shop-form-error">{error.error}</div>
                ) : null}
            </div>
            </div>

            <div className="w-full h-full flex sm:flex-row flex-col ">
            {/* monthly rent */}
            <div className="w-[95%] flex flex-col m-1 ">
            <label className="text-sm">Mode</label>
                    <select id="paymentmode" onChange={handleChange} className="p-2 border-0 text-black">
                    <option value="cash_deposit">select the payment mode</option>
                    <option value="cash_deposti">cash deposit</option>
                    <option value="cheque">Cheque</option>
                    <option value="mpesa">Mpesa</option>
                    <option value="direct_deposit">Direct Deposit</option>
                    </select>
                
                {error && error.name === "paymentmode" ? (
                <div className="shop-form-error">{error.error}</div>
                ) : null}
            </div>
            </div>
            <button
            onClick={(e)=>handleSubmit(e)}
            className="py-2 px-5 m-2 bg-slate-700 rounded 
            hover:bg-slate-800 capitalize font-medium text-white"
            >add</button>
            </div>
        </form>
        </div>:null}
        
         {formopen?<div 
         onClick={()=>setFormOpen(!formopen)}
         className="bg-slate-700 opacity-70 fixed top-0 w-full h-full z-10"></div>:null}


   
      </div>

);
}
