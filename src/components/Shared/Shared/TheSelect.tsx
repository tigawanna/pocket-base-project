import React from 'react'
import { handleSubmit } from './../../../utils/paymentutils';

interface TheSelectProps {
handleChange:any
head: {
name: string;
prop: string;
type: string;
editable: boolean;
}
index:number
}

export const TheSelect: React.FC<TheSelectProps> = ({handleChange,head,index}) => {
return (
 <div className='w-full h-full'>
        <select 
        id={head.prop}
        name={head.prop}
        onChange={(e) => handleChange(e, head.prop, index)}
      className="p-2 border-0 text-black">
    <option value="cash_deposit">select the payment mode</option>
            <option value="cash_deposti">cash deposit</option>
            <option value="cheque">Cheque</option>
            <option value="mpesa">Mpesa</option>
            <option value="direct_deposit">Direct Deposit</option>
        </select>
 </div>
);
}
